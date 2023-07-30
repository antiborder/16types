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
import { CenterSelectIcon, ModeSelectIcon, ResetIcon } from '../Icons.js';
import Tooltip from '@mui/material/Tooltip';


// typeModal typeの詳細。▼ではなくアイコンを使う
// Nodeをダブルクリックで中央に。
// 　バブル上ホバーで点滅するバグを修正
// type名を黒とグレイで色分け。中央はフォントを大きめに。
// RelationModal ２D表示と色を合わせたい。 ズーム機能の制御
// ズーム機能の制限。並行移動の無効化。
// タイプの表記（4文字と3文字）
// ControlPane 表示の列を追加。表示を切り替え。分類、ランキングなど、主機能、大分類など。
// 性格分析について（ユング心理学、MBTI、ソシオニクス）
// 心理機能について
// 相性の考え方
// modal外をクリックしたらmodalが閉じる処理
//　外国語対応
// Relationの移動を連続アニメーション。球の直径の変更もアニメーション。
// Restartボタンで Mode SelectがRELATIONになるべき。
// sourcemap対応
// 円環の配置も追加。

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
`;

function ResetButton(props) {
  return (
    <StyledResetButton onClick={props.onClick}>
      Reset
    </StyledResetButton>
  );
}

const StyledCanvasContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const ControlPane = (props) => {

  return (
    !props.isInitialModalOpen &&(
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
      <div>
      </div>
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
          'リセット'
        }
        arrow
      >
        <div className='controlItemWrapper'>
          <div className='controlIconWrapper'>
            <ResetIcon />
          </div>
          <ResetButton onClick={props.openModal}/>
        </div>
      </Tooltip>
    </StyledControlPane>
    ))
}

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
            mode={mode}
            relationCenter={relationCenter}
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
        handleModeChange={handleModeChange}
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

