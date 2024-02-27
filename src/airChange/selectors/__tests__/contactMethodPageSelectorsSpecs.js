import { isAlreadyHasContactMethod } from 'src/airChange/selectors/contactMethodPageSelectors';

describe('contactMethodPageSelectors', () => {
  context('isAlreadyHasContactMethod', () => {
    it('should return true if existed contact method is not CALL_ME and is not international', () => {
      const state = generateStateForContactMethod('TEXT_ME');

      const result = isAlreadyHasContactMethod(state);

      expect(result).to.be.true;
    });

    it('should return true if existed contact method is CALL_ME and is not international', () => {
      const state = generateStateForContactMethod('CALL_ME');

      const result = isAlreadyHasContactMethod(state);

      expect(result).to.be.true;
    });

    it('should return false if no existed contact method and is not international', () => {
      const state = generateStateForContactMethod('');

      const result = isAlreadyHasContactMethod(state);

      expect(result).to.be.false;
    });

    it('should return true if existed contact method is not CALL_ME and is international', () => {
      const state = generateStateForContactMethod('TEXT_ME', true);

      const result = isAlreadyHasContactMethod(state);

      expect(result).to.be.true;
    });

    it('should return false if existed contact method is CALL_ME and is international', () => {
      const state = generateStateForContactMethod('CALL_ME', true);

      const result = isAlreadyHasContactMethod(state);

      expect(result).to.be.false;
    });

    it('should return false if no existed contact method and is international', () => {
      const state = generateStateForContactMethod('', true);

      const result = isAlreadyHasContactMethod(state);

      expect(result).to.be.false;
    });
  });

  const generateStateForContactMethod = (contactMethod, isInternational = false) => ({
    app: {
      airChange: {
        accountInfo: {
          contactMethod
        },
        changePricingPage: {
          response: {
            _meta: {
              isInternational
            }
          }
        }
      }
    }
  });
});
