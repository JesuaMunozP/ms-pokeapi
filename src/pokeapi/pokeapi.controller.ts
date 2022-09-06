import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';

@Controller('pokeapi')
export class PokeapiController {
  constructor(private readonly pokeapiService: PokeapiService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokeapiService.findOne(id);
  }
}
