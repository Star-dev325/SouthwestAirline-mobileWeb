import { isAlreadyHasContactMethod } from 'src/airBooking/selectors/contactMethodPageSelectors';

describe('contactMethodPageSelectors', () => {
  context('isAlreadyHasContactMethod', () => {
    it('should return true if user already has saved contact method', () => {
      const state = generateStateForContactMethod('TEXT_ME');

      const result = isAlreadyHasContactMethod(state);

      expect(result).to.be.true;
    });

    it('should return false if user do not have saved contact method', () => {
      const state = generateStateForContactMethod();

      const result = isAlreadyHasContactMethod(state);

      expect(result).to.be.false;
    });

    context('international booking', () => {
      it('should return true if user have saved contact method except CALL_ME', () => {
        const state = generateStateForContactMethod('EMAIL_ME', true);

        const result = isAlreadyHasContactMethod(state);

        expect(result).to.be.true;
      });

      it('should return false if user have saved contact method with CALL_ME', () => {
        const state = generateStateForContactMethod('CALL_ME', true);

        const result = isAlreadyHasContactMethod(state);

        expect(result).to.be.false;
      });
    });
  });

  const generateStateForContactMethod = (contactMethod, isInternationalBooking = false) => ({
    app: {
      airBooking: {
        accountInfo: {
          contactMethod
        },
        isInternationalBooking
      }
    }
  });
});
