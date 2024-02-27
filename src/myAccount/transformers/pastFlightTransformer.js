import _ from 'lodash';
import TripTypes from 'src/shared/constants/tripTypes';

export default (pastFlight) => {
  const { _infoNeededToRebook, isRebookable } = pastFlight;

  if (isRebookable && _infoNeededToRebook) {
    const { type, origin, destination } = _infoNeededToRebook;
    const tripType = _.get(TripTypes, `${type}.value`);
    const departureDate = _.get(TripTypes, `${type}.departureDate`);
    const returnDate = _.get(TripTypes, `${type}.returnDate`);

    return {
      tripType: tripType || TripTypes.ONE_WAY.value,
      isRoundTrip: tripType === TripTypes.ROUND_TRIP.value,
      origin,
      destination,
      departureDate: departureDate || TripTypes.ONE_WAY.departureDate,
      returnDate: returnDate || TripTypes.ONE_WAY.returnDate
    };
  }
};
