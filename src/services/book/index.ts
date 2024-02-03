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
  TBookResponse,
  TBookByIdRequest,
  TBookCreateRequest,
  TBooksResponse,
  TBookCreateResponse,
  TBookUpdateRequest,
} from '@api/entities';

@Injectable()
export class BookService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>,
  ) {}
  async getBookById(payload: TBookByIdRequest): Promise<TBookResponse> {
    const book = await this.drizzle
      .select({
        id: schema.books.id,
        title: schema.books.title,
        createdAt: schema.books.createdAt,
        author: schema.users.fullname,
      })
      .from(schema.books)
      .leftJoin(schema.users, eq(schema.users.id, schema.books.authorId))
      .where(eq(schema.books.id, payload.id as string))
      .then((res) => res.at(0));

    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }
    return {
      title: book.title,
      createdAt: book.createdAt,
      author: book.author,
    };
  }
  async getAllBooks(): Promise<TBooksResponse[]> {
    const books = await this.drizzle
      .select({
        id: schema.books.id,
        title: schema.books.title,
        createdAt: schema.books.createdAt,
        author: schema.users.fullname,
      })
      .from(schema.books)
      .leftJoin(schema.users, eq(schema.users.id, schema.books.authorId));

    if (!books) {
      throw new NotFoundException('Buku tidak tersedia');
    }
    return books;
  }

  async createBook(payload: TBookCreateRequest): Promise<TBookCreateResponse> {
    const book = await this.drizzle.insert(schema.books).values({
      title: payload.title,
      authorId: payload.authorId,
    });
    if (!book) {
      throw new BadRequestException('Gagal menambahkan buku');
    }
    return {
      message: 'Buku berhasil dibuat',
    };
  }
  async updateBook(payload: TBookUpdateRequest): Promise<TBookResponse> {
    const book = await this.drizzle
      .update(schema.books)
      .set({
        title: payload.title,
        authorId: payload.authorId,
      })
      .where(eq(schema.books.id, payload.id as string));

    if (!book) {
      throw new BadRequestException('Gagal update buku');
    }
    return {
      message: 'Berhasil update buku',
    };
  }
  async deleteBook(payload: TBookByIdRequest): Promise<TBookResponse> {
    const book = await this.drizzle
      .delete(schema.books)
      .where(eq(schema.books.id, payload.id as string));

    if (!book) {
      throw new NotFoundException('Gagal menghapus buku');
    }
    return {
      message: 'Buku berhasil dihapus',
    };
  }
}
