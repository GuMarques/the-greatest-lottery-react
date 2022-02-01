import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBarContainer = styled.section`
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
  background-color: #f7f7f7;
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