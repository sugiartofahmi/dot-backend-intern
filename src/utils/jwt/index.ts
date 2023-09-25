import { JwtService } from '@nestjs/jwt';
import { TTokenRequest, TTokenResponse } from '@api/entities';

const jwt = new JwtService();

export const generateAccessToken = async (
  payload: TTokenRequest,
): Promise<string> => {
  const access_token = await jwt.signAsync(payload, {
    secret: process.env.ACCESS_SECRET,
    expiresIn: '15m',
  });

  return access_token;
};

export const generateToken = async (
  payload: TTokenRequest,
): Promise<TTokenResponse> => {
  const [access_token, refresh_token] = await Promise.all([
    generateAccessToken(payload),
    jwt.signAsync(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
    }),
  ]);

  return {
    access_token: String(access_token),
    refresh_token: String(refresh_token),
  };
};
