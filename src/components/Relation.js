// import '../App.css';
import * as THREE from 'three';
import { useState } from 'react';
import { animated } from "@react-spring/three"
import { Html } from '@react-three/drei'

import styled from "styled-components";
import { relationLabels } from "../constants/relationLabels.js"
import { getTextColor } from '../colorFunctions';


function Relation(props) {
    const [bubbleHovered, setBubbleHovered] = useState(false)
    const cylinderHeight = (props.mode === 'REQUEST' || props.mode === 'SUPERVISION')
        ? props.pos1.distanceTo(props.pos2) - 0.5
        : props.pos1.distanceTo(props.pos2) - 0.3;
    const base_radius = relationLabels[props.mode]['width']

    const [isHovered, setIsHovered] = useState(false);
    const [radius, setRadius] = useState(base_radius);

    const handleHover = (hovered) => {
        setRadius(hovered ? base_radius + 0.06 : base_radius);
        setIsHovered(hovered);
        props.onHover(hovered)
    };
    const handleBubbleHover = (bubbleHovered) => {
        setBubbleHovered(bubbleHovered)
    }

    const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, cylinderHeight, 8);
    const direction = props.pos2.clone().sub(props.pos1).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    const midpoint = (props.mode === 'REQUEST' || props.mode === 'SUPERVISION')
        ? props.pos1.clone().divideScalar(0.8).add(props.pos2).multiplyScalar(0.8).divideScalar(1.8)
        : props.pos1.clone().add(props.pos2).divideScalar(2);

    const coneGeometry = new THREE.CylinderGeometry(0, 3 * radius, 0.4, 8);
    const tipPoint = props.pos1.clone().divideScalar(7).add(props.pos2).multiplyScalar(7).divideScalar(8);
    const color = relationLabels[props.mode]['color']
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: color });

    return (
        <animated.mesh {...props}
            onPointerOver={() => handleHover(true)}
            onPointerOut={() => handleHover(false)}
            onClick={() => { props.onClick() }}
        >
            <mesh
                geometry={cylinderGeometry}
                material={cylinderMaterial}
                position={midpoint}
                quaternion={quaternion}>
                <meshBasicMaterial attach="material" color={color} />
            </mesh>
            {(props.mode === 'REQUEST' || props.mode === 'SUPERVISION') && (
                <mesh
                    // ref={ref}
                    geometry={coneGeometry}
                    material={cylinderMaterial}
                    position={tipPoint}
                    quaternion={quaternion}>
                    <meshBasicMaterial attach="material" color={color} />
                </mesh>)}
            {(isHovered || bubbleHovered) &&
                props.hoveredRelationState.filter((value) => value === true).length <= 1 &&
                (
                    <Html
                        position={midpoint} // position relative to the node
                        zIndexRange={[100, 51]}
                    >
                        <div
                            onMouseEnter={(event) => handleBubbleHover(true, event)}
                            onMouseLeave={(event) => handleBubbleHover(false, event)}
                        >
                            <RelationBubble
                                borderColor={relationLabels[props.mode]['color']}
                                type1={props.type1}
                                type2={props.type2}
                                mode={props.mode}
                                onClick={props.onClick}
                            />
                        </div>
                    </Html>
                )
            }
        </animated.mesh>
    );
}
export { Relation };

const RelationBubble = (props) => {

    return (
        <StyledRelationBubble
            style={{ borderColor: relationLabels[props.mode]['color'] }}>
            <div>
                <span className='typeSymbol' style={{ color: getTextColor(props.type1) }}>
                    {props.type1}
                </span >と
                <span className='typeSymbol' style={{ color: getTextColor(props.type2) }}>
                    {props.type2}
                </span>：<br></br>
                <div className='compatibility'>
                    {Array.from({ length: relationLabels[props.mode]['compatibility'] }).map((_, index) => (
                        <span className='light-star' key={index}>★</span>
                    ))}
                    {Array.from({ length: 5 - relationLabels[props.mode]['compatibility'] }).map((_, index) => (
                        <span key={index} className='dark-star'>★</span>
                    ))}
                </div>
                <div className='relation'>
                    <span className='label'>{relationLabels[props.mode]['label']}</span>の関係
                </div>
                <div onClick={props.onClick} style={{textAlign:'center'}}>
                    <span className='modalLink'>
                    詳細をみる
                        </span>
                </div>
            </div>
        </StyledRelationBubble>
    )
}

const StyledRelationBubble = styled.div`
    width: 120px;
    position: absolute;
    top: -4px;
    left: -4px;
    background: #fff;
    border: solid 1px;
    border-radius: 0px 24px 24px 24px;
    font-size: 12px;
    .typeSymbol{
        font-weight:bold;
    }
    div{
        padding: 2px;
    }
    .relation{
        display: block;
        text-align: center;
    }
    .label{
        font-size: 16px;        
    }
    .compatibility{
        text-align:center;
    .light-star{
        color: #DB9;
        font-size:16px
      }
      .dark-star{
        color: #DDD;
        font-size:16px
      }
    }
    .modalLink{
        color:#0000FF;
        cursor: pointer;
        text-decoration: underline;        
      }
    `;
