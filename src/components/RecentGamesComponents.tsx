import styled from "styled-components";

export const Body = styled.div`
  min-height: 100vh;
  background-color: #f7f7f7;
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding-left: 130px;
  padding-right: 200px;
  margin-top: 69px;
`;

export const HeaderContainer = styled.div`
  display: flex;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  font-style: italic;
  color: #707070;
  margin: 0;
`;

export const FiltersText = styled.p`
  font-size: 17px;
  font-style: italic;
  color: #868686;
  margin: 0;
  margin-left: 45px;
  margin-right: 15px;
  margin-top: 4px;
`;

export const FilterButton = styled.button`
  border-radius: 100px;
  border: 2px #7f3992 solid;
  background-color: white;
  width: 113px;
  height: 34px;
  font-size: 14px;
  font-style: italic;
  color: #7f3992;
  margin-right: 25px;
  font-weight: bold;
`;

export const GameContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  margin-top: 35px;
`;

export const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GameBar = styled.div`
  max-width: 4.73px;
  min-width: 4.73px;
  height: 86px;
  border-radius: 100px;
  background-color: #7f3992;
  margin-right: 12px;
`;

export const GameNumbers = styled.p`
  margin: 0;
  font-weight: bold;
  font-style: italic;
  color: #868686;
`;

export const GameInfos = styled.p`
  display: flex;
  margin: 0;
  margin-bottom: 7px;
  color: #868686;
  margin-top: 10px;
`;

export const GameName = styled.p`
  color: #7f3992;
  margin: 0;
  margin-right: 14px;
  font-style: italic;
  font-weight: bold;
`;
