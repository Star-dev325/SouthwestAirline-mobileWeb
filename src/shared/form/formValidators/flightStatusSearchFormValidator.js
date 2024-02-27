// @flow
import _ from 'lodash';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { SIMPLE_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';

export const flightStatusSearchFormValidator = () => (formData: FormData) => {
  const fieldRules: FieldValidationRules = {
    originAirport: [
      {
        isRequired: true
      }
    ],
    destinationAirport: [
      {
        isRequired: true
      }
    ],
    selectedDate: [
      {
        isRequired: true
      }
    ]
  };

  const formRules = {
    ...sharedFormValidators,
    isDepartureAndArrivalNotSame: [
      {
        type: SIMPLE_ERROR_POPUP,
        msg: i18n('SHARED__ERROR_MESSAGES__DEPARTURE_AND_ARRIVAL_NOT_BE_SAME'),
        validator: (formDataParams) =>
          _.isEmpty(formDataParams.originAirport) || formDataParams.originAirport !== formDataParams.destinationAirport
      }
    ]
  };

  return executeValidators(formData, formRules, fieldRules);
};
