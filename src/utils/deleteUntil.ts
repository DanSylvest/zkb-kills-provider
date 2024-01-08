import SortedMap from 'collections/sorted-map';

export const deleteUntil = (sortedMap: SortedMap, timestamp: number): void => {
  if (sortedMap.size === 0) {
    return;
  }

  const forRemove = [];
  const iter = sortedMap.iterator();
  let item = iter.next();
  while (!item.done) {
    if (item.value.key.timestamp >= timestamp) {
      break;
    }

    forRemove.push(item.value.key);
    item = iter.next();
  }

  if (forRemove.length === 0) {
    return;
  }

  sortedMap.deleteEach(forRemove);
};
