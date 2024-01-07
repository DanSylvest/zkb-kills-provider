import { Body, Controller, Post } from '@nestjs/common';
import { KillsService } from './kills.service';

@Controller('kills')
export class KillsController {
  constructor(private readonly killsService: KillsService) {}

  @Post('systems')
  kills(@Body('systemIds') systemIds: number[]): {} {
    // console.log(systemIds);
    return this.killsService.getKillsBySystemIds(systemIds);
  }
}
