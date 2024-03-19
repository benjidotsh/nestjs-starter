import { Environment, validateConfig } from '@libs/common';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsEnum, IsPort } from 'class-validator';

export class AppConfig {
  @Expose({ name: 'NODE_ENV' })
  @IsEnum(Environment)
  environment: Environment;

  @Expose({ name: 'PORT' })
  @IsPort()
  port: string;
}

export const appConfig = registerAs('app', () => validateConfig(AppConfig));
