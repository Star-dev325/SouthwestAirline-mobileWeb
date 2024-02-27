import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { transformToPassengers } from 'src/shared/analytics/transformers/airBooking/passengers/passengersTransformer';

const getPassengerInfos = (state) => _.get(state, 'app.airBooking.passengerInfos');

export const getPassengers = createSelector([getPassengerInfos], (passengerInfos) =>
  transformToPassengers(passengerInfos)
);
