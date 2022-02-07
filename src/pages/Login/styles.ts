import styled from "styled-components";
import { Link } from "react-router-dom";

export const ForgetPasswordLink = styled(Link)`
  font-size: 17px;
  font-style: italic;
  color: #c1c1c1;
  text-decoration: none;
  padding-top: 23.5px;
  width: fit-content;
  align-self: flex-end;
  :visited & :active {
    color: #c1c1c1;
  }
  :hover {
    color: #9d9d9d;
  }
`;
