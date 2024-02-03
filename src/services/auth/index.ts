import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import * as schema from '@api/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ilike } from 'drizzle-orm';
import { comparePassword, encryptPassword } from '@api/utils';
import {
  TLoginRequest,
  TLoginResponse,
  TRefreshToken,
  TRegisterRequest,
  TRegisterResponse,
  TTokenRequest,
} from '@api/entities';
import { generateToken, generateAccessToken } from '@api/utils';

@Injectable()
export class AuthService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>,
  ) {}
  async register(payload: TRegisterRequest): Promise<TRegisterResponse> {
    const { email, password, fullname } = payload;

    const isUserExist = await this.drizzle
      .select()
      .from(schema.users)
      .where(ilike(schema.users.email, email))
      .then((res) => res.at(0));

    if (isUserExist) {
      throw new ConflictException('Email sudah digunakan');
    }

    const hashPassword = await encryptPassword(password);

    const createUser = await this.drizzle.insert(schema.users).values({
      email,
      fullname,
      password: hashPassword,
    });
    if (!createUser) {
      throw new BadRequestException('Gagal membuat akun');
    }

    return {
      message: `Akun berhasil dibuat`,
    };
  }
  async login(payload: TLoginRequest): Promise<TLoginResponse> {
    const { email, password } = payload;

    const isUserExist = await this.drizzle
      .select({
        id: schema.users.id,
        fullname: schema.users.fullname,
        password: schema.users.password,
        email: schema.users.email,
      })
      .from(schema.users)
      .where(ilike(schema.users.email, email))
      .then((res) => res.at(0));
    if (!isUserExist) {
      throw new NotFoundException('User not found');
    }
    const isPasswordMatch = await comparePassword(
      password,
      isUserExist.password,
    );
    const { access_token, refresh_token } = await generateToken({
      sub: isUserExist.id,
      email: isUserExist.email,
    });
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password is wrong');
    }
    const expiresIn = 15 * 60 * 1000;
    const now = Date.now();
    const expirationTime = now + expiresIn;

    return {
      expired_at: expirationTime,
      access_token,
      refresh_token,
    };
  }
  async refresh(payload: TTokenRequest): Promise<TRefreshToken> {
    const expiresIn = 15 * 60 * 1000;
    const access_token = await generateAccessToken(payload);

    const now = Date.now();
    const expirationTime = now + expiresIn;

    return {
      access_token,
      expired_at: expirationTime,
    };
  }
}
