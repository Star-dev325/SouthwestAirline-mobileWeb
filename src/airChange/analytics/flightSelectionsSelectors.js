// @flow
import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import FlightInfo from 'src/shared/constants/flightInfo';

const { RETURNING, DEPARTING } = FlightInfo;

const getBounds = (state) => _.get(state, 'app.airChange.changePricingPage.response.bounds');
const getAnalyticsData = (state) => _.get(state, 'app.airChange.changePricingPage.response._analytics');

const _buildSelectionObject = (bound) => {
  const { boundType, passengers } = bound;
  const passenger = passengers.find((p) => p.type.toLowerCase() === 'passenger' || p.type.toLowerCase() === 'adult');
  let newBound = {};

  if (passenger) {
    if (boundType === DEPARTING) {
      newBound = {
        outbound: {
          selectedFareProduct: {
            fareClass: passenger.bookingCode
          }
        }
      };
    } else if (boundType === RETURNING) {
      newBound = {
        inbound: {
          selectedFareProduct: {
            fareClass: passenger.bookingCode
          }
        }
      };
    }
  }

  return newBound;
};

const _formatBounds = (airChangeBounds) => {
  const flightSelections = {};

  for (const bound of airChangeBounds) {
    flightSelections.adult = Object.assign({}, flightSelections.adult, _buildSelectionObject(bound));
  }

  return flightSelections;
};

export const getFlightSelections = createSelector([getBounds, getAnalyticsData], (airChangeBounds, _analyticsData) => ({
  ..._formatBounds(airChangeBounds),
  ..._analyticsData
}));
