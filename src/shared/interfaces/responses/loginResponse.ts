export interface IToken {
  type: string;
  token: string;
  expires_at: Date;
}

export interface IUser {
  id: number;
  email: string;
  is_admin: number;
  name: string;
  token: null;
  token_created_at: null;
  created_at: Date;
  updated_at: Date;
  picture: null;
}

export interface ILoginResponse {
  user: IUser;
  token: IToken;
}
