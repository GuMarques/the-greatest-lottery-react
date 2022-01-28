export default class Bet {
  id: number;
  user_id: number;
  game_id: number;
  choosen_numbers: string;
  price: number;
  created_at: Date;
  type: {
    id: number;
    type: string;
  };
  constructor(
    id: number,
    user_id: number,
    game_id: number,
    choosen_numbers: string,
    price: number,
    created_at: string,
    type_id: number,
    type: string
  ) {
    this.id = id;
    this.user_id = user_id;
    this.game_id = game_id;
    this.choosen_numbers = choosen_numbers;
    this.price = price;
    this.created_at = new Date(created_at);
    this.type = {
      id: type_id,
      type: type,
    };
  }
}
