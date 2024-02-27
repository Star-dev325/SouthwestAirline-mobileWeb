import { getPaymentInfoForUseNewCreditCard } from 'test/builders/model/paymentInfoBuilder';
import { transformExpirationPaymentInfo } from 'src/shared/transformers/cardExpirationDateTransformer';
import _ from 'lodash';

describe('passengerInfosTransformerSpecs', () => {
  context('transformExpirationPaymentInfo', () => {
    it('should return expiration in MM/YYYY format when second parameter is MM/YYYY', () => {
      const paymentInfo = getPaymentInfoForUseNewCreditCard();

      expect(transformExpirationPaymentInfo(paymentInfo, 'MM/YYYY').expiration).to.equal('10/2029');
    });

    it('should return expiration in YYYY-MM format when second parameter is in YYYY-MM format', () => {
      const paymentInfo = _.merge({}, getPaymentInfoForUseNewCreditCard(), { expiration: '2029-10' });

      expect(transformExpirationPaymentInfo(paymentInfo, 'YYYY-MM').expiration).to.equal('2029-10');
    });
  });
});
