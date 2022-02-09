import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/user-slice";
import { useAppSelector } from "../../shared/hooks/custom-useSelector";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";

import {
  Container,
  HeaderContainer,
  Title,
  FiltersText,
  NewBetLink,
  CustomNewBetArrow,
  GamesButtonContainer,
} from "./styles";
import { getBetsFromAPI } from "@slices/bets-slice";
import { getGamesFromAPI } from "@slices/games-slice";
import game from "@interfaces/game";
import arrow from "@icons/arrow.svg";
import { AuthText } from "@global/global-styles";
import GameButton from "@components/GameButton";
import RecentGame from "@components/RecentGame";
import checkToken from "@utils/checkToken";

const RecentGames: React.FC = () => {
  const [filteredType, setFilteredType] = useState<string[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bets = useAppSelector((state) => state.bets);
  const games: game[] = useAppSelector((state) => state.games.games).map(
    (game) => JSON.parse(game)
  );

  if (!checkToken()) {
    dispatch(userActions.logout());
    navigate("/login");
  }

  useEffect(() => {
    dispatch(getGamesFromAPI());
  }, []);

  useEffect(() => {
    dispatch(getBetsFromAPI(filteredType));
  }, [filteredType]);

  const handleFilter = (game: game) => {
    const gameType = game.type;
    setFilteredType((prevState) => {
      let tempArray;
      if (prevState.includes(gameType)) {
        tempArray = prevState.filter((value) => {
          return value !== gameType;
        });
      } else {
        tempArray = prevState.concat(gameType);
      }
      return tempArray;
    });
  };

  return (
    <>
      <NavBar />
      <Container>
        <HeaderContainer>
          <Title>RECENT GAMES</Title>
          <FiltersText>Filters</FiltersText>
          <GamesButtonContainer>
            {games.map((game) => {
              return (
                <GameButton
                  key={game.id}
                  game={game}
                  handleClick={() => handleFilter(game)}
                  active={filteredType.indexOf(game.type) !== -1}
                />
              );
            })}
          </GamesButtonContainer>
          <NewBetLink to="/new-bet">
            New Bet <CustomNewBetArrow src={arrow} />
          </NewBetLink>
        </HeaderContainer>
        <div id="recent-games">
          {bets.map((bet) => {
            const parsedBet = JSON.parse(bet);
            return (
              <RecentGame
                bet={parsedBet}
                key={parsedBet.id + "-" + parsedBet.user_id}
              />
            );
          })}
        </div>
        {bets.length === 0 ? (
          <AuthText>
            You don't have any games in this cofiguration, make a bet!
          </AuthText>
        ) : null}
      </Container>
    </>
  );
};

export default RecentGames;
