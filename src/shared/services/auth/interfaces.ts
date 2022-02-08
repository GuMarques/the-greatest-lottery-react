import ILogin from "@interfaces/login";

import { IChangePasswordResponse } from "@interfaces/responses/changePasswordResponse";
import { ILoginResponse } from "@interfaces/responses/loginResponse";
import { IResetPasswordResponse } from "@interfaces/responses/resetPasswordResponse";

export interface IAuth {
  login: ({ email, password }: ILogin) => Promise<ILoginResponse>;
  resetPassword: (email: string) => Promise<IResetPasswordResponse>;
  changePassword: (
    token: string,
    password: string
  ) => Promise<IChangePasswordResponse>;
}
