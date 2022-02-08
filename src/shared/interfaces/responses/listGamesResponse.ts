interface Type {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
}

export default interface IListGamesResponse {
  min_cart_value: number;
  types: Type[];
}
