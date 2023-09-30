import React, {forwardRef, MutableRefObject, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import {Canvas, useFrame, useThree} from 'react-three-fiber';
import {Billboard, OrbitControls, Text} from '@react-three/drei';
import {Vector3} from 'three';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
import {OrbitControls as OrbitControlsImpl} from "three-stdlib/controls/OrbitControls";
import {useGraphStore} from "@/store/graphStore.ts";

interface GraphItem {
    position?: Vector3;
    name: string;
    id?: number;
}

interface GraphProps {
    items: GraphItem[];
    focusDistance?: number;
    tweenDuration?: number;
    neighborCount?: number;
    dotsRef?: MutableRefObject<DotsRef>;
}

function SetupCamera() {
    const {camera} = useThree();

    useEffect(() => {
        // Adjust camera position
        camera.position.z = 10;
    }, []);

    return null; // This component doesn't render anything itself
}


const Dot = ({onClick, isHighlighted, isSelected}: {
    label: string,
    onClick: () => void,
    isHighlighted?: boolean;
    isSelected?: boolean;
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    return (
        <mesh
            ref={meshRef}
            onClick={onClick}
            onPointerOver={(e) => {
                e.stopPropagation();  // This prevents the event from propagating further
                setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
        >
            <sphereGeometry args={[0.1]}/>
            <meshStandardMaterial color={isSelected ? 'red' : isHighlighted ? 'white' : hovered ? 'yellow' : 'blue'}/>
        </mesh>
    );
}

function distance(p1: Vector3, p2: Vector3) {
    const a = p2.x - p1.x;
    const b = p2.y - p1.y;
    const c = p2.z - p1.z;

    return Math.hypot(a, b, c);
}

type DotsProps = GraphProps & { controls: MutableRefObject<OrbitControlsImpl> };

export interface DotsRef {
    focus: (name: string) => void;
}

const Dots = forwardRef<DotsRef, DotsProps>(({
                  items, controls, focusDistance = 4, tweenDuration = 1000, neighborCount = 4
              }: DotsProps, ref) => {
    const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
    const [selected, setSelected] = useState<string | null>(null);
    const {camera} = useThree();

    const fieldsStore = useGraphStore();

    const dots = useMemo(() => {
        return items.map(item => {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;

            return {
                position: new Vector3(x, y, z),
                ...item
            } as GraphItem;
        });
    }, [items]);

    const handleDotClick = (dot: GraphItem) => {
        const nearest = dots
            .map(other => ({dot: other, distance: distance(dot.position, other.position)}))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, neighborCount)
            .map(x => x.dot);

        setHighlighted(new Set(nearest.map(x => x.name)));
        setSelected(dot.name);
        fieldsStore.setFocused(dot.name);


        const targetPosition = new THREE.Vector3().copy(dot.position);
        const cameraPosition = new THREE.Vector3().copy(dot.position).add(new THREE.Vector3(0, 0, focusDistance));

        new TWEEN.Tween(camera.position)
            .to(cameraPosition, tweenDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();

        new TWEEN.Tween(controls.current.target)
            .to(targetPosition, tweenDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
    }

    useImperativeHandle(ref, () => ({
        focus: (name: string) => {
            const dot = dots.find(x => x.name.toLowerCase() === name.toLowerCase());
            if (!dot) return;

            handleDotClick(dot);
        },
    }));

    useFrame(() => {
        TWEEN.update();
        controls.current?.update();
        // controls.current.update();
    });

    return (
        <group>
            {dots.map((dot, index) => {
                const isHighlighted = highlighted.has(dot.name);
                return (
                    <group key={index} position={[dot.position.x, dot.position.y, dot.position.z]}>
                        <Dot label={dot.name} onClick={() => handleDotClick(dot)} isHighlighted={isHighlighted}
                             isSelected={selected === dot.name}/>
                        <Billboard>
                            <Text
                                fontSize={0.2}
                                position={[0, 0.2, 0]}
                                anchorX="center"
                                anchorY="middle"
                                font={'sans-serif'}
                                color={isHighlighted ? 'white' : 'gray'}
                            >
                                {dot.name}
                            </Text>
                        </Billboard>
                    </group>
                );
            })}
        </group>
    );
});

const DotPlot3D = (props: GraphProps) => {
    const controls = useRef<OrbitControlsImpl>(null);

    return (
        <Canvas>
            <SetupCamera/>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <Dots controls={controls} ref={props.dotsRef} {...props}/>
            <OrbitControls ref={controls}/>
        </Canvas>
    );
};


const Graph3D = React.memo(({className, ...props}: GraphProps & { className?: string }) => {
    return (
        <div className={className}>
            <DotPlot3D {...props} />
        </div>
    )
}, (a, b) => a.items.length === b.items.length);


export default Graph3D;