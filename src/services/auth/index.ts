import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/api/services';
import { comparePassword, encryptPassword } from '@/api/utils';
import {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TRegisterResponse,
} from '@/api/entities';
import { generateToken } from '@/api/utils';

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
      fullname: isUserExist.fullname,
    });
    if (!isPasswordMatch) {
      throw new BadRequestException('Password is wrong');
    }
    return {
      access_token,
      refresh_token,
    };
  }
}
