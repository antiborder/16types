import styled from 'styled-components';
import { typeLabels } from "../constants/typeLabels.js";
import { relations } from "../constants/relations.js"
import { relationLabels } from "../constants/relationLabels.js"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei';
import { Text } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { getBackgroundColor, getTextColor } from '../colorFunctions.js';
import { getFuncTextColor } from '../colorFunctions.js';
import { getFuncPlaneColor } from '../colorFunctions.js';
import { getFuncBackgroundColor } from '../colorFunctions.js';
import * as THREE from 'three';
import { symbols } from '../constants/symbols.js';

function RelationModal(props) {

  const getMode = (type1, type2) => {
    const relation = relations.find(rel => rel.type1 === type1 && rel.type2 === type2);
    return relation ? relation.mode : null;
  }

  let mode = getMode(props.type1, props.type2);

  const handleSubmit = () => {
    props.onSelect();
  };

  const handleSeeRelation = (mode) => {
    props.onSeeRelation(mode)
  }

  return (
    <StyledRelationModal
      onClick={(event) => { event.stopPropagation() }}
    >
      <div className='modal-content'>
        <div className='title'><span className='type' style={{ color: getTextColor(props.type1) }}>{props.type1}</span> &nbsp;と&nbsp;<span className='type' style={{ color: getTextColor(props.type2) }}>{props.type2}</span>:</div><br></br>
        <div className='relation'><span className='relation-label'>{relationLabels[mode]['label']}</span> の関係</div><br></br>
        <div className='compatibility'>相性：
          {Array.from({ length: relationLabels[mode]['compatibility'] }).map((_, index) => (
            <span className='light-star' key={index}>★</span>
          ))}
          {Array.from({ length: 5 - relationLabels[mode]['compatibility'] }).map((_, index) => (
            <span key={index} className='dark-star'>★</span>
          ))}
        </div>
        <div>
          <span className="seeRelation" onClick={() => handleSeeRelation(mode)}>
            {relationLabels[mode]['label']}の関係を見る
          </span>
        </div>
        <hr></hr>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div className='label-box' style={{ width: "50%", color: getTextColor(props.type1), border: `0.5px solid ${getTextColor(props.type1)}` }}>
            <div className='row-type' style={{ background: getBackgroundColor(props.type1) }}>{props.type1}</div>
            <div className='row-label1'>{typeLabels[props.type1]['label1']}</div>
            {/* <div className='row-label2'>{typeLabels[props.type1]['label2']}</div> */}
          </div>
          <div className='label-box' style={{ width: "50%", color: getTextColor(props.type2), border: `0.5px solid ${getTextColor(props.type2)}` }}>
            <div className='row-type' style={{ background: getBackgroundColor(props.type2) }}>{props.type2}</div>
            <div className='row-label1'>{typeLabels[props.type2]['label1']}</div>
            {/* <div className='row-label2'>{typeLabels[props.type2]['label2']}</div> */}
          </div>
        </div>

        <TwoFunctions
          type1={props.type1}
          type2={props.type2}
          mode={mode}
        />
        <StyledCloseButton onClick={handleSubmit}>&times;</StyledCloseButton>
        <hr></hr>
        ＜解説＞
        <RelationDescription
          type1={props.type1}
          type2={props.type2}
          mode={mode}
        />
      </div>
    </StyledRelationModal>
  );
}

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

const StyledRelationModal = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: rgba(255, 255, 255);
border: 1px solid #ccc;
border-radius: 10px;
font-size:12px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
z-index: 9999;
max-width: 320px;
width: 100%;
padding:0px 8px 0px 8px;

  .modal-content{
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    height:600px;
    width:100%;
    margin:0px;
    padding: 0px;
  }
  .modal-content::-webkit-scrollbar{
    display: none;
  }

  .title{
    margin-top:30px;
    margin-bottom: 5px;
  }

  text-align: center;
  .type{
    margin:0px;
    padding:0px;
    font-size:24px;
    line-height:0;
    font-family: Arial, sans-serif;
  }

  .relation-label{
    font-size:20px;
  }
