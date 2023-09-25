import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from '@api/services';
import { UserDto } from '@api/entities';
import { JwtAuthGuard } from '@api/guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() payload: UserDto) {
    return await this.userService.getProfile(payload);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
