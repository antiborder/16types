import { Link } from 'react-router-dom';
import styled from "styled-components";
import { typeLabels } from '../constants/typeLabels';
import StyledHelpPage from './StyledHelpPage';


const TypeLabel = () => {
    const types = Object.keys(typeLabels).sort()
    return (
        <StyledHelpPage>
            <StyledTypeLabel>
            <div className='pageTitle'>タイプ名の表記</div>
            <div className='subTitle'>１６タイプ一覧表</div>
            <div className='diagram'>
                <table>
                    <tr>
                        <td>MBTI表記</td>
                        <td>ソシオニクス<br />４文字表記</td>
                        <td>ソシオニクス<br />３文字表記</td>
                        <td>第1 / 第2機能</td>
                    </tr>
                    {types.map((type) => {
                        return (<TypeRow type={type} />)
                    })}
                    <TypeRow type={'INTJ'} />

                </table>
            </div>
            <p className='sentence'>
                MBTIとソシオニクスは異なる理論なのでタイプの表記方法に違いがあります。<br />
                ソシオニクスには３文字表記と４文字表記の２種類があります。
            </p>

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
                ソシオニクスの3文字表記の意味は次の通りです。
                <ul className = 'box'>
                    <li>1文字目：第1機能を表します。</li>
                    <ul>
                        <li>S：Sensing → 感覚</li>
                        <li>I ：Intuitive → 直感</li>
                        <li>E：Emotional → 感情</li>
                        <li>L：Logical → 思考</li>
                    </ul><br/>
                    <li>2文字目：第2機能を表します。</li>
                    <ul>
                        <li>(記号の意味は第1機能と同じ)</li>
                    </ul><br/>

                    <li>3文字目：関心の方向性を表します。</li>
                    <ul>
                        <li>E：Extraverted → 外向的</li>
                        <li>I ：Introverted → 内向的</li>
                    </ul>
                </ul>
                例えば &nbsp;EIE &nbsp;なら、
                <ul className='box'>
                    <li>第1機能：　E　→　感情</li>
                    <li>第2機能：　I　→　直感</li>
                    <li>方向性　:　E　→　外向的</li>
                </ul>
                となります。
            </p>
            <div className="toHome">
                <Link to="/16types" >HOME</Link>
            </div>
            </StyledTypeLabel>
        </StyledHelpPage>
    )
}

export default TypeLabel;

const StyledTypeLabel = styled.div`

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
`

const TypeRow = (props) => {
    const fourthChar =
        (props.type.charAt(0) === 'E' && props.type.charAt(3) === 'J')
            || (props.type.charAt(0) === 'I' && props.type.charAt(3) === 'P') ?
            'j' : 'p'
    const fourChars = props.type.substring(0, 3) + fourthChar
    return (
        <tr style={{ fontSize: '16px', lineHeight: '1.5' }}>
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

