import permanentResidentCardFormValidator from 'src/shared/form/formValidators/permanentResidentCardFormValidator';
import i18n from '@swa-ui/locale';

describe('permanentResidentCardFormValidator', () => {
  it('should pass form validation when data is correct', () => {
    const formData = {
      expiration: '2019-11-17',
      issuedBy: 'AS',
      number: 'abc-d22-222-222-222',
      type: 'RESIDENT_ALIEN_CARD'
    };

    expect(permanentResidentCardFormValidator()(formData)).to.deep.equal({});
  });

  it('should return error when data is not correct', () => {
    const formData = {
      expiration: '',
      issuedBy: '',
      number: '',
      type: ''
    };

    expect(permanentResidentCardFormValidator()(formData)).to.deep.equal({
      expiration: {
        type: 'REQUIRED_ERROR'
      },
      hasSomeInputedValues: {
        msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
        type: 'ERROR_HEADER'
      },
      issuedBy: {
        type: 'REQUIRED_ERROR'
      },
      number: {
        type: 'REQUIRED_ERROR'
      },
      type: {
        type: 'REQUIRED_ERROR'
      }
    });
  });
});
