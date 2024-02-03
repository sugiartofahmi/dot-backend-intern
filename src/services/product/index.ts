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
  TProduct,
  TProductRequest,
  TProductResponses,
  TProductsResponses,
} from '@api/entities';

@Injectable()
export class ProductService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>,
  ) {}
  async findOne(id: string): Promise<TProduct> {
    const response = await this.drizzle
      .select({
        id: schema.products.id,
        name: schema.products.name,
        createdAt: schema.products.createdAt,
        updatedAt: schema.products.updatedAt,
        price: schema.products.price,
        category: {
          id: schema.categories.id,
          name: schema.categories.name,
        },
      })
      .from(schema.products)
      .leftJoin(
        schema.categories,
        eq(schema.categories.id, schema.products.categoryId),
      )
      .where(eq(schema.products.id, id))
      .then((res) => res.at(0));

    if (!response) {
      throw new NotFoundException('Produk tidak ditemukan');
    }
    return response;
  }
  async findAll(): Promise<TProductsResponses> {
    const response = await this.drizzle
      .select({
        id: schema.products.id,
        name: schema.products.name,
        createdAt: schema.products.createdAt,
        updatedAt: schema.products.updatedAt,
        price: schema.products.price,
        category: {
          id: schema.categories.id,
          name: schema.categories.name,
        },
      })
      .from(schema.products)
      .leftJoin(
        schema.categories,
        eq(schema.categories.id, schema.products.categoryId),
      );

    if (!response) {
      throw new NotFoundException('Produk tidak tersedia');
    }
    return response;
  }

  async create(payload: TProductRequest): Promise<TProductResponses> {
    const response = await this.drizzle
      .insert(schema.products)
      .values({
        id: payload.id,
        name: payload.name,
        price: payload.price,
        categoryId: payload.categoryId,
      })
      .returning({
        id: schema.products.id,
        name: schema.products.name,
      })
      .then((res) => res.at(0));
    if (!response) {
      throw new BadRequestException('Gagal menambahkan produk');
    }
    return {
      message: 'Produk berhasil dibuat',
      data: response,
    };
  }
  async update(payload: TProductRequest): Promise<TProductResponses> {
    const response = await this.drizzle
      .update(schema.products)
      .set({
        name: payload.name,
        price: payload.price,
        categoryId: payload.categoryId,
        updatedAt: new Date(),
      })
      .where(eq(schema.products.id, payload.id as string))
      .returning({
        id: schema.products.id,
        name: schema.products.name,
      })
      .then((res) => res.at(0));

    if (!response) {
      throw new BadRequestException('Gagal update produk');
    }
    return {
      message: 'Berhasil update produk',
      data: response,
    };
  }
  async delete(id: string): Promise<TProductResponses> {
    const response = await this.drizzle
      .delete(schema.products)
      .where(eq(schema.products.id, id));

    if (!response) {
      throw new NotFoundException('Gagal menghapus produk');
    }
    return {
      message: 'Produk berhasil dihapus',
      data: response,
    };
  }
}
