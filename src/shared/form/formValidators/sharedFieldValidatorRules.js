import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import countryCodes from 'src/shared/constants/countryCode';
import { baseFieldRules, basePostal } from 'src/shared/form/constants/baseFormFieldRules';
import validator from 'src/shared/form/formValidators/validator';

const isRequired = true;
const DATE_FORMAT = 'YYYY-MM-DD';
const NATIVE_DATE_FORMAT = 'MM/DD/YYYY';

export const firstName = [
  {
    isRequired
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_VALID'),
    validator: validator.isName
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_LENGTH'),
    validator: validator.isLengthBetweenOrEqual(1, 30)
  }
];

export const lastName = [
  {
    isRequired
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_LAST_NAME_VALID'),
    validator: validator.isName
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_LAST_NAME_LENGTH'),
    validator: validator.isLengthBetweenOrEqual(2, 30)
  }
];

// @flow
export const rapidRewardsNumber = (initialValue?: string) => [
  {
    msg: i18n('SHARED__ERROR_MESSAGES__RAPID_REWARDS_VALID'),
    validator: validator.isNumericOrOnFile(initialValue)
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__RAPID_REWARDS_LENGTH'),
    validator: validator.isLengthBetweenOrEqual(1, 14, true)
  }
];

export const emailRules = [
  {
    msg: i18n('SHARED__ERROR_MESSAGES__INVALID_EMAIL'),
    validator: validator.isEmail
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__EMAIL_LENGTH'),
    validator: validator.isLengthLessThan(100)
  }
];

export const emailReceiptTo = [{ isRequired }, ...emailRules];

export const fulfillmentEmail = [{ isRequired }, ...emailRules];

export const shareItineraryEmail = [...emailRules];

export const redressNumber = (initialValue?: string) => [
  {
    msg: i18n('SHARED__ERROR_MESSAGES__REDRESS_NUMBER_VALID'),
    validator: validator.isNumericOrOnFile(initialValue, true)
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__REDRESS_NUMBER_LENGTH'),
    validator: validator.isLengthLessOrEqual(13)
  }
];

export const knownTravelerNumber = (initialValue?: string) => [
  {
    msg: i18n('SHARED__ERROR_MESSAGES__KNOWN_TRAVELER_NUMBER_VALID'),
    validator: validator.isAlphanumericOrOnFile(initialValue)
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__KNOWN_TRAVELER_NUMBER_LENGTH'),
    validator: validator.isLengthBetweenOrEqual(8, 25, true)
  }
];

export const getPhoneNumberRule = (isUS = true) => _.concat([{ isRequired }], getPhoneNumberRuleWithoutRequired(isUS));

export const getPhoneNumberRuleWithoutRequired = (isUS = true) =>
  _.concat(
    [
      {
        msg: isUS
          ? i18n('SHARED__ERROR_MESSAGES__US_PHONE_NUMBER_LENGTH_ERROR')
          : i18n('SHARED__ERROR_MESSAGES__INTERNATIONAL_PHONE_NUMBER_LENGTH_ERROR'),
        validator: isUS ? validator.isFormattedMobilePhone : validator.isLengthBetweenOrEqual(4, 12)
      }
    ],
    isUS
      ? [
        {
          msg: i18n('SHARED__ERROR_MESSAGES__INVALID_PHONE_NUMBER'),
          validator: validator.isValidNumericPhoneNumber
        }
      ]
      : []
  );

export const contactMethodContentFieldRules = (declineNotifications, isInternationalBooking) => ({
  contactMethodContent: isInternationalBooking && declineNotifications ? [] : [{ isRequired }]
});

export const dateOfBirthFieldRules = (isWebView, isLapChild, departureDate, returnDate) => ({
  dateOfBirth: isLapChild
    ? isWebView
      ? dateOfBirthLapChildInput(departureDate, returnDate)
      : dateOfBirthLapChild(departureDate, returnDate)
    : isWebView
      ? dateOfBirthInput
      : dateOfBirth
});

