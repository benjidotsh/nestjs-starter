import { Environment, LogLevel, validateConfig } from '@libs/common';
import { registerAs } from '@nestjs/config';
import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsPort, IsString } from 'class-validator';

export class AppConfig {
  @Expose({ name: 'NODE_ENV' })
  @IsEnum(Environment)
  environment: Environment;

  @Expose({ name: 'PORT' })
  @IsPort()
  port: string;

  @Expose({ name: 'LOG_LEVEL' })
  @IsEnum(LogLevel)
  logLevel: LogLevel;

  @Expose({ name: 'ALLOWED_ORIGINS' })
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  allowedOrigins?: string[];
}

export const appConfig = registerAs('app', () => validateConfig(AppConfig));
