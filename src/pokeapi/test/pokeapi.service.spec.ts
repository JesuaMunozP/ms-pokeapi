import { Test, TestingModule } from '@nestjs/testing';
import { PokeapiService } from '../pokeapi.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { HttpException, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

describe('PokeapiService', () => {
  let service: PokeapiService;
  let httpService: HttpService;
  let cache: Cache;

  const mockRepository = {
    get: jest.fn(),
    findOne: jest.fn(),
   // findOneCached: jest.fn()
    findOneCached: jest.fn().mockImplementation((id) => Promise.resolve({ id: '4', name: 'pokemon' , type: ['1', '2', '3'],}),),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokeapiService,
        {
          provide: HttpService,
          useValue: mockRepository,
        },
        {
          provide: CACHE_MANAGER,
          useValue:  {
            get: () => 'any value',
            set: () => jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<PokeapiService>(PokeapiService);
    httpService = module.get<HttpService>(HttpService);
    cache = module.get(CACHE_MANAGER);
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
    });
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
    });*/

    /////////cache/////////////

    it(`should cache the value`, async () => {
      const spy = jest.spyOn(cache, 'set');  
      await service.findOneCached('1');  
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should get the value from cache', async () => {
      const spy = jest.spyOn(cache, 'get');
      await service.findOneCached('1');
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('findOne(), should return an error', async () => {
      await service
        .findOneCached(null)
        .catch((e) => {
          expect(e);
        });
    });
  });
});
