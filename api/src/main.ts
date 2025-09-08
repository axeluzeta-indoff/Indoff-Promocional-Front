import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Vite
    credentials: true, // necesario para enviar/recibir cookies
  });

  app.use(cookieParser()); // habilita req.cookies

  await app.listen(3000);
}
bootstrap();
