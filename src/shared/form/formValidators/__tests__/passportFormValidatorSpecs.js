import passportFormValidator from 'src/shared/form/formValidators/passportFormValidator';
import i18n from '@swa-ui/locale';

describe('passportFormValidator', () => {
  it('should pass form validation when data is correct', () => {
    const formData = {
      countryOfResidence: 'US',
      emergencyContactName: 'TEST NAME',
      nationality: 'AO',
      passportExpirationDate: '2019-11-17',
      passportIssuedBy: 'AS',
      passportNumber: 'AAAA',
      emergencyContactCountryCode: 'US',
      emergencyContactPhoneNumber: '213-131-2321'
    };

    expect(passportFormValidator({})(formData)).to.deep.equal({});
  });

  it('should return correct error message when input empty', () => {
    const formData = {
      countryOfResidence: '',
      emergencyContactName: '',
      nationality: '',
      passportExpirationDate: '',
      passportIssuedBy: '',
      passportNumber: '',
      emergencyContactCountryCode: '',
      emergencyContactPhoneNumber: ''
    };

    expect(passportFormValidator({})(formData)).to.deep.equal({
      hasSomeInputedValues: {
        msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
        type: 'ERROR_HEADER'
      },
      countryOfResidence: { type: 'REQUIRED_ERROR' },
      nationality: { type: 'REQUIRED_ERROR' },
      passportExpirationDate: { type: 'REQUIRED_ERROR' },
      passportIssuedBy: { type: 'REQUIRED_ERROR' },
      passportNumber: { type: 'REQUIRED_ERROR' }
    });
  });

  it('should return error message for contact method when only input name', () => {
    const formData = {
      countryOfResidence: 'US',
      emergencyContactName: 'TEST NAME',
      nationality: 'AO',
      passportExpirationDate: '2019-11-17',
      passportIssuedBy: 'AS',
      passportNumber: 'AAAA',
      emergencyContactCountryCode: 'US',
      emergencyContactPhoneNumber: ''
    };

    expect(passportFormValidator({})(formData)).to.deep.equal({
      hasSomeInputedValues: {
        msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
        type: 'ERROR_HEADER'
      },
      emergencyContactPhoneNumber: {
        type: 'REQUIRED_ERROR'
      }
    });
  });

  it('should return error message for contact method when only input phone number', () => {
    const formData = {
      countryOfResidence: 'US',
      emergencyContactName: '',
      nationality: 'AO',
      passportExpirationDate: '2019-11-17',
      passportIssuedBy: 'AS',
      passportNumber: 'AAAA',
      emergencyContactCountryCode: 'US',
      emergencyContactPhoneNumber: '213-131-2321'
    };

    expect(passportFormValidator({})(formData)).to.deep.equal({
      hasSomeInputedValues: {
        msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
        type: 'ERROR_HEADER'
      },
      emergencyContactName: {
        type: 'REQUIRED_ERROR'
      }
    });
  });

  it('should return correct error message when input not correct', () => {
    const formData = {
      countryOfResidence: 'US',
      emergencyContactName: 'TES-',
      nationality: 'AO',
      passportExpirationDate: '2019-11-17',
      passportIssuedBy: 'AS',
      passportNumber: 'AA',
      emergencyContactCountryCode: 'US',
      emergencyContactPhoneNumber: '2133123'
    };

    expect(passportFormValidator({})(formData)).to.deep.equal({
      hasSomeFieldsNeedToCorrect: {
        msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
        type: 'ERROR_HEADER'
      },
      emergencyContactName: {
        msg: 'Enter a valid first name and last name with no special characters or numbers (spaces allowed).',
        type: 'FIELD_ERROR_MESSAGE'
      },
      passportNumber: {
        msg: 'Enter a valid passport number.',
        type: 'FIELD_ERROR_MESSAGE'
      },
      emergencyContactPhoneNumber: {
        msg: 'Phone number must be 10 digits.',
        type: 'FIELD_ERROR_MESSAGE'
      }
    });
  });

  it('should return emergency contact is required when we have enableUserToHideEmergencyContact', () => {
    const formData = {
      countryOfResidence: '',
      emergencyContactName: '',
      nationality: '',
      passportExpirationDate: '',
      passportIssuedBy: '',
      passportNumber: '',
      emergencyContactCountryCode: '',
      emergencyContactPhoneNumber: ''
    };

    expect(passportFormValidator({ enableUserToHideEmergencyContact: true })(formData)).to.deep.equal({
      hasSomeInputedValues: {
        msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
        type: 'ERROR_HEADER'
      },
      countryOfResidence: { type: 'REQUIRED_ERROR' },
      nationality: { type: 'REQUIRED_ERROR' },
      passportExpirationDate: { type: 'REQUIRED_ERROR' },
      passportIssuedBy: { type: 'REQUIRED_ERROR' },
      passportNumber: { type: 'REQUIRED_ERROR' },
      emergencyContactName: { type: 'REQUIRED_ERROR' },
      emergencyContactPhoneNumber: { type: 'REQUIRED_ERROR' }
    });
  });

  it('should return emergency contact is required when we have not enableUserToHideEmergencyContact and have inputted contact name', () => {
    const formData = {
      countryOfResidence: '',
      emergencyContactName: 'Shelton',
      nationality: '',
      passportExpirationDate: '',
      passportIssuedBy: '',
      passportNumber: '',
      emergencyContactCountryCode: '',
      emergencyContactPhoneNumber: ''
    };

    expect(passportFormValidator({})(formData)).to.deep.equal({
      hasSomeInputedValues: {
        msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
        type: 'ERROR_HEADER'
      },
      countryOfResidence: { type: 'REQUIRED_ERROR' },
      nationality: { type: 'REQUIRED_ERROR' },
      passportExpirationDate: { type: 'REQUIRED_ERROR' },
      passportIssuedBy: { type: 'REQUIRED_ERROR' },
      passportNumber: { type: 'REQUIRED_ERROR' },
      emergencyContactPhoneNumber: { type: 'REQUIRED_ERROR' }
    });
  });

  it('should return emergency contact is required when we have not enableUserToHideEmergencyContact and have inputted contact number', () => {
    const formData = {
      countryOfResidence: '',
      emergencyContactName: '',
      nationality: '',
      passportExpirationDate: '',
      passportIssuedBy: '',
      passportNumber: '',
      emergencyContactCountryCode: 'US',
      emergencyContactPhoneNumber: '413-454-4444'
    };

    expect(passportFormValidator({})(formData)).to.deep.equal({
      hasSomeInputedValues: {
        msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
        type: 'ERROR_HEADER'
      },
      countryOfResidence: { type: 'REQUIRED_ERROR' },
      nationality: { type: 'REQUIRED_ERROR' },
      passportExpirationDate: { type: 'REQUIRED_ERROR' },
      passportIssuedBy: { type: 'REQUIRED_ERROR' },
      passportNumber: { type: 'REQUIRED_ERROR' },
      emergencyContactName: { type: 'REQUIRED_ERROR' }
    });
  });
});
