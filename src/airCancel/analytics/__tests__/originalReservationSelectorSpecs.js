import _ from 'lodash';
import { getOriginalReservation } from 'src/airCancel/analytics/originalReservationSelector';

describe('getOriginalReservation', () => {
  it('should return the analytics data we store for the new C1B endpoint responses', () => {
    const state = _.set({}, 'app.airCancel.cancelAnalytics.data', { analyticsData: 'coolEvent' });

    expect(getOriginalReservation(state)).to.be.deep.equal({ analyticsData: 'coolEvent' });
  });
});
