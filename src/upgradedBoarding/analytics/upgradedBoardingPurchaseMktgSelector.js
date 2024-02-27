// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const upgradedBoardingPurchaseMktgSelector = createSelector(
  createMktgDataSelector(
    'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingResponse.upgradedBoardingSelectPage.mktg_data'
  ),
  (mktgData) => [
    {
      ...mktgData,
      page_name: 'index',
      page_channel: 'upgraded-boarding',
      page_subchannel: 'purchase',
      formstart: '1',
      formname: 'upgradeboarding',
      productview: '1',
      product: 'ub'
    },
    'otter'
  ]
);
