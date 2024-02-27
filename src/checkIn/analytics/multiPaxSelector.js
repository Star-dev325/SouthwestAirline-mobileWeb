import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getFlight = (state) => _.get(state, 'app.checkIn.checkInConfirmationPage.flights[0]', []);

export const isMultiPax = createSelector([getFlight], (flight) => ({
  isMultiPaxPNR: _.get(flight, 'passengers').length > 1
}));
