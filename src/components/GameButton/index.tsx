import game from "@interfaces/game";
import { Button } from "./styles";
import React, { forwardRef } from "react";

const GameButton = forwardRef<
  HTMLButtonElement,
  {
    game: game;
    handleClick: Function;
    active: boolean;
  }
>((props, ref) => {
  const { game } = props;
  return (
    <Button
      className={props.active ? "active" : undefined}
      type="button"
      bgColor={game.color}
      key={game.id}
      id={game.type + "-" + game.id}
      onClick={() => props.handleClick(game)}
      ref={ref}
    >
      {game.type}
    </Button>
  );
});

export default GameButton;
