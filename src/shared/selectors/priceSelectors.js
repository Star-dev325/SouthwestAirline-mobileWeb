// @flow

import _ from 'lodash';
import { getSameDayCurrencyType } from 'src/sameDay/selectors/sameDayPriceSelectors';
import { POINTS, DOLLAR } from 'src/shared/constants/currencyTypes';
import { getCurrentAppFlow } from 'src/shared/selectors/appSelector';
import SharedConstants from 'src/shared/constants/sharedConstants';

const { APP_FLOWS } = SharedConstants;

export const getCurrencyType = (state: *) => {
  switch (getCurrentAppFlow(state)) {
    case APP_FLOWS.AIR_BOOKING:
      return _.get(state, 'app.airBooking.searchRequest.currencyType');
    case APP_FLOWS.AIR_CHANGE:
      return (
        _.get(state, 'app.airChange.selectFarePage.selectedFlight.page.currencyType') ||
        (_.get(state, 'app.airChange.changePricingPage.response.totals.pointsTotal') && POINTS) ||
        DOLLAR
      );
    case APP_FLOWS.AIR_UPGRADE:
      return _.get(
        state,
        'app.airUpgrade.airUpgradeReducer.viewUpgradeReservationPage.pricingDataList.[0].upgradePrice.currencyCode'
      );
    case APP_FLOWS.SAME_DAY:
      return getSameDayCurrencyType(state);
    default:
      return DOLLAR;
  }
};

export const isPointsBooking = (state: *) => getCurrencyType(state) === POINTS;
