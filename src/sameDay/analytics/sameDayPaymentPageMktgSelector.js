// @flow
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants.js';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getGlobalRequestId = (state) => state.app?.sameDay?.sameDayPricingPage?.mktg_data?.requestid || '';

export const sameDayPaymentPageMktgSelector = createSelector(
  createMktgDataSelector(''), getGlobalRequestId,
  (mktgData, globalRequestId) => [
    {
      ...mktgData,
      global_requestid: globalRequestId,
      ...ANALYTICS.PAYMENT_PAGE
    },
    'otter',
    { page: ANALYTICS.PAYMENT_PAGE.page }
  ]
);
