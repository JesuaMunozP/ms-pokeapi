import { Module } from '@nestjs/common';
import { PokeapiModule } from './pokeapi/pokeapi.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [PokeapiModule, PokemonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
