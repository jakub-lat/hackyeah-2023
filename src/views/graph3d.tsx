import React, { useRef, useState }  from 'react';
import {Canvas, useThree} from 'react-three-fiber';
import {Billboard, OrbitControls, Text} from '@react-three/drei';
import {Vector3} from 'three';
import * as THREE from 'three';


function SetupCamera() {
    const {camera} = useThree();

    // Adjust camera position
    camera.position.z = 10;

    return null; // This component doesn't render anything itself
}


const Dot = ({ label, onClick }: { label: string, onClick: (label: string) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      ref={meshRef}
      onClick={() => onClick(label)}
      onPointerOver={(e) => {
        e.stopPropagation();  // This prevents the event from propagating further
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.1]} />
      <meshStandardMaterial color={hovered ? 'yellow' : 'blue'} />
    </mesh>
  );
}

const Dots: React.FC<{ count: number }> = ({count}) => {
    const dots = React.useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            temp.push(new Vector3(x, y, z));
        }
        return temp;
    }, [count]);

    const handleDotClick = (label: string) => {
        console.log(label);
    }

    return (
        <group>
            {dots.map((dot, index) => (
                <group key={index} position={[dot.x, dot.y, dot.z]}>
                    <Dot label={"KIERUNEK"} onClick={handleDotClick} />
                    <Billboard>
                        <Text
                            fontSize={0.2}
                            position={[0, 0.2, 0]}
                            anchorX="center"
                            anchorY="middle"
                        >
                            {"SIEEMA"}
                        </Text>
                    </Billboard>
                </group>
            ))}
        </group>
    );
};


const DotPlot3D: React.FC = () => {
    return (
        <Canvas>
            <SetupCamera/>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <Dots count={100}/>
            <OrbitControls/>
        </Canvas>
    );
};

const Graph3D = () => {
    return (
        <div style={{height: '80vh', width: '100%'}}>
            <DotPlot3D/>
        </div>
    )
}

export default Graph3D;