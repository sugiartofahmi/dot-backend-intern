import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as schema from '@api/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, ilike } from 'drizzle-orm';
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
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>,
  ) {}
  async getProfile(payload: TProfileRequest): Promise<TProfileResponse> {
    const user = await this.drizzle
      .select({
        id: schema.users.id,
        email: schema.users.email,
        fullname: schema.users.fullname,
      })
      .from(schema.users)
      .where(eq(schema.users.id, payload.id))
      .then((res) => res.at(0));
    if (!user) {
      throw new NotFoundException('Akun tidak ditemukan');
    }
    return user;
  }
  async getAllUsers(): Promise<TUsersResponse> {
    const users = await this.drizzle
      .select({
        id: schema.users.id,
        email: schema.users.email,
        fullname: schema.users.fullname,
      })
      .from(schema.users);

    if (!users) {
      throw new NotFoundException('Akun tidak tersedia');
    }
    return users;
  }
  async getUserById(payload: TUserByIdRequest): Promise<TUserByIdResponse> {
    const user = await this.drizzle
      .select({
        id: schema.users.id,
        email: schema.users.email,
        fullname: schema.users.fullname,
      })
      .from(schema.users)
      .where(eq(schema.users.id, payload.id))
      .then((res) => res.at(0));
    if (!user) {
      throw new NotFoundException('Akun tidak ditemukan');
    }
    return user;
  }
  async updateUserById(payload: TUserUpdateRequest) {
    const { id, ...data } = payload;
    const user = await this.drizzle
      .update(schema.users)
      .set({
        ...data,
      })
      .where(eq(schema.users.id, id as string))
      .returning({
        id: schema.users.id,
        email: schema.users.email,
        fullname: schema.users.fullname,
      });
    if (!user) {
      throw new NotFoundException('Akun tidak ditemukan');
    }
    return user;
  }
  async deleteUserById(payload: TUserByIdRequest) {
    const user = await this.drizzle
      .delete(schema.users)
      .where(eq(schema.users.id, payload.id));
    if (!user) {
      throw new NotFoundException('Akun tidak ditemukan');
    }
    return {
      message: 'Berhasil menghapus akun',
    };
  }
  async createUser(payload: TUserUpdateRequest) {
    const { email, password, fullname } = payload;

    const isUserExist = await this.drizzle
      .select()
      .from(schema.users)
      .where(ilike(schema.users.email, email))
      .then((res) => res.at(0));

    if (isUserExist) {
      throw new ConflictException('Akun sudah tersedia');
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
}
