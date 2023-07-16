import '../App.css';
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from 'react';
import { config, useSpring, animated } from "@react-spring/three"
import { Html } from '@react-three/drei'

import { relations} from '../relations.js';
import styled from "styled-components";
import {typeLabels} from "../typeLabels.js";
import {relationLabels} from "../relationLabels.js"
import { getSurfaceColor } from '../colorFunctions.js';


const StyledNodeLabel = styled.div`
  transform: translate(-50%, -10%);
`;

const StyledNodeBubble = styled.div`
width: 140px;
background: #fff;
border-radius: 0px 20px 20px 20px;
font-size: 12px;
.label{
  display:block;
  font-size: 12px;
  text-align: center;
}
div{
  padding: 10px;
}
`;

const Node = (props) => {
  const [hovered, setHovered] = useState(false);

  let visible = props.slot === 'XXXX' ? false : true;


  const { scale } = useSpring({
    scale: hovered ? 1.8 : 1,
    config: config.wobbly,
  });

  const { position } = useSpring({
    from: { position: [0, 0, 0] },
    to: { position: [props.position.x, props.position.y, props.position.z] },
    config: { duration: "500" }
  });
  const handleHover = (hovered) => {
    setHovered(hovered)
    props.onHover(hovered)
  };

  const getNodeColor = () => {
    if (props.slot === 'XXXX') {
      return "#CCC"
    } else {
        return getSurfaceColor(props.type)
      }
    
  }

  const getBaseRadius = () => {
    switch (props.slot) {
      case 'XXXX':
        return 0.8 //5
      case 'OOXO': case 'OXXX': case 'XXOX': case 'OOOO':
        return 0.5 //4
      case 'OXOO': case 'OXXO': case 'XOOX': case 'XOXX': case 'XOOO': case 'OOOX':
        return 0.3 //3
      case 'OXOX': case 'OOXX': case 'XXOO': case 'XOXO':
        return 0.2 //2
      case 'XXXO':
        return 0.15 //1
      default:
        return 0.2
    }
  }

  return (
    <animated.mesh
      {...props}
      onClick={() => { props.onClick() }}
      onPointerOver={() => {
        handleHover(true);
       }
     }
     onPointerOut={() => handleHover(false)}
      position={position}
      scale={scale}
      visible={visible}
    >
      <sphereGeometry args={[getBaseRadius(), 32, 16]} />
      <meshStandardMaterial color={getNodeColor()} />      
      {!props.isInitialModalOpen && (<Html
        zIndexRange={[100, 5]} // Z-order range (default=[16777271, 0])
      >
        <StyledNodeLabel> 
          {props.slot === 'XXXX' ? null : props.type}
        </StyledNodeLabel>  
      </Html>)}
      {
        hovered &&
        props.hoveredNodeState.filter((value) => value === true).length <=1 &&      
        (
          <Html
            position={[0, 0, 0]} // position relative to the node
            zIndexRange={[100, 5]}
          >
            <StyledNodeBubble>
              <div>
                {props.type}：
                <br></br><span className='label'>{typeLabels[props.type]['label1']}</span>
              </div>
            </StyledNodeBubble>
          </Html>
        )
      }
    </animated.mesh>
  );
};

function Link(props) {
  const ref = useRef();
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([props.pos1, props.pos2]);
  const lineMaterial = new THREE.LineBasicMaterial({ color: "#BBB" });

  return (
    <animated.mesh {...props} geometry={lineGeometry} material={lineMaterial}>
      <line ref={ref} geometry={lineGeometry}>
        <meshBasicMaterial attach="material" color="#BBB" />
      </line>
    </animated.mesh>
  );
}

const StyledRelationBubble = styled.div`
width: 120px;
background: #fff;
border-radius: 0px 20px 20px 20px;
font-size: 12px;
div{
  padding: 10px;
}
.relation{
  display: block;
  text-align: center;
}
.label{
  font-size: 16px;
}
`;

