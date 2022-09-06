import { Module } from '@nestjs/common';
import { PokeapiModule } from './pokeapi/pokeapi.module';

@Module({
  imports: [PokeapiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
