import { useAppSelector } from "@hooks/custom-useSelector";
import bet from "@interfaces/bet";
import ConvertPrice from "@utils/convert-monetary-value";
import formatDate from "@utils/format-date";
import game from "@interfaces/game";
import {
  GameContainer,
  GameBar,
  InfosContainer,
  GameNumbers,
  GameInfos,
  GameName,
} from "./styles";

const RecentGame: React.FC<{ bet: bet }> = (props) => {
  const { bet } = props;
  const date = formatDate(new Date(bet.created_at));
  const games: game[] = useAppSelector((state) => state.games.games).map(
    (game) => JSON.parse(game)
  );
  const game = games.find((game) => game.id === bet.game_id);
  return (
    <GameContainer>
      <GameBar bgColor={game?.color} />
      <InfosContainer>
        <GameNumbers>{bet.choosen_numbers.replace(/,/g, ", ")}</GameNumbers>
        <GameInfos>
          {date} - (R$ {ConvertPrice(bet.price)})
        </GameInfos>
        <GameName bgColor={game?.color}>{bet.type.type}</GameName>
      </InfosContainer>
    </GameContainer>
  );
};

export default RecentGame;