function Relation(props) {
  // const [hovered, setHovered] = useState(false);
  const ref = useRef();
  const height = props.pos1.distanceTo(props.pos2)-0.2;
  const base_radius = (mode) => {
    switch (mode) {
      case 'DUALITY':
        return 0.02
      case 'ACTIVATION':
        return 0.04
      case 'SEMI_DUALITY':
        return 0.04
      case 'MIRAGE':
        return 0.04
      case 'MIRROR':
        return 0.04
      case 'COOPERATION':
        return 0.04
      case 'CONGENERITY':
        return 0.04
      case 'QUASI_IDENTITY':
        return 0.04
      case 'EXTINGUISHMENT':
        return 0.04
      case 'SUPER_EGO':
        return 0.04
      case 'CONFLICT':
        return 0.04
      case 'REQUEST_PLUS':
        return 0.04
      case 'REQUEST_MINUS':
        return 0.04
      case 'SUPERVISION_PLUS':
        return 0.04
      case 'SUPERVISION_MINUS':
        return 0.04
      default:
        return 0.04

    }

  }

  const [isHovered, setIsHovered] = useState(false);
  const [radius, setRadius] = useState(base_radius(props.mode));

  const handleHover = (hovered) => {
    setRadius(hovered ? base_radius(props.mode) + 0.04 : base_radius(props.mode));
    setIsHovered(hovered);
    props.onHover(hovered)
  };


  const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, 8);
  const direction = props.pos2.clone().sub(props.pos1).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  const midpoint = props.pos1.clone().add(props.pos2).divideScalar(2);

  const color = (mode) => {
    switch (mode) {
      case 'DUALITY':
        return "#DB6"
      case 'ACTIVATION':
        return "#8D8"
      case 'SEMI_DUALITY':
        return "#FA7"
      case 'MIRAGE':
        return "#D8A"
      case 'MIRROR':
        return "#68B"
      case 'COOPERATION':
        return "#0AA"
      case 'CONGENERITY':
        return "#6DD"
      case 'QUASI_IDENTITY':
        return "#A6D"
      case 'EXTINGUISHMENT':
        return "#DB6"
      case 'SUPER_EGO':
        return "#996"
      case 'CONFLICT':
        return "#A99"
      case 'REQUEST_PLUS':
        return "#9A9"
      case 'REQUEST_MINUS':
        return "#9A9"
      case 'SUPERVISION_PLUS':
        return "#99A"
      case 'SUPERVISION_MINUS':
        return "#99A"
      default:
        return '#000'
    }

  }

  const cylinderMaterial = new THREE.MeshBasicMaterial({ color: color(props.mode) });

  return (
    <animated.mesh {...props}
      onPointerOver={() => {
         handleHover(true);
        }
      }
      onClick={() => { props.onClick() }}
      onPointerOut={() => handleHover(false)}>
      <mesh ref={ref}
        geometry={cylinderGeometry}
        material={cylinderMaterial}
        position={midpoint}
        quaternion={quaternion}>
        <meshBasicMaterial attach="material" color={color(props.mode)} />
      </mesh>
      {isHovered &&
        props.hoveredRelationState.filter((value) => value === true).length <=1 &&      
        (
          <Html
            position={midpoint} // position relative to the node
            zIndexRange={[100, 5]}
          >
            <StyledRelationBubble >
              <div>
                {props.type1}と{props.type2}：<br></br>
                <span className='relation'>
                <span className='label'>{relationLabels[props.mode]['label']}</span>の関係
                </span>
              </div>
            </StyledRelationBubble>
          </Html>
        )
      }
    </animated.mesh>
  );
}

