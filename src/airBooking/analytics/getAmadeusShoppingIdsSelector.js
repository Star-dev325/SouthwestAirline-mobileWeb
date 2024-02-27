// @flow
import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

type AmadeusShoppingIdsType = {
  requestId?: string,
  userExperienceId?: string,
  channelId?: string
};

const DEFAULT_AMADEUS_SHOPPING_ANALYTICS = {};
const getFlightShoppingAnalytics = (state) =>
  _.get(
    state,
    'app.airBooking.flightShoppingPage.response.flightShoppingPage._analytics',
    DEFAULT_AMADEUS_SHOPPING_ANALYTICS
  );

export const getAmadeusShoppingIds = createSelector(
  [getFlightShoppingAnalytics],
  (flightShoppingAnalytics: AmadeusShoppingIdsType) => ({
    ...flightShoppingAnalytics
  })
);
