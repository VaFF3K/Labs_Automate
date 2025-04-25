import { tan } from './sample.js';

describe('tan function', () => {
  test('should return 0 for 0 radians', () => {
    expect(tan(0)).toBe(0); 
  });

  test('should return a very large number for π/2 radians (asymptote)', () => {
    const result = tan(Math.PI / 2);
    expect(result).toBeGreaterThan(1e10);  // Перевірка на дуже велике число
    expect(result).toBeLessThan(Infinity);  // Перевірка, що результат не є нескінченністю
  });


  test('should return a very large number for a value close to π/2', () => {
    expect(tan(Math.PI / 2 - 0.0001)).toBeGreaterThan(1000); 
  });

  test('should return NaN for an invalid input', () => {
    expect(tan('a')).toBeNaN();
  });
  
  // Перевіряємо, що tan будь-якого коректного значення залишається в межах допустимих чисел
  test('should return a value between -Infinity and Infinity for any valid input', () => {
    const result = tan(Math.random() * 2 * Math.PI);  
    expect(result).toBeGreaterThanOrEqual(-Infinity);
    expect(result).toBeLessThanOrEqual(Infinity);
  });
});