function Tetra(props) {

  // const [clickedState, setClickedState] = useState(Array(16).fill(false));
  const [hoveredNodeState, setHoveredNodeState] = useState(Array(16).fill(false));
  const [hoveredRelationState, setHoveredRelationState] = useState(Array(256).fill(false));

  const ref = useRef();

  const power = 1
  const l1Ratio = 3 / Math.pow(Math.sqrt(3), power)
  const l2Ratio = 3 / Math.pow(3 / 1.15, power)
  const l3Ratio = 3 / Math.pow(3 * Math.sqrt(3), power)

  let nodePositions = {

    "OOOO": new THREE.Vector3(0, 0, 0),

    "XOOO": new THREE.Vector3(-1 * l1Ratio, -1 * l1Ratio, 1 * l1Ratio),
    "OXOO": new THREE.Vector3(1 * l1Ratio, 1 * l1Ratio, 1 * l1Ratio),
    "OOXO": new THREE.Vector3(-1 * l1Ratio, 1 * l1Ratio, -1 * l1Ratio),
    "OOOX": new THREE.Vector3(1 * l1Ratio, -1 * l1Ratio, -1 * l1Ratio),

    "XXOO": new THREE.Vector3(0 * l2Ratio, 0 * l2Ratio, 3 * l2Ratio),
    "OXXO": new THREE.Vector3(0 * l2Ratio, 3 * l2Ratio, 0 * l2Ratio),
    "OOXX": new THREE.Vector3(0 * l2Ratio, 0 * l2Ratio, -3 * l2Ratio),
    "XOOX": new THREE.Vector3(0 * l2Ratio, -3 * l2Ratio, 0 * l2Ratio),
    "XOXO": new THREE.Vector3(-3 * l2Ratio, 0 * l2Ratio, 0 * l2Ratio),
    "OXOX": new THREE.Vector3(3 * l2Ratio, 0 * l2Ratio, 0 * l2Ratio),

    "OXXX": new THREE.Vector3(3 * l3Ratio, 3 * l3Ratio, -3 * l3Ratio),
    "XOXX": new THREE.Vector3(-3 * l3Ratio, -3 * l3Ratio, -3 * l3Ratio),
    "XXOX": new THREE.Vector3(3 * l3Ratio, -3 * l3Ratio, 3 * l3Ratio),
    "XXXO": new THREE.Vector3(-3 * l3Ratio, 3 * l3Ratio, 3 * l3Ratio),

    "XXXX": null
  }

  let linkPositions = [
    { 'pos1': nodePositions['OOOO'], 'pos2': nodePositions['XOOO'] },
    { 'pos1': nodePositions['OOOO'], 'pos2': nodePositions['OXOO'] },
    { 'pos1': nodePositions['OOOO'], 'pos2': nodePositions['OOXO'] },
    { 'pos1': nodePositions['OOOO'], 'pos2': nodePositions['OOOX'] },

    { 'pos1': nodePositions['XOOO'], 'pos2': nodePositions['XXOO'] },
    { 'pos1': nodePositions['XOOO'], 'pos2': nodePositions['XOXO'] },
    { 'pos1': nodePositions['XOOO'], 'pos2': nodePositions['XOOX'] },
    { 'pos1': nodePositions['OXOO'], 'pos2': nodePositions['XXOO'] },
    { 'pos1': nodePositions['OXOO'], 'pos2': nodePositions['OXXO'] },
    { 'pos1': nodePositions['OXOO'], 'pos2': nodePositions['OXOX'] },
    { 'pos1': nodePositions['OOXO'], 'pos2': nodePositions['XOXO'] },
    { 'pos1': nodePositions['OOXO'], 'pos2': nodePositions['OXXO'] },
    { 'pos1': nodePositions['OOXO'], 'pos2': nodePositions['OOXX'] },
    { 'pos1': nodePositions['OOOX'], 'pos2': nodePositions['XOOX'] },
    { 'pos1': nodePositions['OOOX'], 'pos2': nodePositions['OXOX'] },
    { 'pos1': nodePositions['OOOX'], 'pos2': nodePositions['OOXX'] },

    { 'pos1': nodePositions['XXOO'], 'pos2': nodePositions['XXXO'] },
    { 'pos1': nodePositions['XXOO'], 'pos2': nodePositions['XXOX'] },
    { 'pos1': nodePositions['XOXO'], 'pos2': nodePositions['XXXO'] },
    { 'pos1': nodePositions['XOXO'], 'pos2': nodePositions['XOXX'] },
    { 'pos1': nodePositions['XOOX'], 'pos2': nodePositions['XXOX'] },
    { 'pos1': nodePositions['XOOX'], 'pos2': nodePositions['XOXX'] },
    { 'pos1': nodePositions['OXXO'], 'pos2': nodePositions['XXXO'] },
    { 'pos1': nodePositions['OXXO'], 'pos2': nodePositions['OXXX'] },
    { 'pos1': nodePositions['OXOX'], 'pos2': nodePositions['XXOX'] },
    { 'pos1': nodePositions['OXOX'], 'pos2': nodePositions['OXXX'] },
    { 'pos1': nodePositions['OOXX'], 'pos2': nodePositions['XOXX'] },
    { 'pos1': nodePositions['OOXX'], 'pos2': nodePositions['OXXX'] },
  ]

  const position = (type) => {
    let diff = compare(type, props.center)
    return nodePositions[diff]
  }

  useFrame(() => {
    ref.current.rotation.x += 0.0004;
    ref.current.rotation.z += 0.0008;
  });

  const types = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ',
  ];

  const handleNodeClick = (type) => {
    if(!props.isInitialModalOpen && props.typeModalState === 'NONE' && props.relationModalState === 'NONE')
    props.setTypeModalState(type)
    props.setRelationModalState('NONE')
  };

  const handleRelationClick = (type1,type2) =>{
    if(!props.isInitialModalOpen && props.typeModalState === 'NONE'  && props.relationModalState === 'NONE')
    props.setRelationModalState(type1 + '_' + type2)
    props.setTypeModalState('NONE')
    
  };

  const handleNodeHover = (index) => {
    setHoveredNodeState((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };

  const handleRelationHover = (index) => {
    setHoveredRelationState((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };


  return (
    <animated.mesh {...props} ref={ref}>

      {types.map((type, i) => {

        let slot = compare(type, props.center);

        return (
          slot !== "XXXX"
            ? <Node
              key={i}
              type={type}
              slot={slot}
              position={nodePositions[slot]}
              onClick={() => handleNodeClick(type)}
              onHover={(hovered) => handleNodeHover(i,hovered)}
              hoveredNodeState={hoveredNodeState}
              // clicked={clickedState[i]}
              isInitialModalOpen={props.isInitialModalOpen}
              typeModalState={props.typeModalState}
            />
            : ""
        );

      })}

      {/* Link components */}
      {linkPositions.map(({ pos1, pos2 }, i) => (
        <Link key={i} pos1={pos1} pos2={pos2} />
      ))}

      {/* Relation components */}
      {relations.map(({ type1, type2, mode }, i) => {
        const isRelationMode = props.mode === 'RELATION'
        const isSameMode = props.mode === mode
        const isRelatedToXXXX = compare(type1, props.center) === 'XXXX' || compare(type2, props.center) === 'XXXX'
        const isRelatedToCenter = (type1 === props.relationCenter || type2 === props.relationCenter)

        if (!isRelatedToXXXX &&
          (isSameMode || (isRelationMode && isRelatedToCenter))
        ) {
          return <Relation
            key={i}
            mode={mode}
            pos1={position(type1)}
            pos2={position(type2)}
            type1={type1}
            type2={type2}
            onHover={(hovered) => handleRelationHover(i,hovered)}
            onClick={() => handleRelationClick(type1,type2)}
            hoveredRelationState={hoveredRelationState}
            relationModalState={props.relationModalState}
            isInitialModalOpen={props.isInitialModalOpen}
          />
        }
        return null
      })}
    </animated.mesh>
  );
}

export { Tetra };

function compare(str1, str2) {
  let diff = ""
  for (let i = 0; i < 4; i++) {
    if (str1.charAt(i) === str2.charAt(i)) {
      diff += "O";
    } else {
      diff += "X";
    }
  }
  return diff
}
