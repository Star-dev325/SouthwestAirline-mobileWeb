import { convertStringToInt, convertToNumber } from 'src/shared/helpers/numberHelper';

describe('numberHelper', () => {
  describe('convertStringToInt', () => {
    it('should return a number for valid number', () => {
      expect(convertStringToInt('2')).toBe(2);
    });

    it('should return 0 for empty string', () => {
      expect(convertStringToInt('')).toBe(0);
    });

    it('should return 0 for null or undefined or invalid', () => {
      expect(convertStringToInt(null)).toBe(0);
      expect(convertStringToInt(undefined)).toBe(0);
      expect(convertStringToInt('notanumber')).toBe(0);
    });
  });

  describe('convertToNumber', () => {
    it('should return null when input param is null', () => {
      expect(convertToNumber(null)).toBeNull();
    });

    it('should return undefined when input param is null', () => {
      expect(convertToNumber(undefined)).toBeNull();
    });

    it('should return number value when input param is contains a number with commas', () => {
      expect(convertToNumber('1,000')).toBe(1000);
    });

    it('should return number value when input param is contains a number with decimal (float)', () => {
      expect(convertToNumber('100.99')).toBe(100.99);
    });
  });
});
