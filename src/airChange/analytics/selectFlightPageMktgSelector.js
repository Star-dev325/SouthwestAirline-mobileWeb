// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

export const selectFlightPageMktgSelector = createSelector(
  createMktgDataSelector('app.airChange.changeFlightPage.response.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.SELECT_BOUND_PAGE
    },
    'otter',
    { page: ANALYTICS.SELECT_BOUND_PAGE.page }
  ]
);
