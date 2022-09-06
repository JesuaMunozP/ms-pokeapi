import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class PokeapiService {
  constructor(private readonly httpService: HttpService) {}

  async findOne(id: string) {
    try {
    const resp = await lastValueFrom(this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
    const types = [];
    resp.data.types.forEach(element => {
      types.push(element.type.name)
    });

    let pokemon = {
      id: resp.data.id,
      name: resp.data.name,
      type: types,
    }
     return pokemon;
      
    } catch (error) {
      return error;
    } 
  }
}
