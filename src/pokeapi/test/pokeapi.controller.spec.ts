import { Test, TestingModule } from '@nestjs/testing';
import { PokeapiController } from '../pokeapi.controller';
import { PokeapiService } from '../pokeapi.service';

describe('PokeapiController', () => {
  let controller: PokeapiController;
  const mockService = {
   /* findOne: jest.fn( id => {
      return {
        id: '1',
      }
    }),*/
    findOneCached: jest.fn( id => {
      return {
        id: '1',
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokeapiController],
      providers: [PokeapiService],
    }).overrideProvider(PokeapiService).useValue(mockService).compile();

    controller = module.get<PokeapiController>(PokeapiController);
  });

  describe('Should return a product by parameter', () => {
    /*it('findOne(), should find one product', () => {
        expect(controller.findOne('1')).toEqual({
            id: '1'
        });
    });*/
    it('findOne(), should find one product', () => {
      expect(controller.findOneCached('1')).toEqual({
          id: '1'
      });
  });
  });
});
