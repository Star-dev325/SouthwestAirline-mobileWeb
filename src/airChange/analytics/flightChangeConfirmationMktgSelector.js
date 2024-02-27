// @flow
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

const getIsUpgrade = (state) => _.get(state, 'app.airChange.changePricingPage.response._meta.isUpgrade', false);

export const getMktgData = createMktgDataSelector('app.airChange.changeConfirmationPage.response.mktg_data', null);

export const flightChangeConfirmationMktgSelector = createSelector(
  [getIsUpgrade, getMktgData],
  (isUpgrade, mktgData) => [{
    ...mktgData,
    ...(isUpgrade ? { formcomplete: '1' } : {}),
    ...(isUpgrade ? { formname: 'upgrade' } : {}),
    ...ANALYTICS.CONFIRMATION_PAGE
  },
  'otter',
  { page_name: ANALYTICS.CONFIRMATION_PAGE.page }
  ]
);