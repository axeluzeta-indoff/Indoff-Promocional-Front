import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { CatalogModule } from './catalog/catalog.module';
import { CookiesModule } from './cookies/cookies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CatalogModule,
    CookiesModule,
  ],
})
export class AppModule {}
