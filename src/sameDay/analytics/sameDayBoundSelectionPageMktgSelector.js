// @flow
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants.js';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getBoundSelectionFlag = (state) => state.app?.viewReservation?.viewForSameDayPage?._meta?.showBoundSelection || false;

export const sameDayBoundSelectionPageMktgSelector = createSelector(
  createMktgDataSelector(''), getBoundSelectionFlag,
  (mktgData, showBoundSelection) => (showBoundSelection ? [
    {
      ...mktgData,
      ...ANALYTICS.BOUND_SELECTION_PAGE
    },
    'otter',
    { page: ANALYTICS.BOUND_SELECTION_PAGE.page }
  ] : [])
);
