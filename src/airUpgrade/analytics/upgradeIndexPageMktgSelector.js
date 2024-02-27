// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { ANALYTICS } from 'src/airUpgrade/constants/airUpgradeConstants';

export const upgradeIndexPageMktgSelector = createSelector(createMktgDataSelector('', {}), (mktgData) => [
  {
    ...mktgData,
    ...ANALYTICS.UPGRADE_FARE_PAGE
  },
  'otter',
  { page_name: ANALYTICS.UPGRADE_FARE_PAGE.page_name }
]);
