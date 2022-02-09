import styled from "styled-components";

export const Content = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 34px;
  padding-top: 30px;
  @media (min-width: 920px) {
    flex-direction: row;
    margin: 0;
    padding-top: 100px;
    justify-content: space-evenly;
  }
  @media (min-width: 1150px) {
    padding-left: 130px;
    padding-right: 166px;
    justify-content: space-between;
  }
`;

export const Text = styled.h2`
  color: #707070;
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
`;
