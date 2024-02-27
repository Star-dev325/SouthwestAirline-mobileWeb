// @flow
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import { ERROR_HEADER } from 'src/shared/form/constants/validationErrorTypes';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { userIsConsideredMinor } from 'src/enroll/helpers/minorAgeCalculationHelper';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import i18n from '@swa-ui/locale';
import ErrorMessages from 'src/shared/constants/errorMessages';

const { PASSENGER_NAME_SUFFIX_VALID } = ErrorMessages;

const isRequired = true;

export const ANALYTICS_RR_AGE_TRACKER = 'rr age error message';

export default ({
  minorAgeThreshold = 13,
  LOYALTY_AGE_VERIFICATION = false
}: {
    minorAgeThreshold: number,
    LOYALTY_AGE_VERIFICATION: boolean
  }) =>
  (formData: *) => {
    const fieldRules = {
      firstName: [
        {
          isRequired
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_FIRST_NAME_VALID'),
          validator: validator.isName
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_FIRST_NAME_LENGTH'),
          validator: validator.isLengthBetweenOrEqual(1, 30)
        }
      ],
      middleName: [
        {
          msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_MIDDLE_NAME_VALID'),
          validator: validator.isName
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_MIDDLE_NAME_LENGTH'),
          validator: validator.isLengthBetweenOrEqual(1, 30)
        }
      ],
      lastName: [
        {
          isRequired
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_LAST_NAME_VALID'),
          validator: validator.isName
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_LAST_NAME_LENGTH'),
          validator: validator.isLengthBetweenOrEqual(2, 30)
        }
      ],
      preferredName: [
        {
          msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_PREFERRED_NAME_VALID'),
          validator: validator.isName
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_PREFERRED_NAME_LENGTH'),
          validator: validator.isLengthBetweenOrEqual(1, 30)
        }
      ],
      suffix: [
        {
          msg: PASSENGER_NAME_SUFFIX_VALID,
          validator: validator.isPassengerNameSuffix
        }
      ],
      gender: [
        {
          isRequired
        },
        {
          validator: validator.isValidFullGender
        }
      ],
      dateOfBirth: [
        {
          isRequired
        },
        {
          type: ERROR_HEADER,
          msg: i18n('AGE_RESTRICTION_MESSAGE'),
          validator: (dateOfBirth) =>
            (LOYALTY_AGE_VERIFICATION ? !_isMinorAndHandleAnalytics(dateOfBirth, minorAgeThreshold) : true)
        }
      ]
    };
    const formRules = {
      ...sharedFormValidators
    };

    return executeValidators(formData, formRules, fieldRules);
  };

const _isMinorAndHandleAnalytics = (dateOfBirth: string, minorAgeThreshold: number): boolean => {
  const isMinor = userIsConsideredMinor(dateOfBirth, minorAgeThreshold);

  isMinor && raiseSatelliteEvent(ANALYTICS_RR_AGE_TRACKER);

  return isMinor;
};
