import billingAddressFormValidator from 'src/shared/form/formValidators/billingAddressFormValidator';

describe('billingAddressFormValidator', () => {
  let formData;

  beforeEach(() => {
    formData = {
      isoCountryCode: 'US',
      addressLine1: '83 Main St',
      addressLine2: '',
      zipOrPostalCode: '87516',
      city: 'Brooklyn',
      stateProvinceRegion: 'NY',
      phoneCountryCode: 'AS',
      phoneNumber: '123-456-7890'
    };
  });

  it('should pass form validation when formData correct', () => {
    expect(billingAddressFormValidator()(formData)).to.deep.equal({});
  });
});
