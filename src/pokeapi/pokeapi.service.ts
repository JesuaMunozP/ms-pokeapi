import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { IPokeapi } from './interface/pokeapi.interface';
import { Cache } from 'cache-manager';

@Injectable()
export class PokeapiService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  /*async findOne(id: string) {
    try {
    let resp  = await lastValueFrom(this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
    const types = [];
    resp.data.types?.forEach(element => {
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

  async findOne(id: string) {
    try {
      const response = await axios.get<IPokeapi>(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
      );

      const arrayTypes = [];
      response.data.types.forEach((item) => arrayTypes.push(item.type.name));
      const pokemon = {
        id: id,
        name: response.data.name,
        type: arrayTypes,
      };
      return pokemon;
    } catch (error) {
      return error;
    }
  }*/

  async findOneCached(id: string) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
      );

      await this.cacheManager.set('cached_item', response.data);

      const cached = await this.cacheManager.get<IPokeapi>('cached_item');

      const arrayTypes = [];
      cached.types.forEach((item) => arrayTypes.push(item.type.name));
      const pokemon = {
        name: cached.name,
        type: arrayTypes,
      };
      return pokemon;
    } catch (error) {
      return error;
    }
  }
}
