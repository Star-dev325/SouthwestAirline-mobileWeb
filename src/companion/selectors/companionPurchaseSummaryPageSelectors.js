import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { generateTripSummary } from 'src/airBooking/helpers/purchaseSummaryPageHelper';

const getPricingPage = (state) => _.get(state, 'app.companion.flightPricingPage', {});
const getCompanionDetail = (state) =>
  _.get(state, 'app.companion.companionPassengerPage.response.companionDetailsPage') || {};
const getCompanionPassengerPageFormData = (state) => _.get(state, 'app.companion.companionPassengerPage.formData');
const getCompanionSpecialAssistance = (state) => _.get(state, 'app.companion.specialAssistance');

export const getCompanionPurchaseSummaryPage = createSelector(
  [getPricingPage, getCompanionDetail],
  (flightPricingPage, companionDetail) => {
    const { name } = companionDetail;

    return {
      tripSummary: generateTripSummary({ flightPricingPage }),
      passengers: name ? [{ name }] : []
    };
  }
);

export const getCompanionPassengerInfos = createSelector(
  [getCompanionDetail, getCompanionPassengerPageFormData, getPricingPage, getCompanionSpecialAssistance],
  (response, formData, pricingPage, specialAssistance) => {
    const { firstName, middleName, lastName, gender, dateOfBirth } = response;
    const paxType = _.get(pricingPage, '_links.flightConfirmationPage.body.reservationGroups.0.passengerType');

    return firstName && lastName && specialAssistance
      ? [
        {
          type: _.lowerCase(paxType),
          passengerReference: 1,
          passengerInfo: {
            gender,
            dateOfBirth,
            ..._.pick(formData, ['redressNumber', 'emailReceiptTo', 'knownTravelerNumber', 'dateOfBirth', 'gender']),
            firstName,
            middleName,
            lastName
          },
          specialAssistance
        }
      ]
      : firstName && lastName
        ? [
          {
            type: _.lowerCase(paxType),
            passengerReference: 1,
            passengerInfo: {
              gender,
              dateOfBirth,
              ..._.pick(formData, ['redressNumber', 'emailReceiptTo', 'knownTravelerNumber', 'dateOfBirth', 'gender']),
              firstName,
              middleName,
              lastName
            }
          }
        ]
        : [];
  }
);
