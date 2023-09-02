import { useState } from 'react';
import styled from "styled-components";
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

import { relationLabels } from "../constants/relationLabels.js";
import { typeLabels } from "../constants/typeLabels.js";
import { CenterSelectIcon, ModeSelectIcon, ResetIcon, LabelIcon, HelpIcon, CubeIcon, OctagonIcon } from '../assets/Icons.js';


const ControlPane = (props) => {

    return (
        !props.isInitialModalOpen && (
            <StyledControlPane >

                <Tooltip placement="right"
                    title={'変形'}
                    arrow>
                    <div className='controlItemWrapper'>
                        <div className='controlIconWrapper'>
                            {
                                (props.shape === "SPHERE" && <CubeIcon />)
                                || (props.shape === "RING" && <OctagonIcon />)
                            }
                        </div>
                        <StyledButton onClick={props.onDeform}>
                            Deform
                        </StyledButton>
                    </div>
                </Tooltip>

                <Tooltip placement="right"
                    title={'中央のタイプを選択'}
                    arrow>
                    <div className='controlItemWrapper' >
                        <div className='controlIconWrapper'>
                            <CenterSelectIcon className="controlPanelIcon"></CenterSelectIcon>
                        </div>
                        <CenterSelect
                            center={props.center}
                            defaultValue=""
                            onChange={props.handleCenterSelectChange}
                        />
                    </div>
                </Tooltip>

                <Tooltip placement="right"
                    title={'関係の種類を選択'}
                    arrow>
                    <div className='controlItemWrapper' >
                        <div className='controlIconWrapper' >
                            <ModeSelectIcon></ModeSelectIcon>
                        </div>
                        <ModeSelect
                            onChange={props.handleModeChange}
                            center={props.center}
                            relationCenter={props.relationCenter}
                        />
                    </div>
                </Tooltip>

                <Tooltip placement="right" title={'ボールのラベルを選択'} arrow>
                    <div className='controlItemWrapper' >
                        <div className='controlIconWrapper' >
                            <LabelIcon></LabelIcon>
                        </div>
                        <LabelSelect
                            label={props.label}
                            onChange={props.handleLabelChange}
                        />
                    </div>
                </Tooltip>

                <Tooltip placement="right" title={'リセット'} arrow>
                    <div className='controlItemWrapper'>
                        <div className='controlIconWrapper'>
                            <ResetIcon />
                        </div>
                        <StyledButton onClick={props.openModal}>
                            Reset
                        </StyledButton>
                    </div>
                </Tooltip>

                <Help />

            </StyledControlPane>
        ))
}
export { ControlPane };

const Help = (props) => {
    const [hovered, setHovered] = useState(false)
    const handleHover = (hovered, event) => {
        setHovered(hovered)
    }
    return (
        <div className='controlItemWrapper helpButtonWrapper'
            onMouseEnter={(event) => handleHover(true, event)}
            onMouseLeave={(event) => handleHover(false, event)}
        >
            <div className='controlIconWrapper'
            >
                <HelpIcon />
            </div>
            <StyledButton>Help</StyledButton>
            {hovered && <HelpBubble {...props} />}
        </div>
    )
}

function CenterSelect(props) {
    const types = Object.keys(typeLabels); //選択肢用のtypes配列
    return (
        <StyledSelect value={props.center} onChange={props.onChange}>

            {types.map((type) => (
                <option key={type} value={type}> {type} </option>
            ))}
        </StyledSelect>
    );
}

function ModeSelect(props) {
    const [mode, setMode] = useState(props.mode)

    const handleModeChange = (event) => {
        // const value = event.target.value === 'CENTER' ? 'RELATIONCENTER' : event.target.value;
        const value = event.target.value;
        setMode(value)
        props.onChange(event, value);
    };

    const relationModes = Object.keys(relationLabels).filter(mode => mode !== 'IDENTITY'); //選択肢用のmodes配列
    return (
        <StyledSelect onChange={handleModeChange} value={mode}>
            {props.center !== props.relationCenter && 
                <option value='RELATIONCENTER' selected>{props.relationCenter}との関係</option>
            }
            <option value='CENTER'>{props.center}との関係</option>
            {relationModes.map((mode) => (
                <option key={mode} value={mode}> {relationLabels[mode]['label']}の関係 </option>
            ))}

        </StyledSelect>
    );
}

function LabelSelect(props) {
    const [, setLabel] = useState(props.label)
    const handleLabelChange = (event) => {
        setLabel(event.target.value)
        props.onChange(event, event.target.value);
    };
    return (
        <div className='smallText'>
        <StyledSelect onChange={handleLabelChange} label={'MBTI_4'}>
                    
            <option value='MBTI_4'>４文字(MBTI)</option>
            <option value='SOCI_3' className='smallText'>３文字(socionics) </option>
            <option value='FUNC'>第1 / 第2機能</option>
            
        </StyledSelect>
        </div>
    );
}

const HelpBubble = () => {
    return (
        <StyledHelpBubble>
                <Link to="/16types/pages/typology" target="_blank" rel="noopener noreferrer">タイプ論とは？</Link><br />
                <Link to="/16types/pages/function" target="_blank" rel="noopener noreferrer">心理機能について</Link><br />
                <Link to="/16types/pages/type-label" target="_blank" rel="noopener noreferrer">タイプ名の表記</Link><br />
        </StyledHelpBubble>)
}

const StyledControlPane = styled.div`

    display: flex;
    flex-direction: column;
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: white;
    border-radius: 12px;
    opacity: 0.7;
    z-index: 300;

    .controlItemWrapper{
        display: flex;
        flex-direction: row;
        text-align: left;
    }
    .helpButtonWrapper{
        position:relative;
    }
    .controlIconWrapper{
        margin-top:4px;
        margin-left:4px;
    }
`;

const StyledSelect = styled.select`
    width:140px;
    height:28px;
    color: #0175FF;
    background-color: transparent;
    text-align:left;
    font-weight:bold;
    font-size:14px;
    border: none;
    margin-left: 4px;
    margin-top:2px;

    cursor: pointer;
`;

const StyledButton = styled.button`
    width:170px;
    height:28px;
    background-color: transparent;
    color: #0175FF;
    text-align:left;
    font-size:14px;
    font-weight:bold;
    
    border: none;
    margin-top: 4px;
    margin-left:-30px;
    padding-left: 37px;

    cursor: pointer;
`;

const StyledHelpBubble = styled.div`
    position:absolute;
    top:20px;
    left:80px;
    width: 120px;
    text-align:left;

    background: white;
    color: #0175FF;
    font-size: 12px;
    line-height:14px;

    border: solid 1px #0175FF;
    border-radius: 0px 16px 16px 16px;
    padding: 4px 4px 8px 8px;
    z-index:350;

`;