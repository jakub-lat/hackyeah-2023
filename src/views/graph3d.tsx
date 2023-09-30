import React from 'react';
import {Canvas, useThree} from 'react-three-fiber';
import {OrbitControls} from '@react-three/drei';
import {Vector3} from 'three';

function SetupCamera() {
    const {camera} = useThree();

    // Adjust camera position
    camera.position.z = 10;

    return null; // This component doesn't render anything itself
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

    return (
        <group>
            {dots.map((dot, index) => (
                <mesh key={index} position={dot}>
                    <sphereGeometry args={[0.1]}/>
                    <meshStandardMaterial color="blue"/>
                </mesh>
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