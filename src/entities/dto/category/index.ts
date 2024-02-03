import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    title: 'name',
    example: 'Book',
  })
  public name!: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {}
