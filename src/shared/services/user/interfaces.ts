import ICreateUserResponse from "@interfaces/responses/createUserResponse";
import { IMyAccountResponse } from "@interfaces/responses/myAccountResponse";
import { IUpdateMyUser } from "@interfaces/responses/updateMyUserResponse";

export interface IUser {
  createUser: (
    email: string,
    password: string,
    name: string
  ) => Promise<ICreateUserResponse>;
  updateMyUser: (email: string, name: string) => Promise<IUpdateMyUser>;
  myAccount: () => Promise<IMyAccountResponse>;
}
