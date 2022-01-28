import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { useAppSelector } from "../hooks/custom-useSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Background,
  NavBar,
  Logo,
  LogoContainer,
  LogoUnderline,
  NavBarLinks,
  NavLink,
  NavHr
} from "../components/GlobalComponents";

import {
  Body,
  Container,
  HeaderContainer,
  Title,
  FiltersText,
  FilterButton,
  GameContainer,
  InfosContainer,
  GameBar,
  GameNumbers,
  GameInfos,
  GameName
} from "../components/RecentGamesComponents"

const RecentGames = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);
  const handlerLogout = () => {
    console.log("Hello");
    dispatch(userActions.logout());
    console.log(token);
  };
  /* useEffect(() => {
    if(token.expires_at != "") {
      const expireAt = new Date(token.expires_at).getTime();
      var isExpired = expireAt - new Date().getTime() < 0;
      if(isExpired) {
        dispatch(userActions.logout());
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [token]) */
  return (
    <>
      <NavBar>
        <LogoContainer>
          <Logo>TGL</Logo>
          <LogoUnderline />
        </LogoContainer>
        <NavBarLinks>
          <NavLink to="/">Account</NavLink>
          <NavLink to="/">Sair</NavLink>
        </NavBarLinks>
      </NavBar>
      <NavHr />
      <Container>
        <HeaderContainer>
          <Title>RECENT GAMES</Title>
          <FiltersText>Filters</FiltersText>
          <FilterButton type="button">Lotofacil</FilterButton>
          <FilterButton type="button">Lotofacil</FilterButton>
          <FilterButton type="button">Lotofacil</FilterButton>
        </HeaderContainer>
        <GameContainer>
          <GameBar />
          <InfosContainer>
            <GameNumbers>01, 02, 03, 04, 05, 06, 07, 08, 09, 10</GameNumbers>
            <GameInfos>30/11/2020 - (R$ 2,50)</GameInfos>
            <GameName>Lotofácil</GameName>
          </InfosContainer>
        </GameContainer>
      </Container>
    </>
  );
};

export default RecentGames;
