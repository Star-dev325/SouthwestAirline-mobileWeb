import _ from 'lodash';
import Q from 'q';
import { sandbox } from 'sinon';

import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';
import CarReservationBuilder from 'test/builders/apiResponse/carReservationBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';
import CarBookingLocalStorageHelper from 'src/carBooking/helpers/carBookingLocalStorageHelper';
import * as SameDayActions from 'src/sameDay/actions/sameDayActions';
import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import * as AlternativeFormsOfPaymentActions from 'src/shared/actions/alternativeFormsOfPaymentActions';
import * as ReservationApi from 'src/shared/api/reservationApi';
import * as SameDayApi from 'src/shared/api/sameDayApi';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { transformResponseToViewReservationDetail } from 'src/shared/transformers/reservationTransformer';
import { retrieveFlightReservationErrorHandler } from 'src/viewReservation/actions/actionErrorHelper/viewReservationActionErrorHandler';
import * as ReservationDetailsTransformer from 'src/viewReservation/transformers/reservationDetailsTransformer';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';

import sameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import ViewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';

const sinon = sandbox.create();

const resetAlternativeFormsOfPaymentFakeActionType = {
  type: 'ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY_FAKE_TYPE'
};

const {
  VIEW_RESERVATION__SAVE_CAR_RESERVATION,
  VIEW_RESERVATION__CLEAR_FLIGHT_RESERVATION,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_FAILED,
  VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO,
  VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO_SUCCESS,
  VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO_FAILED,
  VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO,
  VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO_SUCCESS,
  VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO_FAILED,
  VIEW_RESERVATION__FETCH_CAR_RESERVATION,
  VIEW_RESERVATION__FETCH_CAR_RESERVATION_SUCCESS,
  VIEW_RESERVATION__FETCH_CAR_RESERVATION_FAILED,
  VIEW_RESERVATION__SAVE_SEARCH_REQUEST,
  VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION,
  VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_SUCCESS,
  VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_FAILED,
  VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION,
  VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS,
  VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_FAILED,
  VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS,
  VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO,
  VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS,
  VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_FAILED
} = ViewReservationActionTypes;

const {
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_FAILED,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  SAME_DAY__RESET_FLOW_DATA
} = sameDayActionTypes;

const mockStore = createMockStore();

