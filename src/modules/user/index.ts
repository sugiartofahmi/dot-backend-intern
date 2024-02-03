import { Module } from '@nestjs/common';
import { UserService } from '@api/services';
import { UserController } from '@api/controllers';
import { DrizzleModule } from '../drizzle';

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
