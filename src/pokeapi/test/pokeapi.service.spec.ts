import { Test, TestingModule } from '@nestjs/testing';
import { PokeapiService } from '../pokeapi.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('PokeapiService', () => {
  let service: PokeapiService;
  let httpService: HttpService;

  const mockRepository = {
    get: jest.fn(),
    // findOne: jest.fn().mockImplementation((pokemon) => Promise.resolve({ id: '1',  name: 'pokemon', type: ['1','2']}),),
    findOne: jest.fn(),
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
    it('findOne(), should return a pokemon', async () => {
      const pokemon = [
        {
          id: '1',
          name: 'pokemon',
          type: ['1', '2'],
        },
      ];

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        of({
          status: 200,
          statusText: 'OK',
          config: {},
          headers: {},
          data: pokemon,
        }),
      );

      const result = await service.findOne('1');
      expect(result).toContain(pokemon);
    });
  });
});
