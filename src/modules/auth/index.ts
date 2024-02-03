import { Module } from '@nestjs/common';
import { AuthService } from '@api/services';
import { AuthController } from '@api/controllers';
import { DrizzleModule } from '../drizzle';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DrizzleModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
