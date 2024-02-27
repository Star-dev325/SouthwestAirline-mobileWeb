import _ from 'lodash';

import { getCeptorCallbackResponse } from 'test/builders/model/ceptorBuilder';
import { toUpliftCard } from 'src/shared/transformers/upliftTransformer';

describe('upliftTransformer', () => {
  context('toUpliftCard', () => {
    it('should format the ceptor callback response to the correct upliftCard format', () => {
      const ceptorCallbackResponse = getCeptorCallbackResponse();
      const result = toUpliftCard(ceptorCallbackResponse);

      expect(result).to.deep.eql({
        token: {
          number: '1234',
          expirationMonth: '05',
          expirationYear: '2020'
        },
        billingAddress: {
          isoCountryCode: 'US',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '1234',
          addressLine1: '1234 Test Ln',
          addressLine2: 'Apt 123',
          city: 'Dallas',
          firstName: 'First',
          lastName: 'Last'
        }
      });
    });

    it('should format the ceptor callback response to the correct upliftCard format with undefined set for missing fields', () => {
      const ceptorCallbackResponse = _.chain(getCeptorCallbackResponse())
        .omit(['paymentData.expiryMonth', 'paymentData.billingInfo.locality'])
        .set('paymentData.billingInfo.addressLines', ['1234 Test Ln'])
        .value();

      const result = toUpliftCard(ceptorCallbackResponse);

      expect(result).to.deep.eql({
        token: {
          number: '1234',
          expirationMonth: '',
          expirationYear: '2020'
        },
        billingAddress: {
          isoCountryCode: 'US',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '1234',
          addressLine1: '1234 Test Ln',
          addressLine2: undefined,
          city: undefined,
          firstName: 'First',
          lastName: 'Last'
        }
      });
    });

    it('should format the ceptor callback response to the correct upliftCard format with double digit month when single digit month present', () => {
      const ceptorCallbackResponse = _.chain(getCeptorCallbackResponse())
        .set('paymentData.billingInfo.addressLines', ['1234 Test Ln'])
        .set('paymentData.expiryMonth', 5)
        .value();

      const result = toUpliftCard(ceptorCallbackResponse);

      expect(result).to.deep.eql({
        token: {
          number: '1234',
          expirationMonth: '05',
          expirationYear: '2020'
        },
        billingAddress: {
          isoCountryCode: 'US',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '1234',
          addressLine1: '1234 Test Ln',
          addressLine2: undefined,
          city: 'Dallas',
          firstName: 'First',
          lastName: 'Last'
        }
      });
    });

    it('should format the ceptor callback response to the correct upliftCard format with double digit month when double digit month present', () => {
      const ceptorCallbackResponse = _.chain(getCeptorCallbackResponse())
        .set('paymentData.billingInfo.addressLines', ['1234 Test Ln'])
        .set('paymentData.expiryMonth', 10)
        .value();

      const result = toUpliftCard(ceptorCallbackResponse);

      expect(result).to.deep.eql({
        token: {
          number: '1234',
          expirationMonth: '10',
          expirationYear: '2020'
        },
        billingAddress: {
          isoCountryCode: 'US',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '1234',
          addressLine1: '1234 Test Ln',
          addressLine2: undefined,
          city: 'Dallas',
          firstName: 'First',
          lastName: 'Last'
        }
      });
    });
  });
});
