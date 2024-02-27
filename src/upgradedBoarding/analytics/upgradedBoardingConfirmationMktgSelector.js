// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const upgradedBoardingConfirmationMktgSelector = createSelector(
  createMktgDataSelector(
    'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingPurchaseResponse.upgradedBoardingConfirmationPage.mktg_data'
  ),
  (mktgData) => [
    {
      ...mktgData,
      page_name: 'index',
      page_channel: 'upgraded-boarding',
      page_subchannel: 'confirmation',
      formcomplete: '1',
      formname: 'upgradeboarding',
      purchase: '1',
      product: 'ub'
    },
    'otter'
  ]
);
