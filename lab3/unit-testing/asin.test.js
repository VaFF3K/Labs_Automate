import { asin } from './sample.js';

describe('asin function', () => {
  test('should return 0 for 0', () => {
    expect(asin(0)).toBe(0);
  });

  test('should return π/2 for 1', () => {
    expect(asin(1)).toBe(Math.PI / 2);
  });

  test('should return -π/2 for -1', () => {
    expect(asin(-1)).toBe(-Math.PI / 2);
  });

// Перевірка повернення NaN для значень >1
  test('should return NaN for a value greater than 1', () => {
    expect(asin(2)).toBeNaN();
  });
// Перевірка повернення NaN для значень <-1
  test('should return NaN for a value less than -1', () => {
    expect(asin(-2)).toBeNaN();
  });
});
