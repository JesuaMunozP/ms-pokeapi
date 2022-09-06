import { Module } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';
import { PokeapiController } from './pokeapi.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [PokeapiController],
  providers: [PokeapiService],
  imports: [HttpModule],
  exports:[PokeapiService],
})
export class PokeapiModule {}
