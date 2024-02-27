import { calculateFlightNumberFontSize, isValidFlightNumber } from 'src/shared/helpers/flightInfoHelper';

describe('Flight Info Helper', () => {
  describe('calculateFlightNumberFontSize', () => {
    it('should return "xlarge" if the character count is less than or equal to 9', () => {
      expect(calculateFlightNumberFontSize('1234/1234')).toEqual('xlarge');
    });

    it('should return "large" if the character count is over 9 and less than or equal to 13', () => {
      expect(calculateFlightNumberFontSize('1234/123/1234')).toEqual('large');
    });

    it('should return "medium" if the character count is over 13', () => {
      expect(calculateFlightNumberFontSize('1234/1234/1234')).toEqual('medium');
    });

    it('should return "xlarge" if the flightNumber is undefined', () => {
      expect(calculateFlightNumberFontSize(undefined)).toEqual('xlarge');
    });

    it('should return "large" if the flightNumber is an array with combined characters over 9 and less than or equal to 13', () => {
      expect(calculateFlightNumberFontSize(['1234', '/123', '/1234'])).toEqual('large');
    });
  });

  describe('isValidFlightNumber', () => {
    it('should not accept decimals', () => {
      expect(isValidFlightNumber('1.23')).toEqual(false);
    });
  
    it('should not accept negative numbers', () => {
      expect(isValidFlightNumber('-123')).toEqual(false);
    });
  
    it('should not accept zero', () => {
      expect(isValidFlightNumber('0')).toEqual(false);
    });
  
    it('should limit the number to four digits', () => {
      expect(isValidFlightNumber('12345')).toEqual(false);
    });
  
    it('should not accept arithmetic characters', () => {
      expect(isValidFlightNumber('+123')).toEqual(false);
    });
  });
});
