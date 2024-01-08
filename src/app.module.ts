import { Module } from '@nestjs/common';
import { KillsModule } from './kills/kills.module';

@Module({
  imports: [KillsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
