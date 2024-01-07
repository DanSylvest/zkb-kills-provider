import { Kill } from '../types';
import { upperBound } from '../utils/upperBound';
import { TIME_OF_ACTUAL } from '../constants';

export class System {
  public systemId: number;
  public kills: Kill[] = [];

  constructor(systemId: number) {
    this.systemId = systemId;
  }

  count() {
    return this.kills.length;
  }

  add(kill: Kill) {
    this.kills.push(kill);
  }

  recycle() {
    const firstActualIndex = upperBound<Kill>(this.kills, +new Date() - TIME_OF_ACTUAL, (x) => x.timestamp);
    this.kills = this.kills.slice(firstActualIndex);
  }
}
