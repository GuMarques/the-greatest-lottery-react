import styled from "styled-components";

export const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 130px;
  margin-right: 166px;
  margin-bottom: 50px;
  @media (min-width: 1130px) {
    flex-direction: row;
    margin-left: 130px;
    margin-right: 166px;
    justify-content: space-between;
  }
`;

export const BetBoard = styled.div`
  margin-right: 40px;
`;

export const BetBoardTitle = styled.h1`
  text-transform: uppercase;
  color: #707070;
  font-weight: 300;
  font-size: 24px;
  margin: 0;
  margin-top: 72px;
`;

export const BetBoardSubTitle = styled.h3`
  color: #868686;
  font-size: 17px;
  font-style: italic;
  margin: 0;
  margin-bottom: 20px;
  margin-top: 33px;
`;

export const FillBetText = styled.p`
  color: #868686;
  font-style: italic;
`;

export const GameDescriptionText = styled.p`
  color: #868686;
  line-height: 24px;
  font-style: italic;
  margin-right: 72px;
  margin-bottom: 27px;
  font-size: 17px;
`;

export const BoardButton = styled.button<GameColorType>`
  background-color: #adc0c4;
  border-radius: 100%;
  border: none;
  font-size: 20px;
  line-height: 24px;
  color: white;
  padding: 20px;
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 20px;
  width: 63px;
  height: 65px;
  font-weight: bold;
  :hover {
    background-color: #95a5a8;
  }
  &.selected {
    background-color: ${(props: GameColorType) =>
      props.bgColor !== undefined ? props.bgColor : "#7f3992"};
  }
  cursor: pointer;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: start;
`;

export const ActionButton = styled.button`
  background-color: #f7f7f7;
  border: 1px solid #27c383;
  font-size: 16px;
  color: #27c383;
  border-radius: 10px;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 25px;
  padding-right: 25px;
  margin-top: 44px;
  margin-right: 25px;
  :hover {
    background-color: #27c383;
    color: white;
  }
  cursor: pointer;
`;

export const AddToCartButton = styled.button`
  background-color: #27c383;
  border: none;
  font-size: 16px;
  color: white;
  border-radius: 10px;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 25px;
  padding-right: 25px;
  margin-top: 44px;
  margin-left: auto;
  cursor: pointer;
`;

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
