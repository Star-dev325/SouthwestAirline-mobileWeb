// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { ANALYTICS } from 'src/standby/constants/standbyConstants';

export const selectStandbyPageMktgSelector = createSelector(
  createMktgDataSelector('app.standby.standbyPage.response.standbyListPage.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.STANDBY_PAGE
    },
    'otter',
    { page: ANALYTICS.STANDBY_PAGE.page }
  ]
);