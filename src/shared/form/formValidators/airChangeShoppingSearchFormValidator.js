import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import i18n from '@swa-ui/locale';
import { ERROR_HEADER, SIMPLE_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';

const isRequired = true;

export const isAirportsNotEqual = [
  {
    type: SIMPLE_ERROR_POPUP,
    msg: i18n('SHARED__ERROR_MESSAGES__DEPARTURE_AND_ARRIVAL_NOT_BE_SAME'),
    validator: (formData) => formData.from !== formData.to
  }
];

export const isInvalidDates = [
  {
    msg: i18n('SHARED__ERROR_MESSAGES__INVALID_DEPARTURE_DATE'),
    type: ERROR_HEADER,
    validator: (formData) => !formData.departureAndReturnDate.isInvalidDepartureDate
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__INVALID_RETURN_DATE'),
    type: ERROR_HEADER,
    validator: (formData) => !formData.departureAndReturnDate.isInvalidReturnDate
  }
];

export default () => (formData) => {
  const fieldRules = {
    from: [
      {
        isRequired
      }
    ],
    to: [
      {
        isRequired
      }
    ],
    departureAndReturnDate: [
      {
        isRequired
      }
    ]
  };
  const formRules = {
    isAirportsNotEqual,
    isInvalidDates
  };

  return executeValidators(formData, formRules, fieldRules);
};
