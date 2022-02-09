import styled from "styled-components";

export const GameContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  margin-top: 35px;
`;

export const GameBar = styled.div<GameColorType>`
  max-width: 4.73px;
  min-width: 4.73px;
  height: 86px;
  border-radius: 100px;
  background-color: ${(props: GameColorType) =>
    props.bgColor !== undefined ? props.bgColor : "#7f3992"};
  margin-right: 12px;
`;

export const GameInfos = styled.p`
  display: flex;
  margin: 0;
  margin-bottom: 7px;
  color: #868686;
  margin-top: 10px;
`;

export const GameName = styled.p<GameColorType>`
  color: ${(props: GameColorType) =>
    props.bgColor ? props.bgColor : "#7f3992"};
  margin: 0;
  margin-right: 14px;
  font-style: italic;
  font-weight: bold;
`;

export const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GameNumbers = styled.p`
  margin: 0;
  font-weight: bold;
  font-style: italic;
  color: #868686;
`;

type GameColorType = {
  bgColor?: string;
};
