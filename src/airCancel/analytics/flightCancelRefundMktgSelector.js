// @flow
import { ANALYTICS } from 'src/airCancel/constants/airCancelConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const flightCancelRefundMktgSelector = createSelector(
  createMktgDataSelector('app.airCancel.cancelRefundQuotePage.response.mktg_data'),
  (mktgData) => {
    const { page } = ANALYTICS.AIR_CANCEL_REVIEW_PAGE;

    return [ mktgData, 'otter', { page } ];
  }
);
