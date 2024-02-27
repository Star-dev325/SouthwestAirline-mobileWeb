import _ from 'lodash';

import { getPayment } from 'src/airChange/analytics/paymentSelectors';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import { getPaymentInfoForUseNewCreditCard } from 'test/builders/model/paymentInfoBuilder';

describe('paymentSelectors', () => {
  context('getPayment', () => {
    it('should generate correct payment', () => {
      const paymentInfo = { ...getPaymentInfoForUseNewCreditCard(), selectedCardId: '1-ENKS5K' };
      const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
      const state = _.set({}, 'app.savedCreditCards', savedCreditCards);

      _.set(state, 'app.airChange.paymentInfo', paymentInfo);

      expect(getPayment(state)).to.deep.equal({
        city: 'Brooklyn',
        state: 'AS',
        saveNewCardSelected: false,
        storedCard: true,
        type: 'VISA',
        zipcode: '12312'
      });
    });
  });
});
