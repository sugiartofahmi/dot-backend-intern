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
import { ProductService } from '@api/services';
import { JwtAuthGuard } from '@api/guards';
import {
  CreateProductDto,
  TProductRequest,
  UpdateProductDto,
  VSCreateProduct,
  VSUpdateProduct,
} from '@api/entities';
import { ZodValidationPipe } from '@api/pipes';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async findAll() {
    return await this.productService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @ApiBody({ type: CreateProductDto })
  @Post()
  @UsePipes(new ZodValidationPipe(VSCreateProduct))
  async create(@Body() payload: TProductRequest) {
    return await this.productService.create(payload);
  }

  @ApiBody({ type: UpdateProductDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateProduct)) payload: TProductRequest,
  ) {
    return await this.productService.update({
      id,
      ...payload,
    });
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
