import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

import { AppConfig, appConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (_appConfig: AppConfig) => ({
        throttlers: [
          {
            ttl: 60000,
            limit: _appConfig.requestsPerMinute,
          },
        ],
        storage: new ThrottlerStorageRedisService(_appConfig.redisUrl),
      }),
      inject: [appConfig.KEY],
    }),
  ],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
