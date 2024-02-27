// @flow
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getMktgData = createMktgDataSelector('app.airChange.reaccomShoppingPage.response.mktg_data');

export const getSelectedBounds = (state: *) => state?.app?.airChange?.selectedBounds;

export const flightReaccomShoppingMktgSelector = createSelector(
  [getMktgData, getSelectedBounds],
  (mktgData, selectedBounds) => {
    const isInboundOnlySelected = !selectedBounds?.firstbound && selectedBounds?.secondbound;
    const pageAnalytics = isInboundOnlySelected
      ? ANALYTICS.REACCOM_INBOUND_SHOPPING_PAGE
      : ANALYTICS.REACCOM_OUTBOUND_SHOPPING_PAGE;
    const { page } = pageAnalytics;
    
    return [
      {
        ...mktgData,
        ...pageAnalytics,
        formname: 'reaccom change',
        formstart: '1'
      },
      'otter',
      { page }
    ];
  }
);
