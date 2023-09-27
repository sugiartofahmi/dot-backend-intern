import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '@api/services';
import { JwtAuthGuard } from '@api/guards';
import {
  TReqToken,
  TUserByIdRequest,
  VSCreateUser,
  CreateUserDto,
  VSUpdateUser,
  UpdateUserDto,
} from '@api/entities';
import { ZodValidationPipe } from '@api/pipes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() { user: { email } }: TReqToken) {
    return await this.userService.getProfile({ email });
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param() payload: TUserByIdRequest) {
    return await this.userService.getUserById(payload);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(VSUpdateUser))
  async updateUserById(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.userService.updateUserById({ id, data });
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUserById(@Param('id') id: string) {
    return await this.userService.deleteUserById({ id });
  }
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(VSCreateUser))
  async createUser(@Body() payload: CreateUserDto) {
    return await this.userService.createUser(payload);
  }
}
