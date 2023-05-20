import './App.css';
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber"
import React, { useRef, useState, createRef, forwardRef } from 'react';
import { config, useSpring, animated } from "@react-spring/three"
import { Html } from '@react-three/drei'

// マウスでの視点操作
//最初のタイプ判定
//センターを変えるとちょっと回る
// マウスオーバーで吹き出しが出る。
// クリックすると詳細に飛ぶ
// タイプの詳細
// 相性の詳細
// 四面体と十二面体の遷移
// 白背景と黒背景
// 対極をinvisibleにする時の消す/出るタイミングを調整
//relationをアニメーション
//type名を黒とグレイで色分け

const Node = (props) => {
  const [hovered, setHovered] = useState(false);

  let visible = props.slot === 'XXXX' ? false : true;

  const { scale } = useSpring({
    scale: hovered ? 2 : 1,
    config: config.wobbly,
  });

  const { position } = useSpring({
    from: { position: [0, 0, 0] },
    to: { position: [props.position.x, props.position.y, props.position.z] },
    config: { duration: "500" }
  });

  return (
    <animated.mesh
      {...props}
      onClick={() => { props.onClick() }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={position}
      scale={scale}
      visible={visible}
    >
      <sphereGeometry args={[0.2, 32, 16]} />
      <meshStandardMaterial color={props.slot === 'OOOO' ? "#CCC" : "gray"} />
      <Html><p>{props.slot=== 'XXXX' ? null : props.type}</p></Html>
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

function Relation(props) {
  const ref = useRef();
  const height = props.pos1.distanceTo(props.pos2);


  const radius = (mode) => {
    switch (mode) {
      case 'DUALITY':
        return 0.04
      case 'ACTIVATION':
        return 0.05
      case 'SEMI_DUALITY':
        return 0.05
      case 'MIRAGE':
        return 0.002
      case 'MIRROR':
        return 0.002
      case 'COOPERATION':
        return 0.002
      case 'CONGENERITY':
        return 0.05
      case 'QUASI_IDENTITY':
        return 0.002
      case 'EXTINGUISHMENT':
        return 0.002
      case 'SUPER_EGO':
        return 0.002
      case 'CONFLICT':
        return 0.03
      case 'REQUEST_PLUS':
        return 0.03
      case 'REQUEST_MINUS':
        return 0.03
      case 'SUPERVISION_PLUS':
        return 0.03
      case 'SUPERVISION_MINUS':
        return 0.03

    }

  }
  const cylinderGeometry = new THREE.CylinderGeometry(radius(props.mode), radius(props.mode), height, 8);


  const direction = props.pos2.clone().sub(props.pos1).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  const midpoint = props.pos1.clone().add(props.pos2).divideScalar(2);

  const color = (mode) => {
    switch (mode) {
      case 'DUALITY':
        return "#DB6"
      case 'ACTIVATION':
        return "#0F0"
      case 'SEMI_DUALITY':
        return "#F84"
      case 'MIRAGE':
        return "#969"
      case 'MIRROR':
        return "#68B"
      case 'COOPERATION':
        return "#0AA"
      case 'CONGENERITY':
        return "#0DD"
      case 'QUASI_IDENTITY':
        return "#826"
      case 'EXTINGUISHMENT':
        return "#A41"
      case 'SUPER_EGO':
        return "#995"
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


    }

  }



  const cylinderMaterial = new THREE.MeshBasicMaterial({ color: color(props.mode) });

  return (
    <animated.mesh {...props}>
      <mesh ref={ref} geometry={cylinderGeometry} material={cylinderMaterial} position={midpoint} quaternion={quaternion}>
        <meshBasicMaterial attach="material" color={color(props.mode)} />
      </mesh>
    </animated.mesh>
  );
}


function Tetra(props) {

  const [clickedState, setClickedState] = useState(Array(16).fill(false));
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


  let relations = [
    { 'mode': 'DUALITY', 'type1': 'ISTJ', 'type2': 'ENFP' },
    { 'mode': 'DUALITY', 'type1': 'ISFJ', 'type2': 'ENTP' },
    { 'mode': 'DUALITY', 'type1': 'INFJ', 'type2': 'ESTP' },
    { 'mode': 'DUALITY', 'type1': 'INTJ', 'type2': 'ESFP' },
    { 'mode': 'DUALITY', 'type1': 'ISTP', 'type2': 'ENFJ' },
    { 'mode': 'DUALITY', 'type1': 'ISFP', 'type2': 'ENTJ' },
    { 'mode': 'DUALITY', 'type1': 'INFP', 'type2': 'ESTJ' },
    { 'mode': 'DUALITY', 'type1': 'INTP', 'type2': 'ESFJ' },

    { 'mode': 'ACTIVATION', 'type1': 'INTJ', 'type2': 'ISFP' },
    { 'mode': 'ACTIVATION', 'type1': 'INFJ', 'type2': 'ISTP' },
    { 'mode': 'ACTIVATION', 'type1': 'INTP', 'type2': 'ISFJ' },
    { 'mode': 'ACTIVATION', 'type1': 'INFP', 'type2': 'ISTJ' },
    { 'mode': 'ACTIVATION', 'type1': 'ENTJ', 'type2': 'ESFP' },
    { 'mode': 'ACTIVATION', 'type1': 'ENFJ', 'type2': 'ESTP' },
    { 'mode': 'ACTIVATION', 'type1': 'ENTP', 'type2': 'ESFJ' },
    { 'mode': 'ACTIVATION', 'type1': 'ENFP', 'type2': 'ESTJ' },

    { 'mode': 'SEMI_DUALITY', 'type1': 'INTJ', 'type2': 'ESTP' },
    { 'mode': 'SEMI_DUALITY', 'type1': 'ENTJ', 'type2': 'ISTP' },
    { 'mode': 'SEMI_DUALITY', 'type1': 'ISTJ', 'type2': 'ENTP' },
    { 'mode': 'SEMI_DUALITY', 'type1': 'ESTJ', 'type2': 'INTP' },
    { 'mode': 'SEMI_DUALITY', 'type1': 'INFP', 'type2': 'ESFJ' },
    { 'mode': 'SEMI_DUALITY', 'type1': 'ENFP', 'type2': 'ISFJ' },
    { 'mode': 'SEMI_DUALITY', 'type1': 'ISFP', 'type2': 'ENFJ' },
    { 'mode': 'SEMI_DUALITY', 'type1': 'ESFP', 'type2': 'INFJ' },

    { 'mode': 'MIRAGE', 'type1': 'ISTJ', 'type2': 'ESFP' },
    { 'mode': 'MIRAGE', 'type1': 'ISFJ', 'type2': 'ESTP' },
    { 'mode': 'MIRAGE', 'type1': 'INFJ', 'type2': 'ENTP' },
    { 'mode': 'MIRAGE', 'type1': 'INTJ', 'type2': 'ENFP' },
    { 'mode': 'MIRAGE', 'type1': 'ISTP', 'type2': 'ESFJ' },
    { 'mode': 'MIRAGE', 'type1': 'ISFP', 'type2': 'ESTJ' },
    { 'mode': 'MIRAGE', 'type1': 'INFP', 'type2': 'ENTJ' },
    { 'mode': 'MIRAGE', 'type1': 'INTP', 'type2': 'ENFJ' },

    { 'mode': 'MIRROR', 'type1': 'INTJ', 'type2': 'ENTJ' },
    { 'mode': 'MIRROR', 'type1': 'ISTJ', 'type2': 'ESTJ' },
    { 'mode': 'MIRROR', 'type1': 'INFP', 'type2': 'ENFP' },
    { 'mode': 'MIRROR', 'type1': 'ISFP', 'type2': 'ESFP' },
    { 'mode': 'MIRROR', 'type1': 'INTP', 'type2': 'ENTP' },
    { 'mode': 'MIRROR', 'type1': 'ISTP', 'type2': 'ESTP' },
    { 'mode': 'MIRROR', 'type1': 'INFJ', 'type2': 'ENFJ' },
    { 'mode': 'MIRROR', 'type1': 'ISFJ', 'type2': 'ESFJ' },

    { 'mode': 'COOPERATION', 'type1': 'INTJ', 'type2': 'ISTJ' },
    { 'mode': 'COOPERATION', 'type1': 'INFP', 'type2': 'ISFP' },
    { 'mode': 'COOPERATION', 'type1': 'INTP', 'type2': 'ISTP' },
    { 'mode': 'COOPERATION', 'type1': 'INFJ', 'type2': 'ISFJ' },
    { 'mode': 'COOPERATION', 'type1': 'ENTJ', 'type2': 'ESTJ' },
    { 'mode': 'COOPERATION', 'type1': 'ENFP', 'type2': 'ESFP' },
    { 'mode': 'COOPERATION', 'type1': 'ENTP', 'type2': 'ESTP' },
    { 'mode': 'COOPERATION', 'type1': 'ENFJ', 'type2': 'ESFJ' },

    { 'mode': 'CONGENERITY', 'type1': 'INTJ', 'type2': 'INFJ' },
    { 'mode': 'CONGENERITY', 'type1': 'ISTJ', 'type2': 'ISFJ' },
    { 'mode': 'CONGENERITY', 'type1': 'INTP', 'type2': 'INFP' },
    { 'mode': 'CONGENERITY', 'type1': 'ISTP', 'type2': 'ISFP' },
    { 'mode': 'CONGENERITY', 'type1': 'ENTJ', 'type2': 'ENFJ' },
    { 'mode': 'CONGENERITY', 'type1': 'ESTJ', 'type2': 'ESFJ' },
    { 'mode': 'CONGENERITY', 'type1': 'ENTP', 'type2': 'ENFP' },
    { 'mode': 'CONGENERITY', 'type1': 'ESTP', 'type2': 'ESFP' },

    { 'mode': 'QUASI_IDENTITY', 'type1': 'INTJ', 'type2': 'INTP' },
    { 'mode': 'QUASI_IDENTITY', 'type1': 'ISTJ', 'type2': 'ISTP' },
    { 'mode': 'QUASI_IDENTITY', 'type1': 'INFP', 'type2': 'INFJ' },
    { 'mode': 'QUASI_IDENTITY', 'type1': 'ISFP', 'type2': 'ISFJ' },
    { 'mode': 'QUASI_IDENTITY', 'type1': 'ENTJ', 'type2': 'ENTP' },
    { 'mode': 'QUASI_IDENTITY', 'type1': 'ESTJ', 'type2': 'ESTP' },
    { 'mode': 'QUASI_IDENTITY', 'type1': 'ENFP', 'type2': 'ENFJ' },
    { 'mode': 'QUASI_IDENTITY', 'type1': 'ESFP', 'type2': 'ESFJ' },

    { 'mode': 'EXTINGUISHMENT', 'type1': 'INTJ', 'type2': 'ENTP' },
    { 'mode': 'EXTINGUISHMENT', 'type1': 'ISTJ', 'type2': 'ESTP' },
    { 'mode': 'EXTINGUISHMENT', 'type1': 'INFP', 'type2': 'ENFJ' },
    { 'mode': 'EXTINGUISHMENT', 'type1': 'ISFP', 'type2': 'ESFJ' },
    { 'mode': 'EXTINGUISHMENT', 'type1': 'ENTJ', 'type2': 'INTP' },
    { 'mode': 'EXTINGUISHMENT', 'type1': 'ESTJ', 'type2': 'ISTP' },
    { 'mode': 'EXTINGUISHMENT', 'type1': 'ENFP', 'type2': 'INFJ' },
    { 'mode': 'EXTINGUISHMENT', 'type1': 'ESFP', 'type2': 'ISFJ' },

    { 'mode': 'SUPER_EGO', 'type1': 'INTJ', 'type2': 'ISFJ' },
    { 'mode': 'SUPER_EGO', 'type1': 'ISTJ', 'type2': 'INFJ' },
    { 'mode': 'SUPER_EGO', 'type1': 'INFP', 'type2': 'ISTP' },
    { 'mode': 'SUPER_EGO', 'type1': 'ISFP', 'type2': 'INTP' },
    { 'mode': 'SUPER_EGO', 'type1': 'ENTJ', 'type2': 'ESFJ' },
    { 'mode': 'SUPER_EGO', 'type1': 'ESTJ', 'type2': 'ENFJ' },
    { 'mode': 'SUPER_EGO', 'type1': 'ENFP', 'type2': 'ESTP' },
    { 'mode': 'SUPER_EGO', 'type1': 'ESFP', 'type2': 'ENTP' },

    { 'mode': 'CONFLICT', 'type1': 'ISTJ', 'type2': 'ENFJ' },
    { 'mode': 'CONFLICT', 'type1': 'ISFJ', 'type2': 'ENTJ' },
    { 'mode': 'CONFLICT', 'type1': 'INFJ', 'type2': 'ESTJ' },
    { 'mode': 'CONFLICT', 'type1': 'INTJ', 'type2': 'ESFJ' },
    { 'mode': 'CONFLICT', 'type1': 'ISTP', 'type2': 'ENFP' },
    { 'mode': 'CONFLICT', 'type1': 'ISFP', 'type2': 'ENTP' },
    { 'mode': 'CONFLICT', 'type1': 'INFP', 'type2': 'ESTP' },
    { 'mode': 'CONFLICT', 'type1': 'INTP', 'type2': 'ESFP' },

    { 'mode': 'REQUEST_PLUS', 'type1': 'INTJ', 'type2': 'INFP' }, //要求者 → 受容者
    { 'mode': 'REQUEST_PLUS', 'type1': 'ISTJ', 'type2': 'ISFP' },
    { 'mode': 'REQUEST_PLUS', 'type1': 'INFJ', 'type2': 'INTP' },
    { 'mode': 'REQUEST_PLUS', 'type1': 'ISFJ', 'type2': 'ISTP' },
    { 'mode': 'REQUEST_PLUS', 'type1': 'ENTJ', 'type2': 'ENFP' },
    { 'mode': 'REQUEST_PLUS', 'type1': 'ESTJ', 'type2': 'ESFP' },
    { 'mode': 'REQUEST_PLUS', 'type1': 'ENFJ', 'type2': 'ENTP' },
    { 'mode': 'REQUEST_PLUS', 'type1': 'ESFJ', 'type2': 'ESTP' },
    { 'mode': 'REQUEST_MINUS', 'type1': 'INTJ', 'type2': 'ISTP' }, //受容者 → 要求者
    { 'mode': 'REQUEST_MINUS', 'type1': 'ISTJ', 'type2': 'INTP' },
    { 'mode': 'REQUEST_MINUS', 'type1': 'INFP', 'type2': 'ISFJ' },
    { 'mode': 'REQUEST_MINUS', 'type1': 'ISFP', 'type2': 'INFJ' },
    { 'mode': 'REQUEST_MINUS', 'type1': 'ENTJ', 'type2': 'ESTP' },
    { 'mode': 'REQUEST_MINUS', 'type1': 'ESTJ', 'type2': 'ENTP' },
    { 'mode': 'REQUEST_MINUS', 'type1': 'ENFP', 'type2': 'ESFJ' },
    { 'mode': 'REQUEST_MINUS', 'type1': 'ESFP', 'type2': 'ENFJ' },

    { 'mode': 'SUPERVISION_PLUS', 'type1': 'INTJ', 'type2': 'ESTJ' }, //管理者 → 被管理者
    { 'mode': 'SUPERVISION_PLUS', 'type1': 'ISTJ', 'type2': 'ENTJ' },
    { 'mode': 'SUPERVISION_PLUS', 'type1': 'INFJ', 'type2': 'ESFJ' },
    { 'mode': 'SUPERVISION_PLUS', 'type1': 'ISFJ', 'type2': 'ENFJ' },
    { 'mode': 'SUPERVISION_PLUS', 'type1': 'ENTP', 'type2': 'ISTP' },
    { 'mode': 'SUPERVISION_PLUS', 'type1': 'ESTP', 'type2': 'INTP' },
    { 'mode': 'SUPERVISION_PLUS', 'type1': 'ENFP', 'type2': 'ISFP' },
    { 'mode': 'SUPERVISION_PLUS', 'type1': 'ESFP', 'type2': 'INFP' },
    { 'mode': 'SUPERVISION_MINUS', 'type1': 'INTJ', 'type2': 'ENFJ' }, //被管理者 → 管理者
    { 'mode': 'SUPERVISION_MINUS', 'type1': 'ISTJ', 'type2': 'ESFJ' },
    { 'mode': 'SUPERVISION_MINUS', 'type1': 'INFP', 'type2': 'ENTP' },
    { 'mode': 'SUPERVISION_MINUS', 'type1': 'ISFP', 'type2': 'ESTP' },
    { 'mode': 'SUPERVISION_MINUS', 'type1': 'ENTJ', 'type2': 'INFJ' },
    { 'mode': 'SUPERVISION_MINUS', 'type1': 'ESTJ', 'type2': 'ISFJ' },
    { 'mode': 'SUPERVISION_MINUS', 'type1': 'ENFP', 'type2': 'INTP' },
    { 'mode': 'SUPERVISION_MINUS', 'type1': 'ESFP', 'type2': 'ISTP' },


  ];



  const position = (type) => {
    let diff = compare(type, props.center)
    return nodePositions[diff]
  }


  useFrame(() => {
    ref.current.rotation.x += 0.003;
    ref.current.rotation.y += 0.006;
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

  const handleClick = (index) => {
    setClickedState((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };

  return (
    <animated.mesh {...props} ref={ref}>

      {types.map((type, i) => {

        let slot = compare(type, props.center);
        if (slot !== "XXXX")
          return (
            <Node
              key={i}
              type={type}
              slot={slot}
              position={nodePositions[slot]}
              onClick={() => handleClick(i)}
              clicked={clickedState[i]}
            />
          );

      })}

{/* Link components */}
{/* {linkPositions.map(({ pos1, pos2 }, i) => (
  <Link key={i} pos1={pos1} pos2={pos2} />
))} */}

{/* Relation components */}
{relations.map(({ type1, type2, mode }, i) => {
  const isRelationMode = props.mode === 'RELATION'
  const isSameMode = props.mode === mode
  const isRelatedToXXXX = compare(type1, props.center) === 'XXXX' || compare(type2, props.center) === 'XXXX'
  const isRelatedToCenter =  (type1 === props.relationCenter || type2 === props.relationCenter)

  if (!isRelatedToXXXX && 
    (isSameMode || (isRelationMode && isRelatedToCenter ))
  ) {
    return <Relation key={i} mode={mode} pos1={position(type1)} pos2={position(type2)} />
  }
  return null
})}

    </animated.mesh>
  );
}

function CenterSelect(props) {

  return (
    <select id="center" onChange={props.onChange} >
      <option value="INTJ">INTJ</option>
      <option value="INTP">INTP</option>
      <option value="ENTJ">ENTJ</option>
      <option value="ENTP">ENTP</option>
      <option value="INFJ">INFJ</option>
      <option value="INFP">INFP</option>
      <option value="ENFJ">ENFJ</option>Ï
      <option value="ENFP">ENFP</option>
      <option value="ISTJ">ISTJ</option>
      <option value="ISFJ">ISFJ</option>
      <option value="ESTJ">ESTJ</option>
      <option value="ESFJ">ESFJ</option>
      <option value="ISTP">ISTP</option>
      <option value="ISFP">ISFP</option>
      <option value="ESTP">ESTP</option>
      <option value="ESFP">ESFP</option>
    </select>

  )
}


function ModeSelect(props) {

  return (
    <select id="mode" onChange={props.onChange} >
      <option value='RELATION'>RELATION</option>
      <option value='DUALITY'>DUALITY</option>
      <option value="ACTIVATION">ACTIVATION</option>
      <option value="SEMI_DUALITY">SEMI_DUALITY</option>
      <option value="MIRAGE">MIRAGE</option>
      <option value="MIRROR">MIRROR</option>
      <option value="COOPERATION">COOPERATION</option>
      <option value="CONGENERITY">CONGENERITY</option>
      <option value="QUASI_IDENTITY">QUASI_IDENTITY</option>
      <option value="EXTINGUISHMENT">EXTINGUISHMENT</option>
      <option value="SUPER_EGO">SUPER_EGO</option>
      <option value="CONFLICT">CONFLICT</option>
      <option value="REQUEST_PLUS">REQUEST_PLUS</option>
      <option value="REQUEST_MINUS">REQUEST_MINUS</option>
      <option value="SUPERVISION_PLUS">SUPERVISION_PLUS</option>
      <option value="SUPERVISION_MINUS">SUPERVISION_MINUS</option>

    </select>
  )
}

function App() {

  const [center, setCenter] = useState("INTJ");
  const [mode, setMode] = useState("RELATION");
  const [relationCenter, setRelationCenter] = useState("INTJ")

  const handleCenterChange = (event) => {
    setCenter(event.target.value);
  };
  const handleModeChange = (event) => {
    setMode(event.target.value);
    if(event.target.value === 'RELATION'){
      setRelationCenter(center)
    }
  };
  return (
    <>
      <div id="canvas-container">
        <Canvas camera={{ position: [0, 0, 7] }}>
          <Tetra
            center={center}
            mode={mode}
            relationCenter = {relationCenter}
          />
          <ambientLight intensity={0.5} />
          {/* <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} /> */}
          <pointLight position={[100, 100, 100]} />
        </Canvas>
      </div>
      <h1>Threejs Fiber</h1>
      <CenterSelect onChange={handleCenterChange} />
      <ModeSelect onChange={handleModeChange} />
    </>
  );
}

export default App;

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
