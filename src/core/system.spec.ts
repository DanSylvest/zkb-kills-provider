// eslint-disable max-len

import { System } from './system';
import { deleteUntil } from '../utils/deleteUntil';

const randomInt = function (min, max) {
  return min + Math.floor((max - min) * Math.random());
};

const GAP = 1000 * 60 * 1;

describe('RouteService', () => {
  // JUST for debug
  it('should be defined', () => {
    const defaultContent = { esi: '', hash: '', url: '', humanDate: '', systemId: 30000142 };

    const sys = new System(30000142);
    let counter = 0;

    for (let i = 0; i < 10; i++) {
      let hash = (counter++).toString();

      const timestamp = +new Date('2024-01-08T12:37:40Z') + randomInt(-GAP, GAP);
      // eslint-disable-next-line no-console
      // console.log('JOipP', hash, timestamp);

      sys.add({ timestamp, ...defaultContent, hash: hash });

      if (i === 4) {
        hash = (counter++).toString();
        sys.add({ timestamp, ...defaultContent, hash: hash });

        hash = (counter++).toString();
        sys.add({ timestamp, ...defaultContent, hash: hash });
      }
    }

    const middleKey = +new Date('2024-01-08T12:37:40Z');
    const forRemove = [];
    const iter = sys.getKillsMap().iterator();
    let item = iter.next();
    while (!item.done) {
      if (item.value.key.timestamp >= middleKey) {
        break;
      }

      forRemove.push(item.value.key);
      item = iter.next();
    }

    // eslint-disable-next-line no-console
    console.log('JOipP', {
      middleKey,
      elements: [...sys.getKillsMap().keys()],
      forRemove,
    });

    sys.getKillsMap().deleteEach(forRemove);

    // eslint-disable-next-line no-console
    console.log('JOipP', 'After deleteEach', {
      elements: [...sys.getKillsMap().keys()],
    });
  });

  it('should add systems and remove', () => {
    const defaultContent = { esi: '', hash: '', url: '', humanDate: '', systemId: 30000142 };

    const sys = new System(30000142);
    let counter = 0;

    const middleKey = +new Date('2024-01-08T12:37:40Z');

    for (let i = 0; i < 10; i++) {
      let hash = (counter++).toString();

      const timestamp = middleKey + randomInt(-GAP, GAP);
      // eslint-disable-next-line no-console
      // console.log('JOipP', hash, timestamp);

      sys.add({ timestamp, ...defaultContent, hash: hash });

      if (i === 4) {
        hash = (counter++).toString();
        sys.add({ timestamp, ...defaultContent, hash: hash });

        hash = (counter++).toString();
        sys.add({ timestamp, ...defaultContent, hash: hash });
      }
    }

    // sys.recycle();
    deleteUntil(sys.getKillsMap(), middleKey);

    // eslint-disable-next-line no-console
    console.log('JOipP', 'After deleteEach', {
      elements: [...sys.getKillsMap().keys()],
    });
  });
});
