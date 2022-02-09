import styled from "styled-components";

export const Button = styled.button<GameColorType>`
  border-radius: 100px;
  border: 2px solid
    ${({ bgColor }: GameColorType) =>
      bgColor !== undefined ? bgColor : "#7f3992"};
  background-color: white;
  width: 113px;
  height: 34px;
  font-size: 14px;
  font-style: italic;
  color: ${({ bgColor }: GameColorType) =>
    bgColor !== undefined ? bgColor : "#7f3992"};
  margin-right: 25px;
  font-weight: bold;
  :hover {
    background-color: ${({ bgColor }: GameColorType) =>
      bgColor !== undefined ? bgColor : "#7f3992"};
    color: white;
  }
  &.active {
    background-color: ${({ bgColor }: GameColorType) =>
      bgColor !== undefined ? bgColor : "#7f3992"};
    color: white;
  }
  cursor: pointer;
`;

type GameColorType = {
  bgColor?: string;
};