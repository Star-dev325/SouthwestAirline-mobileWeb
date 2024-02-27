import _ from 'lodash';
import travelInformationPageReducers, {
  ANALYTICS_DEFAULT
} from 'src/viewReservation/reducers/travelInformationPageReducers';

import ViewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';
import MyAccountActionTypes from 'src/myAccount/actions/myAccountActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const {
  VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION,
  VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_SUCCESS,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
  VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS,
  VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS
} = ViewReservationActionTypes;
const { MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS } = MyAccountActionTypes;
const { VIEW_TAB } = AnalyticsActionTypes;

describe('travelInformationPageReducers', () => {
  it('should init travelInformationPage state', () => {
    const action = {
      type: '@@INIT'
    };

    const newState = travelInformationPageReducers(undefined, action);

    expect(newState).to.deep.equal({
      response: null,
      isInternational: false,
      isCheckedIn: false,
      saveTravelInformationRequest: {},
      analytics: ANALYTICS_DEFAULT
    });
  });

  it('should reset travelInformationPage response state when start fetch travel information', () => {
    const action = {
      type: VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION
    };

    const newState = travelInformationPageReducers(undefined, action);

    expect(newState.response).to.be.null;
  });

  it('should update state with response data when fetching response is success', () => {
    const action = {
      type: VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_SUCCESS,
      response: { passengerName: 'Fred Flintstone' }
    };

    const newState = travelInformationPageReducers(undefined, action);

    expect(newState.response).to.be.deep.equal(action.response);
  });

  it('should reset isInternational when start fetch flight reservation information', () => {
    const action = {
      type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION
    };

    const newState = travelInformationPageReducers(undefined, action);

    expect(newState.isInternational).to.be.false;
  });

  it('should update state with isInternational data when fetching flight reservation is success', () => {
    const action = {
      type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
      response: { isInternational: true }
    };

    const newState = travelInformationPageReducers(undefined, action);

    expect(newState.isInternational).to.be.true;
  });

  it('should reset isCheckedIn when start fetch flight reservation information', () => {
    const action = {
      type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION
    };

    const newState = travelInformationPageReducers(undefined, action);

    expect(newState.isCheckedIn).to.be.false;
  });

  it('should update state with isCheckedIn data when fetching flight reservation is success', () => {
    const action = {
      type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
      response: { isCheckedIn: true }
    };

    const newState = travelInformationPageReducers(undefined, action);

    expect(newState.isCheckedIn).to.be.true;
  });

  it('should update state save travel information request when save travel information for analytics with request', () => {
    const saveTravelInformationRequest = {
      href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
      method: 'POST',
      body: {
        'first-name': 'AGE',
        'last-name': 'PASSENGER',
        'passenger-reference': '2',
        passportInformation: {
          passportNumber: 'PASSPORT617',
          passportIssuedBy: 'CN',
          nationality: 'CN',
          passportExpirationDate: '2022-10-29',
          countryOfResidence: 'US'
        },
        emergencyContact: {
          name: 'Age Passenger',
          contactPhone: {
            countryCode: 'US',
            number: '469-422-3678'
          }
        },
        accountNumber: '601005646',
        redressNumber: '1234567',
        knownTravelerId: '123456789012345'
      }
    };

    const action = {
      type: VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS,
      saveTravelInformationRequest
    };

    const newState = travelInformationPageReducers(undefined, action);

    expect(newState.saveTravelInformationRequest).to.deep.equal(saveTravelInformationRequest);
  });

  it('should update state save travel information request when save travel information for analytics without request', () => {
    const action = {
      type: VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS
    };

    const newState = travelInformationPageReducers(undefined, action);

    expect(newState.saveTravelInformationRequest).to.deep.equal({});
  });

  context('rdo edit name', () => {
    let changedName, origName;

    beforeEach(() => {
      origName = {
        firstName: 'Fred',
        middleName: 'Rock',
        lastName: 'Flintstone'
      };

      changedName = {
        firstName: 'Fred',
        middleName: 'Rock',
        lastName: 'Stoney'
      };
    });

    it('should populate origName when action VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_SUCCESS triggered', () => {
      const response = _.set({}, 'editPNRPassengerPage.passengerDetails.name', origName);
      const action = {
        type: VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_SUCCESS,
        response
      };

      const newState = travelInformationPageReducers(undefined, action);

      expect(newState.analytics).to.deep.equal({
        origName,
        changedName: null
      });
    });

    it('should populate changedName and nameChangedCount when action VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS triggered', () => {
      const response = _.set({}, 'editPNRPassengerPage.passengerDetails.name', changedName);
      const action = {
        type: VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS,
        response: {
          response,
          newName: {
            ...changedName
          }
        }
      };

      const newState = travelInformationPageReducers(undefined, action);

      expect(newState.analytics).to.deep.equal({
        origName: null,
        changedName
      });
    });

    context('re-initialize name change analytics object in redux', () => {
      let state;

      beforeEach(() => {
        state = {
          origName,
          changedName
        };
      });

      it('should re-initialize analytics when looking up reservation - triggered VIEW_TAB', () => {
        const action = { type: VIEW_TAB };

        const newState = travelInformationPageReducers(state, action);

        expect(newState.analytics).to.deep.equals(ANALYTICS_DEFAULT);
      });

      it('should re-initialize analytics when viewing reservation from my accounts page - triggered MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS', () => {
        const action = { type: MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS };

        const newState = travelInformationPageReducers(state, action);

        expect(newState.analytics).to.deep.equals(ANALYTICS_DEFAULT);
      });

      it('should re-initialize analytics when leaving view reservation page by pressing change, cancel, check-in, view BP or EB buttons - ex. triggered AIR_CHANGE__RESET_FLOW_DATA', () => {
        const action = { type: 'XXX__RESET_FLOW_DATA' };

        const newState = travelInformationPageReducers(state, action);

        expect(newState.analytics).to.deep.equals(ANALYTICS_DEFAULT);
      });

      it('should handle undefined value for action.type', () => {
        const action = { type: undefined };

        const newState = travelInformationPageReducers(state, action);

        expect(newState.analytics).to.deep.equals(ANALYTICS_DEFAULT);
      });

      it('should handle null value for action.type', () => {
        const action = { type: null };

        const newState = travelInformationPageReducers(state, action);

        expect(newState.analytics).to.deep.equals(ANALYTICS_DEFAULT);
      });
    });
  });
});
