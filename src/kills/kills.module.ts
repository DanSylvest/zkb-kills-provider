import { Module } from '@nestjs/common';
import { KillsController } from './kills.controller';
import { KillsService } from './kills.service';

@Module({
  controllers: [KillsController],
  providers: [KillsService],
})
export class KillsModule {}
