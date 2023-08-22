import { Link } from 'react-router-dom';
import styled from "styled-components";
import { getFuncTextColor } from '../colorFunctions';
import { getFuncBackgroundColor } from '../colorFunctions';
import { symbols } from '../constants/symbols';


const CognitiveFunction = () => {
    return (
        <StyledCognitiveFunction>
            <div className='pageTitle'>心理機能</div>
            <div className='sentence'>
                ユングの類型論では、心の機能について下記4つの類型を考えます。
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
            <div className='sentence'>
                関心の方向性は次の2種類です。
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

            <div className='sentence'>
                これらを掛け合わせると心理機能は計8種類になります。
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



            <div className="toHome">
                <Link to="/16types" >HOME</Link>
            </div>
        </StyledCognitiveFunction>
    )
}

export default CognitiveFunction;

const StyledCognitiveFunction = styled.div`

    .pageTitle{
        margin-top: 36px;
        font-size:32px;
    }
    text-align: center;
    .sentence {
        width: 500px;
        text-align:center;
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
    }

    table {
        margin: 0 auto;
        border-collapse: collapse;
    }
    
    table{
        // tr:nth-child(n+2):nth-child(-n+5) td {
        //     border: 1px solid lightgray;
        // }
        // tr td:nth-child(n+2):nth-child(-n+3) {
        //     border: 1px solid lightgray;
        // }
    }
    

    .conclusion{
       margin: 20px auto;
     }

     .toHome{
        margin:10px;
        padding:10px;
     }
`;


const FuncBox = (props) => {
    // const symbolIndex = props.symbol= 1
    const symbolIndex = props.symbol === 'N' ? 2 : 1
    const backgroundColor = (props.symbol==='E'|| props.symbol==='I') ? '#EEEEEE' :  getFuncBackgroundColor(props.symbol + 'e')
    const originColor = (props.symbol==='E'|| props.symbol==='I') ? 'black' : getFuncTextColor(props.symbol + 'e')

    return (
        <StyledFuncBox className='box' >
            <div className='colorBox' style={{ backgroundColor: backgroundColor}}>
                <div className='name'>
                    {symbols[props.symbol]['label'].substring(0, 2)}
                </div>
                <div className='origin' style={{ color:originColor }}>
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

        margin-top: -6px;
        font-size:12px;
        .upper{
            font-size:24px;
        }
        .lower{
            font-size:12px;
        }
    }
    .description{
        // margin-top:4px;
        font-size:12px;
        color:#333333;
    }
}
`;

const FuncSymbol = (props) => {
    return (
        <StyledFuncSymbol className='funcSymbol' style={{ backgroundColor: getFuncBackgroundColor(props.symbol), color: getFuncTextColor(props.symbol) }}>
            {props.symbol}
        </StyledFuncSymbol>
    )
}

const StyledFuncSymbol = styled.div`
    width:80px;
    height: 50px;
    font-size:24px;
    border-radius:16px;
    margin:4px;
    display: flex;
    align-items: center;
    justify-content: center;
`;