import { Controller, Post, UsePipes, Body } from '@nestjs/common';
import { AuthService } from '@/api/services';
import { ZodValidationPipe } from '@/api/pipes';
import { VSRegister, TVSRegister } from '@/api/entities';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(VSRegister))
  async register(@Body() payload: TVSRegister) {
    console.log('payload', payload);
    return await this.authService.register(payload);
  }
}
