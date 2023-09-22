export type TRegisterRequest = {
  email: string;
  password: string;
  fullname: string;
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
  refresh_token: string;
};
