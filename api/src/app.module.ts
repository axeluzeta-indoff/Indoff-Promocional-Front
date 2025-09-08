import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CookiesController } from './cookies/cookies.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [CookiesController],
})
export class AppModule {}
