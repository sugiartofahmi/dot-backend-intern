import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { UserModule } from '../user';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, RtStrategy } from '@/api/strategies';
@Module({
  imports: [
    AuthModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [],
  providers: [JwtStrategy, RtStrategy],
})
export class MasterModule {}
