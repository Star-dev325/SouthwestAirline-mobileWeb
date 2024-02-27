import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getAirCancel = (state) => _.get(state, 'app.airCancel');

export const getOriginalReservation = createSelector([getAirCancel], (airCancel) => {
  const data = _.get(airCancel.cancelAnalytics, 'data', {});

  return {
    ...data
  };
});
