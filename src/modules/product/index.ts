import { Module } from '@nestjs/common';
import { ProductService } from '@api/services';
import { ProductController } from '@api/controllers';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
