import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/api/services';
import {
  TBookResponse,
  TBookByIdRequest,
  TBookCreateRequest,
  TBooksResponse,
  TBookCreateResponse,
} from '@/api/entities';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}
  async getBookById(payload: TBookByIdRequest): Promise<TBookResponse> {
    const book = await this.prisma.books.findUnique({
      where: { id: payload.id },
      select: {
        title: true,
        created_at: true,
        author: {
          select: {
            fullname: true,
          },
        },
      },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return {
      title: book.title,
      created_at: book.created_at,
      author: book.author.fullname,
    };
  }
  async getBooks(): Promise<TBooksResponse[]> {
    const books = await this.prisma.books.findMany({
      select: {
        title: true,
        created_at: true,
        author: {
          select: {
            fullname: true,
          },
        },
      },
    });
    if (!books) {
      throw new NotFoundException('Books not found');
    }
    return books;
  }

  async createBook(payload: TBookCreateRequest): Promise<TBookCreateResponse> {
    const book = await this.prisma.users.update({
      where: {
        email: payload.author_email,
      },
      data: {
        books: {
          create: {
            title: payload.title,
          },
        },
      },
      select: {
        fullname: true,
        books: {
          select: {
            title: true,
            created_at: true,
          },
        },
      },
    });
    if (!book) {
      throw new BadRequestException('Book not created');
    }
    return {
      message: 'Book created',
    };
  }
  async updateBook(payload: TBookByIdRequest): Promise<TBookResponse> {
    const book = await this.prisma.books.update({
      where: { id: payload.id },
      data: payload,
      select: {
        title: true,
        created_at: true,
        author: {
          select: {
            fullname: true,
          },
        },
      },
    });
    if (!book) {
      throw new BadRequestException('Book not updated');
    }
    return {
      title: book.title,
      created_at: book.created_at,
      author: book.author.fullname,
    };
  }
  async deleteBook(payload: TBookByIdRequest): Promise<TBookResponse> {
    const book = await this.prisma.books.delete({
      where: { id: payload.id },
      select: {
        title: true,
        created_at: true,
        author: {
          select: {
            fullname: true,
          },
        },
      },
    });
    if (!book) {
      throw new NotFoundException('Book not deleted');
    }
    return {
      title: book.title,
      created_at: book.created_at,
      author: book.author.fullname,
    };
  }
}
