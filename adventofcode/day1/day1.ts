export const depthMeasurer = (a: number[]): number => {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] > a[i - 1]) {
      count++;
    }
  }
  return count;
};

export const slidingWindowMeasurer = (a: number[]): number => {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] + a[i + 1] + a[i + 2] < a[i + 1] + a[i + 2] + a[i + 3]) {
      count++;
    }
  }
  return count;
};
