import { visaFormValidator } from 'src/shared/form/formValidators/visaCardFormValidator';
import i18n from '@swa-ui/locale';

describe('visaFormValidator', () => {
  it('should pass form validation when data is correct', () => {
    const formData = {
      expiration: '2019-11-17',
      issuedBy: 'AS',
      country: 'AS',
      number: 'abssssss22'
    };

    expect(visaFormValidator()(formData)).to.deep.equal({});
  });

  it('should return error when data is not correct', () => {
    const formData = {
      expiration: '',
      issuedBy: '',
      number: '',
      country: ''
    };

    expect(visaFormValidator()(formData)).to.deep.equal({
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
      country: {
        type: 'REQUIRED_ERROR'
      }
    });
  });
});
