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
import { CategoryService } from '@api/services';
import { JwtAuthGuard } from '@api/guards';
import {
  CreateCategoryDto,
  TCategoryRequest,
  UpdateCategoryDto,
  VSCreateCategory,
  VSUpdateCategory,
} from '@api/entities';
import { ZodValidationPipe } from '@api/pipes';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @ApiBody({ type: CreateCategoryDto })
  @Post()
  @UsePipes(new ZodValidationPipe(VSCreateCategory))
  async create(@Body() payload: TCategoryRequest) {
    return await this.categoryService.create(payload);
  }

  @ApiBody({ type: UpdateCategoryDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateCategory)) payload: TCategoryRequest,
  ) {
    return await this.categoryService.update({
      id,
      ...payload,
    });
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
