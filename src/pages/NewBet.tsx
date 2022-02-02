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
  CartContainer,
  CartTitle,
  CartGameBar,
  CartGameContainer,
  CartGameInfos,
  CartGameName,
  CartGameNumbers,
  CartInfosContainer,
  TrashIcon,
  SaveButton,
  CartTotal,
  CartItensContainer,
  CartGameNameContainer,
  CartGamePrice,
  EmptyCartText,
} from "../components/NewBetComponents";
import { FilterButton } from "../components/RecentGamesComponents";
import { useAppSelector } from "../hooks/custom-useSelector";
import game from "../interfaces/game";
import { getGamesFromAPI } from "../store/games-slice";
import { notificationActions } from "../store/notification-slice";
import { numberAction } from "../store/numbers-slice";
import { userActions } from "../store/user-slice";
import trash from "../assets/icons/trash.svg";
import { addBetToCart, cartActions, sendBetToAPI } from "../store/cart-slice";

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
  const cart = useAppSelector((state) => state.cart);

  const numbers = useAppSelector((state) => state.numbers);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

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
      dispatch(numberAction.clearNumbers());
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
  }, [selectedGame, numbers]);

  const handlerBoardButtonClick = (number: number) => {
    const button = document.querySelector("#boardButton-" + number);
    if (numbers.indexOf(number) === -1) {
      if (numbers.length === selectedGame?.max_number) {
        dispatch(
          notificationActions.runNotification({
            status: "error",
            message: "Você já selecionou o máximo de números para esse jogo.",
          })
        );
      } else {
        button?.classList.toggle("selected");
        dispatch(numberAction.addNumber(number));
      }
    } else {
      button?.classList.toggle("selected");
      dispatch(numberAction.removeNumber(number));
    }
  };

  const handlerClearButtonClick = () => {
    numbers.forEach((value) => {
      handlerBoardButtonClick(value);
    });
  };

  const handlerCompleteBetClick = () => {
    const numbersToComplete = (selectedGame?.max_number || 0) - numbers.length;
    const tempNumbers = [...numbers];

    for (let i = 0; i < numbersToComplete; i++) {
      let randomNumber = Math.floor(
        Math.random() * (selectedGame?.range || 0) + 1
      );
      if (tempNumbers.indexOf(randomNumber) === -1) {
        handlerBoardButtonClick(randomNumber);
        tempNumbers.push(randomNumber);
      } else {
        i--;
      }
    }
  };

  const handlerAddToCartClick = () => {
    if (numbers.length !== selectedGame?.max_number) {
      const numbersToFill = (selectedGame?.max_number || 0) - numbers.length;
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message:
            "Você precisa selecionar mais " +
            numbersToFill +
            " para realizar essa aposta.",
        })
      );
    } else {
      const game = {
        name: selectedGame.type,
        price: selectedGame.price,
        game_id: selectedGame.id,
        numbers: [...numbers].sort(function (a: number, b: number) {
          return a - b;
        }),
      };
      handlerClearButtonClick();
      dispatch(addBetToCart(cart, game));
    }
  };

  const buildCartItem = (game: {
    name: string;
    price: number;
    game_id: number;
    numbers: number[];
  }): JSX.Element => {
    const gameColor = games.find((item) => item.id === game.game_id);
    const pNumbers = game.numbers.map((number, index, array) => {
      let response = "";
      if (index !== 0) {
        response += ", ";
      }
      if (number <= 9) {
        response += "0";
      }
      response += "" + number;
      if (index + 1 === array.length) {
        response += ".";
      }
      return response;
    });
    return (
      <CartGameContainer key={game.name + game.numbers.toString()}>
        <TrashIcon onClick={() => handlerRemoveCartItem(game)} src={trash} />
        <CartGameBar bgColor={gameColor?.color} />
        <CartInfosContainer>
          <CartGameNumbers>{pNumbers}</CartGameNumbers>
          <CartGameNameContainer>
            <CartGameName bgColor={gameColor?.color}>{game.name}</CartGameName>
            <CartGamePrice>
              R$ {game.price.toFixed(2).replace(".", ",")}
            </CartGamePrice>
          </CartGameNameContainer>
        </CartInfosContainer>
      </CartGameContainer>
    );
  };

  const handlerRemoveCartItem = (game: {
    name: string;
    price: number;
    game_id: number;
    numbers: number[];
  }) => {
    dispatch(cartActions.removeItem(game));
  };

  const handlerSaveClick = () => {
    dispatch(sendBetToAPI(token.token, cart));
  };

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
            <ActionButton onClick={handlerClearButtonClick}>
              Clear Game
            </ActionButton>
            <ActionButton onClick={handlerCompleteBetClick}>
              Complete Bet
            </ActionButton>
            <AddToCartButton onClick={handlerAddToCartClick}>
              Add to Cart
            </AddToCartButton>
          </ActionButtonsContainer>
        </BetBoard>
        <CartContainer>
          <CartTitle>Cart</CartTitle>
          <CartItensContainer>
            {cart.games.map((game) => {
              return buildCartItem(game);
            })}
            {cart.games.length === 0 ? (
              <EmptyCartText>
                Empty cart, place a bet to add it here.
              </EmptyCartText>
            ) : null}
          </CartItensContainer>
          <CartTotal>
            CART TOTAL: R$ {cart.total.toFixed(2).replace(".", ",")}
          </CartTotal>
          <SaveButton onClick={handlerSaveClick}>Save </SaveButton>
        </CartContainer>
      </ContentSection>
    </>
  );
};

export default NewBet;
