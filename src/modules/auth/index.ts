import { Module } from '@nestjs/common';
import { AuthService } from '@/api/services';
import { AuthController } from '@/api/controllers';
import { PrismaModule } from '../prisma';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
