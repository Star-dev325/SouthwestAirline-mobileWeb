import {
  toNumberFromFormattedString,
  toFormattedStringFromNumber,
  toFormattedPrice,
  toNumberStringWithoutCommas
} from 'src/shared/helpers/currencyValueHelper';

describe('CurrencyValueHelper', () => {
  context('toNumberFromFormattedString', () => {
    it('should convert a string to a number', () => {
      expect(toNumberFromFormattedString('123')).to.deep.equal(123);
    });

    it('should handle strings with a comma', () => {
      expect(toNumberFromFormattedString('1,200')).to.deep.equal(1200);
    });

    it('should handle strings with multiple commas', () => {
      expect(toNumberFromFormattedString('1,200,000,000')).to.deep.equal(1200000000);
    });

    it('should handle undefined formattedString', () => {
      expect(toNumberFromFormattedString(undefined)).to.equal(0);
    });
  });

  context('toFormattedStringFromNumber', () => {
    it('should convert a string to a number', () => {
      expect(toFormattedStringFromNumber(123)).to.deep.equal('123');
    });

    it('should handle strings with a comma', () => {
      expect(toFormattedStringFromNumber(1200)).to.deep.equal('1,200');
    });

    it('should handle strings with multiple commas', () => {
      expect(toFormattedStringFromNumber(1200000000)).to.deep.equal('1,200,000,000');
    });

    it('should handle undefined number', () => {
      expect(toFormattedStringFromNumber(undefined)).to.equal('');
    });
  });

  context('toFormattedPrice', () => {
    it('should convert a string to a number', () => {
      expect(toFormattedPrice(123)).to.deep.equal('123.00');
    });

    it('should return string with decimals', () => {
      expect(toFormattedPrice('123.1')).to.deep.equal('123.10');
    });

    it('should return string with 2 decimals', () => {
      expect(toFormattedPrice('123.13')).to.deep.equal('123.13');
    });

    it('should return string with 2 decimals limit', () => {
      expect(toFormattedPrice('123.134')).to.deep.equal('123.13');
    });

    it('should handle strings with a comma', () => {
      expect(toFormattedPrice(1200)).to.deep.equal('1,200.00');
    });

    it('should handle strings with multiple commas', () => {
      expect(toFormattedPrice(1200000000)).to.deep.equal('1,200,000,000.00');
    });

    it('should handle undefined number', () => {
      expect(toFormattedPrice(undefined)).to.equal('');
    });
  });

  context('toNumberStringWithoutCommas', () => {
    it('should return same string if no commas', () => {
      expect(toNumberStringWithoutCommas('123')).to.deep.equal('123');
    });

    it('should handle strings with a comma', () => {
      expect(toNumberStringWithoutCommas('12,000')).to.deep.equal('12000');
    });

    it('should handle strings with multiple commas', () => {
      expect(toNumberStringWithoutCommas('23,67,89,990')).to.deep.equal('236789990');
    });

    it('should handle undefined input', () => {
      expect(toNumberStringWithoutCommas(undefined)).to.equal('');
    });

    it('should handle null input', () => {
      expect(toNumberStringWithoutCommas(null)).to.equal('');
    });
  });
});
