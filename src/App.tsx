import styled from "styled-components";

import Wiget from "components/widget/Widget";

function App() {
  return (
    <AppStyled>
      <ChildContainer>
        <TextStyled>
          <TitleStyled>Crypto Exchange</TitleStyled>
          <SubtitleStyled>Exchange fast and easy</SubtitleStyled>
        </TextStyled>
        <Wiget />
      </ChildContainer>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;

  color: black;
`;

const ChildContainer = styled.div`
  padding: 75px;
  width: 960px;
  min-height: 200px;
  display: flex;
  gap: 50px;
  flex-direction: column;
`;

const TextStyled = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const TitleStyled = styled.div`
  color: #282828;
  font-size: 50px;
  font-style: normal;
  font-weight: 300;
  line-height: 120%;
`;

const SubtitleStyled = styled.div`
  color: #282828;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

export default App;
