import { Module } from '@nestjs/common';
import { UserService } from '@/api/services';
import { UserController } from '@/api/controllers';
import { PrismaModule } from '../prisma';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
