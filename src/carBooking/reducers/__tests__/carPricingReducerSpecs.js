import carPricingReducer from 'src/carBooking/reducers/carPricingReducer';

describe('carPricingReducer', () => {
  it('should return the default state when INIT action is triggered', () => {
    const result = carPricingReducer(undefined, {
      type: 'INIT'
    });

    expect(result).to.deep.equal({
      response: {},
      selectedCar: {},
      carReservation: {},
      selectedExtras: []
    });
  });

  it('should populate the response node when the CAR_BOOKING__FETCH_CAR_PRICING_SUCCESS is triggered', () => {
    const response = 'response';
    const result = carPricingReducer(undefined, {
      type: 'CAR_BOOKING__FETCH_CAR_PRICING_SUCCESS',
      response
    });

    expect(result).to.deep.equal({
      response,
      selectedCar: {},
      carReservation: {},
      selectedExtras: []
    });
  });

  it('should return default state when action is undefined', () => {
    expect(carPricingReducer()).to.deep.equal({
      response: {},
      carReservation: {},
      selectedCar: {},
      selectedExtras: []
    });
  });

  it('should populate the selectedCar node when the CAR_BOOKING__SAVE_SELECTED_CAR is triggered', () => {
    const selectedCar = 'selectedCar';
    const result = carPricingReducer(undefined, {
      type: 'CAR_BOOKING__SAVE_SELECTED_CAR',
      selectedCar
    });

    expect(result).to.deep.equal({
      response: {},
      selectedCar,
      carReservation: {},
      selectedExtras: []
    });
  });

  it('should populate the carReservation node when the CAR_BOOKING__SAVE_CAR_RESERVATION is triggered', () => {
    const carReservation = 'carReservation';
    const result = carPricingReducer(undefined, {
      type: 'CAR_BOOKING__SAVE_CAR_RESERVATION',
      carReservation
    });

    expect(result).to.deep.equal({
      response: {},
      selectedCar: {},
      carReservation,
      selectedExtras: []
    });
  });

  it('should populate the selectedExtras node when the CAR_BOOKING__SAVE_SELECTED_EXTRAS is triggered', () => {
    const selectedExtras = ['extra'];
    const result = carPricingReducer(undefined, {
      type: 'CAR_BOOKING__SAVE_SELECTED_EXTRAS',
      selectedExtras
    });

    expect(result).to.deep.equal({
      response: {},
      selectedCar: {},
      carReservation: {},
      selectedExtras
    });
  });
});
