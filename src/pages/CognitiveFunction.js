import { Link } from 'react-router-dom';
import styled from "styled-components";
import { getFuncTextColor } from '../colorFunctions';
import { getFuncBackgroundColor } from '../colorFunctions';
import { symbols } from '../constants/symbols';
import StyledHelpPage from './StyledHelpPage';
import { HomeIcon } from '../assets/Icons';
import { cognitiveFunctionLabels } from '../constants/cognitiveFunctionLabels';
import { FunctionTable } from '../components/FunctionTable';


const CognitiveFunction = () => {
    return (
        <StyledHelpPage>
            <StyledCognitiveFunction>
                <div className='pageTitle'>心理機能</div>
                <div className='subTitle'>４つの機能</div>
                <div className='sentence'>
                    ユングの類型論では、心の機能について次の４種類を考えます。
                </div>
                <div className='diagram'>
                    <div className='diagramContents'>
                        <div className='item'>
                            ものの見方：
                        </div>
                        <FuncBox
                            symbol={'S'}
                        />

                        <div className='arrow'>↔︎</div>
                        <FuncBox
                            symbol={'N'}
                        />
                    </div>
                </div>

                <div className='diagram'>
                    <div className='diagramContents'>
                        <div className='item'>
                            判断の仕方：
                        </div>
                        <FuncBox
                            symbol={'F'}
                        />
                        <div className='arrow'>↔︎</div>
                        <FuncBox
                            symbol={'T'}
                        />
                    </div>
                </div>
                <div className='subTitle'>関心の方向性</div>
                <div className='sentence'>
                    関心の方向性は次の２種類です。
                </div>
                <div className='diagram'>
                    <div className='diagramContents'>
                        <div className='item'>
                            関心の方向性：
                        </div>
                        <FuncBox
                            symbol={'E'}
                        />
                        <div className='arrow'>↔︎</div>
                        <FuncBox
                            symbol={'I'}
                        />
                    </div>
                </div>
                <div className='subTitle'>８つの心理機能</div>
                <div className='sentence'>
                    これらを掛け合わせると心理機能は計８種類になります。
                </div>

                <div className='diagram'>
                    <table>
                        <tr>
                            <td></td>
                            <td>外向的</td>
                            <td>内向的</td>
                        </tr>

                        <tr>
                            <td>感覚 &nbsp;&nbsp;</td>
                            <td>
                                <FuncSymbol symbol='Se' />
                            </td>
                            <td>
                                <FuncSymbol symbol='Si' />
                            </td>
                        </tr>
                        <tr>
                            <td>直感 &nbsp;&nbsp;</td>
                            <td>
                                <FuncSymbol symbol='Ne' />
                            </td>
                            <td>
                                <FuncSymbol symbol='Ni' />
                            </td>
                        </tr>
                        <tr>
                            <td>感情 &nbsp;&nbsp;</td>
                            <td>
                                <FuncSymbol symbol='Fe' />
                            </td>
                            <td>
                                <FuncSymbol symbol='Fi' />
                            </td>
                        </tr>
                        <tr>
                            <td>思考 &nbsp;&nbsp;</td>
                            <td>
                                <FuncSymbol symbol='Te' />
                            </td>
                            <td>
                                <FuncSymbol symbol='Ti' />
                            </td>
                        </tr>
                    </table>
                </div>
                <Link to="/16types/pages/type-label">参考：１６タイプ一覧</Link>

                <div className='subTitle'>心理機能の見方</div>
                <div className='sentence'>
                    例として、ESFP型の心理機能を見てみましょう。
                    当サイトでは、意識的な機能を左、無意識的な機能を右に配置しています。また、得意な機能を上、苦手な機能を下にしています。
                </div>

                <div className='diagram'>
                    <div className='diagramContents'>
                        <FunctionTable type={'ESFP'} />
                    </div>
                </div>

                <div className='sentence'>
                    上の図で左上にあるSeがESFP型の第１機能です。これは、FSFP型の人が最も得意に感じている心理機能です。
                </div>
                <div className='sentence'>
                    意識的に最も苦手に感じるのは左下にある第４機能で、この機能を強制されることにはストレスを感じます。
                    ESFP型の場合では、第４機能はTiなのでESFP型の人はTiを第１機能に持つ人を苦手に感じるといわれています。
                </div>
                <div className='sentence'>
                    一方、無意識的に最も苦手に感じるのが右下にある第５機能で、この機能に自身を持つ者からの支援を必要とします。
                    ESFP型の第５機能はNiなので、Niを第一機能に持つタイプとは相性が良いと言われています。
                </div>

                <a href='https://ja.wikipedia.org/wiki/MBTI'
                    target='_blank'
                    rel="noopener noreferrer"
                    style={{ color: 'gray' }}>
                    [参考] Wikipedia(MBTI)
                </a>


                <div className="toHome">
                    <Link to="/16types" ><HomeIcon /></Link>
                </div>
            </StyledCognitiveFunction>
        </StyledHelpPage>
    )
}

