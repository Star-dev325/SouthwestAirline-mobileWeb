import { getSearch } from 'src/airChange/analytics/searchSelectors';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('searchSelectors', () => {
  let roundTripState;
  let oneWayState;
  let satelliteTrackStub;
  let setTimeoutStub;

  const expectTrackingCalled = () => {
    expect(setTimeoutStub.callCount).to.be.equal(1);
    setTimeoutStub.getCall(0).args[0]();
    expect(satelliteTrackStub).to.be.calledWith('select flight calendar strip');
  };

  beforeEach(() => {
    satelliteTrackStub = sinon.stub(window._satellite, 'track');
    setTimeoutStub = sinon.stub(window, 'setTimeout');

    roundTripState = {
      app: {
        airChange: {
          changeShoppingPage: {
            response: {
              _meta: {
                isPromoCodeApplied: true
              }
            },
            searchRequest: {
              from: 'ALB',
              to: 'ABQ',
              departureAndReturnDate: {
                departureDate: '2018-10-03',
                returnDate: '2018-10-06'
              }
            }
          }
        },
        airportInfo: {
          originAirport: {
            isCurrentLocation: true
          },
          destinationAirport: {
            isCurrentLocation: false
          }
        }
      }
    };

    oneWayState = {
      app: {
        airChange: {
          changeShoppingPage: {
            response: {
              _meta: {
                isPromoCodeApplied: true
              }
            },
            searchRequest: {
              from: 'ALB',
              departureAndReturnDate: {
                departureDate: '2018-10-03'
              }
            }
          }
        },
        airportInfo: {
          originAirport: {
            isCurrentLocation: true
          },
          destinationAirport: {
            isCurrentLocation: false
          }
        }
      }
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  context('getSearch', () => {
    it('should generate the search request for round trip', () => {
      expect(getSearch(roundTripState)).to.deep.equal({
        origin: 'ALB',
        destination: 'ABQ',
        tripType: 'roundTrip',
        departureDate: '2018-10-03',
        returnDate: '2018-10-06',
        promoCodeIsValid: true,
        currentLocationUsed: true,
        dateChange: 'initial search'
      });
      expectTrackingCalled();
    });

    it('should generate the search request for round trip with outbound selected', () => {
      roundTripState.app.airChange.selectedBounds = {
        firstbound: true
      };
      roundTripState.app.airChange.changeShoppingPage.searchRequest.diffs = {
        [OUTBOUND]: '+3',
        [INBOUND]: '-2'
      };

      expect(getSearch(roundTripState)).to.deep.equal({
        origin: 'ALB',
        destination: 'ABQ',
        tripType: 'roundTrip',
        departureDate: '2018-10-03',
        returnDate: '2018-10-06',
        promoCodeIsValid: true,
        currentLocationUsed: true,
        dateChange: 'OUT +3'
      });
      expectTrackingCalled();
    });

    it('should generate the search request for round trip with inbound selected', () => {
      roundTripState.app.airChange.selectedBounds = {
        secondbound: true
      };
      roundTripState.app.airChange.changeShoppingPage.searchRequest.diffs = {
        [OUTBOUND]: '+3',
        [INBOUND]: '-2'
      };

      expect(getSearch(roundTripState)).to.deep.equal({
        origin: 'ALB',
        destination: 'ABQ',
        tripType: 'roundTrip',
        departureDate: '2018-10-03',
        returnDate: '2018-10-06',
        promoCodeIsValid: true,
        currentLocationUsed: true,
        dateChange: 'RTN -2'
      });
      expectTrackingCalled();
    });

    it('should generate the search request for round trip with both bounds selected', () => {
      roundTripState.app.airChange.selectedBounds = {
        firstbound: true,
        secondbound: true
      };
      roundTripState.app.airChange.changeShoppingPage.searchRequest.diffs = {
        [OUTBOUND]: '+3',
        [INBOUND]: '-2'
      };

      expect(getSearch(roundTripState)).to.deep.equal({
        origin: 'ALB',
        destination: 'ABQ',
        tripType: 'roundTrip',
        departureDate: '2018-10-03',
        returnDate: '2018-10-06',
        promoCodeIsValid: true,
        currentLocationUsed: true,
        dateChange: 'OUT +3,RTN -2'
      });
      expectTrackingCalled();
    });

    it('should generate the search request for one way', () => {
      expect(getSearch(oneWayState)).to.deep.equal({
        origin: 'ALB',
        destination: undefined,
        tripType: 'oneWay',
        departureDate: '2018-10-03',
        returnDate: undefined,
        promoCodeIsValid: true,
        currentLocationUsed: true,
        dateChange: 'initial search'
      });
      expectTrackingCalled();
    });

    it('should generate analytics for an empty search request', () => {
      expect(getSearch({})).to.deep.equal({
        currentLocationUsed: false,
        tripType: 'oneWay',
        dateChange: 'initial search',
        departureDate: undefined,
        destination: undefined,
        origin: undefined,
        promoCodeIsValid: undefined,
        returnDate: undefined
      });
      expectTrackingCalled();
    });
  });
});
