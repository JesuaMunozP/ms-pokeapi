import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { IPokeapi } from './interface/pokeapi.interface';


@Injectable()
export class PokeapiService {
  constructor(private readonly httpService: HttpService) {}

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
  }*/

  async findOne(id: string) {
    try {
    const response = await axios.get<IPokeapi>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    const arrayTypes = [];
    response.data.types.forEach(item => arrayTypes.push(item.type.name));
    const pokemon = {
      id: id,
      name: response.data.name,
      type: arrayTypes,
    };
    return pokemon;
    }catch (error) {
      return error;
    } 
  }
}