export default CognitiveFunction;

const StyledCognitiveFunction = styled.div`

    .diagram{
        display:flex;
        width: 500px;
        background-color:white;
        margin:20px auto;
        padding:8px;
        border: 1px solid lightgray;
        border-radius:16px;
    }

    .diagramContents{
        display:flex;
        margin: 0 auto;
    }

    .item{
        width: 120px;
        display: flex;
        align-items: center;
    }

    .arrow{
        display: flex;
        font-size:36px;
        color:#777777;
        align-items: center;
        justify-content: center;
        font-family: "mochy","Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro", Arial, sans-serif;
    }

    table {
        margin: 0 auto;
        border-collapse: collapse;
    }
        
`;

const FuncBox = (props) => {
    const symbolIndex = props.symbol === 'N' ? 2 : 1
    const backgroundColor = (props.symbol === 'E' || props.symbol === 'I') ? '#EEEEEE' : getFuncBackgroundColor(props.symbol + 'e')
    const originColor = (props.symbol === 'E' || props.symbol === 'I') ? 'black' : getFuncTextColor(props.symbol + 'e')

    return (
        <StyledFuncBox  >
            <div className='colorBox' style={{ backgroundColor: backgroundColor }}>
                <div className='name'>
                    {symbols[props.symbol]['label'].substring(0, 2)}
                </div>
                <div className='origin' style={{ color: originColor }}>
                    <span className='lower'>{symbols[props.symbol]['origin'].substring(0, symbolIndex - 1)}</span>
                    <span className='upper'>{symbols[props.symbol]['origin'].substring(symbolIndex - 1, symbolIndex)}</span>
                    <span className='lower'>{symbols[props.symbol]['origin'].substring(symbolIndex)}</span>
                </div>
            </div>

            <div className='description'>
                {symbols[props.symbol]['description0']}
            </div>

        </StyledFuncBox>
    )
}

const StyledFuncBox = styled.div`
    margin: 0 auto;
    margin: 0 auto;
    padding:12px;        
    
    .colorBox{
        width: 130px;
        border-radius:8px;
        padding:4px;
    }
    .name{        
        font-size:16px;
    }
    .origin{
        margin-top: -2px;
        font-size:12px;
        .upper{
            font-size:24px;
        }
        .lower{
            font-size:12px;
        }
    }
    .description{
        font-size:12px;
        color:#333333;
    }
}
`;

const FuncSymbol = (props) => {
    return (
        <StyledFuncSymbol className='funcSymbol' style={{ backgroundColor: getFuncBackgroundColor(props.symbol), color: getFuncTextColor(props.symbol) }}>
            {props.symbol}
            <div className="funcLabel">
                {cognitiveFunctionLabels[props.symbol]['label']}
            </div>
            <div className="funcPhrase">
                {cognitiveFunctionLabels[props.symbol]['phrase']}
            </div>
        </StyledFuncSymbol>
    )
}

const StyledFuncSymbol = styled.div`
    width:120px;
    height: 90px;
    font-size:24px;
    border-radius:16px;
    padding:4px;
    margin:4px;
    align-items: center;
    justify-content: center;
    
    .funcLabel{
        font-size:16px;
        color:#333333;
        margin-top:0px;
        margin-bottom:8px;
    }
    .funcPhrase{
        font-size:12px;
        color:#333333;
        margin-top:4px;
    }
`;