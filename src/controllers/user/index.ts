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
import { JwtAuthGuard, PermissionGuard } from '@api/guards';
import {
  TReqToken,
  TUserByIdRequest,
  VSCreateUser,
  CreateUserDto,
  VSUpdateUser,
  UpdateUserDto,
  ERole,
} from '@api/entities';
import { ZodValidationPipe } from '@api/pipes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, PermissionGuard([ERole.ADMIN, ERole.USER]))
  async getProfile(@Request() { user: { email } }: TReqToken) {
    return await this.userService.getProfile({ email });
  }
  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard([ERole.ADMIN]))
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard([ERole.ADMIN, ERole.USER]))
  async getUserById(@Param() payload: TUserByIdRequest) {
    return await this.userService.getUserById(payload);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard([ERole.ADMIN, ERole.USER]))
  async updateUserById(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateUser)) data: UpdateUserDto,
  ) {
    return await this.userService.updateUserById({ id, data });
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionGuard([ERole.ADMIN, ERole.USER]))
  async deleteUserById(@Param('id') id: string) {
    return await this.userService.deleteUserById({ id });
  }
  @Post('create')
  @UseGuards(JwtAuthGuard, PermissionGuard([ERole.ADMIN, ERole.USER]))
  @UsePipes(new ZodValidationPipe(VSCreateUser))
  async createUser(@Body() payload: CreateUserDto) {
    return await this.userService.createUser(payload);
  }
}
