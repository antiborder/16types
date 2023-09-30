import styled from 'styled-components';
import { typeLabels } from "../constants/typeLabels.js";
import { symbols } from '../constants/symbols.js';
import { getFuncTextColor } from '../colorFunctions.js';
import { getFuncBackgroundColor } from '../colorFunctions.js';

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
          <p>ところが、{props.type1}は{props.type2}をそれほど魅力的には感じません。{props.type1}が無意識的に苦手としている<ColoredFuncLabel type={props.type1} funcNum={5} />は{props.type2}にとっても苦手な第四機能だからです。</p>
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

export default RelationDescription;

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