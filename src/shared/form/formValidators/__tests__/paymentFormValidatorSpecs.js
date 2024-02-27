import paymentFormValidator from 'src/shared/form/formValidators/paymentFormValidator';
import i18n from '@swa-ui/locale';

describe('paymentFormValidator', () => {
  let formData;
  let options;

  beforeEach(() => {
    formData = {
      selectedCardId: 'NEW_CREDIT_CARD_ID',
      cardNumber: '4012999999999999',
      securityCode: '123',
      nameOnCard: 'Li Rui',
      expiration: '2030-05',
      isoCountryCode: 'US',
      addressLine1: '83 Main St',
      addressLine2: '',
      zipOrPostalCode: '87516',
      city: 'Brooklyn',
      stateProvinceRegion: 'NY',
      phoneCountryCode: 'AS',
      phoneNumber: '123-456-7890'
    };

    options = { isWebView: false };
  });

  it('should pass form validation when formData correct', () => {
    expect(paymentFormValidator(options)(formData)).to.deep.equal({});
  });

  context('countryCodeNumber', () => {
    it('should return error message when phoneNumber not match countryCodeNumber', () => {
      formData.phoneNumber = '123-45';

      expect(paymentFormValidator(options)(formData)).to.deep.equal({
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        },
        phoneNumber: {
          msg: 'Phone number must be 10 digits.',
          type: 'FIELD_ERROR_MESSAGE'
        }
      });
    });

    it('should pass form validator when phoneNumber match countryCodeNumber', () => {
      formData.phoneNumber = '123-45';
      formData.phoneCountryCode = 'AF';

      expect(paymentFormValidator(options)(formData)).to.deep.equal({});
    });
  });

  context('nameOnCard', () => {
    it('should remove extra spaces between first and last name and find no validation errors', () => {
      formData.nameOnCard = ' Fred    Flint ';

      expect(paymentFormValidator(options)(formData)).to.deep.equal({});
      expect(formData.nameOnCard).to.deep.equal('Fred Flint');
    });

    it('should fail validation when 3 words for name', () => {
      formData.nameOnCard = 'Fred Mc Flint';

      expect(paymentFormValidator(options)(formData)).to.deep.equal({
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        },
        nameOnCard: {
          msg: 'Enter a valid first name and last name with no special characters or numbers (spaces allowed).',
          type: 'FIELD_ERROR_MESSAGE'
        }
      });
    });

    it('should fail validation when name is empty', () => {
      formData.nameOnCard = '';

      expect(paymentFormValidator(options)(formData)).to.deep.equal({
        hasSomeInputedValues: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        },
        nameOnCard: {
          type: 'REQUIRED_ERROR'
        }
      });
    });
  });

  context('when isWebView true', () => {
    beforeEach(() => {
      formData = {
        selectedCardId: 'NEW_CREDIT_CARD_ID',
        cardNumber: '4012999999999999',
        securityCode: '123',
        nameOnCard: 'Li Rui',
        expiration: '05/2030',
        isoCountryCode: 'US',
        addressLine1: '83 Main St',
        addressLine2: '',
        zipOrPostalCode: '87516',
        city: 'Brooklyn',
        stateProvinceRegion: 'NY',
        phoneCountryCode: 'AS',
        phoneNumber: '123-456-7890'
      };

      options = { isWebView: true };
    });

    context('expiration field', () => {
      it('should pass validation when expiration is correct', () => {
        expect(paymentFormValidator(options)(formData)).to.deep.equal({});
      });

      it('should fail validation when expiration is in wrong format', () => {
        //eslint-disable-line
        formData.expiration = '2030-05';

        expect(paymentFormValidator(options)(formData)).to.deep.equal({
          expiration: {
            msg: 'Enter a valid expiration date (ex. 01/2029)',
            type: 'FIELD_ERROR_MESSAGE'
          },
          hasSomeFieldsNeedToCorrect: {
            msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
            type: 'ERROR_HEADER'
          }
        });
      });

      it(`should fail validation when expiration doesn't contain 7 characters`, () => {
        formData.expiration = '1220';

        expect(paymentFormValidator(options)(formData)).to.deep.equal({
          expiration: {
            msg: 'Enter a valid expiration date (ex. 01/2029)',
            type: 'FIELD_ERROR_MESSAGE'
          },
          hasSomeFieldsNeedToCorrect: {
            msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
            type: 'ERROR_HEADER'
          }
        });
      });

      it(`should fail validation when expiration is empty`, () => {
        formData.expiration = '';

        expect(paymentFormValidator(options)(formData)).to.deep.equal({
          expiration: {
            type: 'REQUIRED_ERROR'
          },
          hasSomeInputedValues: {
            msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
            type: 'ERROR_HEADER'
          }
        });
      });
    });
  });
});
