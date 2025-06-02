import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: false, origin: '*' });
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
