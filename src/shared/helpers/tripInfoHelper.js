import { OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import FlightInfoDescription from 'src/shared/constants/flightBoundDescription';
import i18n from '@swa-ui/locale';

function getTripDescription(searchRequest, boundType, isAirChangeInboundOnly = false, isOpenJawBounds = false) {
  const { origin, destination } = searchRequest;
  let airportCode = boundType === OUTBOUND ? [origin, destination] : [destination, origin];

  if (isAirChangeInboundOnly) {
    airportCode = [origin, destination];
  }

  const selectedAirPortCodes = `${airportCode[0]} - ${airportCode[1]}`;
  const tripDescription =
    isOpenJawBounds || boundType === OUTBOUND ? FlightInfoDescription.DEPARTING : FlightInfoDescription.RETURNING;

  return {
    selectionInfo: selectedAirPortCodes,
    tripDescription: `${i18n('SHARED__TRIP_BOOKED__PRODUCT_LIST_SELECT')} ${tripDescription}`
  };
}

function getFlightDescriptionWithTripType(searchRequest) {
  return {
    airPortCodes: `${searchRequest.origin} - ${searchRequest.destination}`,
    tripType: searchRequest.tripType === 'roundTrip' ? '(Round Trip)' : ''
  };
}

export default {
  getTripDescription,
  getFlightDescriptionWithTripType
};
