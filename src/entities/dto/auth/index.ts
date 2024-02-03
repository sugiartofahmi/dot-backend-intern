import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  public email!: string;

  @ApiProperty({
    example: 'Test1234',
    description: 'Min length 6, upper case 1, numbers 1',
  })
  public password!: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({
    example: 'John Doe',
    type: 'string',
  })
  public fullname!: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJI3343zI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIi3213OiIwYzRmY2JhOC0zODEwLTQxYzUtOGE4MC05OWQwMTE0MTFhNjMiLCJlbWFpbCI6InN1Z2lhcnRvZmFobWlAZ21haWwuY29tIiwicm9sZSI6Ik5ldyBTdHVkZW50IiwiaWF032321IjoxNjkzMTQ1NzE3LCJleHAiOjE2OTM3NTA1MTd9.26FX9KbvIq2-TydQV-q2311',
  })
  public refreshToken!: string;
}
