// @flow
import _ from 'lodash';
import { getConfirmationPageContent } from 'src/shared/selectors/alternativeFormsOfPaymentSelector';

const flightConfirmationPage = (state) =>
  _.get(state, 'app.airBooking.flightConfirmationPage.response.flightConfirmationPage');

export const getFlightConfirmationPageSelector = getConfirmationPageContent(flightConfirmationPage);
