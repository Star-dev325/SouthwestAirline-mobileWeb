// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { ANALYTICS } from 'src/airUpgrade/constants/airUpgradeConstants';

export const upgradeSelectBoundsPageMktgSelector = createSelector(
  createMktgDataSelector('app.airUpgrade.airUpgradeReducer.viewUpgradeReservationPage.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.UPGRADE_SELECT_BOUNDS_PAGE
    },
    'otter',
    { page_name: ANALYTICS.UPGRADE_SELECT_BOUNDS_PAGE.page_name }
  ]
);
