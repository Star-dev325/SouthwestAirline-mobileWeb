import dayjs from 'dayjs';
import { compareSearchFlightRequest } from 'src/airBooking/helpers/compareSearchFlightRequest';

describe('CompareSearchFlightRequest', () => {
  context('comparing search requests', () => {
    it('should be true if two search requests have the same values', () => {
      const firstSearchRequest = {
        origin: 'origin',
        destination: 'dest',
        departureDate: dayjs('2015-05-13'),
        returnDate: dayjs('2015-05-18'),
        numberOfAdults: 2
      };

      const secondSearchRequest = {
        origin: 'origin',
        destination: 'dest',
        departureDate: dayjs('2015-05-13'),
        returnDate: dayjs('2015-05-18'),
        numberOfAdults: 2
      };

      expect(compareSearchFlightRequest(firstSearchRequest, secondSearchRequest)).to.be.true;
    });

    it('should be false if two search requests have different values', () => {
      const firstSearchRequest = {
        origin: 'origin',
        destination: 'dest',
        departureDate: dayjs('2015-05-13'),
        returnDate: dayjs('2015-05-18'),
        numberOfAdults: 2
      };

      const secondSearchRequest = {
        origin: 'origin',
        destination: 'dest',
        departureDate: dayjs('2015-05-13'),
        numberOfAdults: 2
      };

      expect(compareSearchFlightRequest(firstSearchRequest, secondSearchRequest)).to.be.false;
    });

    it('should be false if we compare searchRequest and empty object', () => {
      const searchRequest = {
        origin: 'origin',
        destination: 'dest',
        departureDate: dayjs('2015-05-13'),
        returnDate: dayjs('2015-05-18'),
        numberOfAdults: 2
      };

      expect(compareSearchFlightRequest(searchRequest, {})).to.be.false;
    });

    it('should be true if two search requests have the same values except for promo-code', () => {
      const searchRequestWithPromoCode = {
        origin: 'origin',
        destination: 'dest',
        departureDate: dayjs('2015-05-13'),
        returnDate: dayjs('2015-05-18'),
        numberOfAdults: 2,
        promoCode: 'TEAPOT'
      };

      const searchRequestWithoutPromoCode = {
        origin: 'origin',
        destination: 'dest',
        departureDate: dayjs('2015-05-13'),
        returnDate: dayjs('2015-05-18'),
        numberOfAdults: 2
      };

      expect(compareSearchFlightRequest(searchRequestWithPromoCode, searchRequestWithoutPromoCode)).to.be.true;
    });
  });
});
