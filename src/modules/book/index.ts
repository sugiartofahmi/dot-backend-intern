import { Module } from '@nestjs/common';
import { BookService } from '@api/services';
import { BookController } from '@api/controllers';
import { DrizzleModule } from '../drizzle';

@Module({
  imports: [DrizzleModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
