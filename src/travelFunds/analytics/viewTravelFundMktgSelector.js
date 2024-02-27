// @flow
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { viewUnusedTravelFundsMktgSelector } from 'src/travelFunds/analytics/viewUnusedTravelFundsMktgSelector';
import { getViewTravelFundData } from 'src/travelFunds/analytics/helpers/mktgDataHelpers';

const getSelectedTab = (state: *) => _.get(state, 'app.travelFunds.lookUpTravelFundsPage.currentlySelectedTab', null);

export const viewTravelFundMktgSelector = createSelector(
  [getSelectedTab, viewUnusedTravelFundsMktgSelector],
  (selectedTab, [mktgData]) => {
    const result = getViewTravelFundData(selectedTab, mktgData);

    return [result, 'squid'];
  }
);
