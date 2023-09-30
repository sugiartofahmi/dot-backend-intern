import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@api/services';
import {
  TProfileRequest,
  TProfileResponse,
  TUsersResponse,
  TUserByIdRequest,
  TUserByIdResponse,
  TUserUpdateRequest,
} from '@api/entities';
import { encryptPassword } from '@api/utils';

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
    const users = await this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        fullname: true,
        password: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }
  async getUserById(payload: TUserByIdRequest): Promise<TUserByIdResponse> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        email: true,
        fullname: true,
        id: true,
        role: true,
        books: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Users not found');
    }
    return user;
  }
  async updateUserById(payload: TUserUpdateRequest) {
    const user = await this.prisma.users.update({
      where: {
        id: payload.id,
      },
      data: payload.data,
    });
    if (!user) {
      throw new NotFoundException('Users not found');
    }
    return user;
  }
  async deleteUserById(payload: TUserByIdRequest): Promise<TUserByIdResponse> {
    const user = await this.prisma.users.delete({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      throw new NotFoundException('Users not found');
    }
    return user;
  }
  async createUser(payload) {
    const { email, password, fullname, role_id } = payload;

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
        role_id,
      },
    });
    if (!createUser) {
      throw new BadRequestException('Create user failed');
    }

    return {
      message: `Account has been created`,
    };
  }
}
