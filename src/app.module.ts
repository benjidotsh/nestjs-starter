import { PrismaModule } from '@libs/prisma';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

import { AppConfig, appConfig } from './app.config';
import { TodosModule } from './todos/todos.module';

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
    PrismaModule,
    TodosModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
