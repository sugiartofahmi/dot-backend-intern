export type TRegisterRequest = {
  email: string;
  password: string;
  fullname: string;
  role_id?: number;
};

export type TRegisterResponse = {
  message: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  access_token: string;
  expired_at: number;
  refresh_token: string;
};

export type TTokenRequest = {
  sub: string;
  email: string;
  role: string;
};

export type TReqToken = {
  user: TTokenRequest;
};

export type TTokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type TRefreshToken = {
  access_token: string;
  expired_at: number;
};
