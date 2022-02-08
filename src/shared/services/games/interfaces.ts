import IListGamesResponse from "@interfaces/responses/listGamesResponse";

export interface IGame {
  listGames: () => Promise<IListGamesResponse>;
}
