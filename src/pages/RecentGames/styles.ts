import { Link } from "react-router-dom";
import styled from "styled-components";

export const Body = styled.div`
  min-height: 100vh;
  background-color: #f7f7f7;
`;

export const Container = styled.section`
  display: flex;
  margin-top: 69px;
  flex-direction: column;
  /* justify-content: center; */
  padding-left: 40px;
  padding-right: 8px;
  @media (min-width: 996px) {
    margin: 0;
    margin-top: 69px;
    padding-left: 84px;
    padding-right: 40px;
  }
  @media (min-width: 1170px) {
    padding-left: 166px;
    padding-right: 130px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-style: italic;
  color: #707070;
  margin: 0;
  font-size: 24px;
  width: 100%;
  margin-bottom: 8px;
  @media (min-width: 996px) {
    margin: 0;
    width: fit-content;
    min-width: 194.5px;
  }
`;

export const FiltersText = styled.p`
  font-size: 17px;
  font-style: italic;
  color: #868686;
  margin: 0;
  margin-left: 0px;
  margin-right: 5px;
  margin-top: 4px;
  margin-bottom: 8px;
  min-width: 54.8px;
  @media (min-width: 996px) {
    margin-left: 15px;
  }
`;

export const NewBetLink = styled(Link)`
  font-size: 24px;
  color: #b5c401;
  font-weight: bold;
  font-style: italic;
  text-decoration: none;
  margin-left: auto;
  min-width: 125px;
  max-width: fit-content;
  flex: 1;
  :hover {
    color: #9dac02;
  }
`;

export const GamesButtonContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  flex-direction: column;
  button {
    margin-bottom: 5px;
  }
  @media (min-width: 450px) {
    flex-direction: row;
    button {
    margin-bottom: 0;
  }
  }
`;

export const CustomNewBetArrow = styled.img`
  height: 20.27px;
  filter: invert(83%) sepia(32%) saturate(4604%) hue-rotate(19deg)
    brightness(95%) contrast(99%);
  :hover {
    filter: invert(54%) sepia(73%) saturate(1290%) hue-rotate(31deg)
      brightness(99%) contrast(101%);
  }
`;
