// import '../App.css';

import { Canvas } from "@react-three/fiber"
import { useState, useEffect, useCallback } from 'react';
import { OrbitControls } from '@react-three/drei'

import { InitialModal } from '../components/InitialModal.js';
import { Tetra } from '../components/Tetra.js';
import styled from "styled-components";
// import Type from './types/type';
// import { Routes, Route } from 'react-router-dom';

//　吹き出しの文言
// タイプの詳細
// 相性の詳細
// イニじゃるモーダルのアルファベットに説明を記述
//　type名を黒とグレイで色分け
// ズーム機能の制限。並行移動の無効化。
// タイプの表記（4文字と3文字）
//　性格分析について（ユング心理学、MBTI、ソシオニクス）
// 心理機能について
// 相性の考え方
//　外国語対応
//　NodeのダブルクリックでCenterとModeが変わる
// Relationの移動を連続アニメーション
// Restartボタンで Mode SelectがRELATIONになるべき。
// modal外をクリックしたら閉じる処理はgithub pagesではうまくいかないので諦め。
// sourcemap対応

const StyledCenterSelect = styled.select`
  position: absolute;
  width:80px;
  height:20px;
  top: 0px;
  left: 0px;
  text-align: center;
  background-color: #fff;
`;

function CenterSelect(props) {
  return (
    <StyledCenterSelect value={props.center} onChange={props.onChange}>
      <option value="INTJ">INTJ</option>
      <option value="INTP">INTP</option>
      <option value="ENTJ">ENTJ</option>
      <option value="ENTP">ENTP</option>
      <option value="INFJ">INFJ</option>
      <option value="INFP">INFP</option>
      <option value="ENFJ">ENFJ</option>
      <option value="ENFP">ENFP</option>
      <option value="ISTJ">ISTJ</option>
      <option value="ISFJ">ISFJ</option>
      <option value="ESTJ">ESTJ</option>
      <option value="ESFJ">ESFJ</option>
      <option value="ISTP">ISTP</option>
      <option value="ISFP">ISFP</option>
      <option value="ESTP">ESTP</option>
      <option value="ESFP">ESFP</option>
    </StyledCenterSelect>
  );
}

const StyledModeSelect = styled.select`
  position: absolute;
  width:200px;
  height:20px;
  top: 0px;
  left: 80px;
  text-align: center;
`;

function ModeSelect(props) {
  const [mode, setMode] = useState(props.mode)

  const handleModeChange = (event) => {
    const value = event.target.value === 'CENTER' ? 'RELATION' : event.target.value;
    setMode(value)
    props.onChange(event, value);
  };
  return (
    <StyledModeSelect  onChange={handleModeChange} value={mode}>
      <option value='RELATION'>--</option>
      <option value='CENTER'>{props.center}との関係</option>
      <option value='DUALITY'>DUALITY</option>
      <option value="ACTIVATION">ACTIVATION</option>
      <option value="SEMI_DUALITY">SEMI_DUALITY</option>
      <option value="MIRAGE">MIRAGE</option>
      <option value="MIRROR">MIRROR</option>
      <option value="COOPERATION">COOPERATION</option>
      <option value="CONGENERITY">CONGENERITY</option>
      <option value="QUASI_IDENTITY">QUASI_IDENTITY</option>
      <option value="EXTINGUISHMENT">EXTINGUISHMENT</option>
      <option value="SUPER_EGO">SUPER_EGO</option>
      <option value="CONFLICT">CONFLICT</option>
      <option value="REQUEST_PLUS">REQUEST_PLUS</option>
      <option value="REQUEST_MINUS">REQUEST_MINUS</option>
      <option value="SUPERVISION_PLUS">SUPERVISION_PLUS</option>
      <option value="SUPERVISION_MINUS">SUPERVISION_MINUS</option>
    </StyledModeSelect>
  )
}

const StyledInitialModalButton = styled.button`
  position: absolute;
  width:100px;
  height:20px;
  top: 0px;
  left: 280px;
  text-align: center;
`;

function InitialModalButton (props) {
  return (
    <StyledInitialModalButton onClick={props.onClick}>
      Reset
    </StyledInitialModalButton>
  );
}

const StyledCanvasContainer = styled.div`
  height: 100%;
  width: 100%;
`;

function Home() {

  const InitialValue = () => {
    const options = [
      ['E', 'I'],
      ['S', 'N'],
      ['F', 'T'],
      ['P', 'J']
    ];

    let initialValue = "";
    for (let i = 0; i < options.length; i++) {
      const choice = options[i][Math.floor(Math.random() * 2)];
      initialValue += choice;
    }

    return initialValue;
  };
  const [center, setCenter] = useState(InitialValue);

  const [mode, setMode] = useState("RELATION");
  const [relationCenter, setRelationCenter] = useState(center)
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCenterSelectChange = (event) => {
    setCenter(event.target.value);

  };

  const handleModalCenterChange = (newValue) => {
    setCenter(newValue);
    setRelationCenter(newValue)
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
    if (event.target.value === 'RELATION') {
      setRelationCenter(center)
    }
    if (event.target.value === 'CENTER') {
      setRelationCenter(center)
      setMode('RELATION')
    }
  };


  const centralize = () => {
    const oldCenter = center
    setCenter(reverse(center));
    setTimeout(() => {
      setCenter(oldCenter);
    }, 250);
  }


  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    document.removeEventListener('click', closeModal)
  }, [])

  const handleModalSelect = () => {
    setIsModalOpen(false);
    centralize()
  };

  
  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setMode("RELATION");
  }, [setIsModalOpen, setMode]);

  //モーダル外をクリックしてもcloseする処理
  // useEffect(() => {
  //   return () => {
  //     document.addEventListener('click', closeModal)
  //   }
  // }, [closeModal])

  return (
    <>
      {isModalOpen &&
        <InitialModal
          onClick={(event) => { closeModal(event) }}
          onSelect={handleModalSelect}
          center={center}
          relationCenter={relationCenter}
          handleCenterChange={handleModalCenterChange} />
      }
      <StyledCanvasContainer>
        <Canvas camera={{ position: [0, 0, 7] }}>
          <Tetra
            center={center}
            mode={mode}
            relationCenter={relationCenter}
            isModalOpen={isModalOpen}
          />
          <ambientLight intensity={0.5} />
          {/* <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} /> */}
          <pointLight position={[100, 100, 100]} />
          <OrbitControls />
        </Canvas>
      </StyledCanvasContainer>
      <h6>16 types</h6>

      <CenterSelect
        center={center}
        defaultValue=""
        onChange={handleCenterSelectChange} />
      
      < ModeSelect
        center={center}
        onChange={handleModeChange} />
      <InitialModalButton onClick={openModal}>
        Restart
      </InitialModalButton>
    </>
    
  );
}

export default Home;

const reverse = (type) => {
  let reversedType = "";
  for (let i = 0; i < type.length; i++) {
    reversedType += type[i] === "I" ? "E" :
      type[i] === "E" ? "I" :
        type[i] === "N" ? "S" :
          type[i] === "S" ? "N" :
            type[i] === "T" ? "F" :
              type[i] === "F" ? "T" :
                type[i] === "J" ? "P" :
                  type[i] === "P" ? "J" :
                    type[i];
  }
  return reversedType;
};