.compatibility{
  margin-bottom: 4px;
  .light-star{
    color: #DB9;
    font-size:20px
  }
  .dark-star{
    color: #DDD;
    font-size:20px
  }
}
  .seeRelation{
    display:block;
    color:#0000FF;
    cursor: pointer;
    text-decoration: underline;
    margin-bottom:16px;
  }
  hr{
    width:80%;
  }

  .label-box{
    margin: 8px 8px 24px 8px;
    padding:2px 2px 4px 2px;
    border-radius: 8px;



    .row-type{
      border-radius: 4px;
      margin: 4px;
      font-size:16px;
      font-family: Arial, sans-serif;
    }
    .row-label1{
      font-size:12px;
    }
  }

  button:hover {
    background-color: #0069d9;
  }

`;

function ColoredFuncLabel(props) {
  return (
    <span
      style={{
        display: 'inline-block',
        height: '24px',
        color: getFuncTextColor(typeLabels[props.type]['func' + props.funcNum]),
        backgroundColor: getFuncBackgroundColor(typeLabels[props.type]['func' + props.funcNum])
      }}>
      {typeLabels[props.type]['func' + props.funcNum]}
    </span>
  )

}

const StyledRelationDescription = styled.div`
    margin:0 auto;
    width: 280px;
    text-align:left;
    font-size: 16px;
    line-height: 1.5;
    span{
      display: inline-block;
      font-size: 16px;
      padding: 2px 4px;
      border-radius:8px;

    }
