import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@api/services';
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
  constructor(private readonly prisma: PrismaService) {}
  async register(payload: TRegisterRequest): Promise<TRegisterResponse> {
    const { email, password, fullname } = payload;

    const isUserExist = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (isUserExist) {
      throw new ConflictException('User already exists');
    }

    const hashPassword = await encryptPassword(password);
    const createUser = await this.prisma.users.create({
      data: {
        email,
        password: hashPassword,
        fullname,
      },
    });
    if (!createUser) {
      throw new BadRequestException('Register failed');
    }

    return {
      message: `Account has been created`,
    };
  }
  async login(payload: TLoginRequest): Promise<TLoginResponse> {
    const { email, password } = payload;

    const isUserExist = await this.prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
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
      role: isUserExist.role?.name,
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
