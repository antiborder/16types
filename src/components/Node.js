import '../assets/ComicSans.css';

import { useRef, useState } from 'react';
import { config, useSpring, animated } from "@react-spring/three"
import { Html } from '@react-three/drei'

import styled from "styled-components";
import { typeLabels } from "../constants/typeLabels.js";
import { getSurfaceColor, getBackgroundColor, getTextColor } from '../colorFunctions.js';


const Node = (props) => {
  const [hovered, setHovered] = useState(false);
  const [bubbleHovered, setBubbleHovered] = useState(false)
  const clickCount = useRef(0)

  let visible = (props.slot==='XXXX' && props.shape==="SPHERE") ? false : true;

  const { scale } = useSpring({
    scale: hovered ? 1.8 : 1,
    config: config.wobbly,
  });

  const { position } = useSpring({
    from: { position: [0, 0, 0] },
    to: { position: [props.position.x, props.position.y, props.position.z] },
    config: { duration: "500" }
  });
  const handleHover = (hovered, event) => {
    setHovered(hovered)
    props.onHover(hovered)
  };

  const handleBubbleHover = (bubbleHovered, event) => {
    setBubbleHovered(bubbleHovered)
  }

  const handleClick = () => {
    clickCount.current++
    if (clickCount.current === 1) { //初回クリック
      setTimeout(() => { //待つ
        if (clickCount.current === 1) { //次のクリックが来てなければ
          props.onNodeClick() //ただのクリック
        }
        clickCount.current = 0 //初期化
      }, 300) //<-待ち時間の設定 =400ms
    } else if (clickCount.current > 1) { //2回目以降は
      props.onNodeDoubleClick() //ダブルクリック
      clickCount.current = 0 //初期化
    }
  }

  const getNodeColor = () => {
    // if (props.slot === 'XXXX') {
      // return "#CCC"
    // } else {
      return getSurfaceColor(props.type)
    // }
  }

  const getBaseRadius = () => {
    switch (props.slot) {
      case 'OOOO':
        return 0.4
      case 'XXXX':
        return 0.3 //5 0.8
      case 'OOXO': case 'OXXX': case 'XXOX': 
        return 0.3 //4 0.5
      case 'OXOO': case 'XOOX': case 'XOXX': case 'XOOO': case 'OOOX':
        return 0.3 //3 0.3
      case 'OXOX': case 'OOXX': case 'XXOO': case 'XOXO': case 'OXXO':
        return 0.3 //2 0.2
      case 'XXXO':
        return 0.3 //1 0.15
      default:
        return 0.3
    }
  }

  return (
    <animated.mesh
      {...props}
      onClick={handleClick}
      onPointerOver={(event) => handleHover(true, event)}
      onPointerOut={() => handleHover(false)}
      position={position}
      scale={scale}
      visible={visible}
    >
      <sphereGeometry args={[getBaseRadius(), 32, 16]} />
      <meshStandardMaterial color={getNodeColor()} />
      <Html zIndexRange={[11, 50]}>
        <div
          onMouseEnter={(event) => handleBubbleHover(true, event)}
          onMouseLeave={(event) => handleBubbleHover(false, event)}
        >
          {!props.isInitialModalOpen &&
            (<div >
              <NodeLabel {...props} />
            </div>)
          }
        </div>
      </Html>
      <Html zIndexRange={[51, 100]}>
        <div
          onMouseEnter={(event) => handleBubbleHover(true, event)}
          onMouseLeave={(event) => handleBubbleHover(false, event)}
        >
          {
            (hovered || bubbleHovered) &&
            props.hoveredNodeState.filter((value) => value === true).length <= 1 &&
            <NodeBubble {...props}
              style={{ zIndex: 50 }}
              onClick={handleClick}
              textColor={getTextColor(props.type)}
              backgroundColor={getBackgroundColor(props.type)}
              onDoubleClick={props.onNodeDoubleClick}
            />
          }
        </div>
      </Html>
    </animated.mesh>
  );
};
export default Node;

