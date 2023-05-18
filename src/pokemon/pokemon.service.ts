import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokeapiService } from 'src/pokeapi/pokeapi.service';

@Injectable()
export class PokemonService {

  constructor(private readonly pokeapiService: PokeapiService) {}


  async findAll(){
    
    const obj1 = { id: 1, name: "jesua"};
    const obj2 = { id: 2, name: "jesua"};

    return this.pokeapiService.compararObjetos(obj1, obj2);
  }
}
