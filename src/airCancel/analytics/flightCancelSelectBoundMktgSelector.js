// @flow
import { ANALYTICS } from 'src/airCancel/constants/airCancelConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getMktgData = createMktgDataSelector('app.airCancel.cancelBoundPage.response.mktg_data');

export const flightCancelSelectBoundMktgSelector = createSelector([getMktgData], (mktgData) => {
  const { page } = ANALYTICS.AIR_CANCEL_SELECT_BOUND_PAGE;

  return [
    {
      ...mktgData,
      ...ANALYTICS.AIR_CANCEL_SELECT_BOUND_PAGE
    },
    'otter',
    { page }
  ];
});
