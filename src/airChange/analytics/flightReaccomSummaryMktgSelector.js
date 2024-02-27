// @flow
import { getSelectedBounds } from 'src/airChange/analytics/flightReaccomShoppingMktgSelector';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getMktgData = createMktgDataSelector('app.airChange.reaccomShoppingPage.response.mktg_data');
const getSelectedProducts = (state) => state?.app?.airChange?.reaccomShoppingPage?.selectedProducts;

export const flightReaccomSummaryMktgSelector = createSelector(
  [getMktgData, getSelectedBounds, getSelectedProducts],
  (mktgData, selectedBounds, selectedProducts) => {
    const isInboundProductSelected = selectedProducts?.inbound;
    const isSecondBoundSelected = selectedBounds?.secondbound;
    const pageAnalytics = isSecondBoundSelected && !isInboundProductSelected
      ? ANALYTICS.REACCOM_INBOUND_SHOPPING_PAGE
      : ANALYTICS.REACCOM_SUMMARY_PAGE;
    const { page } = pageAnalytics;

    return [
      {
        ...mktgData,
        ...pageAnalytics
      },
      'otter',
      { page }
    ];
  }
);
