import './App.css';

import { Canvas } from "@react-three/fiber"
import {  useState, useEffect } from 'react';
import { OrbitControls} from '@react-three/drei'

import {InitialModal} from './InitialModal.js';
import {Tetra} from './Tetra.js';

//　最初のタイプ判定。モーダル開いたらcenterに代入されるように？
// modal外をクリックで閉じる
//CenterSelectの初期値
// Modeのプルダウンに現在のセンターに関連する関係を選ぶ選択肢
// NodeとRelationのマウスオーバーで吹き出しが出る。
// タイプの詳細
// Nodeの色とサイズ
// 相性の詳細
// modalを閉じたらボールが再アニメーション
//　type名を黒とグレイで色分け
// タイプの表記（4文字と3文字）
//　性格分析について（ユング心理学、MBTI、ソシオニクス）
// 心理機能について
// 相性の考え方
//　外国語対応
//　NodeのダブルクリックでCenterとModeが変わる
// Relationの移動を連続アニメーション




function CenterSelect(props) {
  return (
    <select id="center" value ={props.center || ""} onChange={props.onChange} >
      <option value="INTJ">INTJ</option>
      <option value="INTP">INTP</option>
      <option value="ENTJ">ENTJ</option>
      <option value="ENTP">ENTP</option>
      <option value="INFJ">INFJ</option>
      <option value="INFP">INFP</option>
      <option value="ENFJ">ENFJ</option>Ï
      <option value="ENFP">ENFP</option>
      <option value="ISTJ">ISTJ</option>
      <option value="ISFJ">ISFJ</option>
      <option value="ESTJ">ESTJ</option>
      <option value="ESFJ">ESFJ</option>
      <option value="ISTP">ISTP</option>
      <option value="ISFP">ISFP</option>
      <option value="ESTP">ESTP</option>
      <option value="ESFP">ESFP</option>
    </select>

  )
}


function ModeSelect(props) {

  return (
    <select id="mode" onChange={props.onChange} >
      <option value='RELATION'>RELATION</option>
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

    </select>
  )
}

function App() {

  const [center, setCenter] = useState("");
  const [mode, setMode] = useState("RELATION");
  const [relationCenter, setRelationCenter] = useState("")
  const [showModal, setShowModal] = useState(true);

  const handleCenterSelectChange = (event) => {
    setCenter(event.target.value);

  };

    const handleCenterChange = (newValue) => {
    setCenter(newValue);

  };
  const handleModeChange = (event) => {
    setMode(event.target.value);
    if(event.target.value === 'RELATION'){
      setRelationCenter(center)
    }
  };


  const handleModalSelect = () => {
    // setCenter(selectedCenter);
    setShowModal(false);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <>
          {showModal && 
            <InitialModal onSelect = {handleModalSelect}  
            center={center} 
            handleCenterChange={handleCenterChange} />}
      <div id="canvas-container">
        <Canvas camera={{ position: [0, 0, 7] }}>
          <Tetra
            center={center}
            mode={mode}
            relationCenter = {relationCenter}
          />
          <ambientLight intensity={0.5} />
          {/* <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} /> */}
          <pointLight position={[100, 100, 100]} />
          <OrbitControls />
        </Canvas>
      </div>
      <h1>React Threejs Fiber</h1>
      <CenterSelect center = {center}
        onChange={handleCenterSelectChange} />
      <ModeSelect onChange={handleModeChange} />
    </>
  );
}

export default App;

