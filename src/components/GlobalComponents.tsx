import styled from "styled-components";
import { Link } from "react-router-dom";

export const Background = styled.section`
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f7f7f7;
  margin-top: 40px;
  margin-bottom: 40px;
  @media (min-width: 860px) {
    flex-direction: row;
    margin: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
`;

export const StartTitle = styled.h1`
  color: #707070;
  font-size: 65px;
  text-align: center;
  margin: 0;
  font-style: italic;
`;

export const MiddleTitle = styled.h2`
  color: #ffffff;
  background-color: #b5c401;
  font-size: 22px;
  border-radius: 100px;
  width: 144px;
  height: 39px;
  text-align: center;
  vertical-align: middle;
  font-style: italic;
  margin: 0;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const EndTitle = styled.h1`
  color: #707070;
  font-size: 83px;
  text-align: center;
  margin: 0;
  font-style: italic;
`;