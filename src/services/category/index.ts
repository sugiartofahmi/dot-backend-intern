import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as schema from '@api/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import {
  TCategoriesResponses,
  TCategory,
  TCategoryRequest,
  TCategoryResponse,
} from '@api/entities';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>,
  ) {}
  async findOne(id: string): Promise<TCategory> {
    const response = await this.drizzle
      .select({
        id: schema.categories.id,
        name: schema.categories.name,
        createdAt: schema.categories.createdAt,
        updatedAt: schema.categories.updatedAt,
      })
      .from(schema.categories)
      .where(eq(schema.categories.id, id))
      .then((res) => res.at(0));

    if (!response) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }
    return response;
  }
  async findAll(): Promise<TCategoriesResponses> {
    const response = await this.drizzle
      .select({
        id: schema.categories.id,
        name: schema.categories.name,
        createdAt: schema.categories.createdAt,
        updatedAt: schema.categories.updatedAt,
      })
      .from(schema.categories);

    if (!response) {
      throw new NotFoundException('Kategori tidak tersedia');
    }
    return response;
  }

  async create(payload: TCategoryRequest): Promise<TCategoryResponse> {
    const response = await this.drizzle
      .insert(schema.categories)
      .values({
        id: payload.id,
        name: payload.name,
      })
      .returning({
        id: schema.categories.id,
        name: schema.categories.name,
      })
      .then((res) => res.at(0));
    if (!response) {
      throw new BadRequestException('Gagal menambahkan kategori');
    }
    return {
      message: 'Kategori berhasil dibuat',
      data: response,
    };
  }
  async update(payload: TCategoryRequest): Promise<TCategoryResponse> {
    const response = await this.drizzle
      .update(schema.categories)
      .set({
        name: payload.name,
        updatedAt: new Date(),
      })
      .where(eq(schema.categories.id, payload.id as string))
      .returning({
        id: schema.categories.id,
        name: schema.categories.name,
      })
      .then((res) => res.at(0));

    if (!response) {
      throw new BadRequestException('Gagal update kategori');
    }
    return {
      message: 'Berhasil update kategori',
      data: response,
    };
  }
  async delete(id: string): Promise<TCategoryResponse> {
    const response = await this.drizzle
      .delete(schema.categories)
      .where(eq(schema.categories.id, id));

    if (!response) {
      throw new NotFoundException('Gagal menghapus kategori');
    }
    return {
      message: 'Kategori berhasil dihapus',
      data: response,
    };
  }
}
