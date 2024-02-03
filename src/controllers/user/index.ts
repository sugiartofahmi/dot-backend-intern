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
  CreateUserDto,
  TReqToken,
  TUserByIdRequest,
  TUserUpdateRequest,
  UpdateUserDto,
  VSCreateUser,
  VSUpdateUser,
} from '@api/entities';
import { ZodValidationPipe } from '@api/pipes';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getProfile(@Request() { user: { sub: id } }: TReqToken) {
    return await this.userService.getProfile({ id });
  }
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get(':id')
  async getUserById(@Param() payload: TUserByIdRequest) {
    return await this.userService.getUserById(payload);
  }

  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateUser)) data: TUserUpdateRequest,
  ) {
    return await this.userService.updateUserById({ id, ...data });
  }
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return await this.userService.deleteUserById({ id });
  }

  @ApiBody({ type: CreateUserDto })
  @Post()
  @UsePipes(new ZodValidationPipe(VSCreateUser))
  async createUser(@Body() payload: TUserUpdateRequest) {
    return await this.userService.createUser(payload);
  }
}
