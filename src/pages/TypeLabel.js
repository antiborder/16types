import { Link } from 'react-router-dom';
import styled from "styled-components";
import { typeLabels } from '../constants/typeLabels';



const TypeLabel = () => {
    const types = Object.keys(typeLabels).sort()
    return (
        <StyledCognitiveFunction>
            <div className='pageTitle'>タイプ名の表記</div>
            <div className='subTitle'>タイプ名の対応表</div>
            <p className='sentence'>
                MBTIとソシオニクスは異なる理論なのでタイプの表記方法に違いがあります。<br />
                下の表はMBTIとソシオニクスの表記の対応表です。<br />
                ソシオニクスには３文字表記と４文字表記の2種類があります。
            </p>
            <div className='diagram'>
                <table>
                    <tr>
                        <td>MBTI表記</td>
                        <td>ソシオニクス<br />4文字表記</td>
                        <td>ソシオニクス<br />3文字表記</td>
                        <td>第1 / 第2機能</td>
                    </tr>
                    {types.map((type) => {
                        return (<TypeRow type={type} />)
                    })}
                    <TypeRow type={'INTJ'} />

                </table>
            </div>
            <div className='subTitle'>MBTIとソシオニクスの表記の違い</div>
            <p className='sentence'>
            特にややこしいのが、MBTIとソシオニクスの４文字表記が似ている点です。<br />
                ソシオニクスでは、4文字目のpまたはjをアルファベットの小文字で表記します。
                上の表を見てもわかるように、MBTIとソシオニクスの表記は
                <ul>
                    <li>外向型については一致</li>
                    <li>内向型についてはpとjが逆</li>
                </ul>
                となっており、非常に間違えやすいです。
            </p>
            {/* <p className='sentence'>
                表記の見方としては
                <ul>
                    <li>ソシオニクスの場合：</li>
                    4文字目は第1機能を表します。
                    <ul>
                        <li>XXXP→第1機能はSかN</li>
                        <li>XXXJ→第1機能はFかT</li>
                    </ul>
                    <br /><br />
                    <li>MBTIの場合：</li>
                    4文字目は最初の外向的機能を表します。
                    <ul>
                        <li>EXXP → 第1機能はSかN</li>
                        <li>IXXP → 第2機能はSかN</li>
                        <li>EXXJ → 第1機能はPかJ</li>
                        <li>IXXJ → 第2機能はPかJ</li>
                    </ul>
                </ul>
            </p> */}
            <div className='subTitle'>3文字表記</div>
            <p className='sentence'>
                3文字表記の意味は次の通りです。
                <ul>
                    <li>1文字目：第1機能を表します。</li>
                    <ul>
                        <li>S：感覚</li>
                        <li>I ：直感</li>
                        <li>E：感情</li>
                        <li>L：思考</li>
                    </ul>
                    <li>2文字目：第2機能を表します。記号の意味は第1機能と同じです。 </li>
                    <li>3文字目：方向性（内向的 / 外向的)を表します。</li>
                </ul>
            </p>
            <div className="toHome">
                <Link to="/16types" >HOME</Link>
            </div>
        </StyledCognitiveFunction>
    )
}

export default TypeLabel;

const TypeRow = (props) => {
    const fourthChar =
        (props.type.charAt(0) === 'E' && props.type.charAt(3) === 'J')
            || (props.type.charAt(0) === 'I' && props.type.charAt(3) === 'P') ?
            'j' : 'p'
    const fourChars = props.type.substring(0, 3) + fourthChar
    return (
        <tr style={{ fontSize: '16px', lineHeight: '1.5'}}>
            <td>
                {Array.from(props.type).map((char, i) => {
                    return <span className='char'
                        style={{
                            color: (props.type.charAt(0) === 'I' && i === 3) ? 'red' : 'black',
                        }}>
                        {char}
                    </span>
                })}
            </td>

            <td>
                {Array.from(fourChars).map((char, i) => {
                    return <span className='char'
                        style={{
                            color: (props.type.charAt(0) === 'I' && i === 3) ? 'red' : 'black',
                        }}>
                        {char}
                    </span>
                })}
            </td>
            <td>
                {Array.from(typeLabels[props.type]['3chars']).map((char) => {
                    return <span className='char'>{char}</span>
                })}
            </td>
            <td>
                {Array.from(
                    typeLabels[props.type]['func1'] + '/' + typeLabels[props.type]['func2']
                ).map((char) => {
                    return <span className='char'>{char}</span>
                })}
            </td>
        </tr>

    )
}

const StyledCognitiveFunction = styled.div`
    margin: 0 auto;
width:500px;
    .subTitle{
    
    text-align:left;
    margin-top: 36px;
    font-size:20px;
    font-weight:bold;
    }
    .pageTitle{
        margin-top: 36px;
        font-size:32px;
    }
    text-align: center;
    .sentence {
        width: 500px;
        text-align:left;
        margin:40px auto 0px auto;
    }
    .diagram{
        display:flex;
        width: 500px;
        background-color:white;
        margin:20px auto;
        padding:8px;
        border-radius:16px;
    }


    table {
        font-size:14px;
        margin: 0 auto;
        border-collapse: collapse;
        td{
            width:120px;
        }
        tr td {
            border: 1px solid lightgray;
        }
.char{
    display: inline-block;
    width: 12px;
}
    }
    
     .toHome{
        margin:10px;
        padding:10px;
     }
`;

