import TripTypes from 'src/shared/constants/tripTypes';
import { BOTH, DEPART, RETURN } from 'src/shared/components/calendar/constants/calendarType';

const SearchFlightRequestHelper = {
  extractCalendarType(request) {
    if (request.tripType === TripTypes.ONE_WAY.value) {
      if (request.departureDateDisabled && !request.returnDateDisabled) {
        return RETURN;
      } else {
        return DEPART;
      }
    } else {
      return BOTH;
    }
  }
};

export default SearchFlightRequestHelper;
