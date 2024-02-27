import {
  addUSPhoneNumberSeparator,
  addPhoneNumberSeparator,
  removeSeparator
} from 'src/shared/helpers/separatorHelper';

describe('phoneNumberHelper', () => {
  context('#removeSeparator', () => {
    it('should remove separator when input is string containing `-`', () => {
      expect(removeSeparator('123-123-1231')).to.equal('1231231231');
    });

    it('should return itself when input is string not containing `-`', () => {
      expect(removeSeparator('1231231231')).to.equal('1231231231');
    });

    it('should return itself when input is not a string', () => {
      expect(removeSeparator(1231231231)).to.equal(1231231231);
    });
  });

  context('#addUSPhoneNumberSeparator', () => {
    it('should add dash between number', () => {
      expect(addUSPhoneNumberSeparator('9123456789')).to.equal('912-345-6789');
    });
  });

  context('#addPhoneNumberSeparator', () => {
    it('should add dash between number', () => {
      expect(addPhoneNumberSeparator('9123456789', '1')).to.equal('912-345-6789');
    });

    it('should not format international', () => {
      expect(addPhoneNumberSeparator('9123456789', '42')).to.equal('9123456789');
    });

    it('should not format blank strings', () => {
      expect(addPhoneNumberSeparator('', '1')).to.equal('');
    });
  });
});
