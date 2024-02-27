// @flow
import _ from 'lodash';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import validator from 'src/shared/form/formValidators/validator';
import { rapidRewardsNumberValidator } from 'src/shared/form/formValidators/asyncValidators';
import { getPhoneNumberRuleWithoutRequired } from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import countryCodes from 'src/shared/constants/countryCode';
import { API_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';
import type { TravelInformationFormProps } from 'src/viewReservation/components/travelInformationForm';

const _isPassportDataRequired = (isInternational: boolean, formData: FormData): boolean => {
  const passportInfoFields = [
    'countryOfResidence',
    'nationality',
    'passportExpirationDate',
    'passportIssuedBy',
    'passportNumber'
  ];

  const passportInfo = _.chain(formData).pick(passportInfoFields).omitBy(_.isEmpty).value();

  return isInternational && !_.isEmpty(passportInfo);
};

const travelInformationFormValidator =
  ({ isInternational, initialFormData }: TravelInformationFormProps) =>
    (formData: FormData) => {
      const redressNumber = _.get(initialFormData, 'redressNumber');
      const knownTravelerNumber = _.get(initialFormData, 'knownTravelerNumber');
      const isContactMethodRequired = formData.emergencyContactName !== '' || formData.emergencyContactPhoneNumber !== '';
      const isUS = countryCodes[formData.emergencyContactCountryCode] === 1;
      const isPassportDataRequired = _isPassportDataRequired(isInternational, formData);
      const { firstName, middleName, lastName } = formData;

      const redressNumberValidators = [
        {
          msg: i18n('SHARED__ERROR_MESSAGES__REDRESS_NUMBER_VALID'),
          validator: validator.isNumericOrOnFile(redressNumber)
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__REDRESS_NUMBER_LENGTH'),
          validator: validator.isLengthLessOrEqual(13, true)
        }
      ];

      const knownTravelerNumberValidators = [
        {
          msg: i18n('SHARED__ERROR_MESSAGES__KNOWN_TRAVELER_NUMBER_VALID'),
          validator: validator.isAlphanumericOrOnFile(knownTravelerNumber)
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__KNOWN_TRAVELER_NUMBER_LENGTH'),
          validator: validator.isLengthBetweenOrEqual(8, 25, true)
        }
      ];

      const fieldRules: FieldValidationRules = {
        firstName: [
          {
            isRequired: true
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_VALID'),
            validator: validator.isName
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_LENGTH'),
            validator: validator.isLengthBetweenOrEqual(1, 30)
          }
        ],
        middleName: [
          {
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_MIDDLE_NAME_VALID'),
            validator: validator.isName
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_MIDDLE_NAME_LENGTH'),
            validator: validator.isLengthBetweenOrEqual(1, 30)
          }
        ],
        lastName: [
          {
            isRequired: true
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_LAST_NAME_VALID'),
            validator: validator.isName
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_LAST_NAME_LENGTH'),
            validator: validator.isLengthBetweenOrEqual(2, 30)
          }
        ],
        rapidRewardsNumber: [
          {
            msg: i18n('SHARED__ERROR_MESSAGES__RAPID_REWARDS_VALID'),
            validator: validator.isNumeric
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__RAPID_REWARDS_LENGTH'),
            validator: validator.isLengthBetweenOrEqual(1, 14)
          }
        ],
        redressNumber: validator.isOnFile(redressNumber)
          ? [
            ...redressNumberValidators,
            {
              msg: i18n('SHARED__ERROR_MESSAGES__REDRESS_NUMBER_REQUIRED'),
              isRequired: true
            }
          ]
          : redressNumberValidators,
        knownTravelerNumber: validator.isOnFile(knownTravelerNumber)
          ? [
            ...knownTravelerNumberValidators,
            {
              msg: i18n('SHARED__ERROR_MESSAGES__KNOWN_TRAVELER_NUMBER_REQUIRED'),
              isRequired: true
            }
          ]
          : knownTravelerNumberValidators,
        passportNumber: [
          {
            isRequired: isPassportDataRequired
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__INVALID_PASSPORT_NUMBER'),
            validator: validator.isLengthBetweenOrEqual(4, 15)
          }
        ],
        passportIssuedBy: [
          {
            isRequired: isPassportDataRequired
          }
        ],
        nationality: [
          {
            isRequired: isPassportDataRequired
          }
        ],
        passportExpirationDate: [
          {
            isRequired: isPassportDataRequired
          }
        ],
        countryOfResidence: [
          {
            isRequired: isPassportDataRequired
          }
        ],
        emergencyContactName: [
          {
            isRequired: isContactMethodRequired
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__FULL_NAME_VALID'),
            validator: validator.isFullNameOrFirstNameNoHyphens
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__FULL_NAME_LENGTH_VALID'),
            validator: validator.isFullNameLengthValid
          }
        ],
        emergencyContactPhoneNumber: [...getPhoneNumberRuleWithoutRequired(isUS), { isRequired: isContactMethodRequired }]
      };

      const formRules = {
        ...sharedFormValidators,
        isAccountNumberMatchWithName: [
          {
            type: API_ERROR_POPUP,
            msg: i18n('SHARED__ERROR_MESSAGES__DEFAULT_API_ERROR'),
            validator: rapidRewardsNumberValidator({ firstName, middleName, lastName })
          }
        ]
      };

      return executeValidators(formData, formRules, fieldRules);
    };

export default travelInformationFormValidator;
