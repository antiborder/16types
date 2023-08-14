import { useState } from 'react';
import styled from "styled-components";
import Tooltip from '@mui/material/Tooltip';

import { relationLabels } from "../constants/relationLabels.js";
import { typeLabels } from "../constants/typeLabels.js";
import { CenterSelectIcon, ModeSelectIcon, ResetIcon, LabelIcon,HelpIcon } from '../assets/Icons.js';


const ControlPane = (props) => {

    return (
        !props.isInitialModalOpen && (
            <StyledControlPane >
                <Tooltip placement="right"
                    title={
                        '中央のタイプを選択'
                    }
                    arrow
                >
                    <div className='controlItemWrapper' >
                        <div className='controlIconWrapper'>
                            <CenterSelectIcon className="controlPanelIcon"></CenterSelectIcon>
                        </div>
                        &nbsp;
                        <CenterSelect
                            center={props.center}
                            defaultValue=""
                            onChange={props.handleCenterSelectChange}
                        />
                    </div>
                </Tooltip>

                <Tooltip placement="right"
                    title={
                        '関係の種類を選択'
                    }
                    arrow
                >
                    <div className='controlItemWrapper' >
                        <div className='controlIconWrapper' >
                            <ModeSelectIcon></ModeSelectIcon>
                        </div>
                        {/* &nbsp; */}
                        <ModeSelect
                            center={props.center}
                            onChange={props.handleModeChange}
                        />
                    </div>
                </Tooltip>
                <Tooltip placement="right"
                    title={
                        'ボールのラベルを選択'
                    }
                    arrow
                >
                    <div className='controlItemWrapper' >
                        <div className='controlIconWrapper' >
                            <LabelIcon></LabelIcon>
                        </div>
                        {/* &nbsp; */}
                        <LabelSelect
                            label={props.label}
                            onChange={props.handleLabelChange}
                        />
                    </div>
                </Tooltip>

                <Tooltip placement="right"
                    title={'リセット'}
                    arrow>
                    <div className='controlItemWrapper'>
                        <div className='controlIconWrapper'>
                            <ResetIcon />
                        </div>
                        <ResetButton onClick={props.openModal} />
                    </div>
                </Tooltip>
                <Tooltip placement="right"
                    title={'ヘルプ'}
                    arrow>
                    <div className='controlItemWrapper'>
                        <div className='controlIconWrapper'>
                            <HelpIcon />
                        </div>
                        <HelpButton onClick={props.openModal} />
                    </div>
                </Tooltip>
            </StyledControlPane>
        ))
}
export { ControlPane };

const StyledControlPane = styled.div`

  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: white;
  border-radius: 12px;
  opacity: 0.8;
  
  .controlItemWrapper{
    top: 8px;
    display: flex;
    flex-direction: row;
    text-align: left;
  }
  .controlIconWrapper{
    margin-top: 4px;
    margin-left:4px;
  }
`;

function CenterSelect(props) {
    const types = Object.keys(typeLabels); //選択肢用のtypes配列
    return (
        <StyledCenterSelect value={props.center} onChange={props.onChange}>

            {types.map((type) => (
                <option key={type} value={type}> {type} </option>
            ))}
        </StyledCenterSelect>
    );
}

const StyledCenterSelect = styled.select`
  width:140px;
  height:28px;
  color: #0175FF;
  background-color: transparent;
  border:none;
  font-size:16px;
  font-weight:bold;
  text-align:left;
  margin-top:2px;
  cursor: pointer;
`;

function ModeSelect(props) {
    const [mode, setMode] = useState(props.mode)

    const handleModeChange = (event) => {
        const value = event.target.value === 'CENTER' ? 'RELATION' : event.target.value;
        setMode(value)
        props.onChange(event, value);
    };

    const relationModes = Object.keys(relationLabels).filter(mode => mode !== 'IDENTITY'); //選択肢用のmodes配列
    return (
        <StyledModeSelect onChange={handleModeChange} value={mode}>
            <option value='RELATION'>--------------</option>
            <option value='CENTER'>{props.center}との関係</option>
            {relationModes.map((mode) => (
                <option key={mode} value={mode}> {relationLabels[mode]['label']}の関係 </option>
            ))}

        </StyledModeSelect>
    );
}

const StyledModeSelect = styled.select`
  width:140px;
  height:28px;
  text-align: center;
  color: #0175FF;
  font-size:16px;
  border: none;
  background-color: transparent;
  text-align:left;
  font-weight:bold;
  margin-left: 4px;
  margin-top:2px;
  cursor: pointer;
`;

function LabelSelect(props) {
    const [label, setLabel] = useState(props.label)
    const handleLabelChange = (event) => {
        setLabel(event.target.value)
        props.onChange(event, event.target.value);
    };
    return (
        <StyledLabelSelect onChange={handleLabelChange} label={'MBTI_4'}>
            <option value='MBTI_4'>4文字(MBTI)</option>
            <option value='SOCI_3'>3文字(Socionics)</option>
            <option value='FUNC'>第1 / 第2機能</option>
        </StyledLabelSelect>
    );
}

const StyledLabelSelect = styled.select`
  width:140px;
  height:28px;
  text-align: center;
  color: #0175FF;
  font-size:16px;
  border: none;
  background-color: transparent;
  text-align:left;
  font-weight:bold;
  margin-left: 4px;
  margin-top:2px;
  cursor: pointer;
`;

function ResetButton(props) {
    return (
        <StyledResetButton onClick={props.onClick}>
            Reset
        </StyledResetButton>
    );
}

const StyledResetButton = styled.button`
  width:170px;
  height:28px;
  background-color: transparent;
  text-align: center;
  color: #0175FF;
  border: none;
  text-align:left;
  margin-top: 4px;
  margin-left:-30px;
  padding-left: 37px;
  font-weight:bold;
  cursor: pointer;
`;

function HelpButton(props) {
    return (
        <StyledResetButton onClick={props.onClick}>
            Help
        </StyledResetButton>
    );
}