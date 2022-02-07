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

const NavBar = () => {

  const dispatch = useDispatch();

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
