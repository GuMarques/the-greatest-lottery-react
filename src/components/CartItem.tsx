import {
  CartGameBar,
  CartGameContainer,
  CartGameName,
  CartGameNameContainer,
  CartGameNumbers,
  CartGamePrice,
  CartInfosContainer,
  TrashIcon,
} from "./CartComponents";
import trash from "../assets/icons/trash.svg";

interface game {
  name: string;
  price: number;
  color: string;
  game_id: number;
  numbers: number[];
}

const CartItem: React.FC<{ game: game; handlerRemoveCartItem: Function }> = (
  props
) => {
  const pNumbers = props.game.numbers.map((number, index, array) => {
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
    <CartGameContainer>
      <TrashIcon
        onClick={() => props.handlerRemoveCartItem(props.game)}
        src={trash}
      />
      <CartGameBar bgColor={props.game.color} />
      <CartInfosContainer>
        <CartGameNumbers>{pNumbers}</CartGameNumbers>
        <CartGameNameContainer>
          <CartGameName bgColor={props.game.color}>
            {props.game.name}
          </CartGameName>
          <CartGamePrice>
            R$ {props.game.price.toFixed(2).replace(".", ",")}
          </CartGamePrice>
        </CartGameNameContainer>
      </CartInfosContainer>
    </CartGameContainer>
  );
};

export default CartItem;
