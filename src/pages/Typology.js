import {  Link } from 'react-router-dom';
import styled from "styled-components";
import {RightDownIcon, LeftDownIcon} from '../assets/Icons';


const Typology = () => {
    return (
        <StyledTypology>
            <div className='pageTitle'>ユングのタイプ論</div>
            <div className='preface'>
                ユングのタイプ論とは、人を多様なタイプに分類したものです。<br />
                MBTIとソシオニクス(社会人格学)はどちらもユングのタイプ論に基づいて作られました。
            </div>
            <div className='diagram'>
                <div className='parentTheory'>
                    <div className='theoryBox'>
                        <div className='theoryHeader'>
                            ユングのタイプ論
                        </div>
                        <div className='theoryBody'>
                            関心の方向性と心理機能から
                            人を様々なタイプに分類<br />

                        </div>
                    </div>
                </div>
                <div className='arrowsContainer'>
                    <div className='arrows'>
                    <LeftDownIcon />
                    <div></div>
                    <RightDownIcon />
                    </div>
                </div>
                <div className='childTheory'>
                    <div className='theoryBox'>
                        <div className='theoryHeader'>
                            MBTI
                        </div>
                        <div className='theoryBody'>
                            ・ユングの理論に基づく<br />
                            ・心理的傾向や性格を評価<br />
                            ・相性論は無い<br />
                            ・アメリカ等で人気
                        </div>
                    </div>
                    <div className='theoryBox'>
                        <div className='theoryHeader'>
                            ソシオニクス(社会人格学)
                        </div>
                        <div className='theoryBody'>
                            ・ユングの理論に基づく<br />
                            ・タイプ間相互作用も論じる<br />
                            ・相性論がある<br />
                            ・ロシア等で人気
                        </div>
                    </div>
                </div>
            </div>

            <div className='conclusion'>
                MBTIとソシオニクスは別の理論であり、心理機能の扱いにおいても違いが見られます。<br />
                どちらもユングのタイプ論から生まれた姉妹のような関係です。
            </div>

            <div className="toHome">
                <Link to="/16types" >HOME</Link>
            </div>
        </StyledTypology>
    )
}

export default Typology;

const StyledTypology = styled.div`

    .pageTitle{
        margin-top: 36px;
        font-size:32px;
    }
    text-align: center;
    .preface {
        text-align:center;
        width: 700px;
        margin:40px auto;
    }
    .diagram{
        width: 700px;
        background-color:white;

        margin:20px auto;
        padding:20px;
        border-radius:16px;
    }

    .arrowsContainer {
        display: flex;
        justify-content: center;
      }
      
      .arrows {
        display: flex;
        justify-content: space-between;
        width: 40%;
        margin: 0 auto;
      }
      
      .arrows > div {
        flex-basis: 50%;
        display: flex;
        justify-content: center;
      }    

    .theoryHeader{
      font-size:16px;
      font-weight:bold;
      color: #777
    }
    .childTheory{
        display: flex;
        width:650px;
        margin: 0px auto 0 auto;
        
    }
    .theoryBox{
        width:280px;
        
        margin: 0 auto;

    }
    .theoryBody{
        width:240px;
        border: solid 5px #777;
        border-radius:8px;
        text-align:left;
        margin: 0 auto;
        padding:10px;
    }

    .conclusion{
       margin: 20px auto;
     }

     .toHome{
        margin:10px;
        padding:10px;
     }
`;