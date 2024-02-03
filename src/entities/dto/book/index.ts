import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    title: 'Programing',
  })
  public title!: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  public authorId!: string;
}

export class UpdateBookDto extends CreateBookDto {}