`;

function RelationDescription(props) {

  switch (props.mode) {
    case 'DUALITY':
      return (
        <StyledRelationDescription>
          <p>{props.type1}が無意識的に苦手である<ColoredFuncLabel type={props.type1} funcNum={5} />を{props.type2}は第一機能で補うことができます。また、{props.type2}が無意識的に苦手である<ColoredFuncLabel type={props.type2} funcNum={5} />を{props.type1}は第一機能で補うことができます。</p>
          <p>さらに、互いの第二機能と第六機能も補い合う関係にあります。</p>
          <p>このように、{props.type1}と{props.type2}は互いを補完するベストな組み合わせと言われています。</p>

        </StyledRelationDescription>
      )
    case 'ACTIVATION':
      return (
        <StyledRelationDescription>
          <p>{props.type1}が無意識的に苦手である第五機能<ColoredFuncLabel type={props.type1} funcNum={5} />を{props.type2}は第二機能で補うことができます。</p>
          <p>また、{props.type2}が無意識的に苦手である第五機能<ColoredFuncLabel type={props.type2} funcNum={5} />を{props.type1}は第二機能で補うことができます。</p>
          <p>第一機能と第六機能も互いに補い合う関係にあります。このため{props.type1}と{props.type2}の相性は良いと言われています。</p>

        </StyledRelationDescription>
      )
    case 'SEMI_DUALITY':
      return (
        <StyledRelationDescription>
          <p>{props.type1}が無意識的に苦手である<ColoredFuncLabel type={props.type1} funcNum={5} />を{props.type2}は第一機能で補うことができます。</p>
          <p>{props.type2}が無意識的に苦手である<ColoredFuncLabel type={props.type2} funcNum={5} />を{props.type1}は第一機能で補うことができます。</p>
          <p>このように、{props.type1}と{props.type2}の相性は良いと言われています。</p>

        </StyledRelationDescription>
      )
    case 'MIRAGE':
      return (
        <StyledRelationDescription>

          <p>{props.type1}が得意とする第一機能が<ColoredFuncLabel type={props.type1} funcNum={1} />で、{props.type2}の第一機能は<ColoredFuncLabel type={props.type2} funcNum={1} />です。内と外の違いはありますが、{symbols[typeLabels[props.type1]['func1'].charAt(0)]['label']}という点が共通しています。</p>
          <p>衝突する要素も特に無く、{props.type1}と{props.type2}は違うようにみえる割には意外とマッチする関係と言えるでしょう。</p>

        </StyledRelationDescription>
      );
    case 'MIRROR':
      return (
        <StyledRelationDescription>
          <p>{props.type1}の第一機能である<ColoredFuncLabel type={props.type1} funcNum={1} />は{props.type2}の第二機能です。</p>
          <p>同様に、{props.type2}の第一機能である<ColoredFuncLabel type={props.type2} funcNum={1} />は{props.type1}の第二機能です。</p>
          <p>{props.type1}と{props.type2}は似ているように見えますが、このように第一機能と第二機能が入れ替わっているため、意見が異なることもあるでしょう。</p>
        </StyledRelationDescription>
      )


    case 'COOPERATION':
      return (
        <StyledRelationDescription>
          <p>{props.type1}と{props.type2}はどちらも第二機能が<ColoredFuncLabel type={props.type1} funcNum={2} />である点が共通しています。</p>
          <p>しかし、{props.type1}は第一機能が<ColoredFuncLabel type={props.type1} funcNum={1} />であるのに対し、{props.type1}の第一機能は<ColoredFuncLabel type={props.type2} funcNum={1} />です。</p>
          <p>第一機能が異なるため、意見が合わないことも多いでしょう。</p>
        </StyledRelationDescription>
      )
    case 'CONGENERITY':
      return (
        <StyledRelationDescription>
          <p>{props.type1}と{props.type2}はどちらも第一機能が<ColoredFuncLabel type={props.type1} funcNum={1} />である点が共通しています。</p>
          <p>このため互いを容易に理解することができ、良好な関係を築きやすいと言われています。</p>
        </StyledRelationDescription>
      )
    case 'QUASI_IDENTITY':
      return (
        <StyledRelationDescription>
          <p>{props.type1}が意識的に得意な第一機能<ColoredFuncLabel type={props.type1} funcNum={1} />は、{props.type2}にとっては無意識的に得意な第八機能です。</p>
          <p>反対に、{props.type2}第一機能<ColoredFuncLabel type={props.type2} funcNum={1} />は、{props.type1}の第八機能です。</p>
          <p>さらに、一方の第二機能はもう一方の第七機能であるなど、{props.type1}と{props.type2}の心理機能は意識と無意識を逆転した関係にあります。</p>
        </StyledRelationDescription>
      )
    case 'EXTINGUISHMENT':
      return (
        <StyledRelationDescription>
          <p>{props.type1}の第一機能が<ColoredFuncLabel type={props.type1} funcNum={1} />であるのに対し、{props.type2}の第一機能は<ColoredFuncLabel type={props.type2} funcNum={1} />です。</p>
          <p>同様に、{props.type1}の第二機能が<ColoredFuncLabel type={props.type1} funcNum={2} />であるのに対し、{props.type2}の第一機能は<ColoredFuncLabel type={props.type2} funcNum={2} />です。</p>
          <p>{props.type1}と{props.type2}は全ての心理機能にわたり内と外の方向性が反対になっていますが、得意・不得意な分野は同じでるため興味関心は近いでしょう。</p>
        </StyledRelationDescription>
      )
    case 'SUPER_EGO':
      return (
        <StyledRelationDescription>
          <p>{props.type1}が得意とする第一機能<ColoredFuncLabel type={props.type1} funcNum={1} />と第二機能<ColoredFuncLabel type={props.type1} funcNum={2} />は、{props.type2}側が苦手意識を感じる第三機能と第四機能にあたります。</p>
          <p>{props.type2}が得意とする第一機能<ColoredFuncLabel type={props.type2} funcNum={1} />と第二機能<ColoredFuncLabel type={props.type2} funcNum={2} />は、{props.type1}側が苦手意識を感じる第三機能と第四機能にあたります。</p>
          <p>このような場合には、両者はストレスを感じると言われています。</p>
        </StyledRelationDescription>
      )
    case 'CONFLICT':
      return (
        <StyledRelationDescription>
          <p>{props.type1}が強い苦手意識を持つ<ColoredFuncLabel type={props.type1} funcNum={4} />が{props.type2}の第一機能となっており、このような場合には{props.type1}にストレスがかかると言われています。</p>
          <p>同様に、{props.type2}が強い苦手意識を持つ<ColoredFuncLabel type={props.type2} funcNum={4} />は{props.type1}の第一機能なので、{props.type2}にもストレスがかかると言われています。</p>
          <p>このように互いにストレスを感じる関係とされています。</p>
        </StyledRelationDescription>
      )

    case 'REQUEST':
      return (
        <StyledRelationDescription>
          <p>{props.type2}は<ColoredFuncLabel type={props.type2} funcNum={5} />を無意識的に苦手としているため、<ColoredFuncLabel type={props.type1} funcNum={2} />を得意分野の第二機能に持つ{props.type1}には魅力を感じます。</p>
          <p>ところが、{props.type1}は{props.type1}をそれほど魅力的には感じません。{props.type1}が無意識的に苦手としている<ColoredFuncLabel type={props.type1} funcNum={5} />は{props.type2}にとっても苦手な第四機能だからです。</p>
          <p>このため、{props.type2}側が{props.type1}側を一方的に求める非対称な関係となっています。</p>
        </StyledRelationDescription>
      )
    case 'SUPERVISION':
      return (
        <StyledRelationDescription>
          <p>{props.type2}は第四機能<ColoredFuncLabel type={props.type2} funcNum={4} />に苦手意識を持っているため、<ColoredFuncLabel type={props.type2} funcNum={4} />を第一機能に持つ{props.type1}に対してストレスを感じます。</p>
          <p>ところが、{props.type2}の第一機能<ColoredFuncLabel type={props.type2} funcNum={1} />は{props.type1}にとって第二機能にあたるため、{props.type1}は{props.type2}に興味を持ちます。</p>
          <p>この結果、{props.type1}側が近づこうとしても{props.type2}側は距離を置こうとする非対称な関係になると言われています。</p>
        </StyledRelationDescription>
      )
    default:
  }

}

const TwoFunctions = (props) => {
  const cameraRef = useRef();

  useEffect(() => {
    const camera = cameraRef.current;
    if (camera) {
      // カメラの初期位置を設定
      camera.position.set(-2, 0, 7);
    }
  }, []);

  const cameraPosition = [-2, 0, 7]; // カメラの位置

  return (
    <Canvas
      camera={{ position: [-2, 0, 7] }}
      style={{ height: '300px' }}
    >
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={1.0} />
      <pointLight position={[10, 10, 10]} />

      <OrbitControls args={[cameraPosition]} />
      <FunctionGrid
        position={[-2, 0, 0]}
        type={props.type1}
      />
      <FunctionGrid
        position={[2, 0, 0]}
        type={props.type2}
      />

      <Connections
        mode={props.mode}
        type1={props.type1}
        type2={props.type2}
      />

    </Canvas>
  );
};

const FunctionGrid = ({ position, type }) => {
  return (
    <group position={position} rotation={[0, -Math.PI / 4, 0]}>
      <Text
        position={[0, 4.2, 0]}
        fontSize={0.7}
        color={'#777777'}
      >
        {type}
      </Text>
      <FunctionElement x={-1} y={3} funcNum={1} type={type} />
      <FunctionElement x={1} y={3} funcNum={8} type={type} />
      <FunctionElement x={-1} y={1} funcNum={2} type={type} />
      <FunctionElement x={1} y={1} funcNum={7} type={type} />
      <FunctionElement x={-1} y={-1} funcNum={3} type={type} />
      <FunctionElement x={1} y={-1} funcNum={6} type={type} />
      <FunctionElement x={-1} y={-3} funcNum={4} type={type} />
      <FunctionElement x={1} y={-3} funcNum={5} type={type} />
    </group>
  );
};

const FunctionElement = (props) => {
  return (
    <>
      <Text
        position={[props.x, props.y, 0.01]}
        fontSize={1.0}
        color={getFuncTextColor(typeLabels[props.type]['func' + props.funcNum])}
        anchorX="center"
        anchorY="middle">
        {typeLabels[props.type]['func' + props.funcNum]}
      </Text>
      <Text
        position={[props.x - 0.6, props.y + 0.6, 0.01]}
        fontSize={0.4}
        color='#555555'
        anchorX="center" anchorY="middle">
        {props.funcNum}
      </Text>
      <RoundedSquare
        position={[props.x, props.y, 0]}
        color={getFuncPlaneColor(typeLabels[props.type]['func' + props.funcNum])}
      >
      </RoundedSquare>
    </>
  )
}

const RoundedSquare = ({ size = 2.6, radius = 0.4, color = '#0088ff', opacity = 0.2, ...props }) => {
  const shape = new THREE.Shape();
  const x = size / 2 - radius;
  const y = size / 2 - radius;

  // ポリゴンの形状を作成
  shape.moveTo(-x, -y + radius);
  shape.quadraticCurveTo(-x, -y, -x + radius, -y);
  shape.lineTo(x - radius, -y);
  shape.quadraticCurveTo(x, -y, x, -y + radius);
  shape.lineTo(x, y - radius);
  shape.quadraticCurveTo(x, y, x - radius, y);
  shape.lineTo(-x + radius, y);
  shape.quadraticCurveTo(-x, y, -x, y - radius);
  shape.lineTo(-x, -y + radius);

  // ポリゴンをShapeGeometryで描画
  const geometry = new THREE.ShapeGeometry(shape);

  // オブジェクトを描画
  const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(color), transparent: true, opacity });
  return (
    <mesh geometry={geometry} material={material} {...props} />
  );
};

const Connections = (props) => {
  const funcPositions = {
    'type1': {
      'func1': [-2 - 1 / Math.sqrt(2), 3, -1 / Math.sqrt(2)],
      'func8': [-2 + 1 / Math.sqrt(2), 3, +1 / Math.sqrt(2)],
      'func2': [-2 - 1 / Math.sqrt(2), 1, -1 / Math.sqrt(2)],
      'func7': [-2 + 1 / Math.sqrt(2), 1, +1 / Math.sqrt(2)],
      'func3': [-2 - 1 / Math.sqrt(2), -1, -1 / Math.sqrt(2)],
      'func6': [-2 + 1 / Math.sqrt(2), -1, +1 / Math.sqrt(2)],
      'func4': [-2 - 1 / Math.sqrt(2), -3, -1 / Math.sqrt(2)],
      'func5': [-2 + 1 / Math.sqrt(2), -3, +1 / Math.sqrt(2)],
    },
    'type2': {
      'func1': [2 - 1 / Math.sqrt(2), 3, -1 / Math.sqrt(2)],
      'func8': [2 + 1 / Math.sqrt(2), 3, +1 / Math.sqrt(2)],
      'func2': [2 - 1 / Math.sqrt(2), 1, -1 / Math.sqrt(2)],
      'func7': [2 + 1 / Math.sqrt(2), 1, +1 / Math.sqrt(2)],
      'func3': [2 - 1 / Math.sqrt(2), -1, -1 / Math.sqrt(2)],
      'func6': [2 + 1 / Math.sqrt(2), -1, +1 / Math.sqrt(2)],
      'func4': [2 - 1 / Math.sqrt(2), -3, -1 / Math.sqrt(2)],
      'func5': [2 + 1 / Math.sqrt(2), -3, +1 / Math.sqrt(2)],
    }
  }

  let line1type1funcNum
  let line1type2funcNum
  let line2type1funcNum
  let line2type2funcNum

  switch (props.mode) {
    case 'DUALITY': line1type1funcNum = 5; line1type2funcNum = 1; line2type1funcNum = 1; line2type2funcNum = 5; break
    case 'ACTIVATION': line1type1funcNum = 5; line1type2funcNum = 2; line2type1funcNum = 2; line2type2funcNum = 5; break
    case 'SEMI_DUALITY': line1type1funcNum = 5; line1type2funcNum = 1; line2type1funcNum = 1; line2type2funcNum = 5; break
    case 'MIRAGE': line1type1funcNum = 1; line1type2funcNum = 1; line2type1funcNum = 1; line2type2funcNum = 1; break
    case 'MIRROR': line1type1funcNum = 1; line1type2funcNum = 2; line2type1funcNum = 2; line2type2funcNum = 1; break
    case 'COOPERATION': line1type1funcNum = 2; line1type2funcNum = 2; line2type1funcNum = 2; line2type2funcNum = 2; break
    case 'CONGENERITY': line1type1funcNum = 1; line1type2funcNum = 1; line2type1funcNum = 1; line2type2funcNum = 1; break
    case 'QUASI_IDENTITY': line1type1funcNum = 1; line1type2funcNum = 8; line2type1funcNum = 8; line2type2funcNum = 1; break
    case 'EXTINGUISHMENT': line1type1funcNum = 1; line1type2funcNum = 1; line2type1funcNum = 2; line2type2funcNum = 2; break
    case 'SUPER_EGO': line1type1funcNum = 1; line1type2funcNum = 3; line2type1funcNum = 3; line2type2funcNum = 1; break
    case 'CONFLICT': line1type1funcNum = 1; line1type2funcNum = 4; line2type1funcNum = 4; line2type2funcNum = 1; break
    case 'REQUEST': line1type1funcNum = 5; line1type2funcNum = 4; line2type1funcNum = 2; line2type2funcNum = 5; break
    case 'SUPERVISION': line1type1funcNum = 1; line1type2funcNum = 4; line2type1funcNum = 2; line2type2funcNum = 1; break
    case 'IDENTITY': line1type1funcNum = 1; line1type2funcNum = 2; line2type1funcNum = 2; line2type2funcNum = 1; break
    default: line1type1funcNum = 1; line1type2funcNum = 2; line2type1funcNum = 2; line2type2funcNum = 1; break
  }

  return (
    <>
      <Connection
        start={funcPositions['type1']['func' + line1type1funcNum]}
        end={funcPositions['type2']['func' + line1type2funcNum]}
        color={getFuncTextColor(typeLabels[props.type1]['func' + line1type1funcNum])}
      />
      <Connection
        start={funcPositions['type1']['func' + line2type1funcNum]}
        end={funcPositions['type2']['func' + line2type2funcNum]}
        color={getFuncTextColor(typeLabels[props.type1]['func' + line2type1funcNum])}
      />
    </>
  );
}

const Connection = (props) => {

  const start = new THREE.Vector3(...props.start)
  const end = new THREE.Vector3(...props.end)

  const radius = 0.03
  const distance = start.distanceTo(end)
  const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, distance * 0.8, 8);
  const direction = end.clone().sub(start).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  const midpoint = start.clone().add(end).divideScalar(2);
  const cylinderMaterial = new THREE.MeshBasicMaterial({ color: props.color });

  const cone1Geometry = new THREE.CylinderGeometry(0, radius * 3, 0.8, 8);
  const tip1Point = start.clone().divideScalar(6).add(end).multiplyScalar(6).divideScalar(7);
  const cone2Geometry = new THREE.CylinderGeometry(radius * 3, 0, 0.8, 8);
  const tip2Point = start.clone().divideScalar(0.12).add(end).multiplyScalar(0.12).divideScalar(1.12);


  return (
    <>
      {/* <line geometry={lineGeometry} material={Material} position={midpoint} /> */}
      <mesh
        // ref={ref}
        geometry={cylinderGeometry}
        material={cylinderMaterial}
        position={midpoint}
        quaternion={quaternion}>
        {/* <meshBasicMaterial attach="material" color={props.color} /> */}
      </mesh>
      <mesh
        // ref={ref}
        geometry={cone1Geometry}
        material={cylinderMaterial}
        position={tip1Point}
        quaternion={quaternion}>
        {/* <meshBasicMaterial attach="material" color={props.color} /> */}
      </mesh>
      <mesh
        // ref={ref}
        geometry={cone2Geometry}
        material={cylinderMaterial}
        position={tip2Point}
        quaternion={quaternion}>
        {/* <meshBasicMaterial attach="material" color={props.color} /> */}
      </mesh>
    </>
  );
}

export { RelationModal };