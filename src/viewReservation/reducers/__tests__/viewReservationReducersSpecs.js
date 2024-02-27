import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import ViewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';
import {
  recentTripSearches,
  carReservation,
  flightReservation,
  dayOfTravelContactInfo,
  searchRequest,
  carCanceled,
  viewForSameDayPage
} from 'src/viewReservation/reducers/viewReservationReducers';
import CarReservationBuilder from 'test/builders/apiResponse/carReservationBuilder';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import CarCancelActionTypes from 'src/carCancel/actions/carCancelActionTypes';

describe('ViewReservationReducers', () => {
  context('recent trip searches', () => {
    it('should return the recentTripSearches when fetch recent trip search success and featureName is viewReservation', () => {
      const state = recentTripSearches(null, {
        type: SharedActionTypes.SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS,
        payload: {
          featureName: 'viewReservation',
          recentTripSearches: [
            {
              firstName: 'Tom',
              lastName: 'Jones',
              recordLocator: 'UNGJ23'
            },
            {
              firstName: 'Andy',
              lastName: 'Thomas',
              recordLocator: 'UH2GHW'
            }
          ]
        }
      });

      expect(state).to.be.deep.equal([
        {
          firstName: 'Tom',
          lastName: 'Jones',
          recordLocator: 'UNGJ23'
        },
        {
          firstName: 'Andy',
          lastName: 'Thomas',
          recordLocator: 'UH2GHW'
        }
      ]);
    });

    it('should return the original value when fetch recent trip search success and featureName is not viewReservation', () => {
      const state = recentTripSearches(
        [
          {
            firstName: 'Tim',
            lastName: 'Duncan',
            recordLocator: 'FX234X'
          }
        ],
        {
          type: SharedActionTypes.SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS,
          payload: {
            featureName: 'noviewReservation',
            recentTripSearches: [
              {
                firstName: 'Tom',
                lastName: 'Jones',
                recordLocator: 'UNGJ23'
              },
              {
                firstName: 'Andy',
                lastName: 'Thomas',
                recordLocator: 'UH2GHW'
              }
            ]
          }
        }
      );

      expect(state).to.be.deep.equal([
        {
          firstName: 'Tim',
          lastName: 'Duncan',
          recordLocator: 'FX234X'
        }
      ]);
    });

    it('should return the default value when init', () => {
      const state = recentTripSearches(undefined, {});

      expect(state).to.be.deep.equal([]);
    });

    it('should return default state when action is undefined', () => {
      expect(recentTripSearches()).to.deep.equal([]);
    });
  });

  context('car reservation', () => {
    it('should return car reservation when SAVE_CAR_RESERVATION action called', () => {
      const action = {
        type: ViewReservationActionTypes.VIEW_RESERVATION__SAVE_CAR_RESERVATION,
        reservation: new CarReservationBuilder().build()
      };
      const state = carReservation(undefined, action);

      expect(state).to.be.deep.equal(action.reservation);
    });

    it('should return car reservation when VIEW_RESERVATION__FETCH_CAR_RESERVATION_SUCCESS action called', () => {
      const action = {
        type: ViewReservationActionTypes.VIEW_RESERVATION__FETCH_CAR_RESERVATION_SUCCESS,
        response: new CarReservationBuilder().build()
      };
      const state = carReservation(undefined, action);

      expect(state).to.be.deep.equal(action.response);
    });

    it('should return the default value when init', () => {
      const state = carReservation(undefined, {});

      expect(state).to.be.deep.equal({});
    });

    it('should return default state when action is undefined', () => {
      expect(carReservation()).to.deep.equal({});
    });
  });

  context('search reservation', () => {
    it('should return car reservation when SAVE_CAR_RESERVATION action called', () => {
      const action = {
        type: ViewReservationActionTypes.VIEW_RESERVATION__SAVE_SEARCH_REQUEST,
        searchRequest: {
          recordLocator: 'ABC123',
          firstName: 'Yang',
          lastName: 'Zeng'
        }
      };
      const state = searchRequest(undefined, action);

      expect(state).to.be.deep.equal(action.searchRequest);
    });

    it('should return the default value when init', () => {
      const state = searchRequest(undefined, {});

      expect(state).to.be.deep.equal({});
    });

    it('should return default state when action is undefined', () => {
      expect(searchRequest()).to.deep.equal({});
    });
  });

  context('flight reservation', () => {
    it('should return flight reservation when VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS action called', () => {
      const action = {
        type: ViewReservationActionTypes.VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
        response: new ViewReservationBuilder().build()
      };
      const state = flightReservation(undefined, action);

      expect(state).to.be.deep.equal(action.response);
    });

    it('should return the empty object when VIEW_RESERVATION__CLEAR_FLIGHT_RESERVATION action called', () => {
      const action = {
        type: ViewReservationActionTypes.VIEW_RESERVATION__CLEAR_FLIGHT_RESERVATION,
        response: new ViewReservationBuilder().build().isNonRevPnr
      };
      const state = flightReservation(undefined, action);

      expect(state).to.be.deep.equal({});
    });

    it('should return the default value when init', () => {
      const state = flightReservation(undefined, {});

      expect(state).to.be.deep.equal({});
    });

    it('should return default state when action is undefined', () => {
      expect(flightReservation()).to.deep.equal({});
    });
  });

  context('day of travel contact info', () => {
    it('should return contact information when VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO_SUCCESS action called', () => {
      const action = {
        type: ViewReservationActionTypes.VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO_SUCCESS,
        response: new ViewReservationBuilder().withDayOfTravelContactInfo().build()
      };
      const state = dayOfTravelContactInfo(undefined, action);

      expect(state).to.be.deep.equal(action.response);
    });

    it('should return {} when firing initial action', () => {
      const action = {
        type: ViewReservationActionTypes.VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO,
        response: new ViewReservationBuilder().withDayOfTravelContactInfo().build()
      };
      const state = dayOfTravelContactInfo(undefined, action);

      expect(state).to.be.deep.equal({});
    });

    it('should return the default value when init', () => {
      const state = dayOfTravelContactInfo(undefined, {});

      expect(state).to.be.deep.equal({});
    });

    it('should return default state when action is undefined', () => {
      expect(dayOfTravelContactInfo()).to.deep.equal({});
    });
  });

  context('car canceled', () => {
    it('should return true when CAR_CANCEL__FETCH_CAR_CANCEL_RESERVATION_SUCCESS action called', () => {
      const action = {
        type: CarCancelActionTypes.CAR_CANCEL__FETCH_CAR_CANCEL_RESERVATION_SUCCESS,
        response: 'response'
      };
      const state = carCanceled(undefined, action);

      expect(state).to.be.true;
    });

    it('should return false when VIEW_RESERVATION__FETCH_CAR_RESERVATION_SUCCESS action called', () => {
      const action = {
        type: ViewReservationActionTypes.VIEW_RESERVATION__FETCH_CAR_RESERVATION_SUCCESS,
        response: 'response'
      };
      const state = carCanceled(undefined, action);

      expect(state).to.be.false;
    });

    it('should return false as default value when init', () => {
      const state = carCanceled(undefined, {});

      expect(state).to.be.false;
    });

    it('should return default state when action is undefined', () => {
      expect(carCanceled()).to.deep.equal(false);
    });
  });

  describe('viewForSameDayPage', () => {
    it('should return contact information when VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS action called', () => {
      const action = {
        type: ViewReservationActionTypes.VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS,
        response: new ViewReservationBuilder().withViewForSameDayPage().build()
      };
      const state = viewForSameDayPage(undefined, action);

      expect(state).to.deep.equal(action.response);
    });

    it('should return {} when firing initial action', () => {
      const action = {
        type: ViewReservationActionTypes.VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO,
        response: new ViewReservationBuilder().withViewForSameDayPage().build()
      };
      const state = viewForSameDayPage(undefined, action);

      expect(state).to.deep.equal({});
    });

    it('should return the default value when init', () => {
      const state = viewForSameDayPage(undefined, {});

      expect(state).to.deep.equal({});
    });

    it('should return default state when action is undefined', () => {
      expect(viewForSameDayPage()).to.deep.equal({});
    });
  });
});
