import {
    calculateCartTotal,
    validateUser,
    formatPrice,
    isCartEmpty,
    truncateText,
  } from '../../helpers/utils';
  
  describe('Unit Tests - Utils', () => {
    test('calculateCartTotal should return correct total', () => {
      const cart = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ];
      expect(calculateCartTotal(cart)).toBe(10 * 2 + 5 * 3); // 35
    });
  
    test('validateUser should validate username and password', () => {
      expect(validateUser('john', 'secret123')).toBe(true);
      expect(validateUser('a', '123')).toBe(false);
    });
  
    test('formatPrice should format number into $xx.xx', () => {
      expect(formatPrice(19.5)).toBe('$19.50');
      expect(formatPrice(100)).toBe('$100.00');
    });
  
    test('isCartEmpty should detect empty cart', () => {
      expect(isCartEmpty([])).toBe(true);
      expect(isCartEmpty([{ price: 10 }])).toBe(false);
    });
  
    test('truncateText should shorten long text with ellipsis', () => {
      const longText = "This is a very long sentence.";
      expect(truncateText(longText, 10)).toBe("This is a ...");
      expect(truncateText("Short", 10)).toBe("Short");
    });
  });
  