export const associatedAdult = (associatedAdultsInfo) => {
  const associatedAdultData = associatedAdultsInfo ? associatedAdultsInfo[0] : {};
  const departureDate = associatedAdultData?.departureDate;
  const associatedAdultDateOfBirth = dayjs(associatedAdultData?.passengerInfo?.dateOfBirth, [
    DATE_FORMAT,
    NATIVE_DATE_FORMAT
  ]);
  const isValidAssociatedAdultAge = dayjs(departureDate, DATE_FORMAT).diff(associatedAdultDateOfBirth, 'years') >= 12;
  const numberOfAssociatedAdults = associatedAdultsInfo?.length;
  const hasMultipleAssociatedAdults = numberOfAssociatedAdults > 1;

  return [
    {
      isRequired: (numberOfAssociatedAdults === 1 && !isValidAssociatedAdultAge) || hasMultipleAssociatedAdults,
      msg: hasMultipleAssociatedAdults
        ? i18n('SHARED__ERROR_MESSAGES__PLEASE_MAKE_A_SELECTION')
        : i18n('SHARED__ERROR_MESSAGES__ASSOCIATED_ADULT_AGE')
    },
    {
      msg: i18n('SHARED__ERROR_MESSAGES__ASSOCIATED_ADULT_AGE'),
      validator: (value) => validator.isValidAssociatedAdult(value, associatedAdultsInfo)
    }
  ];
};

export const securityCodeRule = {
  validator: validator.isLengthBetweenOrEqual(3, 4),
  msg: i18n('SHARED__ERROR_MESSAGES__SECURITY_CODE_INVALID')
};

export const gender = [
  {
    isRequired
  },
  {
    validator: validator.isValidGender
  }
];

export const dateOfBirth = [
  {
    isRequired
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_AGE'),
    validator: validator.isIsoDateFormat
  }
];

export const dateOfBirthLapChild = (departureDate, returnDate) => [
  ...dateOfBirth,
  {
    msg: i18n('SHARED__ERROR_MESSAGES__LAP_CHILD_PASSENGER_AGE'),
    validator: (value) => validator.isValidLapChildDate(value, departureDate, returnDate)
  }
];

export const dateOfBirthInput = [
  {
    isRequired
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_DATE_OF_BIRTH'),
    validator: validator.isDateOfBirthFormat
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_DATE_OF_BIRTH'),
    validator: validator.isNotDateInFuture
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_DATE_OF_BIRTH'),
    validator: validator.isMoreThanHundredYearsAgo
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_DATE_OF_BIRTH'),
    validator: validator.isLengthEql(10)
  }
];

export const dateOfBirthLapChildInput = (departureDate, returnDate) => [
  ...dateOfBirthInput,
  {
    msg: i18n('SHARED__ERROR_MESSAGES__LAP_CHILD_PASSENGER_AGE'),
    validator: (value) => validator.isValidLapChildDate(value, departureDate, returnDate)
  }
];

export const relationship = [
  {
    isRequired
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_RELATIONSHIP_VALID'),
    validator: validator.isRelationship
  },
  {
    msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_RELATIONSHIP_LENGTH'),
    validator: validator.isLengthBetweenOrEqual(1, 20)
  }
];

export const getContactInformationRules = (formData) => {
  const isCountryCodeNumberEqualOne = countryCodes[formData.phoneCountryCode] === 1;
  const isUS = formData.isoCountryCode === 'US';

  return {
    ...baseFieldRules,
    phoneNumber: getPhoneNumberRule(isCountryCodeNumberEqualOne),
    stateProvinceRegion: [{ isRequired }, ...(isUS ? basePostal.stateProvince : [])],
    zipOrPostalCode: [{ isRequired }, ...(isUS ? basePostal.isUSPostal : basePostal.postalCode)]
  };
};
