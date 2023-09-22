import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/api/services';
import { TRegisterRequest, TRegisterResponse } from '@/api/entities';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async register(payload: TRegisterRequest): Promise<TRegisterResponse> {
    const { email, password, fullname } = payload;
    const user = await this.prisma.users.create({
      data: {
        email,
        password,
        fullname,
      },
    });
    if (!user) {
      throw new BadRequestException('User already exists');
    }

    return {
      message: `Account has been created`,
    };
  }
}
