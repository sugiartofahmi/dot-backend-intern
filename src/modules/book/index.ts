import { Module } from '@nestjs/common';
import { BookService } from '@api/services';
import { BookController } from '@api/controllers';
import { PrismaModule } from '../prisma';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
