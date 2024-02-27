import _ from 'lodash';
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { ERROR_HEADER } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';

export default () => (formData) => {
  const fieldRules = {
    type1: [
      {
        isRequired: !_.isEmpty(formData.vendor1)
      }
    ],
    code1: [
      {
        isRequired: !_.isEmpty(formData.vendor1) && !_.isEmpty(formData.type1)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CAR_BOOKING_PROMO_CODE_WITH_SPACES'),
        validator: validator.isAlphanumeric
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CAR_BOOKING_PROMO_CODE_WITH_SPACES'),
        validator: validator.isLengthBetweenOrEqual(1, 12)
      }
    ],
    type2: [
      {
        isRequired: !_.isEmpty(formData.vendor2)
      },
      {
        type: ERROR_HEADER,
        msg: i18n('SHARED__ERROR_MESSAGES__CAR_BOOKING_PROMO_CODE_DUPLICATE'),
        validator: () => !(formData.vendor1 === formData.vendor2 && formData.type1 === formData.type2)
      }
    ],
    code2: [
      {
        isRequired: !_.isEmpty(formData.vendor2) && !_.isEmpty(formData.type2)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CAR_BOOKING_PROMO_CODE_WITH_SPACES'),
        validator: validator.isAlphanumeric
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__CAR_BOOKING_PROMO_CODE_WITH_SPACES'),
        validator: validator.isLengthBetweenOrEqual(1, 12)
      }
    ]
  };

  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};
