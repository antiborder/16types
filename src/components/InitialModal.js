// import '../App.css';
import { useState } from 'react';
import styled from 'styled-components';
import {symbols} from "../symbols.js"

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

const StyledStartButton = styled.button`
// position: absolute;
width: 50px;
height: 30px;
bottom: 10px;
margin: 0 auto;
background-color: #0575FF;
border-radius: 10px;
border: none;
outline: none;
font-size: 16px;
color: white;
text-align: center;
`;

const StyledSliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 5px;

  .label-on{
    font-size:20px;
    color: black;
  }
  .label-off{
    font-size:20px;
    color: gray;
  }
`;

function SliderContainer(props) {
  const [value,setValue]=useState(props.value)

  const handleChange=(event)=>{
    if(value===100){
      setValue(0);
    }else{
      setValue(100);
    }
    props.onChange(event)
  }

  return (
    <StyledSliderContainer>
      <div >{props.symbol1}</div>:&nbsp;&nbsp;
       <div
        style={{color: value===0 ? 'black':'rgb(190,190,190)'}} className='label-on' >{symbols[props.symbol1]['label']}
      </div>
      <input type="range" min="0" max="100" step="100" value={props.value} onChange={handleChange} />
      <div
        className='label-off' style={{color: value===100 ? 'black':'rgb(190,190,190)'}}>{symbols[props.symbol2]['label']}
       </div>&nbsp;&nbsp;:
      <div >{props.symbol2}</div>
    </StyledSliderContainer>
  );
}

const StyledInitialModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.7); 
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size:12px;
  padding: 20px 4px 20px 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  max-width: 320px;
  width: 100%;
  text-align: center;
    p{
      margin-bottom: 10px;
    }
    select {
      margin-bottom: 20px;
    }
    button:hover {
      background-color: #0069d9;
    }
`;

const StyledSelectedValues = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

function InitialModal(props) {
  const [EIValue, setEIValue] = useState(props.center[0] === 'E' ? 0 : 100);
  const [SNValue, setSNValue] = useState(props.center[1] === 'S' ? 0 : 100);
  const [FTValue, setFTValue] = useState(props.center[2] === 'F' ? 0 : 100);
  const [PJValue, setPJValue] = useState(props.center[3] === 'P' ? 0 : 100);

  const getCenter = () =>{
    return (EIValue < 50 ? 'E' : 'I') + (SNValue < 50 ? 'S' : 'N') + (FTValue < 50 ? 'F' : 'T') + (PJValue < 50 ? 'P' : 'J')
  }

  const [center, setCenter] = useState(getCenter());

  const handleEIChange = (event) => {
    setEIValue(event.target.value);
    let newCenter = (event.target.value < 50 ? 'E' : 'I') + getCenter().slice(1)
    setCenter(newCenter)
    props.handleCenterChange(newCenter)
  };

  const handleSNChange = (event) => {
    setSNValue(event.target.value);
    let newCenter = getCenter().slice(0,1) + (event.target.value < 50 ? 'S' : 'N') + getCenter().slice(2)
    setCenter(newCenter)
    props.handleCenterChange(newCenter)
  };

  const handleFTChange = (event) => {
    setFTValue(event.target.value);
    let newCenter = getCenter().slice(0,2) + (event.target.value < 50 ? 'F' : 'T') + getCenter().slice(3)
    setCenter(newCenter)
    props.handleCenterChange(newCenter)
  };

  const handlePJChange = (event) => {
    setPJValue(event.target.value);
    let newCenter = getCenter().slice(0,3) + (event.target.value < 50 ? 'P' : 'J') + getCenter().slice(4)
    setCenter(newCenter)
    props.handleCenterChange(newCenter)
  };

  const handleSubmit = () => {
    props.onSelect();
  };

  const handleCenterChange = (event) => {
    props.handleCenterChange(center)
  }

  return (

    <StyledInitialModal 
      onClick={(event)=>{event.stopPropagation()}}
      >
      <label htmlFor="center-select">４つの観点から<br></br>あなたの性格を選んでください。</label><br></br><br></br>

      <SliderContainer symbol1="E" symbol2="I" value={EIValue} onChange={handleEIChange} />
      <SliderContainer symbol1="S" symbol2="N" value={SNValue} onChange={handleSNChange} />
      <SliderContainer symbol1="F" symbol2="T" value={FTValue} onChange={handleFTChange} />
      <SliderContainer symbol1="P" symbol2="J" value={PJValue} onChange={handlePJChange} />

      <StyledSelectedValues 
        onChange={handleCenterChange}
      >
        <p>{EIValue < 50 ? 'E' : 'I'}</p>
        <p>{SNValue < 50 ? 'S' : 'N'}</p>
        <p>{FTValue < 50 ? 'F' : 'T'}</p>
        <p>{PJValue < 50 ? 'P' : 'J'}</p>

      </StyledSelectedValues>

      <StyledCloseButton onClick={handleSubmit}>&times;</StyledCloseButton>
      <StyledStartButton onClick={handleSubmit}>Start</StyledStartButton>

    </StyledInitialModal>

  );
}

export { InitialModal };