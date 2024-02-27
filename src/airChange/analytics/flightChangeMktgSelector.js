// @flow
import _ from 'lodash';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getMktgData = createMktgDataSelector('app.airChange.changeFlightPage.response.mktg_data');
const getSplitPnrDetails = (state) => _.get(state, 'app.airChange.changeFlightPage.response.splitPnrDetails');

export const flightChangeMktgSelector = createSelector(
  [getMktgData, getSplitPnrDetails],
  (mktgData, splitPnrDetails) => {
    const pageAnalytics = splitPnrDetails ? ANALYTICS.SELECT_PASSENGERS_PAGE : ANALYTICS.SELECT_BOUND_PAGE;
    const { page } = pageAnalytics;

    return [
      {
        ...mktgData,
        ...pageAnalytics
      },
      'otter',
      { page }
    ];
  }
);
