import styled from 'styled-components';
import {typeLabels} from "../typeLabels.js";
import {relations} from "../relations.js"
import {relationLabels} from "../relationLabels.js"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei';
import { Text } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { getTextColor } from '../colorFunctions.js';
import { getFuncTextColor } from '../colorFunctions.js';
import { getFuncPlaneColor } from '../colorFunctions.js';
import * as THREE from 'three';


const StyledCloseButton = styled.button`
  position: absolute;
  width: 35px;
  height: 35px;
  top: -15px;
  right: -15px;
  background-color: #ccc;
  border-radius: 20px;
  border-width: 0px;
  border-color: #f2f2f2;
  font-size: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledRelationModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255); 
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size:12px;
  padding: 20px 4px 20px 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  max-width: 320px;
  width: 100%;
  height: 500px; 
  
  // overflow-y: auto;
  // max-height: 80vh;

  text-align: center;
    .type{
      margin:0px;   
      padding:0px; 
      font-size:24px;
      line-height:0;
    }
    .three-chars{
        margin: 0px 40px 24px 0px;
        padding:0;
        text-align: right;
        line-height:0;
    }
    .label1{
      font-size: 16px;
    }
    .label2, .label3 {
      font-size: 12px;
      margin:0;
      padding:0;
      line-height:12px;
    }

    .light-star{
      color: #DB9;
      font-size:16px
    }
    .dark-star{
      color: #DDD;
      font-size:16px
    }
    hr{
      width:80%;
    }
    .symbols{
      margin:0 auto;
      width:160px;
      background-color: #EDE7F6;
      color:#6A1B9A;

      .symbol{
        font-size:24px
      }
      .symbol-label{
        front-size:24px
      }
      
    }

    button:hover {
      background-color: #0069d9;
    }
    table {
      margin:  0 auto;

      border-collapse: collapse;
      border-spacing: 0;
      border: none;
    }

`;

function RelationModal(props) {

  const getMode = (type1,type2) => {
    const relation = relations.find(rel => rel.type1 === type1 && rel.type2 === type2);
    return relation ? relation.mode : null;
  }
  
  let mode = getMode(props.type1,props.type2);

  const handleSubmit = () => {
    props.onSelect();
  };

  return (

    <StyledRelationModal 
      onClick={(event)=>{event.stopPropagation()}}
      >
      <div className='title'><span className='type' style={{color: getTextColor(props.type1)}}>{props.type1}</span> と<span className='type' style={{color: getTextColor(props.type2)}}>{props.type2}</span>:</div><br></br>
      <div className='relation'><span className='relation-label'>{relationLabels[mode]['label']}</span> の関係</div><br></br>
      <div className='compatibility'>相性：
        {Array.from({length: relationLabels[mode]['compatibility']}).map((_, index) => (
          <span className='light-star' key={index}>★</span>
        ))}
                {Array.from({length: 5-relationLabels[mode]['compatibility']}).map((_, index) => (
          <span key={index} className='dark-star'>★</span>
        ))}
      </div>
      <hr></hr>
      <table>
        <thead>
          <tr>
            <td style={{width:"42%"}}>{props.type1}</td>
            <td style={{width:"16%"}}>&nbsp;</td>
            <td style={{width:"42%"}}>{props.type2}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{typeLabels[props.type1]['label1']}</td>
            <td>&nbsp;</td>
            <td>{typeLabels[props.type2]['label1']}</td>
          </tr>
          <tr>
            <td>{typeLabels[props.type1]['label2']}</td>
            <td>&nbsp;</td>
            <td>{typeLabels[props.type2]['label2']}</td>
          </tr>
          <tr>
            <td>{typeLabels[props.type1]['label3']}</td>
            <td>&nbsp;</td>
            <td>{typeLabels[props.type2]['label3']}</td>
          </tr>
        </tbody>
      </table>


<TwoFunctions
  type1 ={props.type1}
  type2 ={props.type2}
  />
    <StyledCloseButton onClick={handleSubmit}>&times;</StyledCloseButton>
    </StyledRelationModal>
  );
}

