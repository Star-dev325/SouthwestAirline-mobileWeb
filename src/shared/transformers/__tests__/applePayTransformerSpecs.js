import _ from 'lodash';

import { getCeptorCallbackResponse } from 'test/builders/model/ceptorBuilder';
import { toApplePayCard } from 'src/shared/transformers/applePayTransformer';

describe('applePayTransformer', () => {
  context('toApplePayCard', () => {
    it('should format the ceptor callback response to the correct applePayCard format', () => {
      const ceptorCallbackResponse = getCeptorCallbackResponse();
      const result = toApplePayCard(ceptorCallbackResponse, '123456');

      expect(result).to.deep.eql({
        token: {
          cardType: 'Visa',
          digitalTransactionId: '123456',
          expirationMonth: '05',
          expirationYear: '2020',
          lastFourDigits: '1234',
          number: '1234'
        },
        billingAddress: { 
          addressLine1: '1234 Test Ln',
          addressLine2: 'Apt 123',
          city: 'Dallas',
          firstName: 'First',
          isoCountryCode: 'US',
          lastName: 'Last',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '1234'
        },
        isNativeApplePay: false
      });
    });

    it('should format the ceptor callback response to the correct applePayCard format with undefined set for missing fields', () => {
      const ceptorCallbackResponse = _.chain(getCeptorCallbackResponse())
        .omit(['paymentData.expiryMonth', 'paymentData.billingInfo.locality'])
        .set('paymentData.billingInfo.addressLines', ['1234 Test Ln'])
        .value();

      const result = toApplePayCard(ceptorCallbackResponse, '123456');

      expect(result).to.deep.eql({
        token: {
          cardType: 'Visa',
          digitalTransactionId: '123456',
          expirationMonth: undefined,
          expirationYear: '2020',
          lastFourDigits: '1234',
          number: '1234'
        },
        billingAddress: {
          addressLine1: '1234 Test Ln',
          addressLine2: undefined,
          city: undefined,
          firstName: 'First',
          isoCountryCode: 'US',
          lastName: 'Last',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '1234'
        },
        isNativeApplePay: false
      });
    });
  });
});
