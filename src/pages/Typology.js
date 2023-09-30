import { Link } from 'react-router-dom';
import styled from "styled-components";
import { RightDownIcon, LeftDownIcon } from '../assets/Icons';
import StyledHelpPage from './StyledHelpPage';
import { HomeIcon } from '../assets/Icons';


const Typology = () => {
    return (
        <StyledHelpPage>
            <div className='pageTitle'>ユングのタイプ論</div>


            <div className='subTitle'>ユングのタイプ論</div>
            <div className='sentence'>
                ユングのタイプ論（または類型論）は、<Link to="/16types/pages/function">心理機能</Link>から人を多様なタイプに分類したものです。<br />
            </div>
            <Link to="/16types/pages/type-label">参考：１６タイプ一覧</Link><br />

            <div className='subTitle'>タイプ論の発展理論</div>
            <div className='sentence'>
                ユングのタイプ論に基づいて、「MBTI」や「ソシオニクス(社会人格学)」という理論が作られました。
            </div>
            <TheoryDiagram />

            <div className='sentence'>
                MBTIとソシオニクスは別の理論であり、心理機能の扱いにおいても違いが見られます。<br />
                どちらもユングのタイプ論から生まれた姉妹のような関係です。<br />
                当サイトの内容はMBTIとソシオニクスに基づいています。
            </div>

            <div className='subTitle'>タイプ判定</div>
            <div className='sentence'>
                自分のタイプをもっとじっくり判定してみたい方にはこちらがおすすめです。▶︎&nbsp;
                <a href='https://www.16personalities.com/'
                    target='_blank'
                    rel="noopener noreferrer"
                    style={{ color: 'gray' }}>
                    16 personalities.com([外部サイト])
                </a>
            </div>


            <div className="toHome">
                <Link to="/16types" ><HomeIcon /></Link>
            </div>
        </StyledHelpPage>
    )
}

export default Typology;


const TheoryDiagram = () => {
    return (
        <StyledTheoryDiagram>
            <div className='theoryDiagram'>
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
                            <div style={{ textAlign: 'right', marginTop: '8px' }}>
                                <a href='https://ja.wikipedia.org/wiki/MBTI'
                                    target='_blank'
                                    rel="noopener noreferrer"
                                    style={{ color: 'gray' }}>
                                    [参考] Wikipedia(MBTI)
                                </a>
                            </div>
                        </div>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div className='theoryBox'>
                        <div className='theoryHeader'>
                            ソシオニクス(社会人格学)
                        </div>
                        <div className='theoryBody'>
                            ・ユングの理論に基づく<br />
                            ・タイプ間相互作用も論じる<br />
                            ・相性論がある<br />
                            ・ロシア等で人気
                            <div style={{ textAlign: 'right', marginTop: '8px' }}>
                                <a href='https://ja.wikipedia.org/wiki/%E3%82%BD%E3%82%B7%E3%82%AA%E3%83%8B%E3%82%AF%E3%82%B9'
                                    target='_blank'
                                    rel="noopener noreferrer"
                                    style={{ color: 'gray' }}>
                                    [参考] Wikipedia<span style={{ fontSize: '10px' }}>(ソシオニクス)</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </StyledTheoryDiagram>
    )
}

const StyledTheoryDiagram = styled.div`
width:500px;
margin: 0 auto;

.theoryDiagram{
    position:relative;
    height:330px;
    
    .parentTheory{
        position: absolute;
        left :130px;

    }
    .arrowsContainer {
        position:absolute;
        top:80px;
        left:160px;
        
        width:500px

        display: flex;
        justify-content: center;
    }
      
    .arrows {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0 auto;
    }
      
    .arrows > div {
        flex-basis: 50%;
        display: flex;
        justify-content: center;
    }    

    .theoryHeader{
      font-size:18px;
      font-weight:bold;
      color: #777
    }
    .childTheory{
        position:absolute;
        top:180px;
        display: flex;
        justify-content: space-between;
        width:500px;
        margin: 0px auto;
    }
    .theoryBox{
        width:250px;
        margin: 0 auto;
    }
    .theoryBody{
        width:220px;
        font-size:14px;
        border: solid 1px gray;
        border-radius:8px;
        text-align:left;
        margin: 8px auto;
        padding:10px;
    }
}
`;