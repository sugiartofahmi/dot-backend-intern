import { users } from '@api/models';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export type TRegisterRequest = InferInsertModel<typeof users>;

export type TRegisterResponse = {
  message: string;
};

export type TLoginRequest = Pick<
  InferSelectModel<typeof users>,
  'email' | 'password'
>;

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
