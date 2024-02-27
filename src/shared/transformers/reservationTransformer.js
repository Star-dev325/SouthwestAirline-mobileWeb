import _ from 'lodash';
import formatDateRange from 'src/shared/helpers/formatDateRange';
import { transformFromPassengerTypeCountAndFareType } from 'src/shared/transformers/passengerFareTypeTransformer';

function _formatAirport(airport) {
  return `${airport.name}, ${_.isEmpty(airport.state) ? airport.country : airport.state}`;
}

function _addPassengerFareTypeInfoToBounds(bounds) {
  return _.map(bounds, (bound) => {
    const { passengerTypeCounts, fareProductDetails } = bound;

    return _.merge({}, bound, {
      passengerFareTypeInfo: transformFromPassengerTypeCountAndFareType(passengerTypeCounts, fareProductDetails)
    });
  });
}

export const transformResponseToViewReservationDetail = (response) => {
  const {
    viewReservationViewPage: { dates, originAirport, destinationAirport, bounds, ...others }
  } = response;

  return {
    date: formatDateRange(dates.first, dates.second),
    originAirport: _formatAirport(originAirport),
    destinationAirport: _formatAirport(destinationAirport),
    bounds: _addPassengerFareTypeInfoToBounds(bounds),
    ...others
  };
};
