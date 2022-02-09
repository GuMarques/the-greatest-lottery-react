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
} from "./styles";
import { betActions } from "../../store/slices/bets-slice";
import { cartActions } from "../../store/slices/cart-slice";
import { gameActions } from "../../store/slices/games-slice";
import { numberAction } from "../../store/slices/numbers-slice";
import { userActions } from "../../store/slices/user-slice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    dispatch(userActions.logout());
    dispatch(cartActions.clearCart());
    dispatch(gameActions.clearGames());
    dispatch(betActions.clearBets());
    dispatch(numberAction.clearNumbers());
  };

  return (
    <>
      <NavBarContainer>
        <LogoContainer onClick={() => navigate('/')}>
          <Logo>TGL</Logo>
          <LogoUnderline />
        </LogoContainer>
        <NavBarLinks>
          <NavLink id="account" to="/account">Account</NavLink>
          <ButtonLink id="logout" onClick={handlerLogout}>Sair</ButtonLink>
        </NavBarLinks>
      </NavBarContainer>
      <NavHr />
    </>
  );
};

export default NavBar;