const RoundedSquare2 = ({ size = 2.6, radius = 0.4, color = '#0088ff', opacity = 0.1, ...props }) => {
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

const FunctionGrid = ({ position, type}) => {
  return (
    <group position={position} rotation={[0, -Math.PI / 6, 0]}>
      <Text position={[-1, 3, 0.01]} fontSize={1.0} color={getFuncTextColor(typeLabels[type]['func1'])} anchorX="center" anchorY="middle">
        {typeLabels[type]['func1']}
      </Text>
      <RoundedSquare2
        position={[-1, 3, 0]} color={getFuncPlaneColor(typeLabels[type]['func1'])}
      ></RoundedSquare2>
      <Text position={[1, 3, 0.01]} fontSize={1.0} color={getFuncTextColor(typeLabels[type]['func8'])} anchorX="center" anchorY="middle">
      {typeLabels[type]['func8']}
      </Text>
      <RoundedSquare2
        position={[1, 3, 0]} color={getFuncPlaneColor(typeLabels[type]['func8'])}
      ></RoundedSquare2>

      <Text position={[-1, 1, 0.01]} fontSize={1.0} color={getFuncTextColor(typeLabels[type]['func2'])} anchorX="center" anchorY="middle">
      {typeLabels[type]['func2']}
      </Text>
      <RoundedSquare2
        position={[-1, 1, 0]} color={getFuncPlaneColor(typeLabels[type]['func2'])}
      ></RoundedSquare2>
      <Text position={[1, 1, 0.01]} fontSize={1.0} color={getFuncTextColor(typeLabels[type]['func7'])} anchorX="center" anchorY="middle">
      {typeLabels[type]['func7']}
      </Text>
      <RoundedSquare2
        position={[1, 1, 0]} color={getFuncPlaneColor(typeLabels[type]['func7'])}
      ></RoundedSquare2>
      <Text position={[-1, -1, 0.01]} fontSize={1.0} color={getFuncTextColor(typeLabels[type]['func3'])} anchorX="center" anchorY="middle">
        {typeLabels[type]['func3']}
      </Text>
      <RoundedSquare2
        position={[-1, -1, 0]} color={getFuncPlaneColor(typeLabels[type]['func3'])}
      ></RoundedSquare2>
      <Text position={[1, -1, 0.01]} fontSize={1.0} color={getFuncTextColor(typeLabels[type]['func6'])} anchorX="center" anchorY="middle">
      {typeLabels[type]['func6']}
      </Text>
      <RoundedSquare2
        position={[1, -1, 0]} color={getFuncPlaneColor(typeLabels[type]['func6'])}
      ></RoundedSquare2>
      <Text position={[-1, -3, 0.01]} fontSize={1.0} color={getFuncTextColor(typeLabels[type]['func4'])} anchorX="center" anchorY="middle">
      {typeLabels[type]['func4']}
      </Text>
      <RoundedSquare2
        position={[-1, -3, 0]} color={getFuncPlaneColor(typeLabels[type]['func6'])}
      ></RoundedSquare2>
      <Text position={[1, -3, 0.01]} fontSize={1.0} color={getFuncTextColor(typeLabels[type]['func5'])} anchorX="center" anchorY="middle">
      {typeLabels[type]['func5']}
      </Text>
      <RoundedSquare2
        position={[1, -3, 0]} color={getFuncPlaneColor(typeLabels[type]['func5'])}
      ></RoundedSquare2>

    </group>
  );
};

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
      style={{height:'300px'}}
      >
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <OrbitControls args={[cameraPosition]} />
        <FunctionGrid 
          position={[-2.5, 0, 0]} 
          type={props.type1}
        />
        <FunctionGrid 
          position={[2.5, 0, 0]} 
          type={props.type2}
        />

      </Canvas>
    );
  };
export { RelationModal };