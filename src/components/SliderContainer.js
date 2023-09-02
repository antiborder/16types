import { useState } from 'react';
import styled from 'styled-components';

import { symbols } from "../constants/symbols.js"

function SliderContainer(props) {
    const [value, setValue] = useState(props.value)

    const handleChange = (event) => {
        if (value === 100) {
            setValue(0);
        } else {
            setValue(100);
        }
        props.onChange(event)
    }

    return (
        <StyledSliderContainer>
            <div style={{ color: value === 0 ? 'black' : 'rgb(190,190,190)', fontFamily: "Arial, sans-serif" }}>
                {props.symbol1}
            </div>:&nbsp;
            <BinaryLabel {...props}
                value={value}
                symbol={props.symbol1}
                side='LEFT'
            />
            &nbsp;&nbsp;
            <input type="range" min="0" max="100" step="100" value={props.value} onChange={handleChange} />
            &nbsp;&nbsp;
            <BinaryLabel {...props}
                value={value}
                symbol={props.symbol2}
                side='RIGHT'
            />
            &nbsp;  :
            <div
                style={{ color: value === 100 ? 'black' : 'rgb(190,190,190)', fontFamily: "Arial, sans-serif" }}
            >
                {props.symbol2}
            </div>
        </StyledSliderContainer>
    );
}

export default SliderContainer;

const BinaryLabel = (props) => {
    const [hovered, setHovered] = useState(false)
    const handleHover = (hovered, event) => {
        setHovered(hovered)
    }

    return (
        <>
            <StyledBinaryLabel
                className='label-off'
                style={{
                    color:
                        (props.side === 'LEFT' && (props.value === 0 ? 'black' : '#AAAAAA')) ||
                        (props.side === 'RIGHT' && (props.value === 100 ? 'black' : '#AAAAAA'))
                }}
                onMouseEnter={(event) => handleHover(true, event)}
                onMouseLeave={(event) => handleHover(false, event)}
            >
                {symbols[props.symbol]['label']}
                {hovered && <SymbolBubble {...props} />}
            </StyledBinaryLabel>

        </>
    )
}

const SymbolBubble = (props) => {
    return (
        <StyledSymbolBubble
            style={{
                left: props.side === 'LEFT' && '40px',
                right: props.side === 'RIGHT' && '40px',
                borderRadius: (props.side === 'LEFT' && '0px 24px 24px 24px') || (props.side === 'RIGHT' && '24px 0px 24px 24px')

            }}>
            <div className='binaryTitle'>{symbols[props.symbol]['label']}:&nbsp;{symbols[props.symbol]['origin']}</div>
            {symbols[props.symbol]['description1']} <br />
            {symbols[props.symbol]['description2']}
        </StyledSymbolBubble>)
}

const StyledSliderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    padding: 5px;
    input{
      width:80px;
    }
  `;

const StyledBinaryLabel = styled.div`
     position: relative;
      font-size:22px; 
  `;

const StyledSymbolBubble = styled.div`
  position:absolute;
  color:white;
  background: #777;
  opacity:0.9;
  width: 220px;
  font-size: 12px;
  line-height:16px;
  border-radius: 0px 24px 24px 24px;
  padding: 4px 4px 8px 4px;
  text-align:center;
  z-index:110;

  .binaryTitle{
    font-size:14px;
    font-weight:bold;
    margin-bottom:4px;
  }
`;