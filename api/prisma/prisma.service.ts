import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'warn' },
      ],
      errorFormat: 'pretty',
    } satisfies Prisma.PrismaClientOptions);
  }

  async onModuleInit() {
    // Abre conexión y prepara shutdown hooks
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
