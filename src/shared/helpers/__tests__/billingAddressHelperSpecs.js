import { isBillingAddressComplete } from 'src/shared/helpers/billingAddressHelper';

describe('BillingAddressHelper', () => {
  context('isBillingAddressComplete', () => {
    it('should return true if billing address data is complete', () => {
      expect(
        isBillingAddressComplete({
          addressLine1: '554 Lane',
          addressLine2: '',
          city: 'Austin',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '75204',
          isoCountryCode: 'US',
          phoneNumber: '215-546-5465',
          phoneCountryCode: 'US'
        })
      ).to.equal(true);
    });

    it('should return false if billing address data is incomplete', () => {
      expect(
        isBillingAddressComplete({
          addressLine1: '554 Lane',
          addressLine2: '',
          city: null,
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '75204',
          isoCountryCode: 'US',
          phoneNumber: '215-546-5465',
          phoneCountryCode: 'US'
        })
      ).to.equal(false);
    });
  });
});
