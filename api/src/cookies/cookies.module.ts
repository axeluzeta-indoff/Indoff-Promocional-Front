import { Module } from '@nestjs/common';
import { CookiesController } from './cookies.controller';

@Module({
  imports: [],
  controllers: [CookiesController],
  providers: [],
})
export class CookiesModule {}
