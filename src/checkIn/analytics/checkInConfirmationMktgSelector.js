// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const checkInConfirmationMktgSelector = createSelector(
  createMktgDataSelector('app.checkIn.checkInConfirmationPage.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      page_name: 'air-check-in-confirmation',
      page_channel: 'swa',
      page_subchannel: 'check-in'
    },
    'otter'
  ]
);
