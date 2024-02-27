import _ from 'lodash';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import GenderTypes from 'src/shared/form/constants/genderTypes';
import {
  emailReceiptTo,
  shareItineraryEmail,
  redressNumber,
  knownTravelerNumber,
  contactMethodContentFieldRules,
  gender,
  dateOfBirth
} from 'src/shared/form/formValidators/sharedFieldValidatorRules';

export default ({ declineNotifications, isInternationalBooking, companionInfo }) =>
  (formData) => {
    let fieldRules = {
      emailReceiptTo,
      shareItineraryEmail,
      redressNumber: redressNumber(),
      knownTravelerNumber: knownTravelerNumber(),
      ...contactMethodContentFieldRules(declineNotifications, isInternationalBooking)
    };

    if (!companionInfo.dateOfBirth) {
      fieldRules = _.merge({}, fieldRules, { dateOfBirth });
    }

    if (!companionInfo.gender || companionInfo.gender === GenderTypes.UNAVAILABLE) {
      fieldRules = _.merge({}, fieldRules, { gender });
    }

    const formRules = {
      ...sharedFormValidators
    };

    return executeValidators(formData, formRules, fieldRules);
  };
