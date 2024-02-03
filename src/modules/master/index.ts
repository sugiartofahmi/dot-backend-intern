import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, RtStrategy } from '@api/strategies';
import { AuthModule } from '../auth';
import { DrizzleModule } from '../drizzle';
import { ProductModule } from '../product';
import { CategoryModule } from '../category';
@Module({
  imports: [
    AuthModule,
    ProductModule,
    CategoryModule,
    DrizzleModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [],
  providers: [JwtStrategy, RtStrategy],
})
export class MasterModule {}
