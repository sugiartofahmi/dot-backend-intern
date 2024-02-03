import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Delete,
  UseGuards,
  Param,
  Request,
  UsePipes,
} from '@nestjs/common';
import { BookService } from '@api/services';
import { JwtAuthGuard } from '@api/guards';
import {
  TBookCreateRequest,
  TBookUpdateRequest,
  TReqToken,
  VSCreateBook,
  VSUpdateBook,
} from '@api/entities';
import { ZodValidationPipe } from '@api/pipes';

@Controller('book')
@UseGuards(JwtAuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }
  @Get(':id')
  async getBookById(
    @Param('id') id: string,
    @Request() { user: { sub } }: TReqToken,
  ) {
    return await this.bookService.getBookById({ id, author_id: sub });
  }
  @Post()
  @UsePipes(new ZodValidationPipe(VSCreateBook))
  async createBook(
    @Body() payload: TBookCreateRequest,
    @Request() { user: { sub } }: TReqToken,
  ) {
    return await this.bookService.createBook({
      title: payload.title,
      author_id: sub,
    });
  }
  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateBook)) payload: TBookUpdateRequest,
  ) {
    return await this.bookService.updateBook({
      id,
      ...payload,
    });
  }
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return await this.bookService.deleteBook({ id });
  }
}
