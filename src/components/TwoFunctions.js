
import { typeLabels } from "../constants/typeLabels.js";
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei';
import { Text } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { getFuncTextColor } from '../colorFunctions.js';
import { getFuncPlaneColor } from '../colorFunctions.js';
import * as THREE from 'three';
  
  const TwoFunctions = (props) => {
    const cameraRef = useRef();
  
    useEffect(() => {
      const camera = cameraRef.current;
      if (camera) {
        // カメラの初期位置を設定
        camera.position.set(-2, 0, 7);
      }
    }, []);
  
    const cameraPosition = [-2, 0, 7]; // カメラの位置
  
    return (
      <Canvas
        camera={{ position: [-2, 0, 7] }}
        style={{ height: '300px' }}
      >
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={1.0} />
        <pointLight position={[10, 10, 10]} />
  
        <OrbitControls args={[cameraPosition]} />
        <FunctionGrid
          position={[-2, 0, 0]}
          type={props.type1}
        />
        <FunctionGrid
          position={[2, 0, 0]}
          type={props.type2}
        />
  
        <Connections
          mode={props.mode}
          type1={props.type1}
          type2={props.type2}
        />
  
      </Canvas>
    );
  };
  
  const FunctionGrid = ({ position, type }) => {
    return (
      <group position={position} rotation={[0, -Math.PI / 4, 0]}>
        <Text
          position={[0, 4.2, 0]}
          fontSize={0.7}
          color={'#777777'}
        >
          {type}
        </Text>
        <FunctionElement x={-1} y={3} funcNum={1} type={type} />
        <FunctionElement x={1} y={3} funcNum={8} type={type} />
        <FunctionElement x={-1} y={1} funcNum={2} type={type} />
        <FunctionElement x={1} y={1} funcNum={7} type={type} />
        <FunctionElement x={-1} y={-1} funcNum={3} type={type} />
        <FunctionElement x={1} y={-1} funcNum={6} type={type} />
        <FunctionElement x={-1} y={-3} funcNum={4} type={type} />
        <FunctionElement x={1} y={-3} funcNum={5} type={type} />
      </group>
    );
  };
  
  const FunctionElement = (props) => {
    return (
      <>
        <Text
          position={[props.x, props.y, 0.01]}
          fontSize={1.0}
          color={getFuncTextColor(typeLabels[props.type]['func' + props.funcNum])}
          anchorX="center"
          anchorY="middle">
          {typeLabels[props.type]['func' + props.funcNum]}
        </Text>
        <Text
          position={[props.x - 0.6, props.y + 0.6, 0.01]}
          fontSize={0.4}
          color='#555555'
          anchorX="center" anchorY="middle">
          {props.funcNum}
        </Text>
        <RoundedSquare
          position={[props.x, props.y, 0]}
          color={getFuncPlaneColor(typeLabels[props.type]['func' + props.funcNum])}
        >
        </RoundedSquare>
      </>
    )
  }
  
  const RoundedSquare = ({ size = 2.6, radius = 0.4, color = '#0088ff', opacity = 0.2, ...props }) => {
    const shape = new THREE.Shape();
    const x = size / 2 - radius;
    const y = size / 2 - radius;
  
    // ポリゴンの形状を作成
    shape.moveTo(-x, -y + radius);
    shape.quadraticCurveTo(-x, -y, -x + radius, -y);
    shape.lineTo(x - radius, -y);
    shape.quadraticCurveTo(x, -y, x, -y + radius);
    shape.lineTo(x, y - radius);
    shape.quadraticCurveTo(x, y, x - radius, y);
    shape.lineTo(-x + radius, y);
    shape.quadraticCurveTo(-x, y, -x, y - radius);
    shape.lineTo(-x, -y + radius);
  
    // ポリゴンをShapeGeometryで描画
    const geometry = new THREE.ShapeGeometry(shape);
  
    // オブジェクトを描画
    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), transparent: true, opacity });
    return (
      <mesh geometry={geometry} material={material} {...props} />
    );
  };
  
  const Connections = (props) => {
    const funcPositions = {
      'type1': {
        'func1': [-2 - 1 / Math.sqrt(2), 3, -1 / Math.sqrt(2)],
        'func8': [-2 + 1 / Math.sqrt(2), 3, +1 / Math.sqrt(2)],
        'func2': [-2 - 1 / Math.sqrt(2), 1, -1 / Math.sqrt(2)],
        'func7': [-2 + 1 / Math.sqrt(2), 1, +1 / Math.sqrt(2)],
        'func3': [-2 - 1 / Math.sqrt(2), -1, -1 / Math.sqrt(2)],
        'func6': [-2 + 1 / Math.sqrt(2), -1, +1 / Math.sqrt(2)],
        'func4': [-2 - 1 / Math.sqrt(2), -3, -1 / Math.sqrt(2)],
        'func5': [-2 + 1 / Math.sqrt(2), -3, +1 / Math.sqrt(2)],
      },
      'type2': {
        'func1': [2 - 1 / Math.sqrt(2), 3, -1 / Math.sqrt(2)],
        'func8': [2 + 1 / Math.sqrt(2), 3, +1 / Math.sqrt(2)],
        'func2': [2 - 1 / Math.sqrt(2), 1, -1 / Math.sqrt(2)],
        'func7': [2 + 1 / Math.sqrt(2), 1, +1 / Math.sqrt(2)],
        'func3': [2 - 1 / Math.sqrt(2), -1, -1 / Math.sqrt(2)],
        'func6': [2 + 1 / Math.sqrt(2), -1, +1 / Math.sqrt(2)],
        'func4': [2 - 1 / Math.sqrt(2), -3, -1 / Math.sqrt(2)],
        'func5': [2 + 1 / Math.sqrt(2), -3, +1 / Math.sqrt(2)],
      }
    }
  
    let line1type1funcNum
    let line1type2funcNum
    let line2type1funcNum
    let line2type2funcNum
  
    switch (props.mode) {
      case 'DUALITY': line1type1funcNum = 5; line1type2funcNum = 1; line2type1funcNum = 1; line2type2funcNum = 5; break
      case 'ACTIVATION': line1type1funcNum = 5; line1type2funcNum = 2; line2type1funcNum = 2; line2type2funcNum = 5; break
      case 'SEMI_DUALITY': line1type1funcNum = 5; line1type2funcNum = 1; line2type1funcNum = 1; line2type2funcNum = 5; break
      case 'MIRAGE': line1type1funcNum = 1; line1type2funcNum = 1; line2type1funcNum = 1; line2type2funcNum = 1; break
      case 'MIRROR': line1type1funcNum = 1; line1type2funcNum = 2; line2type1funcNum = 2; line2type2funcNum = 1; break
      case 'COOPERATION': line1type1funcNum = 2; line1type2funcNum = 2; line2type1funcNum = 2; line2type2funcNum = 2; break
      case 'CONGENERITY': line1type1funcNum = 1; line1type2funcNum = 1; line2type1funcNum = 1; line2type2funcNum = 1; break
      case 'QUASI_IDENTITY': line1type1funcNum = 1; line1type2funcNum = 8; line2type1funcNum = 8; line2type2funcNum = 1; break
      case 'EXTINGUISHMENT': line1type1funcNum = 1; line1type2funcNum = 1; line2type1funcNum = 2; line2type2funcNum = 2; break
      case 'SUPER_EGO': line1type1funcNum = 1; line1type2funcNum = 3; line2type1funcNum = 3; line2type2funcNum = 1; break
      case 'CONFLICT': line1type1funcNum = 1; line1type2funcNum = 4; line2type1funcNum = 4; line2type2funcNum = 1; break
      case 'REQUEST': line1type1funcNum = 5; line1type2funcNum = 4; line2type1funcNum = 2; line2type2funcNum = 5; break
      case 'SUPERVISION': line1type1funcNum = 1; line1type2funcNum = 4; line2type1funcNum = 2; line2type2funcNum = 1; break
      case 'IDENTITY': line1type1funcNum = 1; line1type2funcNum = 2; line2type1funcNum = 2; line2type2funcNum = 1; break
      default: line1type1funcNum = 1; line1type2funcNum = 2; line2type1funcNum = 2; line2type2funcNum = 1; break
    }
  
    return (
      <>
        <Connection
          start={funcPositions['type1']['func' + line1type1funcNum]}
          end={funcPositions['type2']['func' + line1type2funcNum]}
          color={getFuncTextColor(typeLabels[props.type1]['func' + line1type1funcNum])}
        />
        <Connection
          start={funcPositions['type1']['func' + line2type1funcNum]}
          end={funcPositions['type2']['func' + line2type2funcNum]}
          color={getFuncTextColor(typeLabels[props.type1]['func' + line2type1funcNum])}
        />
      </>
    );
  }
  
  const Connection = (props) => {
  
    const start = new THREE.Vector3(...props.start)
    const end = new THREE.Vector3(...props.end)
  
    const radius = 0.03
    const distance = start.distanceTo(end)
    const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, distance * 0.8, 8);
    const direction = end.clone().sub(start).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    const midpoint = start.clone().add(end).divideScalar(2);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: props.color });
  
    const cone1Geometry = new THREE.CylinderGeometry(0, radius * 3, 0.8, 8);
    const tip1Point = start.clone().divideScalar(6).add(end).multiplyScalar(6).divideScalar(7);
    const cone2Geometry = new THREE.CylinderGeometry(radius * 3, 0, 0.8, 8);
    const tip2Point = start.clone().divideScalar(0.12).add(end).multiplyScalar(0.12).divideScalar(1.12);
  
  
    return (
      <>
        <mesh
          geometry={cylinderGeometry}
          material={cylinderMaterial}
          position={midpoint}
          quaternion={quaternion}>
        </mesh>
        <mesh
          geometry={cone1Geometry}
          material={cylinderMaterial}
          position={tip1Point}
          quaternion={quaternion}>
        </mesh>
        <mesh
          geometry={cone2Geometry}
          material={cylinderMaterial}
          position={tip2Point}
          quaternion={quaternion}>
        </mesh>
      </>
    );
  }

  export default TwoFunctions;  