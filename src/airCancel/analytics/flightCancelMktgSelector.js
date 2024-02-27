// @flow
import _ from 'lodash';
import { ANALYTICS } from 'src/airCancel/constants/airCancelConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getMktgData = createMktgDataSelector('app.airCancel.cancelBoundPage.response.mktg_data');
const getSplitPnrDetails = (state) => _.get(state, 'app.airCancel.cancelBoundPage.response.splitPnrDetails');

export const flightCancelMktgSelector = createSelector(
  [getMktgData, getSplitPnrDetails],
  (mktgData, splitPnrDetails) => {
    if (splitPnrDetails) {
      const { page_name } = ANALYTICS.AIR_CANCEL_SELECT_PASSENGERS_PAGE;

      return [
        {
          ...mktgData,
          ...ANALYTICS.AIR_CANCEL_SELECT_PASSENGERS_PAGE
        },
        'otter',
        { page_name }
      ];
    } else {
      return [mktgData];
    }
  }
);
