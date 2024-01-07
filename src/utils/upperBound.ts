export function upperBound<T>(arr: T[], key: any, func?: (x: T) => any): number {
  let left = 0;
  let right = arr.length; // Индекс конца массива

  // Функция для сравнения элементов
  const compare = func !== undefined ? func : (x: T) => x;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2); // Находим середину

    if (compare(arr[mid]) <= key) {
      left = mid + 1; // Ищем строго больше, смещаемся вправо
    } else {
      right = mid; // Ищем в левой половине
    }
  }

  // Возвращаем индекс первого элемента, который строго больше ключа
  // или длину массива, если все элементы не больше ключа
  return left;
}
