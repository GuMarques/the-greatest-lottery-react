import { IChangePasswordResponse } from "@interfaces/responses/changePasswordResponse";
import ILogin from "@interfaces/login";
import { ILoginResponse } from "@interfaces/responses/loginResponse";
import { IResetPasswordResponse } from "@interfaces/responses/resetPasswordResponse";
import instance from "@services/axios.config";
import { IAuth } from "./interfaces";

const Auth = (): IAuth => {
  async function login(body: ILogin): Promise<ILoginResponse> {
    return instance.post("/login", body);
  }
  async function resetPassword(email: string): Promise<IResetPasswordResponse> {
    return instance.post("/reset", { email });
  }
  async function changePassword(
    token: string,
    password: string
  ): Promise<IChangePasswordResponse> {
    return instance.post("/reset/" + token, { password });
  }

  return { login, resetPassword, changePassword };
};

export default Auth;
