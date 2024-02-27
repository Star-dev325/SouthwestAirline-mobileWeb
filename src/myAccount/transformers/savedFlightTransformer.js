import _ from 'lodash';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';
import TripTypes from 'src/shared/constants/tripTypes';

export default (pastFlight) => {
  const {
    _v1_infoNeededToCheckPrice: {
      type,
      origin,
      destination,
      originDepartureDate,
      destinationDepartureDate,
      numberAdults,
      currencyType,
      promoCode
    }
  } = pastFlight;

  return {
    tripType: _.get(TripTypes, `${type}.value`),
    origin,
    destination,
    departureDate: originDepartureDate,
    returnDate: destinationDepartureDate,
    numberOfAdults: parseInt(numberAdults),
    currencyType: currencyType === 'DOLLARS' ? DOLLAR : POINTS,
    promoCode
  };
};
