import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/api/services';
import { encryptPassword } from '@/api/utils';
import { TRegisterRequest, TRegisterResponse } from '@/api/entities';
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
}
