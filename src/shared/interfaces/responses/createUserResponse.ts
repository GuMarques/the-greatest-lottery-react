import { IUser, IToken } from "./loginResponse"

export default interface ICreateUserResponse {
  user: IUser,
  token: IToken,
}