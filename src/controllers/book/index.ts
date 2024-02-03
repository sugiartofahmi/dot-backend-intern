import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Delete,
  UseGuards,
  Param,
  UsePipes,
} from '@nestjs/common';
import { BookService } from '@api/services';
import { JwtAuthGuard } from '@api/guards';
import {
  TBookCreateRequest,
  TBookUpdateRequest,
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
  async getBookById(@Param('id') id: string) {
    return await this.bookService.getBookById({ id });
  }
  @Post()
  @UsePipes(new ZodValidationPipe(VSCreateBook))
  async createBook(@Body() payload: TBookCreateRequest) {
    return await this.bookService.createBook(payload);
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
