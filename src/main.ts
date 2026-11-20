
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port);
  Logger.log(`Server is running on http://localhost:${port}`);
}

void bootstrap();
