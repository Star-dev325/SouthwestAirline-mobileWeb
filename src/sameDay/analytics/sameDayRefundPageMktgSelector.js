// @flow
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants.js';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getRefundPageFlag = (state) => state.app?.sameDay?.sameDayRefundPage?.showRefundPage || false;

export const sameDayRefundPageMktgSelector = createSelector(
  createMktgDataSelector(''), getRefundPageFlag,
  (mktgData, showRefundPage) => (showRefundPage ? [
    {
      ...mktgData,
      ...ANALYTICS.REFUND_PAGE
    },
    'otter',
    { page: ANALYTICS.REFUND_PAGE.page }
  ] : [])
);
