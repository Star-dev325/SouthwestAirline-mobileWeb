import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';

const getSearchRequest = (state) => _.get(state, 'app.airChange.changeShoppingPage.searchRequest');
const isPromoCodeApplied = (state) =>
  _.get(state, 'app.airChange.changeShoppingPage.response._meta.isPromoCodeApplied');
const getAirportInfo = (state) => _.get(state, 'app.airportInfo');
const getSelectedBounds = (state) => _.get(state, 'app.airChange.selectedBounds');

export const getSearch = createSelector(
  [getSearchRequest, isPromoCodeApplied, getAirportInfo, getSelectedBounds],
  (searchRequest, promoCodeIsValid, airportInfo, selectedBounds) => {
    const isSelectedOriginAirportCurrentLocation = !!_.get(airportInfo, 'originAirport.isCurrentLocation');
    const isSelectedDestinationAirportCurrentLocation = !!_.get(airportInfo, 'destinationAirport.isCurrentLocation');
    const {
      from: origin,
      to: destination,
      departureAndReturnDate: { returnDate, departureDate } = {},
      diffs: { [OUTBOUND]: outboundDiff = 0, [INBOUND]: inboundDiff = 0 } = {}
    } = searchRequest || {};
    let dateChange = 'initial search';

    if (outboundDiff || inboundDiff) {
      dateChange = '';

      if (selectedBounds.firstbound) {
        dateChange = `OUT ${outboundDiff}`;
      }

      if (selectedBounds.secondbound) {
        if (dateChange) {
          dateChange += ',';
        }
        dateChange += `RTN ${inboundDiff}`;
      }
    }

    window.setTimeout(() => {
      raiseSatelliteEvent('select flight calendar strip');
    });

    return {
      origin,
      destination,
      tripType: !returnDate ? 'oneWay' : 'roundTrip',
      departureDate,
      returnDate,
      promoCodeIsValid,
      currentLocationUsed: isSelectedOriginAirportCurrentLocation || isSelectedDestinationAirportCurrentLocation,
      dateChange
    };
  }
);
