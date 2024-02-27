import {
  getCombinedFlightNumberFromSegments,
  getUpdatedSelectedFlightDetails
} from 'src/shared/helpers/flightSegmentHelper';

describe('flightSegmentHelpers', () => {
  context('getCombinedFlightNumberFromSegments with default path', () => {
    it('should return 2066/2459', () => {
      const segments = [
        {
          marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '2066' }
        },
        {
          marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '2459' }
        }
      ];

      expect(getCombinedFlightNumberFromSegments(segments)).to.equal('2066/2459');
    });

    it('should return 2066', () => {
      const segments = [
        {
          marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '2066' }
        }
      ];

      expect(getCombinedFlightNumberFromSegments(segments)).to.equal('2066');
    });
  });

  context('getCombinedFlightNumberFromSegments with custom path', () => {
    it('should return 2066/2459', () => {
      const segments = [
        {
          flightNumber: '2066'
        },
        {
          flightNumber: '2459'
        }
      ];

      expect(getCombinedFlightNumberFromSegments(segments, 'flightNumber')).to.equal('2066/2459');
    });

    it('should return 2066', () => {
      const segments = [
        {
          flightNumber: '2066'
        }
      ];

      expect(getCombinedFlightNumberFromSegments(segments, 'flightNumber')).to.equal('2066');
    });
  });
});

describe('getUpdatedSelectedFlightDetails', () => {
  context('getUpdatedSelectedFlightDetails with respect to currentDirection', () => {
    it('should return updated outbound flightDetails', () => {
      const selectedFlight = {
        flightDetails: {
          airportInfo: 'Test'
        },
        currentDirection: 'outbound'
      };

      const expectedSelectedFlight = {
        outbound: selectedFlight.flightDetails,
        inbound: {},
        currentDirection: 'outbound'
      };
      const state = {
        outbound: {
          airportInfo: 'DAL-SEA'
        },
        inbound: {}
      };

      expect(getUpdatedSelectedFlightDetails(selectedFlight, state)).to.deep.equal(expectedSelectedFlight);
    });

    it('should return updated inbound flightDetails', () => {
      const selectedFlight = {
        flightDetails: {
          airportInfo: 'Test'
        },
        currentDirection: 'inbound'
      };

      const expectedSelectedFlight = {
        inbound: selectedFlight.flightDetails,
        outbound: {},
        currentDirection: 'inbound'
      };
      const state = {
        inbound: {
          airportInfo: 'DAL-SEA'
        },
        outbound: {}
      };

      expect(getUpdatedSelectedFlightDetails(selectedFlight, state)).to.deep.equal(expectedSelectedFlight);
    });

    it('should return state by default if current direction is not inbound/outbound', () => {
      const selectedFlight = {
        flightDetails: {
          airportInfo: 'Test'
        }
      };

      const state = {
        inbound: {
          airportInfo: 'DAL-SEA'
        },
        outbound: {}
      };

      expect(getUpdatedSelectedFlightDetails(selectedFlight, state)).to.deep.equal(state);
    });
  });
});