describe('ViewReservationActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    sinon.stub(CarBookingLocalStorageHelper, 'getCarLocations').returns({ locations: [] });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('saveCarReservation', () => {
    it('should create action to save car reservation', () => {
      const reservation = new CarReservationBuilder().build();
      const expectedActions = [
        {
          type: VIEW_RESERVATION__SAVE_CAR_RESERVATION,
          reservation
        }
      ];

      store.dispatch(ViewReservationActions.saveCarReservation(reservation));

      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('retrieveFlightReservation', () => {
    let viewReservationViewPage;
    let searchRequest;
    let satelliteTrackStub;

    beforeEach(() => {
      viewReservationViewPage = new ViewReservationBuilder().build();
      searchRequest = {
        recordLocator: 'PNR123',
        firstName: 'Fred',
        lastName: 'Flintstone'
      };
      satelliteTrackStub = sinon.stub(window._satellite, 'track');
    });

    it('should create action to save flight reservation', async () => {
      sinon.stub(ReservationApi, 'retrieveReservation').returns(Q(viewReservationViewPage));
      const expectedActions = [
        {
          type: VIEW_RESERVATION__SAVE_SEARCH_REQUEST,
          searchRequest
        },
        {
          type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
          isFetching: false,
          response: transformResponseToViewReservationDetail(viewReservationViewPage)
        }
      ];

      await store.dispatch(
        ViewReservationActions.retrieveFlightReservation({ companionInfo: {}, isLoggedIn: false, ...searchRequest })
      );
      expect(satelliteTrackStub).to.be.calledWith('BoardingPass Details');
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should not create action to save flight reservation withSearchToken', async () => {
      searchRequest = { passengerSearchToken: 'ae!saferfa' };
      sinon.stub(ReservationApi, 'retrieveReservation').returns(Q(viewReservationViewPage));
      const expectedActions = [
        {
          type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
          isFetching: false,
          response: transformResponseToViewReservationDetail(viewReservationViewPage)
        }
      ];

      await store.dispatch(
        ViewReservationActions.retrieveFlightReservation({ companionInfo: {}, isLoggedIn: false, ...searchRequest })
      );
      expect(satelliteTrackStub).to.be.calledWith('BoardingPass Details');
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should contain action for page load complete', async () => {
      const dispatchPageLoadComplete = {
        dispatchPageLoadComplete: {
          location: {
            pathname: 'somepath'
          },
          action: 'POP'
        }
      };

      sinon.stub(ReservationApi, 'retrieveReservation').returns(Q(viewReservationViewPage));
      const expectedActions = [
        {
          type: VIEW_RESERVATION__SAVE_SEARCH_REQUEST,
          searchRequest
        },
        {
          type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
          isFetching: false,
          response: transformResponseToViewReservationDetail(viewReservationViewPage)
        },
        {
          type: 'PAGE_LOAD_COMPLETED',
          location: dispatchPageLoadComplete.location,
          method: dispatchPageLoadComplete.action
        }
      ];

      await store.dispatch(
        ViewReservationActions.retrieveFlightReservation({
          companionInfo: {},
          isLoggedIn: false,
          ...searchRequest,
          dispatchPageLoadComplete
        })
      );

      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should dispatch VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_FAILED with error handler when api failed', async () => {
      const customizedError = new Error();

      sinon.stub(ReservationApi, 'retrieveReservation').returns(Q.reject(customizedError));
      const expectedActions = [
        {
          type: VIEW_RESERVATION__SAVE_SEARCH_REQUEST,
          searchRequest
        },
        {
          type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_FAILED,
          isFetching: false,
          error: customizedError
        }
      ];

      await store.dispatch(
        ViewReservationActions.retrieveFlightReservation({ companionInfo: {}, isLoggedIn: false, ...searchRequest })
      );

      expect(store.getActions()).to.deep.equal(expectedActions);
      expect(store.getActions()[2].error.errorHandler).to.be.equal(retrieveFlightReservationErrorHandler);
    });

    it('should store the message key for analytics', async () => {
      expect(window.data_a.message).to.deep.equal({ customer: 'test', customerdisplay: '1' });
    });
  });

  describe('retrieveDayOfTravelContactInformation', () => {
    let contactInformation;
    let request;

    beforeEach(() => {
      contactInformation = new ViewReservationBuilder().withDayOfTravelContactInfo().build();
      request = {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/M74H4J',
        method: 'GET',
        query: {
          'passenger-search-token':
            'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxdPT1CfUytc4KQXjgW3M4a0OID9lLp_nGqB2ljpAsO4QjYmrjId8m36Ie5mNJi1q5gLD7OmjXH8GqaKJBXocvM7jq8onB986M34zVH6ZurQ=='
        }
      };
    });

    it('should create action to save day of travel contact information', async () => {
      sinon.stub(ReservationApi, 'retrieveDayOfTravelContactInformation').returns(Q(contactInformation));
      const expectedActions = [
        {
          type: VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO,
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO_SUCCESS,
          isFetching: false,
          response: contactInformation
        }
      ];

      await store.dispatch(ViewReservationActions.retrieveDayOfTravelContactInformation(request));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should dispatch VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO_FAILED when api failed', async () => {
      const customizedError = new Error();

      sinon.stub(ReservationApi, 'retrieveDayOfTravelContactInformation').returns(Q.reject(customizedError));
      const expectedAction = {
        type: VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO_FAILED,
        isFetching: false,
        error: customizedError
      };

      await store.dispatch(ViewReservationActions.retrieveDayOfTravelContactInformation(request)).catch(() => {
        expect(store.getActions()[1]).to.deep.equal(expectedAction);
      });
    });
    describe('retrieveDayOfTravelContactInformationWithSearchToken', () => {
      let viewReservationViewPage;

      it('should retrieve contact information from chapi', async () => {
        const searchToken = 'ae!sdfaee';

        viewReservationViewPage = new ViewReservationBuilder().withDayOfTravelContactInfo().build();
        sinon.stub(ReservationApi, 'retrieveReservation').returns(Q(viewReservationViewPage));

        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
        const response = { passengerName: 'Amber Awesome' };

        sinon.stub(ReservationApi, 'retrieveTravelInformation').resolves(response);

        await store.dispatch(ViewReservationActions.retrieveDayOfTravelContactInformationWithSearchToken(searchToken));

        expect(ReservationApi.retrieveReservation).to.be.called;
        expect(store.getActions()).to.deep.equal([
          {
            type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
            isFetching: true
          },
          {
            type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
            isFetching: false,
            response: transformResponseToViewReservationDetail(viewReservationViewPage)
          },
          {
            isFetching: true,
            type: "VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO"
          }
        ]);
      });
    });
  });

  describe('updateDayOfTravelContactInformation', () => {
    let request;
    let searchToken;

    beforeEach(() => {
      request = {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/M74H4J',
        method: 'POST',
        body: {
          contactInformation: {
            passengerSearchToken:
              '9N-2TiodX6GUHo0qf9tvob0Ygx_V0iMDEX1pXIkre9S7r7NKn4wAk_GUdhULuxXcKxaykabXzQnV_DnjDja9rn7bZU_RXy28p5R8Y1zMO7P9lFE2BMj0y22ajFkSNzprt8tjbyWEBhOOVYGrVA==',
            contactInfoToken:
              'eyJjb250YWN0RW1haWxFeGlzdHMiOmZhbHNlLCJjb250YWN0UGhvbmVFeGlzdHMiOmZhbHNlLCJjb250YWN0VGV4dE1lc3NhZ2VQaG9uZUV4aXN0cyI6dHJ1ZX0=',
            contactEmail: null,
            contactPhone: null,
            contactTextMessagePhone: {
              countryCode: '1',
              number: '4694893989',
              preferredLanguage: 'EN'
            },
            internationalDeclineNotifications: false
          }
        }
      };
      searchToken = 'a!eewrsfd';
    });

    it('should dispatch correct actions when successful call', async () => {
      sinon.stub(ReservationApi, 'updateDayOfTravelContactInformation').resolves();
      const expectedActions = [
        {
          type: VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO,
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO_SUCCESS,
          isFetching: false
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: [],
            method: 'goBack'
          }
        }
      ];

      await store.dispatch(ViewReservationActions.updateDayOfTravelContactInformation(request));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should not dispatch goBack when successful call with searchToken', async () => {
      sinon.stub(ReservationApi, 'updateDayOfTravelContactInformation').resolves();
      const expectedActions = [
        {
          type: VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO,
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO_SUCCESS,
          isFetching: false
        }
      ];

      await store.dispatch(ViewReservationActions.updateDayOfTravelContactInformation(request, searchToken));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should dispatch VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO_FAILED when api failed', async () => {
      const customizedError = new Error();

      sinon.stub(ReservationApi, 'updateDayOfTravelContactInformation').returns(Q.reject(customizedError));
      const expectedAction = {
        type: VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO_FAILED,
        isFetching: false,
        error: customizedError
      };

      await store.dispatch(ViewReservationActions.updateDayOfTravelContactInformation(request)).catch(() => {
        expect(store.getActions()[1]).to.deep.equal(expectedAction);
      });
    });

    it('should dispatch correct actions and TransitionToViewReservationDetailPage with searchToken', async () => {
      sinon.stub(ReservationApi, 'updateDayOfTravelContactInformation').resolves();
      const expectedActions = [
        {
          type: VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO,
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO_SUCCESS,
          isFetching: false
        },
        {
          payload: {
            args: [
              '/?searchToken=a!eewrsfd'
            ],
            'method': 'replace'
          },
          'type': '@@router/CALL_HISTORY_METHOD'
        }
      ];

      await store.dispatch(ViewReservationActions.updateDayOfTravelContactInformationAndTransitionToViewReservationDetailPage(request, searchToken));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should dispatch VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO_FAILED when api failed with TransitionToViewReservationDetailPage', async () => {
      const customizedError = new Error();

      sinon.stub(ReservationApi, 'updateDayOfTravelContactInformation').returns(Q.reject(customizedError));
      const expectedAction = {
        type: VIEW_RESERVATION__UPDATE_DAY_OF_TRAVEL_CONTACT_INFO_FAILED,
        isFetching: false,
        error: customizedError
      };

      await store.dispatch(ViewReservationActions.updateDayOfTravelContactInformationAndTransitionToViewReservationDetailPage(request, searchToken)).catch(() => {
        expect(store.getActions()[1]).to.deep.equal(expectedAction);
      });
    });
  });

  describe('retrieveCarReservation', () => {
    let reservation;
    const request = {
      firstName: 'Yang',
      lastName: 'Zeng',
      pickupDate: '2018-10-24'
    };

    beforeEach(() => {
      reservation = new CarReservationBuilder().build();
      sinon.stub(WcmActions, 'retrieveCarVendorImages').returns({
        type: 'FAKE_WCM_ACTION'
      });
    });

    it('should create action to save car reservation', async () => {
      sinon.stub(ReservationApi, 'retrieveCarReservation').returns(Q(reservation));
      sinon.stub(ReservationDetailsTransformer, 'transformRetrieveCarReservationApiResponse').returns(reservation);
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
      const expectedActions = [
        {
          type: VIEW_RESERVATION__FETCH_CAR_RESERVATION,
          isFetching: true
        },
        {
          type: 'FAKE_WCM_ACTION'
        },
        {
          type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS',
          isFetching: true
        },
        {
          type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS_SUCCESS',
          response: { locations: [] },
          isFetching: false
        },
        {
          type: VIEW_RESERVATION__FETCH_CAR_RESERVATION_SUCCESS,
          isFetching: false,
          response: reservation
        }
      ];

      await store.dispatch(ViewReservationActions.retrieveCarReservation(request));

      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should dispatch VIEW_RESERVATION__FETCH_CAR_RESERVATION_FAILED when api failed', async () => {
      sinon.stub(ReservationApi, 'retrieveCarReservation').returns(Q.reject('error'));

      await store.dispatch(ViewReservationActions.retrieveCarReservation(request)).catch(() => {
        const errorHandler = sinon.spy(store.getActions()[4].error, 'errorHandler');

        errorHandler();

        expect(store.getActions()[4]).to.deep.equal({
          type: VIEW_RESERVATION__FETCH_CAR_RESERVATION_FAILED,
          isFetching: false,
          error: {
            errMsg: 'errMsg',
            errorHandler
          }
        });
      });
    });
  });

  describe('retrieveCarReservationAndTransitionToCarDetailPage', () => {
    let reservation;
    const request = {
      firstName: 'Yang',
      lastName: 'Zeng',
      pickupDate: '2018-10-24'
    };

    beforeEach(() => {
      reservation = new CarReservationBuilder().build();
      sinon.stub(WcmActions, 'retrieveCarVendorImages').returns({
        type: 'FAKE_WCM_ACTION'
      });
    });

    it('should create action to retrieve car reservation and push to car detail page', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
      sinon.stub(ReservationApi, 'retrieveCarReservation').returns(Q(reservation));
      sinon.stub(ReservationDetailsTransformer, 'transformRetrieveCarReservationApiResponse').returns(reservation);
      const expectedActions = [
        {
          type: VIEW_RESERVATION__FETCH_CAR_RESERVATION,
          isFetching: true
        },
        {
          type: 'FAKE_WCM_ACTION'
        },
        {
          type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS',
          isFetching: true
        },
        {
          type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS_SUCCESS',
          response: { locations: [] },
          isFetching: false
        },
        {
          type: VIEW_RESERVATION__FETCH_CAR_RESERVATION_SUCCESS,
          isFetching: false,
          response: reservation
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            args: ['/car/manage-reservation/view.html'],
            method: 'push'
          }
        }
      ];

      await store.dispatch(ViewReservationActions.retrieveCarReservationAndTransitionToCarDetailPage(request));

      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('retrieveCarReservationWithSearchToken', () => {
    let reservation;
    
    beforeEach(() => {
      reservation = new CarReservationBuilder().build();
      sinon.stub(WcmActions, 'retrieveCarVendorImages').returns({
        type: 'FAKE_WCM_ACTION'
      });
    });

    it('should create action to retrieve car reservation and push to car detail page with searchToken', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
      sinon.stub(ReservationApi, 'retrieveCarReservation').returns(Q(reservation));
      sinon.stub(ReservationDetailsTransformer, 'transformRetrieveCarReservationApiResponse').returns(reservation);
      const expectedActions = [
        {
          type: VIEW_RESERVATION__FETCH_CAR_RESERVATION,
          isFetching: true
        },
        {
          type: 'FAKE_WCM_ACTION'
        },
        {
          type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS',
          isFetching: true
        },
        {
          type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS_SUCCESS',
          response: { locations: [] },
          isFetching: false
        },
        {
          type: VIEW_RESERVATION__FETCH_CAR_RESERVATION_SUCCESS,
          isFetching: false,
          response: reservation
        }
      ];

      await store.dispatch(ViewReservationActions.retrieveCarReservationWithSearchToken('safasd!sasdgasdgsadgagasdkjkhakjnkkj'));

      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('clearFlightReservation', () => {
    it('should create action to clear flight reservation', () => {
      const expectedActions = [
        {
          type: VIEW_RESERVATION__CLEAR_FLIGHT_RESERVATION
        }
      ];

      store.dispatch(ViewReservationActions.clearFlightReservation());

      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('retrieveTravelInformation', () => {
    let editPNRPassengerLink;
    const recordLocator = 'PPUWKZ';

    beforeEach(() => {
      editPNRPassengerLink = {
        href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
        method: 'GET',
        query: { 'first-name': 'AGE', 'last-name': 'PASSENGER', 'passenger-reference': '2' }
      };
    });

    it('should retrieve travel information from chapi', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
      const response = { passengerName: 'Amber Awesome' };

      sinon.stub(ReservationApi, 'retrieveTravelInformation').resolves(response);

      await store.dispatch(ViewReservationActions.retrieveTravelInformation(editPNRPassengerLink, recordLocator, null, true));

      expect(ReservationApi.retrieveTravelInformation).to.be.called;
      expect(store.getActions()).to.deep.equal([
        {
          type: VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION,
          request: {
            editPNRPassengerLink
          },
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_SUCCESS,
          response,
          isFetching: false
        },
        {
          selected: false,
          type: 'SPECIAL_ASSISTANCE_SELECTED'
        },
        {
          payload: {
            args: [
              {
                pathname: '/air/manage-reservation/traveler-information.html',
                search: '?passengerReference=2',
                state: {
                  firstName: 'AGE',
                  lastName: 'PASSENGER',
                  recordLocator: 'PPUWKZ'
                }
              }
            ],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should retrieve travel information with searchToken from chapi', async () => {
      const searchToken = 'ae!erdsf';

      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
      const response = { passengerName: 'Amber Awesome' };

      sinon.stub(ReservationApi, 'retrieveTravelInformation').resolves(response);

      await store.dispatch(ViewReservationActions.retrieveTravelInformation(editPNRPassengerLink, recordLocator, searchToken, true));

      expect(ReservationApi.retrieveTravelInformation).to.be.called;
      expect(store.getActions()[3]).to.deep.equal(
        {
          payload: {
            args: [
              {
                pathname: '/air/manage-reservation/traveler-information.html',
                search: "?passengerReference=2&searchToken=ae!erdsf",
                state: {
                  firstName: 'AGE',
                  lastName: 'PASSENGER',
                  recordLocator: 'PPUWKZ'
                }
              }
            ],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      );
    });

    it('should catch error and trigger failed action when chapi call fails', async () => {
      const error = { error: 'something bad happened' };

      sinon.stub(ReservationApi, 'retrieveTravelInformation').rejects(error);

      await store.dispatch(ViewReservationActions.retrieveTravelInformation(editPNRPassengerLink, recordLocator));

      expect(ReservationApi.retrieveTravelInformation).to.be.called;
      expect(store.getActions()).to.deep.equal([
        {
          type: VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION,
          request: {
            editPNRPassengerLink
          },
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_FAILED,
          isFetching: false,
          error
        }
      ]);
    });

    describe('retrieveFlightAndTravelInformationWithSearchToken', () => {
      let viewReservationViewPage;

      it('should retrieve travel information from chapi', async () => {
        const searchToken = 'ae!sdfaee';

        viewReservationViewPage = new ViewReservationBuilder().build();
        sinon.stub(ReservationApi, 'retrieveReservation').returns(Q(viewReservationViewPage));

        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
        const response = { passengerName: 'Amber Awesome' };

        sinon.stub(ReservationApi, 'retrieveTravelInformation').resolves(response);

        await store.dispatch(ViewReservationActions.retrieveFlightAndTravelInformationWithSearchToken(searchToken, 2));

        expect(ReservationApi.retrieveReservation).to.be.called;
        expect(store.getActions()).to.deep.equal([
          {
            type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
            isFetching: true
          },
          {
            type: VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
            isFetching: false,
            response: transformResponseToViewReservationDetail(viewReservationViewPage)
          }
        ]);
      });
    });
  });

  describe('saveTravelInformation', () => {
    let editNamesSuccessfulUpdateMessage;
    let updateTravelInformationLink;
    let pnr;
    let searchToken;

    beforeEach(() => {
      editNamesSuccessfulUpdateMessage = 'Edit Name Success Popup Message';
      updateTravelInformationLink = {
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
          firstName: 'Test',
          lastName: 'Tester',
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
      pnr = {
        firstName: 'Test',
        lastName: 'Tester',
        recordLocator: 'TEST00'
      };
      searchToken = 'a1werfsadg';
    });

    it('should save travel information (no name edit)', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
      const response = {};

      sinon.stub(ReservationApi, 'updateTravelInformation').resolves(response);

      await store.dispatch(ViewReservationActions.saveTravelInformation({ updateTravelInformationLink, pnr }));
      expect(ReservationApi.updateTravelInformation).to.be.called;
      expect(store.getActions()).to.deep.equal([
        {
          type: VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION,
          isFetching: true,
          request: updateTravelInformationLink
        },
        {
          type: VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS,
          response: {
            newName: {
              firstName: 'Test',
              lastName: 'Tester',
              middleName: undefined
            },
            response: {}
          },
          isFetching: false
        },
        {
          selected: false,
          type: 'SPECIAL_ASSISTANCE_SELECTED'
        },
        {
          payload: {
            args: [
              '/air/manage-reservation/view.html',
              {
                firstName: pnr.firstName,
                lastName: pnr.lastName,
                hasEditedName: false,
                passengerSearchToken: null,
                recordLocator: 'TEST00'
              }
            ],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should save travel information (no name edit) with searchToken', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
      const response = {};

      sinon.stub(ReservationApi, 'updateTravelInformation').resolves(response);

      await store.dispatch(ViewReservationActions.saveTravelInformation({ updateTravelInformationLink, pnr, searchToken }));
      expect(ReservationApi.updateTravelInformation).to.be.called;
      expect(store.getActions()[3]).to.deep.equal(
        {
          payload: {
            args: [
              "/air/manage-reservation/view.html?searchToken=a1werfsadg",
              {
                firstName: pnr.firstName,
                lastName: pnr.lastName,
                hasEditedName: false,
                passengerSearchToken: null,
                recordLocator: 'TEST00'
              }
            ],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      );
    });

    it('should catch error and trigger failed action when chapi call fails', async () => {
      const error = { error: 'something bad happened' };

      sinon.stub(ReservationApi, 'updateTravelInformation').rejects(error);

      await store.dispatch(ViewReservationActions.saveTravelInformation({ updateTravelInformationLink, pnr }));

      expect(ReservationApi.updateTravelInformation).to.be.called;
      expect(store.getActions()).to.deep.equal([
        {
          type: VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION,
          isFetching: true,
          request: updateTravelInformationLink
        },
        {
          type: VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_FAILED,
          isFetching: false,
          error
        }
      ]);
    });

    context('dialog and push routing', () => {
      let response;

      beforeEach(() => {
        response = {};
        sinon.stub(ReservationApi, 'updateTravelInformation').resolves(response);
      });

      it('should show dialog (which routes with state hasEditedName & passengerSearchToken) when editNamesSuccessfulUpdateMessage param is not null', async () => {
        const hasEditedName = true;
        const passengerSearchToken = 'token42';

        _.set(response, 'editPNRPassengerUpdate._links.viewReservationViewPage.query.has-edited-name', hasEditedName);
        _.set(
          response,
          'editPNRPassengerUpdate._links.viewReservationViewPage.query.passenger-search-token',
          passengerSearchToken
        );

        await store.dispatch(
          ViewReservationActions.saveTravelInformation({
            updateTravelInformationLink,
            pnr,
            editNamesSuccessfulUpdateMessage
          })
        );

        const actionsLength = store.getActions().length;
        const routingAction = store.getActions()[actionsLength - 1];
        const routingActionWithoutPopupButtons = _.omit(routingAction, 'options.buttons');

        expect(routingActionWithoutPopupButtons).to.deep.equal({
          type: 'TOGGLE_DIALOG',
          isShowDialog: true,
          options: {
            active: true,
            name: 'edit-name-success-popup',
            message: 'Edit Name Success Popup Message'
          }
        });
      });

      it('should call route with hasEditedName false and passengerSearchToken null and not show dialog when editNamesSuccessfulUpdateMessage is null', async () => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
        await store.dispatch(ViewReservationActions.saveTravelInformation({ updateTravelInformationLink, pnr }));

        const actionsLength = store.getActions().length;
        const routingAction = store.getActions()[actionsLength - 1];

        expect(routingAction).to.deep.equal({
          payload: {
            args: [
              '/air/manage-reservation/view.html',
              {
                firstName: pnr.firstName,
                lastName: pnr.lastName,
                hasEditedName: false,
                passengerSearchToken: null,
                recordLocator: 'TEST00'
              }
            ],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        });
      });
    });
  });

  describe('updateTravelInformationForAnalytics', () => {
    it('should save travel information request', () => {
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

      store.dispatch(ViewReservationActions.updateTravelInformationForAnalytics(saveTravelInformationRequest));

      expect(store.getActions()).to.deep.equal([
        {
          type: VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS,
          saveTravelInformationRequest
        }
      ]);
    });
  });

  describe('retrieveSameDayBoundInformation', () => {
    const {
      viewReservationViewPage: { viewForSameDayPage }
    } = new ViewReservationBuilder().withViewForSameDayPage().build();
    const request = {
      href: '/v1/mobile-air-operations/page/same-day/28DIXX',
      method: 'POST',
      body: {
        passengerSearchToken:
          'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2pZxX0k1GtpcWb28okHxM9yEPt6Nic3LbR1NTQyTsl8afOXxewf1G8B-8J2fgRo_UX0MlsMY7SOtlJmbg=='
      }
    };

    it('should create action to save', async () => {
      const expectedActions = [
        {
          type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
        },
        {
          type: VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO,
          isFetching: true
        },
        {
          type: SAME_DAY__RESET_FLOW_DATA
        },
        { type: 'SET_FLOW_STATUS', flowName: 'sameDay', status: 'initial' },
        { type: 'SET_FLOW_STATUS', flowName: 'sameDay', status: 'in_progress' },
        {
          type: VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS,
          isFetching: false,
          response: viewForSameDayPage
        }
      ];

      sinon.stub(SameDayApi, 'retrieveSameDayBoundInformation').returns(Q({ viewForSameDayPage }));

      await store.dispatch(ViewReservationActions.retrieveSameDayBoundInformation(request));
      expect(store.getActions().length).to.equal(expectedActions.length);
    });

    it('should create action to save when showBoundSelection is false', async () => {
      sinon.stub(SameDayApi, 'retrieveSameDayShoppingInformation').returns(Q({}));
      const {
        viewReservationViewPage: { viewForSameDayPage }
      } = new ViewReservationBuilder().withViewForSameDayPageFalseBoundSelection().build();
      const expectedActions = [
        {
          type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY
        },
        {
          type: VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO,
          isFetching: true
        },
        {
          type: SAME_DAY__RESET_FLOW_DATA
        },
        { type: 'SET_FLOW_STATUS', flowName: 'sameDay', status: 'initial' },
        { type: 'CLEAR_FORM_DATA_BY_ID', exactMatch: true, formId: 'SAME_DAY_SORT_FILTER_FORM' },
        {
          type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
          isFetching: true
        },
        { type: 'SET_FLOW_STATUS', flowName: 'sameDay', status: 'initial' },
        {
          type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_FAILED,
          isFetching: true
        },
        {
          type: VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS,
          isFetching: false,
          response: viewForSameDayPage
        },
        { type: 'SET_FLOW_STATUS', flowName: 'sameDay', status: 'in_progress' }
      ];

      sinon.stub(SameDayApi, 'retrieveSameDayBoundInformation').returns(Q({ viewForSameDayPage }));

      await store.dispatch(ViewReservationActions.retrieveSameDayBoundInformation(request));
      expect(store.getActions().length).to.equal(expectedActions.length);
    });

    it('should pass the replace parameter through when retrieving same day information', async () => {
      const retrieveSameDayShoppingInformationMethodMock = sinon.spy(
        SameDayActions,
        'retrieveSameDayShoppingInformationMethod'
      );
      const {
        viewReservationViewPage: { viewForSameDayPage }
      } = new ViewReservationBuilder().withViewForSameDayPageFalseBoundSelection().build();

      sinon.stub(SameDayApi, 'retrieveSameDayShoppingInformation').returns(Q({}));
      sinon.stub(SameDayApi, 'retrieveSameDayBoundInformation').returns(Q({ viewForSameDayPage }));

      await store.dispatch(ViewReservationActions.retrieveSameDayBoundInformation(request, true));

      expect(retrieveSameDayShoppingInformationMethodMock).to.have.been.calledWith(viewForSameDayPage, 0, true);
    });

    it('should dispatch VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_FAILED when api failed', async () => {
      const customizedError = new Error();
      const expectedAction = {
        type: VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_FAILED,
        error: customizedError
      };

      sinon.stub(SameDayApi, 'retrieveSameDayBoundInformation').returns(Q.reject(customizedError));

      await store.dispatch(ViewReservationActions.retrieveSameDayBoundInformation(request)).catch(() => {
        expect(store.getActions()[1]).to.deep.equal(expectedAction);
      });
    });

    it('should dispatch VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_FAILED when api failed with error handler', (done) => {
      const customizedError = new Error();

      const resetAlternativeFormsOfPaymentStub = sinon
        .stub(AlternativeFormsOfPaymentActions, 'resetAlternativeFormsOfPayment')
        .returns(resetAlternativeFormsOfPaymentFakeActionType);

      sinon.stub(SameDayApi, 'retrieveSameDayBoundInformation').returns(Q.reject(customizedError));

      store.dispatch(ViewReservationActions.retrieveSameDayBoundInformation(request)).finally(() => {
        expect(resetAlternativeFormsOfPaymentStub).to.have.been.called;
        done();
      });
    });

    it('should call shouldRedirectToHomePage when API call fails', async () => {
      const customizedError = new Error();
      const expectedAction = {
        type: VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_FAILED,
        error: customizedError
      };
      const shouldRedirectToHomePageMock = sinon.spy(SameDayActions, 'shouldRedirectToHomePage');

      sinon.stub(SameDayApi, 'retrieveSameDayBoundInformation').returns(Q.reject(customizedError));

      await store.dispatch(ViewReservationActions.retrieveSameDayBoundInformation(request)).catch(() => {
        expect(store.getActions()[1]).to.deep.equal(expectedAction);
        expect(shouldRedirectToHomePageMock).to.have.been.called;
      });
    });
  });
});
