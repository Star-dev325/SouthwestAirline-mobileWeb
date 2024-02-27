import _ from 'lodash';
import { OUTBOUND, INBOUND } from 'src/shared/constants/flightBoundTypes';
import tripInfoHelper from 'src/shared/helpers/tripInfoHelper';

describe('TripInfoHelper', () => {
  let boundType, searchRequest, tripDescription;

  context('When one trip', () => {
    beforeEach(() => {
      searchRequest = {
        currencyType: 'Dollars',
        departureDate: '2016-03-08',
        destination: 'BWI',
        isRoundTrip: false,
        numberOfAdults: 1,
        origin: 'CAK',
        promoCode: '',
        returnDate: '',
        tripType: 'oneWay'
      };
      boundType = OUTBOUND;
    });

    it('should display correct airports code and bound for outbound', () => {
      tripDescription = tripInfoHelper.getTripDescription(searchRequest, boundType);
      expect(tripDescription).to.deep.equal({
        tripDescription: 'Select Departing',
        selectionInfo: 'CAK - BWI'
      });
    });
  });

  context('When round trip', () => {
    beforeEach(() => {
      searchRequest = {
        currencyType: 'Dollars',
        departureDate: '2016-03-08',
        destination: 'BWI',
        isRoundTrip: true,
        numberOfAdults: 1,
        origin: 'CAK',
        promoCode: '',
        returnDate: '2016-03-11',
        tripType: 'roundTrip'
      };
    });

    it('should display correct airports code and bound for outbound', () => {
      boundType = OUTBOUND;
      tripDescription = tripInfoHelper.getTripDescription(searchRequest, boundType);
      expect(tripDescription).to.deep.equal({
        tripDescription: 'Select Departing',
        selectionInfo: 'CAK - BWI'
      });
    });

    it('should display correct airports code and bound for inbound', () => {
      boundType = INBOUND;
      tripDescription = tripInfoHelper.getTripDescription(searchRequest, boundType);
      expect(tripDescription).to.deep.equal({
        tripDescription: 'Select Returning',
        selectionInfo: 'BWI - CAK'
      });
    });

    it('should display Select Departing trip when the reservation is open jaw', () => {
      boundType = OUTBOUND;
      const isAirChangeInboundOnly = false;
      const isOpenJawBounds = true;

      tripDescription = tripInfoHelper.getTripDescription(
        searchRequest,
        boundType,
        isAirChangeInboundOnly,
        isOpenJawBounds
      );
      expect(tripDescription).to.deep.equal({
        tripDescription: 'Select Departing',
        selectionInfo: 'CAK - BWI'
      });
    });

    context('air change inbound only', () => {
      it('should display original - destination for the trip description', () => {
        // for air change inbound only, we will reverse the origin and destination airport code.
        // e.g. Original flight is Round trip CAK <-> BWI
        // the search request will become:
        // searchRequest = { origin = 'BWI', destination: 'CAK' }
        // so the trip description should become : '${origin} = ${destination}'
        const airChangeReservationTransform = function (originalSearchRequest) {
          const airportCodeTemp = originalSearchRequest.origin;
          const result = _.cloneDeep(originalSearchRequest);

          result.origin = originalSearchRequest.destination;
          result.destination = airportCodeTemp;

          return result;
        };
        const transformedSearchRequest = airChangeReservationTransform(searchRequest);

        boundType = INBOUND;
        tripDescription = tripInfoHelper.getTripDescription(transformedSearchRequest, boundType, true);
        expect(tripDescription).to.deep.equal({
          tripDescription: 'Select Returning',
          selectionInfo: 'BWI - CAK'
        });
      });
    });
  });
});
