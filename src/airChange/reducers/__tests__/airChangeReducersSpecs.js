import { combineReducers } from 'redux';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import sharedActionTypes from 'src/shared/actions/sharedActionTypes';
import * as airChangeReducers from 'src/airChange/reducers/airChangeReducers';

const {
  AIR_CHANGE__RESET_PAYMENT_INFO,
  AIR_CHANGE__SAVE_CONTACT_INFORMATION,
  AIR_CHANGE__UPDATE_CONTACT_METHOD,
  AIR_CHANGE__SAVE_PAYMENT_INFO,
  AIR_CHANGE__FETCH_PASSENGER_INFO_SUCCESS,
  AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS
} = airChangeActionTypes;

const {
  SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS,
  SHARED__CALC_FUNDS_SUCCESS,
  SHARED__REMOVE_TRAVEL_FUND_SUCCESS,
  SHARED__RESET_CALCULATE_FLOW_DATA
} = sharedActionTypes;

describe('AirChangeReducers', () => {
  let reducers;

  beforeEach(() => {
    reducers = combineReducers({ ...airChangeReducers });
  });

  context('contact method', () => {
    it('should save contactMethodInfo when get passnger information success', () => {
      const updatedState = reducers(undefined, {
        type: AIR_CHANGE__SAVE_CONTACT_INFORMATION,
        contactMethodInfo: { method: 'call' }
      });

      expect(updatedState.contactMethodInfo).to.deep.equal({ method: 'call' });
    });

    it('should update contactMethodInfo', () => {
      const updatedState = reducers(undefined, {
        type: AIR_CHANGE__UPDATE_CONTACT_METHOD,
        contactMethodInfo: { method: 'call' }
      });

      expect(updatedState.contactMethodInfo).to.deep.equal({ method: 'call' });
    });

    it('should update payment info when save payment info action dispatched', () => {
      const paymentInfo = { fakePaymentInfo: 'fakePaymentInfo' };

      const updatedState = reducers(undefined, {
        type: AIR_CHANGE__SAVE_PAYMENT_INFO,
        paymentInfo
      });

      expect(updatedState.paymentInfo).to.deep.equal(paymentInfo);
    });

    it('should clear payment info when clear payment info action dispatched', () => {
      const updatedState = reducers(undefined, {
        type: AIR_CHANGE__RESET_PAYMENT_INFO
      });

      expect(updatedState.resetPaymentInfo).to.deep.equal();
    });

    it('should return response when FETCH_PASSENGER_INFO_SUCCESS action be triggered', () => {
      const accountInfo = {
        firstName: 'Test',
        middleName: null,
        lastName: 'Mr.',
        dateOfBirth: '1991-04-19',
        gender: 'M',
        rapidRewardsNumber: '601491240',
        contactMethod: 'CALL_ME',
        contactPhone: { countryCode: '1', number: '4697645818' },
        contactEmail: null,
        emailReceiptTo: 'aterris@example.com',
        redressNumber: null,
        knownTravelerNumber: null
      };

      const updatedState = reducers(undefined, {
        type: AIR_CHANGE__FETCH_PASSENGER_INFO_SUCCESS,
        response: accountInfo
      });

      expect(updatedState.accountInfo).to.deep.equal(accountInfo);
    });
  });

  context('should forbid forward', () => {
    it('should return the should forbid forward to false when the UPDATE_SHOULD_FORBID_FORWARD not triggered', () => {
      const state = reducers(undefined, {
        type: '@@INIT'
      });

      expect(state.shouldForbidForward).to.be.false;
    });

    it('should return the should forbid forward to false when the UPDATE_SHOULD_FORBID_FORWARD triggered with false', () => {
      const state = reducers(undefined, {
        type: 'AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD',
        shouldForbidForward: false
      });

      expect(state.shouldForbidForward).to.be.false;
    });

    it('should return the should forbid forward to true when the UPDATE_SHOULD_FORBID_FORWARD triggered with true', () => {
      const state = reducers(undefined, {
        type: 'AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD',
        shouldForbidForward: true
      });

      expect(state.shouldForbidForward).to.be.true;
    });
  });

  context('fundsAppliedToken', () => {
    context('should update on shared travel fund action successes', () => {
      it('SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS', () => {
        const response = { fundsAppliedToken: 'funds-token' };
        const state = reducers(undefined, {
          type: SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS,
          response
        });

        expect(state.fundsAppliedToken).to.deep.equal('funds-token');
      });

      it('SHARED__REMOVE_TRAVEL_FUND_SUCCESS', () => {
        const response = { fundsAppliedToken: 'funds-token' };
        const state = reducers(undefined, {
          type: SHARED__REMOVE_TRAVEL_FUND_SUCCESS,
          response
        });

        expect(state.fundsAppliedToken).to.deep.equal('funds-token');
      });

      it('SHARED__CALC_FUNDS_SUCCESS', () => {
        const response = { fundsAppliedToken: 'funds-token' };
        const state = reducers(undefined, {
          type: SHARED__CALC_FUNDS_SUCCESS,
          response
        });

        expect(state.fundsAppliedToken).to.deep.equal('funds-token');
      });
    });

    context('should update on pricing-breakdown call success', () => {
      it('AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS', () => {
        const response = {
          changePricingPage: {
            _links: {
              calculateFunds: {
                body: {
                  fundsAppliedToken: 'funds-token'
                }
              }
            }
          }
        };
        const state = reducers(undefined, {
          type: AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS,
          response
        });

        expect(state.fundsAppliedToken).to.deep.equal('funds-token');
      });
    });

    context('should set to null when reset calculate is called', () => {
      it('SHARED__RESET_CALCULATE_FLOW_DATA', () => {
        const state = reducers(
          { fundsAppliedToken: 'funds-token' },
          {
            type: SHARED__RESET_CALCULATE_FLOW_DATA
          }
        );

        expect(state.fundsAppliedToken).to.deep.equal(null);
      });
    });
  });
});
