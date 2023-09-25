import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@api/services';
import {
  TProfileRequest,
  TProfileResponse,
  TUsersResponse,
} from '@api/entities';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getProfile(payload: TProfileRequest): Promise<TProfileResponse> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        email: true,
        fullname: true,
        id: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getAllUsers(): Promise<TUsersResponse> {
    const users = await this.prisma.users.findMany({});
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return {
      data: users,
    };
  }
}
