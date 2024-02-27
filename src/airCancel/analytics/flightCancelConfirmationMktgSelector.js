// @flow
import { ANALYTICS } from 'src/airCancel/constants/airCancelConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const flightCancelConfirmationMktgSelector = createSelector(
  createMktgDataSelector('app.airCancel.cancelBoundConfirmationPage.response.mktg_data'),
  (mktgData) => {
    const { page } = ANALYTICS.AIR_CANCEL_CONFIRMATION_PAGE;

    return [ mktgData, 'otter', { page } ];
  }
);
