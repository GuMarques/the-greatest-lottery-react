import IListGamesResponse from "@interfaces/responses/listGamesResponse";
import instance from "@services/axios.config";

const Game = () => {
  async function listGames(): Promise<IListGamesResponse> {
    return instance.get("/cart_games");
  }
  return { listGames };
};

export default Game;
