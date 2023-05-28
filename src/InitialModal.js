import './App.css';
import { useState } from 'react';

function SliderContainer(props) {
  return (
    <div className="slider-container">
      <div className="slider-label">{props.label1}</div>
      <input type="range" min="0" max="100" step="100" value={props.value} onChange={props.onChange} />
      <div className="slider-label">{props.label2}</div>
    </div>
  );
}

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

    <div className="modal"
      onClick={(event)=>{event.stopPropagation()}}
      >
      <label htmlFor="center-select">Select a center:</label>

      <SliderContainer label1="E" label2="I" value={EIValue} onChange={handleEIChange} />
      <SliderContainer label1="S" label2="N" value={SNValue} onChange={handleSNChange} />
      <SliderContainer label1="F" label2="T" value={FTValue} onChange={handleFTChange} />
      <SliderContainer label1="P" label2="J" value={PJValue} onChange={handlePJChange} />

      <div className="selected-values"
        onChange={handleCenterChange}
      >
        <p>{EIValue < 50 ? 'E' : 'I'}</p>
        <p>{SNValue < 50 ? 'S' : 'N'}</p>
        <p>{FTValue < 50 ? 'F' : 'T'}</p>
        <p>{PJValue < 50 ? 'P' : 'J'}</p>

      </div>

      <button onClick={handleSubmit}>Submit</button>

    </div>

  );
}

export { InitialModal };