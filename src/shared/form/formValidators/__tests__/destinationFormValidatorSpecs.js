import validator from 'src/shared/form/formValidators/destinationFormValidator';

describe('Destination Form Validator', () => {
  it('should not have errors when form is valid', () => {
    const formData = {
      addressLine: '123 Fake Street',
      city: 'Beverly Hills',
      contactEmail: 'example@wncom.com',
      contactPhone1CountryCode: '1',
      contactPhone1Number: '311-555-2310',
      contactPhone2CountryCode: '1',
      contactPhone2Number: '311-555-1234',
      isoCountryCode: 'US',
      stateProvinceRegion: 'CA',
      zipOrPostalCode: '90210'
    };

    expect(validator()(formData)).to.deep.equal({});
  });

  it('should not have errors when international form is valid', () => {
    const formData = {
      addressLine: '123 Fake Street',
      city: 'Beverly Hills',
      contactEmail: 'example@wncom.com',
      contactPhone1CountryCode: '672',
      contactPhone1Number: '444555666777',
      contactPhone2CountryCode: '42',
      contactPhone2Number: '311555123456',
      isoCountryCode: 'MX',
      stateProvinceRegion: 'CA',
      zipOrPostalCode: '90210'
    };

    expect(validator()(formData)).to.deep.equal({});
  });

  it('should have errors when form is blank', () => {
    const formData = {
      addressLine: null,
      city: null,
      contactEmail: null,
      contactPhone1CountryCode: null,
      contactPhone1Number: null,
      contactPhone2CountryCode: null,
      contactPhone2Number: null,
      isoCountryCode: null,
      stateProvinceRegion: null,
      zipOrPostalCode: null
    };
    const props = {
      destinationConfig: {
        contactEmailRequired: true,
        contactPhone1Required: true,
        contactPhone2Required: true
      }
    };

    expect(validator(props)(formData)).to.deep.equal({
      addressLine: {
        type: 'REQUIRED_ERROR'
      },
      city: {
        type: 'REQUIRED_ERROR'
      },
      contactEmail: {
        type: 'REQUIRED_ERROR'
      },
      contactPhone1Number: {
        type: 'REQUIRED_ERROR'
      },
      contactPhone2Number: {
        type: 'REQUIRED_ERROR'
      },
      hasSomeInputedValues: {
        msg: 'Please correct the highlighted errors.',
        type: 'ERROR_HEADER'
      },
      isoCountryCode: {
        type: 'REQUIRED_ERROR'
      },
      stateProvinceRegion: {
        type: 'REQUIRED_ERROR'
      },
      zipOrPostalCode: {
        type: 'REQUIRED_ERROR'
      }
    });
  });

  it('should not have errors when form when optional fields are blank', () => {
    const formData = {
      addressLine: '123 Fake Street',
      city: 'Beverly Hills',
      contactEmail: '',
      contactPhone1CountryCode: '1',
      contactPhone1Number: '',
      contactPhone2CountryCode: '1',
      contactPhone2Number: '',
      isoCountryCode: 'US',
      stateProvinceRegion: 'CA',
      zipOrPostalCode: '90210'
    };

    expect(validator()(formData)).to.deep.equal({});
  });
});
