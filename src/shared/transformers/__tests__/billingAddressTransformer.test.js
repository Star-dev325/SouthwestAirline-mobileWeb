import {
  transformContactInfoToBillingAddressFormData,
  transformToTravelFundsAddress
} from 'src/shared/transformers/billingAddressTransformer';

describe('billingAddressTransformer', () => {
  describe('transformContactINfoToBillingAddressFormData', () => {
    it('should provide reasonable defaults when contact info is empty', () => {
      expect(transformContactInfoToBillingAddressFormData()).toEqual({
        addressLine1: '',
        addressLine2: '',
        city: '',
        isoCountryCode: 'US',
        phoneCountryCode: 'US',
        phoneNumber: '',
        stateProvinceRegion: '',
        zipOrPostalCode: ''
      });
    });

    it('should transform account contact info to billing address form data', () => {
      const accountContactInfo = {
        address: {
          addressLine1: 'Contact Info Lane',
          addressLine2: '',
          city: 'Dallas',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '12345',
          isoCountryCode: 'US'
        },
        phone: {
          number: '2155465465',
          countryCode: '1'
        }
      };

      expect(transformContactInfoToBillingAddressFormData(accountContactInfo)).toEqual({
        addressLine1: 'Contact Info Lane',
        addressLine2: '',
        city: 'Dallas',
        stateProvinceRegion: 'TX',
        zipOrPostalCode: '12345',
        isoCountryCode: 'US',
        phoneNumber: '215-546-5465',
        phoneCountryCode: 'US'
      });
    });

    it('should transform account contact info with intl phone code to billing address form data', () => {
      const accountContactInfo = {
        address: {
          addressLine1: 'Contact Info Lane',
          addressLine2: '',
          city: 'Dallas',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '12345',
          isoCountryCode: 'US'
        },
        phone: {
          number: '215546546500',
          countryCode: '30'
        }
      };

      expect(transformContactInfoToBillingAddressFormData(accountContactInfo)).toEqual({
        addressLine1: 'Contact Info Lane',
        addressLine2: '',
        city: 'Dallas',
        stateProvinceRegion: 'TX',
        zipOrPostalCode: '12345',
        isoCountryCode: 'US',
        phoneNumber: '215546546500',
        phoneCountryCode: 'GR'
      });
    });
  });

  it('transformToTravelFundsAddress - should transform form data to travelFundsAddress for CHAPI', () => {
    const billingAddressFormData = {
      addressLine1: 'Contact Info Lane',
      addressLine2: '',
      city: 'Dallas',
      stateProvinceRegion: 'TX',
      zipOrPostalCode: '12345',
      isoCountryCode: 'US',
      phoneNumber: '215-546-5465',
      phoneCountryCode: 'US'
    };

    expect(transformToTravelFundsAddress(billingAddressFormData)).toEqual({
      address: {
        addressLine1: 'Contact Info Lane',
        addressLine2: null,
        city: 'Dallas',
        stateProvinceRegion: 'TX',
        zipOrPostalCode: '12345',
        isoCountryCode: 'US'
      },
      phoneNumber: '2155465465'
    });
  });
});
