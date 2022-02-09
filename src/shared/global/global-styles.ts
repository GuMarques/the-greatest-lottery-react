import styled from "styled-components";

export const Background = styled.section`
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f7f7f7;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 34px;
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

export const CustomInput = styled.input`
  font-size: 17px;
  font-weight: bold;
  font-style: italic;
  min-height: 80px;
  border: none;
  outline: none;
  color: #9d9d9d;
  ::placeholder {
    color: #9d9d9d;
  }
`;

export const CustomGreenArrow = styled.img`
  width: 24.32px;
  filter: invert(83%) sepia(32%) saturate(4604%) hue-rotate(19deg)
    brightness(95%) contrast(99%);
  :hover {
    filter: invert(54%) sepia(73%) saturate(1290%) hue-rotate(31deg)
      brightness(99%) contrast(101%);
  }
`;

export const CustomGrayArrow = styled.img`
  width: 24.32px;
  filter: invert(45%) sepia(0%) saturate(1%) hue-rotate(29deg) brightness(95%)
    contrast(92%);
  :hover {
    filter: invert(35%) sepia(0%) saturate(47%) hue-rotate(210deg)
      brightness(104%) contrast(92%);
  }
`;

export const CustomInvertedGrayArrow = styled.img`
  width: 24.32px;
  transform: scaleX(-1);
  filter: invert(45%) sepia(0%) saturate(1%) hue-rotate(29deg) brightness(95%)
    contrast(92%);
  :hover {
    filter: invert(35%) sepia(0%) saturate(47%) hue-rotate(210deg)
      brightness(104%) contrast(92%);
  }
`;

/* FORM COMPONENTS */

export const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 25px #00000014;
  border: 1px solid #dddddd;
  border-radius: 14px;
  min-width: 300px;
  padding-right: 27px;
  padding-left: 30px;
  background-color: white;
`;

export const CustomHr = styled.hr`
  width: calc(100% + 57px);
  margin: 0;
  margin-left: -30px;
  border: 1px solid #ebebeb;
`;

export const CustomConfirmButton = styled.button`
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  color: #b5c401;
  border: none;
  background-color: white;
  padding-bottom: 23px;
  padding-top: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  :hover {
    color: #9fad00;
  }
`;

export const CustomBackButton = styled.button`
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  color: #707070;
  border: none;
  background-color: #f7f7f7;
  margin-top: 30px;
  cursor: pointer;
  :hover {
    color: #5f5f5f;
  }
`;

export const AuthText = styled.h2`
  color: #707070;
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
`;
