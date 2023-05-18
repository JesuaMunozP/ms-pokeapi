import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PokeapiModule } from 'src/pokeapi/pokeapi.module';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [PokeapiModule]
})
export class PokemonModule {}
