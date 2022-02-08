import styled from "styled-components";

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #707070;
  border: 1px solid #e2e2e2;
  justify-content: space-between;
  border-radius: 10px;
  min-width: 317px;
  margin-top: 40px;
  height: fit-content;
  background: linear-gradient(
    to bottom,
    white 0%,
    white 50%,
    #f4f4f4 90%,
    #f4f4f4 100%
  );
`;

export const CartTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  font-style: italic;
  color: #707070;
  text-transform: uppercase;
  margin-left: 19px;
`;

export const CartItensContainer = styled.div`
  max-height: 450px;
  overflow-y: auto;
`;

export const CartGameContainer = styled.div`
  display: flex;
  margin-bottom: 32px;
  margin-top: 35px;
`;

export const CartInfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 16px;
`;

export const CartGameBar = styled.div<GameColorType>`
  max-width: 4.73px;
  min-width: 4.73px;
  height: 86px;
  border-bottom-left-radius: 100px;
  border-top-left-radius: 100px;
  background-color: ${(props: GameColorType) =>
    props.bgColor !== undefined ? props.bgColor : "#7f3992"};
  margin-right: 12px;
`;

export const CartGameNumbers = styled.p`
  margin: 0;
  font-weight: bold;
  font-style: italic;
  color: #868686;
`;

export const CartGameInfos = styled.p`
  display: flex;
  margin: 0;
  margin-bottom: 7px;
  color: #868686;
  margin-top: 10px;
`;

export const CartGameNameContainer = styled.div`
  display: flex;
  margin-top: 6px;
`;

export const CartGameName = styled.p<GameColorType>`
  color: ${(props: GameColorType) =>
    props.bgColor !== undefined ? props.bgColor : "#7f3992"};
  margin: 0;
  margin-right: 14px;
  font-style: italic;
  font-weight: bold;
  text-transform: uppercase;
  width: fit-content;
`;

export const CartGamePrice = styled.p`
  margin: 0;
  font-size: 16px;
  color: #868686;
`;

export const TrashIcon = styled.img`
  height: 24px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 17px;
  margin-right: 14.4px;
  cursor: pointer;
`;

export const CartTotal = styled.p`
  font-size: 24px;
  margin: 0;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 47px;
  margin-top: 8px;
`;

export const SaveButton = styled.button`
  color: #27c383;
  font-size: 35px;
  font-style: italic;
  border: none;
  border-top: 1px solid #e2e2e2;
  padding: 27px;
  background-color: #f4f4f4;
  width: 100%;
  margin-bottom: 5px;
  cursor: pointer;
`;

export const EmptyCartText = styled.p`
  font-size: 1.4rem;
  font-style: italic;
  margin-top: 35px;
  margin-bottom: 40px;
  margin-left: 19px;
  margin-right: 12px;
`;

export const CustomSaveArrow = styled.img`
  width: 24.32px;
  filter: invert(62%) sepia(42%) saturate(702%) hue-rotate(104deg)
    brightness(93%) contrast(90%);
`;

type GameColorType = {
  bgColor?: string | null;
};
