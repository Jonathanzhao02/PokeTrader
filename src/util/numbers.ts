export function mean(array: number[]): number  {
  return array.reduce((accum, val) => accum + val / array.length, 0);
}

export function mode(array: number[]): number[] {
  const map = new Map<number, number>();
  let best = [];
  let maxCount = 0;
  array.forEach(val => {
    if (map.has(val)) {
      map.set(val, map.get(val) + 1);
    } else {
      map.set(val, 1);
    }
  });

  map.forEach((val, key) => {
    if (val > maxCount) {
      best = [key];
      maxCount = val;
    } else if (val === maxCount) {
      best.push(key);
    }
  });

  return best;
}

export function min(array: number[]): number {
  return array.reduce((accum, val) => val < accum ? val : accum, array[0]);
}

export function max(array: number[]): number {
  return array.reduce((accum, val) => val > accum ? val : accum, array[0]);
}
