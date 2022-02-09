import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-bottom: auto;
  @media (min-width: 860px) {
    margin-top: auto;
  }
`;

export const StartTitle = styled.h1`
  color: #707070;
  font-size: 45px;
  text-align: center;
  margin: 0;
  font-style: italic;
  @media (min-width: 860px) {
    font-size: 65px;
  }
`;

export const MiddleTitle = styled.h2`
  color: #ffffff;
  background-color: #b5c401;
  font-size: 16px;
  border-radius: 100px;
  width: 72px;
  height: 24px;
  text-align: center;
  vertical-align: middle;
  font-style: italic;
  margin: 0;
  margin-top: 15px;
  margin-bottom: 10px;
  line-height: 24px;
  @media (min-width: 860px) {
    font-size: 22px;
    margin-top: 30px;
    margin-bottom: 20px;
    width: 144px;
    height: 39px;
    line-height: 39px;
  }
`;

export const EndTitle = styled.h1`
  color: #707070;
  font-size: 54px;
  text-align: center;
  margin: 0;
  font-style: italic;
  @media (min-width: 860px) {
    font-size: 83px;
  }
`;
