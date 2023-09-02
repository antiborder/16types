import React, { useState } from 'react'
import { Html } from '@react-three/drei'    
import styled from "styled-components";
import { symbols } from "../constants/symbols.js";  
import { getFuncTextColor } from "../colorFunctions.js";  

const FuncText = (props) => {

    const [hovered, setHovered] = useState(false)
    const handleHover = (hovered, event) => {
      setHovered(hovered)
    }
    return (
  
      <Html zIndexRange={[1, 10]}
        position={[5 * Math.sin(props.angle), 5 * Math.cos(props.angle), 0]}
      >
        <StyledFuncText
          onMouseEnter={(event) => handleHover(true, event)}
          onMouseLeave={(event) => handleHover(false, event)}
          style={{ color: getFuncTextColor(props.func + 'e') }}>
          {props.func}
        </StyledFuncText>
        {hovered && <FuncBubble {...props}/>}
      </Html>
  
    )
  }

  export default FuncText;
  
  const FuncBubble = (props) => {
    return (
      <StyledFuncBubble style={{ color: getFuncTextColor(props.func + 'e') }}>
        {props.func}: 
        {symbols[props.func]['origin']}<br/>
        {symbols[props.func]['label']}
  
  
      </StyledFuncBubble>
    )
  }
  
  
  const StyledFuncText = styled.div`
    opacity: 0.2;
    font-weight: bold;
    font-size: 36px;
  `;
  
  const StyledFuncBubble = styled.div`
      position:absolute;
      top:30px;
      left:20px;
      width: 90px;
      text-align:center;
  
      background: white;
      opacity:0.7;
      font-size: 12px;
      line-height:16px;
  
      border: solid 1px;
      border-radius: 0px 16px 16px 16px;
      padding: 4px 4px 4px 4px;
      z-index:350;
  
  `;
  