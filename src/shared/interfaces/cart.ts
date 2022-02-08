export default interface ICart {
  games: {
    name: string;
    price: number;
    color: string,
    game_id: number;
    numbers: number[];
  }[];
  total: number;
}
