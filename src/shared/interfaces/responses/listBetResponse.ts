 interface Type {
  id: number;
  type: string;
}

export default interface IListBetResponse {
  id: number;
  user_id: number;
  game_id: number;
  choosen_numbers: string;
  price: number;
  created_at: Date;
  type: Type;
}
