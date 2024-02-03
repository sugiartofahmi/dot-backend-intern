import {
  Controller,
  Post,
  UsePipes,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '@api/services';
import { ZodValidationPipe } from '@api/pipes';
import {
  VSRegister,
  VSLogin,
  TReqToken,
  TRegisterRequest,
  TLoginRequest,
} from '@api/entities';
import { RtGuard } from '@api/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(VSRegister))
  async register(@Body() payload: TRegisterRequest) {
    return await this.authService.register(payload);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(VSLogin))
  async login(@Body() payload: TLoginRequest) {
    return await this.authService.login(payload);
  }

  @Post('refresh')
  @UseGuards(RtGuard)
  async refresh(@Request() { user: { email, sub } }: TReqToken) {
    return await this.authService.refresh({ email, sub });
  }
}
