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
import { betActions } from "../store/bets-slice";
import { cartActions } from "../store/cart-slice";
import { gameActions } from "../store/games-slice";
import { numberAction } from "../store/numbers-slice";
import { userActions } from "../store/user-slice";

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
