import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { KillsService } from './kills.service';

@Controller('kills')
export class KillsController {
  constructor(private readonly killsService: KillsService) {}

  @HttpCode(200)
  @Post('systems')
  kills(@Body('systemIds') systemIds: number[]) {
    return this.killsService.getKillsBySystemIds(systemIds);
  }
}
