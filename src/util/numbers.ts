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

export function sortedMode(array: number[]): number[] {
  let count = 0;
  let maxCount = 1;
  let maxVals = [array[0]];

  array.forEach((val, idx) => {
    if (idx > 0) {
      if (val !== array[idx - 1]) {

        if (count > maxCount) {
          maxCount = count;
          maxVals = [array[idx - 1]];
        } else if (count === maxCount) {
          maxVals.push(array[idx - 1]);
        }

        count = 0;
      }
    }

    count++;
  });

  return maxVals;
}

export function min(array: number[]): number {
  return array.reduce((accum, val) => val < accum ? val : accum, array[0]);
}

export function max(array: number[]): number {
  return array.reduce((accum, val) => val > accum ? val : accum, array[0]);
}
