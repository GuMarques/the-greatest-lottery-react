import INewBetRequest from "@interfaces/requests/newBetRequest";
import IListBetResponse from "@interfaces/responses/listBetResponse";
import INewBetResponse from "@interfaces/responses/newBetResponse";

export default interface IBet {
  listBet: (query: string[]) => Promise<IListBetResponse[]>;
  newBet: (bet: INewBetRequest) => Promise<INewBetResponse>
}
