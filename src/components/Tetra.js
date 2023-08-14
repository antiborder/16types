import '../App.css';
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from 'react';
import { animated } from "@react-spring/three"

import { relations } from '../constants/relations.js';
import { typeLabels } from "../constants/typeLabels.js";
import  Node  from './Node.js';
import { Relation} from './Relation.js'


function Tetra(props) {

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

  const types = Object.keys(typeLabels)

  const handleNodeClick = (type) => {
    if (!props.isInitialModalOpen && props.typeModalState !== type && props.relationModalState === 'NONE')
      props.setTypeModalState(type)
    props.setRelationModalState('NONE')
  };

  const handleRelationClick = (type1, type2) => {
    if (!props.isInitialModalOpen && props.typeModalState === 'NONE' && props.relationModalState === 'NONE')
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
            ? <Node {...props}
              key={i}
              type={type}
              slot={slot}
              position={nodePositions[slot]}
              onNodeClick={() => handleNodeClick(type)}
              onNodeDoubleClick={() => { props.onNodeDoubleClick(type) }}
              onHover={(hovered) => handleNodeHover(i, hovered)}
              hoveredNodeState={hoveredNodeState}
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
            onHover={(hovered) => handleRelationHover(i, hovered)}
            onClick={() => handleRelationClick(type1, type2)}
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


function Link(props) {
  // const ref = useRef();
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([props.pos1, props.pos2]);
  const lineMaterial = new THREE.LineBasicMaterial({ color: "#999" });

  return (
    <animated.mesh {...props} geometry={lineGeometry} material={lineMaterial}>
      <line
        // ref={ref} 
        geometry={lineGeometry}>
        <meshBasicMaterial attach="material" color="#999" />
      </line>
    </animated.mesh>
  );
}

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