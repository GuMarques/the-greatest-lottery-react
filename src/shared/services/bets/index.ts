import IBet from './interfaces';
import instance from "@services/axios.config";
import IListBetResponse from '@interfaces/responses/listBetResponse';
import INewBetResponse from '@interfaces/responses/newBetResponse';
import INewBetRequest from '@interfaces/requests/newBetRequest';

const Bet = (): IBet => {
  async function listBet(query: string[]): Promise<IListBetResponse[]> {
    return instance.get("/bet/all-bets", { params: { type: query}});
  }
  async function newBet(bet: INewBetRequest): Promise<INewBetResponse> {
    return instance.post("/bet/new-bet", bet);
  }
  return { listBet, newBet };
};

export default Bet;
