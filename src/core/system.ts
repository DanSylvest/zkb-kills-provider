import { Kill } from '../types';
import { TIME_OF_ACTUAL } from '../constants';
import SortedMap from 'collections/sorted-map';
import { deleteUntil } from '../utils/deleteUntil';

type SmallKill = Pick<Kill, 'hash' | 'timestamp'>;

const sortFunc = (a: SmallKill, b: SmallKill) => {
  if (a.timestamp !== b.timestamp) {
    return a.timestamp - b.timestamp;
  }

  return a.hash > b.hash ? 1 : -1;
};

export class System {
  public systemId: number;

  protected killsMap: SortedMap = new SortedMap([], undefined, sortFunc);

  constructor(systemId: number) {
    this.systemId = systemId;
  }

  getKillsMap() {
    return this.killsMap;
  }

  count() {
    return this.killsMap.size;
  }

  kills() {
    return [...this.killsMap.values()];
  }

  add(kill: Kill) {
    const { timestamp, hash } = kill;

    this.killsMap.set({ timestamp, hash }, kill);
  }

  recycle() {
    deleteUntil(this.killsMap, +new Date() - TIME_OF_ACTUAL);
  }
}
