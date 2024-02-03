import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    title: 'name',
    example: 'Book',
  })
  public name!: string;

  @ApiProperty({
    title: 'price',
    example: '90000',
  })
  public price!: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  public categoryId!: string;
}

export class UpdateProductDto extends CreateProductDto {}
