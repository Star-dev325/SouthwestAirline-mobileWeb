import { parsePhoneNumber, addHyphensToPhoneNumber } from 'src/shared/helpers/phoneNumberHelper';

describe('phoneNumberHelper', () => {
  context('parsePhoneNumber', () => {
    it('should return phoneAreaCode, phoneExchangeNumber and phoneLineNumber', () => {
      expect(parsePhoneNumber('123-123-1231')).to.deep.equal({
        phoneAreaCode: '123',
        phoneExchangeNumber: '123',
        phoneLineNumber: '1231'
      });
    });
  });

  context('addHyphensToPhoneNumber', () => {
    it('should return hyphenated phone number from a 10-digit string', () => {
      expect(addHyphensToPhoneNumber('1234567890')).to.equal('123-456-7890');
    });
  });
});
