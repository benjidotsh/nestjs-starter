import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig, appConfig } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const _appConfig: AppConfig = await app.get(appConfig.KEY);

  await app.listen(_appConfig.port);
}

bootstrap();
