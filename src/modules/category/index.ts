import { Module } from '@nestjs/common';
import { CategoryService } from '@api/services';
import { CategoryController } from '@api/controllers';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
