import styled from 'styled-components';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { typeLabels } from "../constants/typeLabels.js";
import { getFuncTextColor, getFuncBackgroundColor } from '../colorFunctions.js';
import { cognitiveFunctionLabels } from '../constants/cognitiveFunctionLabels.js';
import { Fragment } from 'react';

const FunctionTable = (props)=>{
    return(
      <StyledFunctionTable>
    <table>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>得意▲<br />　　▲</td>
                  <td >1</td>
                  <FunctionSquare func={typeLabels[props.type]['func1']} />
                  <FunctionSquare func={typeLabels[props.type]['func8']} />
                  <td>8</td>
  
                </tr>
                <tr>
                  <td></td>
                  <td >2</td>
                  <FunctionSquare func={typeLabels[props.type]['func2']} />
                  <FunctionSquare func={typeLabels[props.type]['func7']} />
                  <td>7</td>
                </tr>
                <tr>
                  <td></td>
                  <td>3</td>
                  <FunctionSquare func={typeLabels[props.type]['func3']} />
                  <FunctionSquare func={typeLabels[props.type]['func6']} />
                  <td>6</td>
                </tr>
                <tr>
                  <td>　　▼<br />苦手▼</td>
                  <td>4</td>
                  <FunctionSquare func={typeLabels[props.type]['func4']} />
                  <FunctionSquare func={typeLabels[props.type]['func5']} />
                  <td>5</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>◀︎意識</td>
                  <td>無意識▶︎</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            </StyledFunctionTable>
            )
  }

  function FunctionSquare(props) {

    return (
      <HtmlTooltip
        title={
          <Fragment>
            <big color="inherit">{props.func}&nbsp;:&nbsp;{cognitiveFunctionLabels[props.func]['label']}</big><br />
            {cognitiveFunctionLabels[props.func]['phrase']}
          </Fragment>
        }
        arrow>
        <td style={{ color: getFuncTextColor(props.func), backgroundColor: getFuncBackgroundColor(props.func) }}>{props.func}</td>
      </HtmlTooltip>
    )
  }  

  export {FunctionTable };
  
  const StyledFunctionTable = styled.div`
  table {
    margin: 16px 20% 24px 15%;
    border-collapse: collapse;      
  
    tr:  nth-child(n+2):nth-child(-n+5)
      td:nth-child(n+3):nth-child(-n+4) {
        font-size:28px;
        padding:12px;
        border-radius: 25px;
        margin: 10px;
        border: 8px solid white;
        
    }
  
    tr:  nth-child(n+2):nth-child(-n+5)
    td:nth-child(2) {
        color: #888888;
        position: relative;
        left: 14px;
        top: -22px;
  
    }      
    td:nth-child(5) {
      color: #888888;
      position: relative;
      left: -65px;
      top: -22px;
    }      
  
    tr:  nth-child(6)
    td:nth-child(3) {
      font-size: 12px;        
      text-align: left;
      color:#888888
    }
    tr:  nth-child(6)      td:nth-child(4) {
      font-size: 12px; 
      text-align: right;
      color:#888888
    }
  
    tr:  nth-child(2)
    td:nth-child(1) {
      font-size: 12px;        
      vertical-align: top;
      color:#888888
    }
    tr:  nth-child(5)
    td:nth-child(1) {
      font-size: 12px;        
      vertical-align: bottom;
      color:#888888
    }      
  
  }
  
  `

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      color: 'rgba(255, 255, 255, 0.87)',
      top: '-10px',
      textAlign: 'center', // テキストを中央に配置する
      zIndex: '800'
    },
  }));