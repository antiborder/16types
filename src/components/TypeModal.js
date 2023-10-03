import styled from 'styled-components';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { typeLabels } from "../constants/typeLabels.js";
import { symbols } from "../constants/symbols.js"
import { getTextColor, getBackgroundColor } from '../colorFunctions.js';
import { getFuncTextColor, getFuncBackgroundColor } from '../colorFunctions.js';
import { cognitiveFunctionLabels } from '../constants/cognitiveFunctionLabels.js';

function TypeModal(props) {

  const handleSubmit = () => {
    props.onSelect();
  };

  return (

    <StyledTypeModal
      onClick={(event) => { event.stopPropagation() }}
    >
      <div className='modal-content'>
        <div className='title' style={{ color: getTextColor(props.type) }}><span className='type'>{props.type}</span> 型</div><br></br>

        <div className='three-chars'>３文字表記：{typeLabels[props.type]['3chars']} 型</div><br></br>

        <div className="label1">{typeLabels[props.type]['label1']}</div><br></br>
        <div style={{ textAlign: 'left', marginLeft:'100px' }}>
          <div className="label2">・{typeLabels[props.type]['label2']}</div><br></br>
          <div className="label3">・{typeLabels[props.type]['label3']}</div><br></br>
        </div>

        <div className="symbols" style={{ color: getTextColor(props.type), backgroundColor: getBackgroundColor(props.type) }}>
          <span className='symbol'>{props.type.charAt(0)}</span>&nbsp; : &nbsp;<span className='symbol-label'> {symbols[props.type.charAt(0)]['label']}</span><br></br>
          <span className='symbol'>{props.type.charAt(1)}</span>&nbsp; : &nbsp;<span className='symbol-label'> {symbols[props.type.charAt(1)]['label']}</span><br></br>
          <span className='symbol'>{props.type.charAt(2)}</span> &nbsp;: &nbsp;<span className='symbol-label'> {symbols[props.type.charAt(2)]['label']}</span><br></br>
          <span className='symbol'>{props.type.charAt(3)}</span> &nbsp;: &nbsp;<span className='symbol-label'> {symbols[props.type.charAt(3)]['label']}</span><br></br>
        </div>
        <hr />
        {/* <p className="description"></p>
        <hr></hr> */}

        <p style={{ marginBottom: '-6px' }}>＜{props.type}の心理機能＞</p>
        <div style={{ textAlign: 'right', paddingBottom: '12px' }}>
          <Link style={{ margin: '0px 24px 0px auto' }} to="/16types/pages/function" target="_blank" rel="noopener noreferrer">心理機能とは？</Link>
        </div>
        <div className="functionDetailWrapper">
          <div style={{ width: '50%' }}>
            <div className="functionDetailSquare" style={{ backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func1']), color: getFuncTextColor(typeLabels[props.type]['func1']) }}>
              <big>
                第一機能<br />
                {typeLabels[props.type]['func1']}：{cognitiveFunctionLabels[typeLabels[props.type]['func1']]['label']}
              </big>
            </div>
            <div style={{ width: '80%', margin: 'auto' }}>
              {cognitiveFunctionLabels[typeLabels[props.type]['func1']]['phrase']}
            </div>
          </div>
          <div style={{ width: '50%' }}>
            <div className="functionDetailSquare" style={{ backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func2']), color: getFuncTextColor(typeLabels[props.type]['func2']) }}>
              <big>
                第二機能<br />
                {typeLabels[props.type]['func2']}：{cognitiveFunctionLabels[typeLabels[props.type]['func2']]['label']}
              </big>
            </div>
            <div style={{ width: '80%', margin: 'auto' }}>
              {cognitiveFunctionLabels[typeLabels[props.type]['func2']]['phrase']}
            </div>
          </div>
        </div>
        <hr />
        <div >
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
          {/* <hr></hr>
        他のタイプとの相性 */}

        </div>
        <StyledCloseButton onClick={handleSubmit}>&times;</StyledCloseButton>
      </div>
    </StyledTypeModal>
  );
}

const StyledTypeModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255); 
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size:12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 800;
  max-width: 320px;
  width: 100%;
  padding:0px;
  

  .modal-content{
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    height:600px;
    width:100%;
    margin:0px;
    padding: 0px;
  }
  .modal-content::-webkit-scrollbar{
    display: none;
  }
  text-align: center;
    .title{
      margin-top:30px;
      margin-bottom: 5px;
      padding:0px; 
      font-size:24px;
      line-height:0;
      font-family: Arial, sans-serif;

    }
    .three-chars{
        margin: 4px 40px 10px 0px;
        padding:0;
        text-align: right;
        line-height:0;
        color:#888888
    }
    .label1{
      font-size: 24px;
      font-family: "mochy","Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro", Arial, sans-serif;
    }
    .label2, .label3 {
      font-size: 12px;
      margin-top:-8px;
      padding:0;
      line-height:12px;
      font-family: "mochy","Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro", Arial, sans-serif;
    }
    hr{
      width:80%;
      border-color: #FFFFFF;
    }
    .symbols{
      margin:0px auto 12px;
      width:160px;
      border-radius: 20px;
      font-family: Arial, sans-serif;

      .symbol{
        font-size:24px
      }
      .symbol-label{
        front-size:24px
      }
      
    }

    .functionDetailWrapper{
      display: flex;
      margin:8px 10px 16px 10px;

      .functionDetailSquare{
        border-radius: 10px;
        border-width: 1px;
        text-align:center;
        margin-left:10px;
        margin-right:10px;
        margin-bottom:8px;
        padding:8px 0;
      }
    }

    button:hover {
      background-color: #0069d9;
    }
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

`;

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



export { TypeModal };