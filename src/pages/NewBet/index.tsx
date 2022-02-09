import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "@components/Navbar";
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
  SaveButton,
  CartTotal,
  CartItensContainer,
  EmptyCartText,
  CustomSaveArrow,
  GamesButtonContainer,
} from "./styled";
import { useAppSelector } from "@hooks/custom-useSelector";
import game from "@interfaces/game";
import { getGamesFromAPI } from "@slices/games-slice";
import { notificationActions } from "@slices/notification-slice";
import { numberAction } from "@slices/numbers-slice";
import { userActions } from "@slices/user-slice";
import { addBetToCart, cartActions, sendBetToAPI } from "@slices/cart-slice";
import CartItem from "@components/CartItem";
import arrow from "@icons/arrow.svg";
import Swal from "sweetalert2";
import ConvertPrice from "@utils/convert-monetary-value";
import GameButton from "@components/GameButton";
import checkToken from "@utils/checkToken";

const NewBet = () => {
  const [selectedGame, setSelectedGame] = useState<game | null>(null);
  const [boardButtons, setBoardButtons] = useState<JSX.Element[] | null>(null);
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const games: game[] = useAppSelector((state) => state.games.games).map(
    (game) => JSON.parse(game)
  );
  const cart = useAppSelector((state) => state.cart);

  const numbers = useAppSelector((state) => state.numbers);

  if (!checkToken()) {
    dispatch(userActions.logout());
    navigate("/login");
  }

  useEffect(() => {
    firstBtnRef.current?.click();
  }, [firstBtnRef.current]);

  useEffect(() => {
    dispatch(getGamesFromAPI());
  }, [dispatch, navigate]);

  const buildGameButton: React.FC<game> = (game, index) => {
    if (index === 0) {
      return (
        <GameButton
          active={selectedGame?.id === game.id}
          game={game}
          handleClick={() => handlerGameButtonClick(game)}
          ref={firstBtnRef}
          key={game.type}
        />
      );
    } else {
      return (
        <GameButton
          active={selectedGame?.id === game.id}
          game={game}
          handleClick={() => handlerGameButtonClick(game)}
          key={game.type}
        />
      );
    }
  };

  const handlerGameButtonClick = (game: game) => {
    if (game.id !== selectedGame?.id) {
      dispatch(numberAction.clearNumbers());
      setSelectedGame(game);
    }
  };

  const handlerBoardButtonClick = useCallback(
    (number: number) => {
      const button = document.querySelector("#boardButton-" + number);
      if (numbers.indexOf(number) === -1) {
        if (numbers.length === selectedGame?.max_number) {
          dispatch(
            notificationActions.runNotification({
              status: "error",
              message:
                "You have already selected the maximum numbers for this game.",
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
    },
    [numbers, dispatch, selectedGame]
  );

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
  }, [selectedGame, numbers, handlerBoardButtonClick]);

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
            "You need to select " +
            numbersToFill +
            " more numbers to complete this bet.",
        })
      );
    } else {
      const game = {
        name: selectedGame.type,
        price: selectedGame.price,
        game_id: selectedGame.id,
        color: selectedGame.color,
        numbers: [...numbers].sort(function (a: number, b: number) {
          return a - b;
        }),
      };
      handlerClearButtonClick();
      dispatch(addBetToCart(cart, game));
    }
  };

  const handlerRemoveCartItem = (game: {
    name: string;
    price: number;
    color: string;
    game_id: number;
    numbers: number[];
  }) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const index = cart.games.indexOf(game);
        dispatch(cartActions.removeItem({ index: index, price: game.price }));
        Swal.fire("Deleted!", "This bet was removed from your cart", "success");
      }
    });
  };

  const handlerSaveClick = () => {
    dispatch(sendBetToAPI(cart));
    navigate("/");
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
          <GamesButtonContainer>
            {games.map((game, index) => {
              return buildGameButton(game, index);
            })}
          </GamesButtonContainer>
          <FillBetText>Fill your bet</FillBetText>
          <GameDescriptionText>{selectedGame?.description}</GameDescriptionText>
          <div>{boardButtons?.map((button) => button)}</div>
          <ActionButtonsContainer>
            <ActionButton onClick={handlerCompleteBetClick} id="completebet">
              Complete Bet
            </ActionButton>
            <ActionButton onClick={handlerClearButtonClick} id="cleargame">
              Clear Game
            </ActionButton>
            <AddToCartButton onClick={handlerAddToCartClick} id="addtocart">
              Add to Cart
            </AddToCartButton>
          </ActionButtonsContainer>
        </BetBoard>
        <CartContainer>
          <CartTitle>Cart</CartTitle>
          <CartItensContainer>
            {cart.games.map((game) => {
              return (
                <CartItem
                  game={game}
                  handlerRemoveCartItem={handlerRemoveCartItem}
                  key={game.name + game.numbers.toString()}
                />
              );
            })}
            {cart.games.length === 0 ? (
              <EmptyCartText>
                Empty cart, place a bet to add it here.
              </EmptyCartText>
            ) : null}
          </CartItensContainer>
          <CartTotal>CART TOTAL: R$ {ConvertPrice(cart.total)}</CartTotal>
          <SaveButton onClick={handlerSaveClick} id="save">
            Save <CustomSaveArrow src={arrow} />
          </SaveButton>
        </CartContainer>
      </ContentSection>
    </>
  );
};

export default NewBet;
