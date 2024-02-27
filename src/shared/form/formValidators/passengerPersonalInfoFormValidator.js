import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { accountNumberValidator } from 'src/shared/form/formValidators/asyncValidators';
import { API_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';
import ErrorMessages from 'src/shared/constants/errorMessages';
import i18n from '@swa-ui/locale';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import {
  emailReceiptTo,
  shareItineraryEmail,
  contactMethodContentFieldRules,
  gender,
  dateOfBirthFieldRules,
  firstName,
  lastName,
  rapidRewardsNumber,
  redressNumber,
  knownTravelerNumber,
  associatedAdult
} from 'src/shared/form/formValidators/sharedFieldValidatorRules';

const { ADULT } = PassengerTypes;
const { PASSENGER_NAME_SUFFIX_VALID } = ErrorMessages;

export default ({
  declineNotifications,
  isInternationalBooking,
  isWebView,
  passengerInfos,
  departureDate,
  returnDate,
  isLapChild,
  initialFormData = {}
}) =>
  (formData) => {
    const modifiedFormData = {
      ...formData,
      ...(initialFormData.frequentTravelerId ? { frequentTravelerId: initialFormData.frequentTravelerId } : {}),
      ...(initialFormData.frequentTravelerToken ? { frequentTravelerToken: initialFormData.frequentTravelerToken } : {})
    };
    const fieldRules = {
      firstName,
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
      lastName,
      suffix: [
        {
          msg: PASSENGER_NAME_SUFFIX_VALID,
          validator: validator.isPassengerNameSuffix
        }
      ],
      gender,
      ...dateOfBirthFieldRules(isWebView, isLapChild, departureDate, returnDate),
      associatedAdult: associatedAdult(passengerInfos?.filter((info) => info.type === ADULT)),
      rapidRewardsNumber: rapidRewardsNumber(initialFormData.rapidRewardsNumber),
      emailReceiptTo,
      shareItineraryEmail,
      redressNumber: redressNumber(initialFormData.redressNumber),
      knownTravelerNumber: knownTravelerNumber(initialFormData.knownTravelerNumber),
      ...contactMethodContentFieldRules(declineNotifications, isInternationalBooking)
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

    return executeValidators(modifiedFormData, formRules, fieldRules);
  };
