import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { accountNumberValidator } from 'src/shared/form/formValidators/asyncValidators';
import { API_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';

const isRequired = true;

export default () => (formData) => {
  const fieldRules = {
    firstName: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__DRIVER_FIRST_NAME_VALID'),
        validator: (value) => validator.isDriverName(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_LENGTH'),
        validator: (value) => validator.isLengthBetweenOrEqual(1, 30)(value)
      }
    ],
    middleName: [
      {
        msg: i18n('SHARED__ERROR_MESSAGES__DRIVER_MIDDLE_NAME_VALID'),
        validator: (value) => validator.isDriverName(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_MIDDLE_NAME_LENGTH'),
        validator: (value) => validator.isLengthBetweenOrEqual(1, 30)(value)
      }
    ],
    lastName: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__DRIVER_LAST_NAME_VALID'),
        validator: (value) => validator.isDriverName(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_LAST_NAME_LENGTH'),
        validator: (value) => validator.isLengthBetweenOrEqual(2, 30)(value)
      }
    ],
    accountNumber: [
      {
        msg: i18n('SHARED__ERROR_MESSAGES__RAPID_REWARDS_VALID'),
        validator: (value) => validator.isNumeric(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__RAPID_REWARDS_LENGTH'),
        validator: (value) => validator.isLengthBetweenOrEqual(1, 14)(value)
      }
    ]
  };

  const formRules = {
    ...sharedFormValidators,
    isAccountNumberMatchWithName: [
      {
        type: API_ERROR_POPUP,
        msg: i18n('SHARED__ERROR_MESSAGES__DEFAULT_API_ERROR'),
        validator: accountNumberValidator
      }
    ]
  };

  return executeValidators(formData, formRules, fieldRules);
};
