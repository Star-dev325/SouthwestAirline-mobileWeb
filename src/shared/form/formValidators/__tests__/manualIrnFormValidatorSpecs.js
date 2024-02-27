import ManualIrnFormValidator from 'src/shared/form/formValidators/manualIrnFormValidator';
import i18n from '@swa-ui/locale';

describe('ManualIrnFormValidator', () => {
  it('should pass form validation when data is valid', () => {
    const formData = {
      manualIrn: 'IrnName'
    };

    expect(ManualIrnFormValidator()(formData)).to.deep.equal({});
  });

  it('should fail form validation if irn value has a character other than alphanumeric', () => {
    const formData = {
      manualIrn: 'ds#'
    };

    expect(ManualIrnFormValidator()(formData)).to.deep.equal({
      manualIrn: {
        type: 'FIELD_ERROR_MESSAGE',
        msg: 'The information entered is not valid.'
      },
      hasSomeFieldsNeedToCorrect: {
        type: 'ERROR_HEADER',
        msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR')
      }
    });
  });
});
