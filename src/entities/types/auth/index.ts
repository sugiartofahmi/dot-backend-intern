import { users } from '@api/models';
import { InferInsertModel } from 'drizzle-orm';

export type TUser = InferInsertModel<typeof users>;

export type TRegisterRequest = TUser;

export type TRegisterResponse = {
  message: string;
};

export type TLoginRequest = Pick<TUser, 'email' | 'password'>;

export type TLoginResponse = {
  accessToken: string;
  expiredAt: number;
  refreshToken: string;
};

export type TTokenRequest = {
  sub: string;
  email: string;
};

export type TReqToken = {
  user: TTokenRequest;
};

export type TTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TRefreshToken = {
  accessToken: string;
  expiredAt: number;
};
