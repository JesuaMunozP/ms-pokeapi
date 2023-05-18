import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';

@Controller('pokeapi')
export class PokeapiController {
  constructor(private readonly pokeapiService: PokeapiService) {}

  @Post()
  compararObjetos(@Body('objetoOld') objetoOld: any, @Body('objetoNew') objetoNew: any): void {
    return this.pokeapiService.compararObjetos(objetoOld, objetoNew);
  }


}
