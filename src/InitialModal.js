import './App.css';
import { useState } from 'react';
import styled from 'styled-components';

const StyledSliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 5px;
`;

function SliderContainer(props) {
  return (
    <StyledSliderContainer>
      <div >{props.label1}</div>
      <input type="range" min="0" max="100" step="100" value={props.value} onChange={props.onChange} />
      <div >{props.label2}</div>
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
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  max-width: 300px;
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
      <label htmlFor="center-select">Select a center:</label>

      <SliderContainer label1="E" label2="I" value={EIValue} onChange={handleEIChange} />
      <SliderContainer label1="S" label2="N" value={SNValue} onChange={handleSNChange} />
      <SliderContainer label1="F" label2="T" value={FTValue} onChange={handleFTChange} />
      <SliderContainer label1="P" label2="J" value={PJValue} onChange={handlePJChange} />

      <StyledSelectedValues 
        onChange={handleCenterChange}
      >
        <p>{EIValue < 50 ? 'E' : 'I'}</p>
        <p>{SNValue < 50 ? 'S' : 'N'}</p>
        <p>{FTValue < 50 ? 'F' : 'T'}</p>
        <p>{PJValue < 50 ? 'P' : 'J'}</p>

      </StyledSelectedValues>

      <button onClick={handleSubmit}>Submit</button>

    </StyledInitialModal>

  );
}

export { InitialModal };