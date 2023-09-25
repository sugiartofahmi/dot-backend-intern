import { Controller, Post, UsePipes, Body } from '@nestjs/common';
import { AuthService } from '@api/services';
import { ZodValidationPipe } from '@api/pipes';
import { VSRegister, RegisterDto, LoginDto, VSLogin } from '@api/entities';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(VSRegister))
  async register(@Body() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(VSLogin))
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
