import { paymentInfo } from 'src/earlyBird/reducers/earlyBirdReducers';
import earlyBirdActionTypes from 'src/earlyBird/actions/earlyBirdActionTypes';

const { EARLY_BIRD__SAVE_PAYMENT_INFO, EARLY_BIRD__RESET_PAYMENT_INFO } = earlyBirdActionTypes;

describe('earlyBirdReducers', () => {
  context('paymentInfo', () => {
    it('should initialize paymentInfo', () => {
      const state = paymentInfo(undefined, { type: '@@INIT' });

      expect(state).to.deep.equal({});
    });

    it('should set paymentInfo empty when reset payment information', () => {
      const state = paymentInfo(
        { cardNumber: 'ABC123' },
        { type: EARLY_BIRD__RESET_PAYMENT_INFO, response: 'response' }
      );

      expect(state).to.deep.equal({});
    });

    it('should return default state when action is undefined', () => {
      expect(paymentInfo()).to.deep.equal({});
    });

    it('should update paymentInfo when save payment info', () => {
      const state = paymentInfo(
        { cardNumber: 'ABC123' },
        {
          type: EARLY_BIRD__SAVE_PAYMENT_INFO,
          paymentInfo: { cardNumber: '123ABC' }
        }
      );

      expect(state).to.deep.equal({ cardNumber: '123ABC' });
    });
  });
});
