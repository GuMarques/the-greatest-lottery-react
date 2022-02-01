import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  ActionButton,
  AddToCartButton,
  BetBoard,
  BetBoardSubTitle,
  BetBoardTitle,
  BoardButton,
  ContentSection,
  FillBetText,
  GameDescriptionText,
  ActionButtonsContainer,
} from "../components/NewBetComponents";
import { FilterButton } from "../components/RecentGamesComponents";
import { useAppSelector } from "../hooks/custom-useSelector";
import game from "../interfaces/game";
import { getBetsFromAPI } from "../store/bets-slice";
import { getGamesFromAPI } from "../store/games-slice";
import { notificationActions } from "../store/notification-slice";
import { userActions } from "../store/user-slice";

const NewBet = () => {
  const [selectedGame, setSelectedGame] = useState<game | null>(null);
  const [boardButtons, setBoardButtons] = useState<JSX.Element[] | null>(null);
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const games: game[] = useAppSelector((state) => state.games.games).map(
    (game) => JSON.parse(game)
  );

  let selectedNumbers: number[] = [];

  useEffect(() => {
    if (token.expires_at !== "") {
      const expireAt = new Date(token.expires_at).getTime();
      var isExpired = expireAt - new Date().getTime() < 0;
      if (isExpired) {
        dispatch(userActions.logout());
        navigate("/login");
      } else {
        dispatch(getGamesFromAPI());
      }
    } else {
      navigate("/login");
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    firstBtnRef.current?.click();
  }, []);

  const buildGameButton: React.FC<game> = (game, index) => {
    if (index === 0) {
      return (
        <FilterButton
          className={selectedGame?.id === game.id ? "active" : undefined}
          type="button"
          bgColor={game.color}
          key={game.id}
          onClick={() => handlerGameButtonClick(game)}
          ref={firstBtnRef}
        >
          {game.type}
        </FilterButton>
      );
    } else {
      return (
        <FilterButton
          className={selectedGame?.id === game.id ? "active" : undefined}
          type="button"
          bgColor={game.color}
          key={game.id}
          onClick={() => handlerGameButtonClick(game)}
        >
          {game.type}
        </FilterButton>
      );
    }
  };

  const handlerGameButtonClick = (game: game) => {
    if (game.id !== selectedGame?.id) {
      selectedNumbers = [];
      setSelectedGame(game);
    }
  };

  useEffect(() => {
    let tempButtons: JSX.Element[] = [];
    for (let i = 1; selectedGame !== null && i <= selectedGame.range; i++) {
      tempButtons.push(
        <BoardButton
          onClick={() => handlerBoardButtonClick(i)}
          key={i}
          id={"boardButton-" + i}
          bgColor={selectedGame.color}
        >
          {i}
        </BoardButton>
      );
    }
    setBoardButtons(tempButtons);
  }, [selectedGame]);

  const handlerBoardButtonClick = (number: number) => {
    const button = document.querySelector("#boardButton-" + number);
    if (selectedNumbers.indexOf(number) === -1) {
      if (selectedNumbers.length === selectedGame?.max_number) {
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: "Você já selecionou o máximo de números para esse jogo.",
          })
        );
      } else {
        button?.classList.add("selected");
        selectedNumbers.push(number);
      }
    } else {
      button?.classList.remove("selected");
      selectedNumbers.splice(selectedNumbers.indexOf(number), 1);
    }
  };

  /* const handlerClearButtonClick = () => {
    selectedNumbers.forEach((value) => {
      console.log("teste");
      handlerBoardButtonClick(value);
    })
  } */

  return (
    <>
      <NavBar />
      <ContentSection>
        <BetBoard>
          <BetBoardTitle>
            <b>NEW BET</b> FOR {selectedGame?.type}
          </BetBoardTitle>
          <BetBoardSubTitle>Choose a game</BetBoardSubTitle>
          {games.map((game, index) => {
            return buildGameButton(game, index);
          })}
          <FillBetText>Fill your bet</FillBetText>
          <GameDescriptionText>{selectedGame?.description}</GameDescriptionText>
          <div>{boardButtons?.map((button) => button)}</div>
          <ActionButtonsContainer>
            <ActionButton /* onClick={handlerClearButtonClick} */>Clear Game</ActionButton>
            <ActionButton>Complete Bet</ActionButton>
            <AddToCartButton>Add to Cart</AddToCartButton>
          </ActionButtonsContainer>
        </BetBoard>
      </ContentSection>
    </>
  );
};

export default NewBet;
