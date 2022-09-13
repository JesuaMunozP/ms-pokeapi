import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PokeapiModule } from './pokeapi/pokeapi.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    PokeapiModule,
    CacheModule.register({
     /* store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },*/
      ttl: 60,
      max: 1000,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
