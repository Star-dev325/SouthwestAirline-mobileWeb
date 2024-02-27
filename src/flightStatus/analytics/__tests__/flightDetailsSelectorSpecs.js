import _ from 'lodash';
import { getFlightDetails as flightDetailsSelector } from 'src/flightStatus/analytics/flightDetailsSelector';

describe('flightDetailsSelector', () => {
  let state;
  const nonStopLeg = {
    flightNumber: '147',
    aircraftInfo: { aircraftType: 'Boeing 737-800' },
    departure: { airport: 'ATL' },
    arrival: { airport: 'AUS' }
  };
  const connectingLeg = {
    flightNumber: '301',
    aircraftInfo: { aircraftType: 'Boeing Max8' },
    departure: { airport: 'AUS' },
    arrival: { airport: 'SAN' }
  };

  beforeEach(() => {
    state = {};
  });

  it('should get correct details off of the state when there is a nonstop flight', () => {
    state = _.set(state, 'app.flightStatus.flightStatusDetailsPage.response.flightCards', [
      {
        legs: [nonStopLeg]
      }
    ]);
    expect(flightDetailsSelector(state)).to.be.deep.equal({
      aircraftType: '737-800',
      flightNumber: '147'
    });
  });

  it('should get correct details off of hte state when there is a connecting flight', () => {
    state = _.set(state, 'app.flightStatus.flightStatusDetailsPage.response.flightCards', [
      {
        legs: [nonStopLeg, connectingLeg]
      }
    ]);
    expect(flightDetailsSelector(state)).to.be.deep.equal({
      aircraftType: '737-800|Max8',
      flightNumber: '147|301'
    });
  });

  it('should return empty strings in the case of no state defined', () => {
    state = _.set(state, 'app.flightStatus.flightStatusDetailsPage.response.flightCards', []);
    expect(flightDetailsSelector(state)).to.be.deep.equal({
      aircraftType: '',
      flightNumber: ''
    });
  });
});