const NodeLabel = (props) => {
  const symbol = (props.slot === 'XXXX' && props.shape==='SPHERE') ? null : props.type
  return (
    (props.label === 'MBTI_4' && (
      <MbtiNodeLabel {...props} symbol={symbol} />
    ))
    || (props.label === 'SOCI_3' && (
      <SocionicsNodeLabel {...props} symbol={symbol} />
    ))
    || (props.label === 'FUNC' && (
      <FuncNodeLabel {...props} symbol={symbol} />
    ))
  )

}

const FuncNodeLabel = (props) => {
  return (
    <div style={{
      transform: 'translate(-50%, -40%)', fontSize: props.slot === 'OOOO' ? '20px' : '16px'
    }}>
      <span>{typeLabels[props.symbol]['func1']}</span>
      <span style={{ opacity: 0.4 }}>/</span>
      <span style={{ opacity: 0.4 }}>{typeLabels[props.symbol]['func2']}</span>
    </div>
  )
}
const SocionicsNodeLabel = (props => {
  return (
    props.label === 'SOCI_3' && (
      <div style={{
        transform: 'translate(-40%, -40%)', fontSize: props.slot === 'OOOO' ? '20px' : '16px'
      }}>
        <span>
          {typeLabels[props.symbol]['3chars'].charAt(0)}</span>
        <span>{typeLabels[props.symbol]['3chars'].charAt(1)}</span>
        <span style={{ opacity: props.slot.charAt(0) === 'O' ? 1 : 0.4 }}>{typeLabels[props.symbol]['3chars'].charAt(2)}</span>
      </div>
    )
  )
})

const MbtiNodeLabel = (props) => {
  return (
    <StyledMbtiNodeLabel
      style={{ 
        zIndex: 10, 
        fontSize: props.slot === 'OOOO' ? '24px' : '16px', display: 'flex' ,
      }}
    >
      <div style={{ opacity: props.slot.charAt(0) === 'O' ? 1 : 0.4 }}> {props.symbol.charAt(0)}</div>
      <div style={{ opacity: props.slot.charAt(1) === 'O' ? 1 : 0.4 }}> {props.symbol.charAt(1)}</div>
      <div style={{ opacity: props.slot.charAt(2) === 'O' ? 1 : 0.4 }}> {props.symbol.charAt(2)}</div>
      <div style={{ opacity: props.slot.charAt(3) === 'O' ? 1 : 0.4 }}> {props.symbol.charAt(3)}</div>

    </StyledMbtiNodeLabel>
  )
}
const NodeBubble = (props) => {

  return (
    <StyledNodeBubble style={{ backgroundColor: props.backgroundColor, borderColor: props.textColor }}>
      <div style={{ textAlign: 'left' }}>
        <span className='symbol' style={{ color: props.textColor }}>
          {props.type}
        </span>：
      </div>
      <div className='label'>
        {typeLabels[props.type]['label1']}
      </div>
      <div onClick={props.onClick}>
        <span className='modalLink'>
        詳細をみる
        </span>
      </div>
      <div onClick={props.onDoubleClick}>
        <span className='modalLink'>
        {props.type}を中央にする
        </span>
      </div>
    </StyledNodeBubble>)

}

const StyledMbtiNodeLabel = styled.div`
  transform: translate(-50%, -40%);
`;

const StyledNodeBubble = styled.div`
  position:absolute;
  top:10px;
  left:10px;
  width: 180px;
  background: #fff;
  border-radius: 0px 32px 32px 32px;
  border: solid 1px;
  font-size: 12px;
  padding: 4px 0px 8px 0px;
  text-align:center;
  .symbol{
    font-size: 16px;
    font-weight: bold;
  }
  .label{
    font-size: 16px;
    font-weight: bold;
  }
  .modalLink{
    color:#0000FF;
    cursor: pointer;
    text-decoration: underline;
  }
  div{
    padding: 2px;
  }
`;