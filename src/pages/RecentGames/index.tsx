import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/user-slice";
import { useAppSelector } from "../../shared/hooks/custom-useSelector";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

import {
  Container,
  HeaderContainer,
  Title,
  FiltersText,
  GameContainer,
  InfosContainer,
  GameBar,
  GameNumbers,
  GameInfos,
  GameName,
  NewBetLink,
  CustomNewBetArrow,
} from "./styles";
import { getBetsFromAPI } from "@slices/bets-slice";
import bet from "@interfaces/bet";
import { getGamesFromAPI } from "@slices/games-slice";
import game from "@interfaces/game";
import arrow from "@icons/arrow.svg";
import { AuthText, GameButton } from "@global/global-styles";

const RecentGames: React.FC = () => {
  const [filteredId, setFilteredId] = useState<number | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);
  const bets = useAppSelector((state) => state.bets);
  const games: game[] = useAppSelector((state) => state.games.games).map(
    (game) => JSON.parse(game)
  );

  useEffect(() => {
    if (token.expires_at !== "") {
      const expireAt = new Date(token.expires_at).getTime();
      var isExpired = expireAt - new Date().getTime() < 0;
      if (isExpired) {
        dispatch(userActions.logout());
        navigate("/login");
      } else {
        dispatch(getBetsFromAPI(token.token));
        dispatch(getGamesFromAPI());
      }
    } else {
      navigate("/login");
    }
  }, [token, dispatch, navigate]);

  const formatDate = (data: Date): string => {
    const dd = data.getDate();
    const mm = data.getMonth() + 1;
    const yyyy = data.getFullYear();
    let formatedDate: string;
    if (dd < 10) {
      formatedDate = "0" + dd;
    } else {
      formatedDate = "" + dd;
    }
    if (mm < 10) {
      formatedDate += "/0" + mm;
    } else {
      formatedDate += "/" + mm;
    }
    return formatedDate + "/" + yyyy;
  };

  const buildGameButton: React.FC<game> = (game) => {
    return (
      <GameButton
        className={filteredId === game.id ? "active" : undefined}
        type="button"
        bgColor={game.color}
        key={game.id}
        onClick={() => handleFilter(game.id)}
      >
        {game.type}
      </GameButton>
    );
  };

  const handleFilter = (gameId: number) => {
    setFilteredId((prevState) => (prevState === gameId ? null : gameId));
  };

  const buildRecentGame: React.FC<bet> = (bet) => {
    if (filteredId === null || filteredId === bet.game_id) {
      const date = formatDate(new Date(bet.created_at));
      const game = games.find((game) => game.id === bet.game_id);
      return (
        <GameContainer key={bet.id + "-" + bet.user_id}>
          <GameBar bgColor={game?.color} />
          <InfosContainer>
            <GameNumbers>{bet.choosen_numbers.replace(/,/g, ", ")}</GameNumbers>
            <GameInfos>
              {date} - (R$ {bet.price.toFixed(2)})
            </GameInfos>
            <GameName bgColor={game?.color}>{bet.type.type}</GameName>
          </InfosContainer>
        </GameContainer>
      );
    } else return null;
  };
  return (
    <>
      <NavBar />
      <Container>
        <HeaderContainer>
          <Title>RECENT GAMES</Title>
          <FiltersText>Filters</FiltersText>
          {games.map((game) => {
            return buildGameButton(game);
          })}
          <NewBetLink to="/new-bet">
            New Bet <CustomNewBetArrow src={arrow} />
          </NewBetLink>
        </HeaderContainer>
        {bets.map((bet) => {
          return buildRecentGame(JSON.parse(bet));
        })}
        {
          bets.length === 0 ? <AuthText>You don't have any games yet, make a bet!</AuthText> : null
        }
      </Container>
    </>
  );
};

export default RecentGames;
