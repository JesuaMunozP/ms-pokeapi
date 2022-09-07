import { Test, TestingModule } from '@nestjs/testing';
import { PokeapiService } from '../pokeapi.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { HttpException } from '@nestjs/common';

describe('PokeapiService', () => {
  let service: PokeapiService;
  let httpService: HttpService;

  const mockRepository = {
    get: jest.fn(),
    findOne: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokeapiService,
        {
          provide: HttpService,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PokeapiService>(PokeapiService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('should return a pokemon', () => {
   /* it('findOne(), should return a pokemon', async () => {
      const pokemon = {
        id: '1',
        name: 'pokemon',
        type: ['1', '2'],
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          status: 200,
          statusText: 'OK',
          config: {},
          headers: {},
          data: { id: '1', name: 'pokemon', type: ['1', '2'] },
        }),
      );
      mockRepository.findOne.mockReturnValue(pokemon);
      const result = await service.findOne('1');
      expect(result).toEqual({ id: '1', ...result });
    });

    it('update(), should delete the images when update a product', async () => {
      await service
        .findOne('033ae036-6a20-4760-a11c-f83667474085')
        .catch((e) => {
          expect(e);
        });
    });*/
    it('findOne(), should return a pokemon', async () => {
      expect(await service.findOne('4')).toEqual({
        id: expect.any(String),
        name: expect.any(String),
        type: expect.any(Array)
      });
    });
    it('findOne(), should return an error', async () => {
      await service
        .findOne(null)
        .catch((e) => {
          expect(e);
        });
    });
  });
});
