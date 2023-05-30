import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PokeapiService {
  constructor(private readonly httpService: HttpService) {}

  compararObjetos(objetoOld: any, objetoNew: any): any {
    const propiedadesOld = Object.keys(objetoOld);
    const propiedadesNew = Object.keys(objetoNew);
    const objetosModificados: any = {};

    propiedadesOld.forEach((propiedad) => {
      if (propiedadesNew.includes(propiedad)) {
        if (objetoOld[propiedad] !== objetoNew[propiedad]) {
          objetosModificados[propiedad] = {
            old: objetoOld[propiedad],
            new: objetoNew[propiedad],
          };
        }
      }
    });

    return objetosModificados;
  }

  test() {
    const obj = {
      id: 1,
      name: 'Jesua',
      apellido: 'Munoz',
    };

    const obj2 = {
      id: 2,
      name: 'Jesuaaa',
      apellido: 'Munozzz',
    };

    const obj3 = {
      id: 1,
      name: 'Jesuapadawan',
      apellido: 'Munoz',
    };

    const arr = [obj, obj, obj, obj2, obj2, obj3];

    const suma = arr.reduce((accum, item) => {
      return accum + item.id;
    }, 0);

    console.log(
      '🚀 ~ file: pokeapi.service.ts:45 ~ PokeapiService ~ suma ~ suma:',
      suma,
    );

    const uniqueArr = [...new Set(arr)];
    console.log(
      '🚀 ~ file: pokeapi.service.ts:52 ~ PokeapiService ~ test ~ uniqueArr:',
      uniqueArr,
    );

    const uniqueNames = arr.reduce((unique, obj) => {
      if (!unique.includes(obj.name)) {
        unique.push(obj.name);
      }
      return unique;
    }, []);

    console.log(
      '🚀 ~ file: pokeapi.service.ts:69 ~ PokeapiService ~ uniqueNames ~ uniqueNames:',
      uniqueNames,
    );

    const hasJohn = arr.some((obj) => obj.name.includes('Jesuapadawan'));
    console.log(
      '🚀 ~ file: pokeapi.service.ts:76 ~ PokeapiService ~ test ~ hasJohn:',
      hasJohn,
    );
  }
}
