import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';

// Importa tu módulo de catálogo en Presentation
import { CatalogModule } from './modules/catalog/presentation/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // variables de entorno accesibles en toda la app
    PrismaModule, // acceso a PrismaService
    CatalogModule, // catálogo con Clean Architecture
  ],
})
export class AppModule {}
