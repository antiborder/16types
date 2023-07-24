// import '../App.css';

import { Canvas } from "@react-three/fiber"
import { useState, useCallback } from 'react';
import { OrbitControls } from '@react-three/drei'

import { InitialModal } from '../components/InitialModal.js';
import { TypeModal } from '../components/TypeModal.js';
import { RelationModal } from '../components/RelationModal.js';
import { Tetra } from '../components/Tetra.js';
import styled from "styled-components";
import { relationLabels } from "../relationLabels.js";
import { typeLabels } from "../typeLabels.js";

// typeの詳細。心理機能にホバーした時説明が出る。▼ではなくアイコンを使う
// 二つの心理機能表の間に矢印を。心理機能の表に数字を入れる。
// initialModalをマウスオーバーした時に、選択肢の説明が出る。ラベルが出るのは、1クリックした後。
// ランキングや分類のデザインも決めておく。⇨表示、関係、中央、リセット
// Nodeをダブルクリックで中央に。
// type名を黒とグレイで色分け。中央はフォントを大きめに。
// ズーム機能の制限。並行移動の無効化。
// タイプの表記（4文字と3文字）
// 表示を切り替え。分類、ランキングなど、主機能、大分類など。
// 性格分析について（ユング心理学、MBTI、ソシオニクス）
// 心理機能について
// 相性の考え方
//　外国語対応
// Relationの移動を連続アニメーション。球の直径の変更もアニメーション。
// Restartボタンで Mode SelectがRELATIONになるべき。
// modal外をクリックしたら閉じる処理はgithub pagesではうまくいかないので諦め。
// sourcemap対応
// 円環の配置も追加。

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
  const types = Object.keys(typeLabels); //選択肢用のtypes配列
  return (
    <StyledCenterSelect value={props.center} onChange={props.onChange}>

      {types.map((type) => (
        <option key={type} value={type}> {type} </option>
      ))}
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

  const relationModes = Object.keys(relationLabels).filter(mode => mode !== 'IDENTITY'); //選択肢用のmodes配列
  return (
    <StyledModeSelect onChange={handleModeChange} value={mode}>
      <option value='RELATION'>--</option>
      <option value='CENTER'>{props.center}との関係</option>
      {relationModes.map((mode) => (
        <option key={mode} value={mode}> {mode} </option>
      ))}

    </StyledModeSelect>
  );
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
  const [isInitialModalOpen, setisInitialModalOpen] = useState(true);
  const [typeModalState, setTypeModalState] = useState("NONE")
  const [relationModalState, setRelationModalState] = useState("NONE")

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
  }, [setisInitialModalOpen, setMode]);

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
          handleCenterChange={handleModalCenterChange} />
      }
      {typeModalState!=='NONE' &&      
        <TypeModal
          type={typeModalState}
          onSelect={handleTypeModalSelect}
          />
      }
      {relationModalState!=='NONE' &&      
        <RelationModal
          relation={relationModalState}
          onSelect={handleRelationModalSelect}
          type1={relationModalState.substring(0,4)}
          type2={relationModalState.substring(5,9)}
          />
      }
      <StyledCanvasContainer>
        <Canvas camera={{ position: [0, 0, 20] }}>
          <Tetra
            center={center}
            mode={mode}
            relationCenter={relationCenter}
            isInitialModalOpen={isInitialModalOpen}
            typeModalState={typeModalState}
            setTypeModalState={setTypeModalState}
            relationModalState={relationModalState}
            setRelationModalState={setRelationModalState}
            scale={[2.7,2.7,2.7]}
          />
          <ambientLight intensity={0.6} />
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

