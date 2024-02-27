import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createSha256Hash } from 'src/shared/helpers/hashHelper';

const getAccountNumber = (state) => _.get(state, 'app.carBooking.userInfo.driverInfo.accountNumber', '');
const getConfirmationEmail = (state) =>
  _.get(state, 'app.carBooking.carBookingConfirmationPage.response.confirmationEmail', '');
const getConfirmationNumber = (state) =>
  _.get(state, 'app.carBooking.carBookingConfirmationPage.response.confirmationNumber', '');
const getPurposeOfTravel = (state) =>
  _.get(state, 'app.carBooking.carBookingConfirmationPage.response.purposeOfTravel', '');

export const getPurchase = createSelector(
  [getConfirmationEmail, getConfirmationNumber, getPurposeOfTravel, getAccountNumber],
  (email, confirmationNumber, purposeOfTravel, accountNumber) => {
    const confirmationEmail = email ? createSha256Hash(email) : '';

    return {
      confirmationEmail,
      confirmationNumber,
      driver: {
        accountNumber
      },
      purposeOfTravel: purposeOfTravel ? purposeOfTravel : ''
    };
  }
);
