import ICreateUserResponse from "@interfaces/responses/createUserResponse";
import { IMyAccountResponse } from "@interfaces/responses/myAccountResponse";
import { IUpdateMyUser } from "@interfaces/responses/updateMyUserResponse";
import instance from "@services/axios.config";
import { IUser } from "./interfaces";

const User = (): IUser => {
  async function createUser(
    email: string,
    password: string,
    name: string
  ): Promise<ICreateUserResponse> {
    return instance.post("/user/create", { email, password, name });
  }
  async function updateMyUser(
    email: string,
    name: string
  ): Promise<IUpdateMyUser> {
    return instance.post("/user/update", { email, name });
  }
  async function myAccount(): Promise<IMyAccountResponse> {
    return instance.get("/user/my-account");
  }
  return { createUser, updateMyUser, myAccount };
};

export default User;
