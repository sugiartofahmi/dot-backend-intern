import { Controller, Post, Get, Patch, Body, Delete } from '@nestjs/common';
import { BookService } from '@/api/services';
import { ZodValidationPipe } from '@/api/pipes';
import { VSRegister, RegisterDto, LoginDto, VSLogin } from '@/api/entities';
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async getBooks() {
    return await this.bookService.getBooks();
  }
  @Get(':id')
  async getBookById(@Body() payload) {
    return await this.bookService.getBookById(payload);
  }
  @Post()
  async createBook(@Body() payload) {
    return await this.bookService.createBook(payload);
  }
  @Patch(':id')
  async updateBook(@Body() payload) {
    return await this.bookService.updateBook(payload);
  }
  @Delete(':id')
  async deleteBook(@Body() payload) {
    return await this.bookService.deleteBook(payload);
  }
}
