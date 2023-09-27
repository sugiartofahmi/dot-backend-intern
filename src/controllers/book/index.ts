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
  TReqToken,
  VSCreateBook,
  CreateBookDto,
  VSUpdateBook,
  UpdateBookDto,
} from '@api/entities';
import { ZodValidationPipe } from '@api/pipes';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllBooks(@Request() { user: { sub, role } }: TReqToken) {
    return await this.bookService.getAllBooks({ author_id: sub, role });
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getBookById(
    @Param('id') id: string,
    @Request() { user: { sub } }: TReqToken,
  ) {
    return await this.bookService.getBookById({ id, author_id: sub });
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(VSCreateBook))
  async createBook(
    @Body() payload: CreateBookDto,
    @Request() { user: { sub } }: TReqToken,
  ) {
    return await this.bookService.createBook({ ...payload, author_id: sub });
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(VSUpdateBook))
  async updateBook(
    @Param('id') id: string,
    @Request() { user: { sub } }: TReqToken,
    @Body() payload: UpdateBookDto,
  ) {
    return await this.bookService.updateBook({
      id,
      title: payload.title,
      author_id: sub,
    });
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteBook(
    @Param('id') id: string,
    @Request() { user: { sub } }: TReqToken,
  ) {
    return await this.bookService.deleteBook({ id, author_id: sub });
  }
}
