import TripTypes from 'src/shared/constants/tripTypes';
import SearchFlightRequestHelper from 'src/shared/helpers/searchFlightRequestHelper';
import { BOTH, DEPART, RETURN } from 'src/shared/components/calendar/constants/calendarType';

const { ROUND_TRIP, ONE_WAY } = TripTypes;
const { extractCalendarType } = SearchFlightRequestHelper;

describe('Search Flight Request Helper', () => {
  context('extractCalendarType', () => {
    it('should return "both" when search request\'s trip type is roundTrip', () => {
      const searchRequest = {
        tripType: ROUND_TRIP.value
      };

      expect(extractCalendarType(searchRequest)).to.equal(BOTH);
    });

    it('should return "depart" when search request\'s trip type is oneWay and no date is disabled', () => {
      const searchRequest = {
        tripType: ONE_WAY.value
      };

      expect(extractCalendarType(searchRequest)).to.equal(DEPART);
    });

    it('should return "depart" when search request\'s trip type is oneWay & returnDate is disabled', () => {
      const searchRequest = {
        tripType: ONE_WAY.value,
        returnDateDisabled: true
      };

      expect(extractCalendarType(searchRequest)).to.equal(DEPART);
    });

    it('should return "return" when search request\'s trip type is oneWay & departureDate is disabled', () => {
      const searchRequest = {
        tripType: ONE_WAY.value,
        departureDateDisabled: true
      };

      expect(extractCalendarType(searchRequest)).to.equal(RETURN);
    });
  });
});
