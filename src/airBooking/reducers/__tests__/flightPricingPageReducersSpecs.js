import sinonModule from 'sinon';
import flightPricingPageReducers from 'src/airBooking/reducers/flightPricingPageReducers';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';

const sinon = sinonModule.sandbox.create();

describe('flightShoppingPageReducers', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should init state', () => {
    expect(flightPricingPageReducers(undefined, {})).to.deep.equal({
      response: {},
      resumeAfterLogin: false,
      hasUpsellError: false
    });
  });

  context('response', () => {
    it('should set response to default state on fetch', () => {
      const action = { type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE };

      const state = flightPricingPageReducers(undefined, action);

      expect(state.response).to.deep.equal({});
    });

    it('should set response to default state on fetch when request is false', () => {
      const existingState = {
        response: { existing: 'state' }
      };

      const action = {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE,
        request: false
      };

      const state = flightPricingPageReducers(existingState, action);

      expect(state.response).to.deep.equal({});
    });

    it('should set response to existing state on fetch when request is true', () => {
      const existingState = {
        response: { existing: 'state' }
      };

      const action = {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE,
        request: true
      };

      const state = flightPricingPageReducers(existingState, action);

      expect(state.response).to.deep.equal(existingState.response);
    });

    it('should set response after fetch success', () => {
      const response = { test: 'test' };
      const state = flightPricingPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS,
        response
      });

      expect(state.response).to.deep.equal(response);
    });

    it('should reset chase info when user logout', () => {
      const originState = {
        response: {
          flightPricingPage: {
            other: 'other values',
            _meta: {
              chase: {
                newCardHasSufficientFunds: true,
                isApproved: true,
                isValidChaseSessionId: true,
                chaseApplicationCompleted: true
              }
            }
          }
        }
      };
      const state = flightPricingPageReducers(originState, {
        type: ChaseActionTypes.CHASE__RESET_CHASE_TEMPORARY_CARD
      });

      expect(state.response).to.deep.equal({
        flightPricingPage: {
          other: 'other values',
          _meta: {
            chase: null
          }
        }
      });
    });

    it('should return default state when action is undefined', () => {
      expect(flightPricingPageReducers().response).to.deep.equal({});
    });
  });

  context('resumeAfterLogin', () => {
    it('should set resume task flag after login success', () => {
      const state = flightPricingPageReducers(false, {
        type: AirBookingActionTypes.AIR_BOOKING__FLIGHT_PRICING_RESUME_AFTER_LOGIN,
        shouldResume: true
      });

      expect(state.resumeAfterLogin).to.deep.equal(true);
    });

    it('should return default state when action is undefined', () => {
      expect(flightPricingPageReducers().resumeAfterLogin).to.be.false;
    });
  });

  context('hasUpsellError', () => {
    it('should set hasUpsellError when AIR_BOOKING__FLIGHT_PRICING_SET_HAS_UPSELL_ERROR action is triggered', () => {
      const state = flightPricingPageReducers(false, {
        type: AirBookingActionTypes.AIR_BOOKING__FLIGHT_PRICING_SET_HAS_UPSELL_ERROR,
        hasUpsellError: true
      });

      expect(state.hasUpsellError).to.deep.equal(true);
    });

    it('should return default state when action is undefined', () => {
      expect(flightPricingPageReducers().hasUpsellError).to.be.false;
    });
  });
});
