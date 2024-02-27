import flightConfirmationPageReducers from 'src/airBooking/reducers/flightConfirmationPageReducers';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';

describe('flightConfirmationPageReducers', () => {
  it('should init state', () => {
    expect(flightConfirmationPageReducers(undefined, {})).to.deep.equal({
      response: {}
    });
  });

  context('response', () => {
    it('should set response after fetch success', () => {
      const response = { test: 'test' };
      const state = flightConfirmationPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
        response
      });

      expect(state.response).to.deep.equal(response);
    });

    it('should return default state when action is undefined', () => {
      expect(flightConfirmationPageReducers().response).to.deep.equal({});
    });
  });
});
