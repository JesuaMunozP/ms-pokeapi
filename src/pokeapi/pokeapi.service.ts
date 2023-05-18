import { HttpService } from '@nestjs/axios';
import { Injectable} from '@nestjs/common';

@Injectable()
export class PokeapiService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

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
}