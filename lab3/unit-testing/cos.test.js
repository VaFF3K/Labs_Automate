import { cos } from './sample.js';

describe('cos function', () => {
  test('should return 1 for 0 radians', () => {
    expect(cos(0)).toBeCloseTo(1);
  });

  test('should return 0 for π/2 radians', () => {
    expect(cos(Math.PI / 2)).toBeCloseTo(0);
  });

  test('should return -1 for π radians', () => {
    expect(cos(Math.PI)).toBeCloseTo(-1);
  });

  test('should return NaN for an invalid input', () => {
    expect(cos('a')).toBeNaN();
  });

   // cos має повертати значення в межах [-1, 1] для будь-якого коректного аргументу
  test('should return a value between -1 and 1 for any valid input', () => {
    const result = cos(Math.random() * 2 * Math.PI);
    expect(result).toBeGreaterThanOrEqual(-1);
    expect(result).toBeLessThanOrEqual(1);
  });
});
