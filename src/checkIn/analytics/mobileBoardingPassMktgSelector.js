// @flow
import { ANALYTICS } from 'src/checkIn/constants/checkInConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const mobileBoardingPassMktgSelector = createSelector(
  createMktgDataSelector('app.checkIn.checkInViewBoardingPassPage.mobileBoardingPassViewPage.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.BOARDING_PASS
    },
    'otter',
    { page: ANALYTICS.BOARDING_PASS.page }
  ]
);
