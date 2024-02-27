import CarBookingActionTypes from 'src/carBooking/actions/carBookingActionTypes';
import findCarsReducer from 'src/carBooking/reducers/findCarsReducer';

describe('findCarsReducer', () => {
  it('should populate default values for findCars redux node when INIT action is triggered', () => {
    const results = findCarsReducer(undefined, {
      type: 'INIT'
    });

    expect(results).to.deep.equal({
      response: {},
      searchRequest: null,
      carResults: null
    });
  });

  it('should populate searchRequest when CAR_BOOKING__SAVE_FETCH_CARS_REQUEST action is triggered', () => {
    const request = 'request';
    const results = findCarsReducer(undefined, {
      type: CarBookingActionTypes.CAR_BOOKING__SAVE_FETCH_CARS_REQUEST,
      request
    });

    expect(results).to.deep.equal({
      response: {},
      searchRequest: request,
      carResults: null
    });
  });

  it('should populate response when CAR_BOOKING__SAVE_FETCH_CARS_REQUEST action is triggered', () => {
    const response = 'response';
    const results = findCarsReducer(undefined, {
      type: CarBookingActionTypes.CAR_BOOKING__FETCH_CARS_SUCCESS,
      response
    });

    expect(results).to.deep.equal({
      response,
      searchRequest: null,
      carResults: null
    });
  });

  it('should return default state when action is undefined', () => {
    expect(findCarsReducer()).to.deep.equal({
      response: {},
      searchRequest: null,
      carResults: null
    });
  });

  it('should populate carResponse when CAR_BOOKING__SAVE_CAR_RESULTS action is triggered', () => {
    const carResults = 'carResults';
    const results = findCarsReducer(undefined, {
      type: CarBookingActionTypes.CAR_BOOKING__SAVE_CAR_RESULTS,
      carResults
    });

    expect(results).to.deep.equal({
      response: {},
      searchRequest: null,
      carResults
    });
  });
});
