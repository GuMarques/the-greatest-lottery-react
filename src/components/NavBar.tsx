import { useDispatch } from "react-redux";
import {
  NavBarContainer,
  Logo,
  LogoContainer,
  LogoUnderline,
  NavBarLinks,
  NavLink,
  NavHr,
  ButtonLink,
} from "../components/NavBarComponents";
import { userActions } from "../store/user-slice";

const NavBar = () => {

  const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <>
      <NavBarContainer>
        <LogoContainer>
          <Logo>TGL</Logo>
          <LogoUnderline />
        </LogoContainer>
        <NavBarLinks>
          <NavLink to="/">Account</NavLink>
          <ButtonLink onClick={handlerLogout}>Sair</ButtonLink>
        </NavBarLinks>
      </NavBarContainer>
      <NavHr />
    </>
  );
};

export default NavBar;
