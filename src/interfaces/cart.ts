export default interface Cart {
  games: {
    name: string;
    price: number;
    game_id: number;
    numbers: number[];
  }[];
  total: number;
}
