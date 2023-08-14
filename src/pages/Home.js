import { Canvas } from "@react-three/fiber"
import { useState, useCallback } from 'react';
import { OrbitControls } from '@react-three/drei'
import styled from "styled-components";

import { InitialModal } from '../components/InitialModal.js';
import { TypeModal } from '../components/TypeModal.js';
import { RelationModal } from '../components/RelationModal.js';
import { Tetra } from '../components/Tetra.js';
import {ControlPane} from "../components/ControlPane.js"


// 相性の考え方
// 心理機能について
// modal外をクリックしたらmodalが閉じる処理
// helpページに飛べるように。

// フォント
// relationModal ２D表示と色を合わせたい。 ズーム機能の制御 3Dの背景はグレイ
// ズーム機能の制限。並行移動の無効化。

// ControlPaneのラベル切り替えで 分類、ランキングなど、など。
//　外国語対応
// Relationの移動を連続アニメーション。球の直径の変更もアニメーション。
// typeModal typeの詳細。▼ではなくアイコンを使う
// sourcemap対応
// 円環の配置も追加。
// タイプの表記（4文字と3文字）3文字表記もタイプによって透過を。


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

  const [isInitialModalClicked, setIsInitialModalClicked] = useState(false)

  const [center, setCenter] = useState(InitialValue);

  const [mode, setMode] = useState("RELATION");
  const [relationCenter, setRelationCenter] = useState(center)
  const [label , setLabel] =useState("MBTI_4")
  const [isInitialModalOpen, setisInitialModalOpen] = useState(true);
  const [typeModalState, setTypeModalState] = useState("NONE")
  const [relationModalState, setRelationModalState] = useState("NONE")

  const handleCenterSelectChange = (event) => {
    setCenter(event.target.value);

  };

  const handleModalCenterChange = (newValue) => {
    setCenter(newValue);
    setRelationCenter(newValue)
    setIsInitialModalClicked(true)
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

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const centralize = () => {
    const oldCenter = center
    setCenter(reverse(center));
    setTimeout(() => {
      setCenter(oldCenter);
    }, 180);
  }


  const closeModal = useCallback(() => {
    setisInitialModalOpen(false)
    document.removeEventListener('click', closeModal)
  }, [])

  const handleInitialModalSelect = () => {
    setisInitialModalOpen(false);
    centralize()
  };

  const handleTypeModalSelect = () => {
    setTypeModalState('NONE');
  };
  const handleRelationModalSelect = () => {
    setRelationModalState('NONE');
  };


  const openModal = useCallback(() => {
    setisInitialModalOpen(true);
    setTypeModalState('NONE');
    setRelationModalState('NONE');
    setMode("RELATION");
    setIsInitialModalClicked(false);
  }, [setisInitialModalOpen, setMode]);

  const handleNodeDoubleCLick=(type)=>{
    setCenter(type)
    setRelationCenter(type)
    // setMode("CENTER")

  }

  //モーダル外をクリックしてもcloseする処理
  // useEffect(() => {
  //   return () => {
  //     document.addEventListener('click', closeModal)
  //   }
  // }, [closeModal])

  return (
    <>
      {isInitialModalOpen &&
        <InitialModal
          onClick={(event) => { closeModal(event) }}
          onSelect={handleInitialModalSelect}
          center={center}
          relationCenter={relationCenter}
          handleCenterChange={handleModalCenterChange}
          isClicked={isInitialModalClicked}
        />
      }
      {typeModalState !== 'NONE' &&
        <TypeModal
          type={typeModalState}
          onSelect={handleTypeModalSelect}
        />
      }
      {relationModalState !== 'NONE' &&
        <RelationModal
          relation={relationModalState}
          onSelect={handleRelationModalSelect}
          type1={relationModalState.substring(0, 4)}
          type2={relationModalState.substring(5, 9)}
        />
      }
      <StyledCanvasContainer>
        <Canvas camera={{ position: [0, 0, 20] }}>
          <Tetra
            center={center}
            setCenter={setCenter}
            mode={mode}
            label = {label}
            onNodeDoubleClick={handleNodeDoubleCLick}
            setMode={setMode}
            relationCenter={relationCenter}
            setRelationCenter={setRelationCenter}
            isInitialModalOpen={isInitialModalOpen}
            typeModalState={typeModalState}
            setTypeModalState={setTypeModalState}
            relationModalState={relationModalState}
            setRelationModalState={setRelationModalState}
            scale={[2.7, 2.7, 2.7]}
          />
          <ambientLight intensity={0.6} />
          <pointLight position={[100, 100, 100]} />
          <OrbitControls />
        </Canvas>
      </StyledCanvasContainer>

      <div className='logo'>
        {/* 16 types */}
      </div>
      <ControlPane
        center={center}
        handleCenterSelectChange={handleCenterSelectChange}
        mode = {mode}
        handleModeChange={handleModeChange}
        label = {label}
        handleLabelChange={handleLabelChange}
        openModal={openModal}
        isInitialModalOpen = {isInitialModalOpen}
      />
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

const StyledCanvasContainer = styled.div`
  height: 100%;
  width: 100%;
`;