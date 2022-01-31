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

export const NavBar = styled.section`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  padding-left: 130px;
  padding-right: 166px;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.h1`
  font-size: 44px;
  font-weight: bold;
  font-style: italic;
  color: #707070;
  margin: 0;
`;

export const LogoUnderline = styled.div`
  height: 7px;
  background-color: #b5c401;
  border-radius: 6px;
  width: 100%;
`;

export const NavBarLinks = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ButtonLink = styled.button`
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  color: #707070;
  margin-left: 28.5px;
  margin-right: 28.5px;
  line-height: 70px;
  text-decoration: none;
  background-color: white;
  border: none;
  padding: 0;
  cursor: pointer;
  height: 60px;
  :visited & :active {
    color: #707070;
  }
  :hover {
    color: #626262;
  }
`;

export const NavLink = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  color: #707070;
  margin-left: 28.5px;
  margin-right: 28.5px;
  line-height: 70px;
  text-decoration: none;
  :visited & :active {
    color: #707070;
  }
  :hover {
    color: #626262;
  }
`;

export const NavHr = styled.hr`
  border: 1px solid #ebebeb;
  /* width: 100%; */
  height: 0;
  margin: 0;
  margin-top: -9px;
  width: 100vw;
`;
