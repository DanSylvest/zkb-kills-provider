export function upperBound<T>(arr: T[], key: any, func?: (x: T) => any): number {
  let left = 0;
  let right = arr.length;

  const compare = func !== undefined ? func : (x: T) => x;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (compare(arr[mid]) <= key) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
