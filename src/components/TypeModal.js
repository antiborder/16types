// import '../App.css';
import styled from 'styled-components';
import { typeLabels } from "../typeLabels.js";
import { symbols } from "../symbols.js"
import { getTextColor, getBackgroundColor } from '../colorFunctions.js';
import { } from '../colorFunctions.js';
import { getFuncTextColor, getFuncBackgroundColor } from '../colorFunctions.js';
import { cognitiveFunctionLabels } from '../cognitiveFunctionLabels.js';

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

const StyledTypeModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255); 
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size:12px;
  // padding: 20px 4px 20px 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  max-width: 320px;
  width: 100%;
  padding:0px;
  

  .modal-content{
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    height:500px;
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

    }
    .three-chars{
        margin: 0px 40px 24px 0px;
        padding:0;
        text-align: right;
        line-height:0;
        color:#888888
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
    hr{
      width:80%;
      border-color: #FFFFFF;
    }
    .symbols{
      margin:0 auto;
      width:160px;
      border-radius: 20px;

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
        left: -60px;
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

        <div className="label2">{typeLabels[props.type]['label2']}</div><br></br>
        <div className="label3">{typeLabels[props.type]['label3']}</div><br></br>

        <hr></hr>
        <div className="symbols" style={{ color: getTextColor(props.type), backgroundColor: getBackgroundColor(props.type) }}>
          <span className='symbol'>{props.type.charAt(0)}</span>&nbsp; : &nbsp;<span className='symbol-label'> {symbols[props.type.charAt(0)]['label']}</span><br></br>
          <span className='symbol'>{props.type.charAt(1)}</span>&nbsp; : &nbsp;<span className='symbol-label'> {symbols[props.type.charAt(1)]['label']}</span><br></br>
          <span className='symbol'>{props.type.charAt(2)}</span> &nbsp;: &nbsp;<span className='symbol-label'> {symbols[props.type.charAt(2)]['label']}</span><br></br>
          <span className='symbol'>{props.type.charAt(3)}</span> &nbsp;: &nbsp;<span className='symbol-label'> {symbols[props.type.charAt(3)]['label']}</span><br></br>
        </div>
        <hr></hr>
        {/* <p className="description"></p>
        <hr></hr> */}

        <p>＜{props.type}の心理機能＞</p>

        <div style={{ color: getFuncTextColor(typeLabels[props.type]['func1']) }}>第一機能　{typeLabels[props.type]['func1']}：{cognitiveFunctionLabels[typeLabels[props.type]['func1']]['label']}</div>
        <div style={{ color: getFuncTextColor(typeLabels[props.type]['func2']) }}>第二機能　{typeLabels[props.type]['func2']}：{cognitiveFunctionLabels[typeLabels[props.type]['func2']]['label']}</div>

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
                <td style={{ color: getFuncTextColor(typeLabels[props.type]['func1']), backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func1']) }}>{typeLabels[props.type]['func1']}</td>
                <td style={{ color: getFuncTextColor(typeLabels[props.type]['func8']), backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func8']) }}>{typeLabels[props.type]['func8']}</td>
                <td>8</td>
              </tr>
              <tr>
                <td></td>
                <td >2</td>
                <td style={{ color: getFuncTextColor(typeLabels[props.type]['func2']), backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func2']) }}>{typeLabels[props.type]['func2']}</td>
                <td style={{ color: getFuncTextColor(typeLabels[props.type]['func7']), backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func7']) }}>{typeLabels[props.type]['func7']}</td>
                <td>7</td>
              </tr>
              <tr>
                <td></td>
                <td>3</td>
                <td style={{ color: getFuncTextColor(typeLabels[props.type]['func3']), backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func3']) }}>{typeLabels[props.type]['func3']}</td>
                <td style={{ color: getFuncTextColor(typeLabels[props.type]['func6']), backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func6']) }}>{typeLabels[props.type]['func6']}</td>
                <td>6</td>
              </tr>
              <tr>
                <td>　　▼<br />苦手▼</td>
                <td>4</td>
                <td style={{ color: getFuncTextColor(typeLabels[props.type]['func4']), backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func4']) }}>{typeLabels[props.type]['func4']}</td>
                <td style={{ color: getFuncTextColor(typeLabels[props.type]['func5']), backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func5']) }}>{typeLabels[props.type]['func5']}</td>
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

export { TypeModal };