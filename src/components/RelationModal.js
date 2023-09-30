import styled from 'styled-components';
import { typeLabels } from "../constants/typeLabels.js";
import { relations } from "../constants/relations.js"
import { relationLabels } from "../constants/relationLabels.js"
import { getBackgroundColor, getTextColor } from '../colorFunctions.js';
import RelationDescription from './RelationDescription';
import TwoFunctions from './TwoFunctions.js'


function RelationModal(props) {

  const getMode = (type1, type2) => {
    const relation = relations.find(rel => rel.type1 === type1 && rel.type2 === type2);
    return relation ? relation.mode : null;
  }

  let mode = getMode(props.type1, props.type2);

  const handleSubmit = () => {
    props.onSelect();
  };

  const handleSeeRelation = (mode) => {
    props.onSeeRelation(mode)
  }

  return (
    <StyledRelationModal
      onClick={(event) => { event.stopPropagation() }}
    >
      <div className='modal-content'>
        <div className='title'><span className='type' style={{ color: getTextColor(props.type1) }}>{props.type1}</span> &nbsp;と&nbsp;<span className='type' style={{ color: getTextColor(props.type2) }}>{props.type2}</span>:</div><br></br>
        <div className='relation'><span className='relation-label'>{relationLabels[mode]['label']}</span> の関係</div><br></br>
        <div className='compatibility'>相性：
          {Array.from({ length: relationLabels[mode]['compatibility'] }).map((_, index) => (
            <span className='light-star' key={index}>★</span>
          ))}
          {Array.from({ length: 5 - relationLabels[mode]['compatibility'] }).map((_, index) => (
            <span key={index} className='dark-star'>★</span>
          ))}
        </div>
        <div>
          <span className="seeRelation" onClick={() => handleSeeRelation(mode)}>
            {relationLabels[mode]['label']}の関係を見る
          </span>
        </div>
        <hr></hr>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div className='label-box' style={{ width: "50%", color: getTextColor(props.type1), border: `0.5px solid ${getTextColor(props.type1)}` }}>
            <div className='row-type' style={{ background: getBackgroundColor(props.type1) }}>{props.type1}</div>
            <div className='row-label1'>{typeLabels[props.type1]['label1']}</div>
            {/* <div className='row-label2'>{typeLabels[props.type1]['label2']}</div> */}
          </div>
          <div className='label-box' style={{ width: "50%", color: getTextColor(props.type2), border: `0.5px solid ${getTextColor(props.type2)}` }}>
            <div className='row-type' style={{ background: getBackgroundColor(props.type2) }}>{props.type2}</div>
            <div className='row-label1'>{typeLabels[props.type2]['label1']}</div>
            {/* <div className='row-label2'>{typeLabels[props.type2]['label2']}</div> */}
          </div>
        </div>

        <TwoFunctions
          type1={props.type1}
          type2={props.type2}
          mode={mode}
        />
        <StyledCloseButton onClick={handleSubmit}>&times;</StyledCloseButton>
        <hr></hr>
        ＜解説＞
        <RelationDescription
          type1={props.type1}
          type2={props.type2}
          mode={mode}
        />
      </div>
    </StyledRelationModal>
  );
}
export { RelationModal };

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

const StyledRelationModal = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: rgba(255, 255, 255);
border: 1px solid #ccc;
border-radius: 10px;
font-size:12px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
z-index: 9999;
max-width: 320px;
width: 100%;
padding:0px 8px 0px 8px;

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

  .title{
    margin-top:30px;
    margin-bottom: 5px;
  }

  text-align: center;
  .type{
    margin:0px;
    padding:0px;
    font-size:24px;
    line-height:0;
    font-family: Arial, sans-serif;
  }

  .relation-label{
    font-size:20px;
  }
.compatibility{
  margin-bottom: 4px;
  .light-star{
    color: #DB9;
    font-size:20px
  }
  .dark-star{
    color: #DDD;
    font-size:20px
  }
}
  .seeRelation{
    display:block;
    color:#0000FF;
    cursor: pointer;
    text-decoration: underline;
    margin-bottom:16px;
  }
  hr{
    width:80%;
  }

  .label-box{
    margin: 8px 8px 24px 8px;
    padding:2px 2px 4px 2px;
    border-radius: 8px;



    .row-type{
      border-radius: 4px;
      margin: 4px;
      font-size:16px;
      font-family: Arial, sans-serif;
    }
    .row-label1{
      font-size:12px;
    }
  }

  button:hover {
    background-color: #0069d9;
  }

`;
