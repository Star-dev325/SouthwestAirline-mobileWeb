import AirportInfoReducer from 'src/airports/reducers/airportInfoReducer';
import AirportInfoActionTypes from 'src/airports/actions/airportInfoActionTypes';

describe('AirportInfoReducer', () => {
  let state;

  beforeEach(() => {
    state = { originAirport: { isCurrentLocation: false } };
  });

  it('returns origin airport state on selection', () => {
    const updatedAirportInfo = { originAirport: { isCurrentLocation: true } };

    const airportInfo = AirportInfoReducer(state, {
      type: AirportInfoActionTypes.AIRPORT_INFO__UPDATE_SELECTED_AIRPORT_INFO,
      airportInfo: updatedAirportInfo
    });

    expect(airportInfo).to.be.deep.equal(updatedAirportInfo);
  });

  it('resets origin airport state', () => {
    const airportInfo = AirportInfoReducer(state, {
      type: AirportInfoActionTypes.AIRPORT_INFO__RESET_SELECTED_AIRPORT_INFO
    });

    expect(airportInfo).to.be.deep.equal({});
  });

  it('should return default state when action is undefined', () => {
    expect(AirportInfoReducer().airportInfo).to.deep.equal(undefined);
  });
});
