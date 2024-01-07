import { Injectable } from '@nestjs/common';
import { Systems } from '../core/systems';

@Injectable()
export class KillsService {
  // protected graph: Graph = new Graph();

  protected systems: Systems = new Systems();

  constructor() {
    this.systems.init();
  }

  getKillsBySystemIds(systemIds: number[]) {
    return systemIds.map((systemId) => ({
      systemId,
      kills: this.systems.getKillsBySystem(systemId),
    }));
  }
}
