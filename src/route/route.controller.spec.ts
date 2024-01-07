import { Test, TestingModule } from '@nestjs/testing';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

// const AMARR = 30002187;
// const BHIZHEBA = 30002282;
// const PERIMETER = 30000144;
// const J212812 = 31001180;

describe('RouteController', () => {
  let controller: RouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RouteController],
      providers: [RouteService],
    }).compile();

    // controller = module.get<RouteController>(RouteController);
  });

  it('should be success', () => {

  });

});
