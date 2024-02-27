// @flow
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

const getIsUpgrade = (state) => _.get(state, 'app.airChange.changePricingPage.response._meta.isUpgrade', false);
const getMktgData = createMktgDataSelector('app.airChange.changePricingPage.response.mktg_data', {});

export const flightChangePricingMktgSelector = createSelector([getIsUpgrade, getMktgData], (isUpgrade, mktgData) => [
  {
    ...mktgData,
    ...(isUpgrade ? ANALYTICS.REVIEW_PAGE : {})
  },
  'otter'
]);
