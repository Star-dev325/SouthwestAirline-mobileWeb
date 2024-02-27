import _ from 'lodash';
import { sandbox } from 'sinon';

import travelInformationFormValidator from 'src/shared/form/formValidators/travelInformationFormValidator';
import * as AsyncValidators from 'src/shared/form/formValidators/asyncValidators';
import i18n from '@swa-ui/locale';

const sinon = sandbox.create();

describe('travelInformationFormValidator', () => {
  let domesticFormProps;
  let internationalFormProps;
  let rrStub;

  beforeEach(() => {
    domesticFormProps = {
      isInternational: false,
      initialFormData: {}
    };
    internationalFormProps = {
      isInternational: true,
      initialFormData: {}
    };

    rrStub = sinon.stub(AsyncValidators, 'rapidRewardsNumberValidator').returns(() => true);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('domestic', () => {
    it('should pass form validation when all domestic data is correctly populated', () => {
      const formData = {
        rapidRewardsNumber: '601005646',
        redressNumber: '1234567',
        knownTravelerNumber: '123456789012345'
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({});
    });

    it('should pass form validation when no domestic data is populated', () => {
      const formData = {
        rapidRewardsNumber: '',
        redressNumber: '',
        knownTravelerNumber: ''
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({});
    });

    it('should pass form validation when redress and KTN are "On File"', () => {
      const formData = {
        rapidRewardsNumber: ''
      };

      domesticFormProps = {
        isInternational: false,
        initialFormData: {
          redressNumber: 'On File',
          knownTravelerNumber: 'On File'
        }
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({});
    });

    it('should return error message when invalid rapid rewards value', () => {
      const formData = {
        rapidRewardsNumber: 'ABC'
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        },
        rapidRewardsNumber: {
          msg: 'Enter a valid numeric account number.',
          type: 'FIELD_ERROR_MESSAGE'
        }
      });
    });

    it('should return error message when invalid KTN value', () => {
      const formData = {
        knownTravelerNumber: '###'
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        },
        knownTravelerNumber: {
          msg: 'Enter a valid alphanumeric Known Traveler Number.',
          type: 'FIELD_ERROR_MESSAGE'
        }
      });
    });

    it('should return error message when KTN was on file and user submits form with KTN field blank', () => {
      domesticFormProps = {
        initialFormData: {
          redressNumber: 'On File',
          knownTravelerNumber: 'On File'
        }
      };

      const formData = {
        knownTravelerNumber: ''
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        },
        knownTravelerNumber: {
          type: 'FIELD_ERROR_MESSAGE',
          msg: 'Re-enter a valid Known Traveler Number, If you need to remove this number from your reservation, please call <a href="tel:18004359792">1-800-435-9792</a>'
        }
      });
    });

    it('should return error message when invalid redress value', () => {
      const formData = {
        redressNumber: '###'
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        },
        redressNumber: {
          msg: 'Enter a valid numeric Redress number.',
          type: 'FIELD_ERROR_MESSAGE'
        }
      });
    });

    it('should return error message when redress was on file and user submits form with redress field blank', () => {
      domesticFormProps = {
        isInternational: false,
        initialFormData: {
          redressNumber: 'On File',
          knownTravelerNumber: 'On File'
        }
      };

      const formData = {
        redressNumber: ''
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        },
        redressNumber: {
          type: 'FIELD_ERROR_MESSAGE',
          msg: 'Re-enter a valid Redress number, If you need to remove this number from your reservation, please call <a href="tel:18004359792">1-800-435-9792</a>'
        }
      });
    });

    it('should fail with api error when validating rapid rewards account number fails', () => {
      rrStub.returns(() => false);

      const formData = {
        rapidRewardsNumber: '601005646'
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({
        isAccountNumberMatchWithName: {
          msg: 'Something must have gone wrong. Please try again.',
          type: 'API_ERROR_POPUP'
        }
      });
    });

    it('should prevent user from entering "On File" in KTN field', () => {
      domesticFormProps = {
        isInternational: false,
        initialFormData: {
          knownTravelerNumber: ''
        }
      };
      const formData = {
        knownTravelerNumber: 'On File'
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        },
        knownTravelerNumber: {
          msg: 'Enter a valid alphanumeric Known Traveler Number.',
          type: 'FIELD_ERROR_MESSAGE'
        }
      });
    });

    it('should prevent user from entering "On File" in redress number field', () => {
      domesticFormProps = {
        isInternational: false,
        initialFormData: {
          redressNumber: ''
        }
      };
      const formData = {
        redressNumber: 'On File'
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        },
        redressNumber: {
          msg: 'Enter a valid numeric Redress number.',
          type: 'FIELD_ERROR_MESSAGE'
        }
      });
    });
  });

  context('international', () => {
    it('should pass form validation when all data is correct', () => {
      const formData = {
        rapidRewardsNumber: '601005646',
        redressNumber: '1234567',
        knownTravelerNumber: '123456789012345',
        countryOfResidence: 'US',
        nationality: 'AO',
        passportExpirationDate: '2019-11-17',
        passportIssuedBy: 'AS',
        passportNumber: 'AAAA',
        emergencyContactName: 'TEST NAME',
        emergencyContactCountryCode: 'US',
        emergencyContactPhoneNumber: '213-131-2321'
      };

      expect(travelInformationFormValidator(internationalFormProps)(formData)).to.deep.equal({});
    });

    it('should return no error messages when passport and emergency contact fields are input empty', () => {
      const formData = {
        countryOfResidence: '',
        nationality: '',
        passportExpirationDate: '',
        passportIssuedBy: '',
        passportNumber: '',
        emergencyContactName: '',
        emergencyContactCountryCode: '',
        emergencyContactPhoneNumber: ''
      };

      expect(travelInformationFormValidator(internationalFormProps)(formData)).to.deep.equal({});
    });

    context('passport is required', () => {
      let formData;

      beforeEach(() => {
        formData = {
          countryOfResidence: '',
          nationality: '',
          passportExpirationDate: '',
          passportIssuedBy: '',
          passportNumber: '',
          emergencyContactName: '',
          emergencyContactCountryCode: '',
          emergencyContactPhoneNumber: ''
        };
      });

      it('should return correct error messages when countryOfResidence is not empty and the other passport fields are empty', () => {
        _.set(formData, 'countryOfResidence', 'US');

        expect(travelInformationFormValidator(internationalFormProps)(formData)).to.deep.equal({
          hasSomeInputedValues: {
            msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
            type: 'ERROR_HEADER'
          },
          nationality: { type: 'REQUIRED_ERROR' },
          passportExpirationDate: { type: 'REQUIRED_ERROR' },
          passportIssuedBy: { type: 'REQUIRED_ERROR' },
          passportNumber: { type: 'REQUIRED_ERROR' }
        });
      });

      it('should return correct error messages when nationality is not empty and the other passport fields are empty', () => {
        _.set(formData, 'nationality', 'US');

        expect(travelInformationFormValidator(internationalFormProps)(formData)).to.deep.equal({
          hasSomeInputedValues: {
            msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
            type: 'ERROR_HEADER'
          },
          countryOfResidence: { type: 'REQUIRED_ERROR' },
          passportExpirationDate: { type: 'REQUIRED_ERROR' },
          passportIssuedBy: { type: 'REQUIRED_ERROR' },
          passportNumber: { type: 'REQUIRED_ERROR' }
        });
      });

      it('should return correct error messages when passportExpirationDate is not empty and the other passport fields are empty', () => {
        _.set(formData, 'passportExpirationDate', '01-01-2018');

        expect(travelInformationFormValidator(internationalFormProps)(formData)).to.deep.equal({
          hasSomeInputedValues: {
            msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
            type: 'ERROR_HEADER'
          },
          countryOfResidence: { type: 'REQUIRED_ERROR' },
          nationality: { type: 'REQUIRED_ERROR' },
          passportIssuedBy: { type: 'REQUIRED_ERROR' },
          passportNumber: { type: 'REQUIRED_ERROR' }
        });
      });

      it('should return correct error messages when passportIssuedBy is not empty and the other passport fields are empty', () => {
        _.set(formData, 'passportIssuedBy', 'US');

        expect(travelInformationFormValidator(internationalFormProps)(formData)).to.deep.equal({
          hasSomeInputedValues: {
            msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
            type: 'ERROR_HEADER'
          },
          countryOfResidence: { type: 'REQUIRED_ERROR' },
          nationality: { type: 'REQUIRED_ERROR' },
          passportExpirationDate: { type: 'REQUIRED_ERROR' },
          passportNumber: { type: 'REQUIRED_ERROR' }
        });
      });

      it('should return correct error messages when passportNumber is not empty and the other passport fields are empty', () => {
        _.set(formData, 'passportNumber', 'AAA123');

        expect(travelInformationFormValidator(internationalFormProps)(formData)).to.deep.equal({
          hasSomeInputedValues: {
            msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
            type: 'ERROR_HEADER'
          },
          countryOfResidence: { type: 'REQUIRED_ERROR' },
          nationality: { type: 'REQUIRED_ERROR' },
          passportExpirationDate: { type: 'REQUIRED_ERROR' },
          passportIssuedBy: { type: 'REQUIRED_ERROR' }
        });
      });
    });

    it('should return error message for contact method when only input name', () => {
      const formData = {
        countryOfResidence: 'US',
        nationality: 'AO',
        passportExpirationDate: '2019-11-17',
        passportIssuedBy: 'AS',
        passportNumber: 'AAAA',
        emergencyContactName: 'TEST NAME',
        emergencyContactCountryCode: 'US',
        emergencyContactPhoneNumber: ''
      };

      expect(travelInformationFormValidator(internationalFormProps)(formData)).to.deep.equal({
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
        nationality: 'AO',
        passportExpirationDate: '2019-11-17',
        passportIssuedBy: 'AS',
        passportNumber: 'AAAA',
        emergencyContactName: '',
        emergencyContactCountryCode: 'US',
        emergencyContactPhoneNumber: '213-131-2321'
      };

      expect(travelInformationFormValidator(internationalFormProps)(formData)).to.deep.equal({
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
        nationality: 'AO',
        passportExpirationDate: '2019-11-17',
        passportIssuedBy: 'AS',
        passportNumber: 'AA',
        emergencyContactName: 'TES-',
        emergencyContactCountryCode: 'US',
        emergencyContactPhoneNumber: '2133123'
      };

      expect(travelInformationFormValidator(internationalFormProps)(formData)).to.deep.equal({
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
  });

  context('middle name optional', () => {
    it('should pass validation of middle name when populated', () => {
      const formData = {
        middleName: 'V'
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({});
    });

    it('should pass validation of optional middle name when not populated', () => {
      const formData = {
        middleName: null
      };

      expect(travelInformationFormValidator(domesticFormProps)(formData)).to.deep.equal({});
    });
  });
});
