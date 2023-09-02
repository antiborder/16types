import styled from "styled-components";

const StyledHelpPage = styled.div`
margin: 0 auto;
max-width: 800px;
padding: 0px 20px;
background-color: white;
text-align: center;

.subTitle{
    text-align:left;
    margin-top: 60px;
    font-size:20px;
    font-weight:bold;

    border-left: 8px solid gray;
    border-bottom: 1px solid gray;
    padding-left: 8px;
    margin-left: -16px;

}
.pageTitle{
    padding-top: 40px;
    font-size:32px;
}

.sentence {
    width: 500px;
    text-align:left;
    margin:40px auto 40px auto;
}
.diagram{
    display:flex;
    width: 500px;
    background-color:white;
    margin:60px auto;
    padding:8px;
    border-radius:16px;
}

.box{
    border: 1px solid lightgray;
    line-height: 1.5;
    border-radius:16px;
    padding:16px 16px 16px 36px;
}

 .toHome{
    padding: 60px;
 }

`
export default StyledHelpPage;