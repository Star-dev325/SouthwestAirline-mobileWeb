// @flow
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';
import i18n from '@swa-ui/locale';

const isRequired = true;

export default () => (formData: FormData) => {
  const fieldRules: FieldValidationRules = {
    confirmationNumber: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CHECK_IN_RECORD_LOCATOR_ERROR'),
        validator: validator.isRecordLocator
      }
    ],
    passengerFirstName: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CHECK_IN_FIRST_NAME_ERROR'),
        validator: validator.isName
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CHECK_IN_FIRST_NAME_ERROR'),
        validator: validator.isLengthBetweenOrEqual(1, 30)
      }
    ],
    passengerLastName: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CHECK_IN_LAST_NAME_ERROR'),
        validator: validator.isName
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CHECK_IN_LAST_NAME_ERROR'),
        validator: validator.isLengthBetweenOrEqual(2, 30)
      }
    ],
    voucherNumber: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__VOUCHER_NUMBER_LENGTH_INVALID'),
        validator: validator.isLengthEql(16)
      }
    ],
    cardNumber: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__GIFT_CARD_NUMBER_LENGTH_INVALID'),
        validator: validator.isLengthEql(16)
      }
    ],
    securityCode: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__SECURITY_CODE_LENGTH_INVALID'),
        validator: validator.isLengthEql(4)
      }
    ]
  };
  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};
