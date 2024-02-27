jest.mock('src/shared/api/checkInApi', () => ({
  retrieveReservationDetailWithLink: jest.fn().mockImplementation(() => Promise.resolve({
    checkInViewReservationPage: { 
      _links: { 
        travelDocuments: [{
          href: '',
          method: 'POST',
          body: '',
          meta: {
            missingDocuments: [],
            destinationConfig: {}
          }
        }]
      },
      pnr: {
        confirmationNumber: 'LKLMBO'
      }
    }
  })),
  retrieveReservationDetail: jest.fn().mockImplementation(() => Promise.resolve({
    checkInViewReservationPage: {
      pnr: { confirmationNumber: '123PNR' }
    }
  })),
  checkInPassenger: jest.fn(() => Promise.resolve({
    checkInConfirmationPage: {
      flights: [{ boundIndex: 0 }],
      _links: {
        viewBoardingPassIssuance: {}
      }
    }
  })),
  retrieveBoardingPass: jest.fn(),
  addTravelDocuments: jest.fn(() => () => Promise.resolve())
}));
jest.mock('src/shared/helpers/browserObject', () => ({ location: { pathname: '/air/check-in/', search: '' } }));
jest.mock('src/wcm/actions/wcmActions', () => ({
  getPlacements: jest.fn().mockImplementation(() => () => Promise.resolve({
    test: 'content'
  }))
}));

import * as connectedReactRouter from 'connected-react-router';
import _ from 'lodash';
import Q from 'q';
import * as CheckInActions from 'src/checkIn/actions/checkInActions';
import checkInActionTypes from 'src/checkIn/actions/checkInActionTypes';
import * as CheckInErrorHandlerHelper from 'src/checkIn/helpers/checkInErrorHandlerHelper';
import * as UpdateAPIsHelpers from 'src/checkIn/helpers/updateAPIsHelper';
import UpdateAPIsTransformers from 'src/checkIn/transformers/updateAPIsTransformer';
import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import * as DialogActions from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as CheckInApi from 'src/shared/api/checkInApi';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as ErrorHandlerHelper from 'src/shared/helpers/errorHandlerHelper';
import * as HapticFeedbackHelper from 'src/shared/helpers/hapticFeedbackHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import { CHECK_IN_CONFIRMATION_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import CheckInRetrieveBoardingPassBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInRetrieveBoardingPassBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';

const CheckInApiMock = jest.mocked(CheckInApi);
const mockStore = createMockStore();

describe('CheckInActions', () => {
  const {
    CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS,
    CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS_FAILED,
    CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS_SUCCESS,
    CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS,
    CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_FAILED,
    CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_SUCCESS,
    CHECK_IN__CLEAN_APIS_DATA,
    CHECK_IN__FETCH_BOARDING_PASS,
    CHECK_IN__FETCH_BOARDING_PASS_SUCCESS,
    CHECK_IN__FETCH_CONFIRMATION_PAGE,
    CHECK_IN__FETCH_CONFIRMATION_PAGE_FAILED,
    CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS,
    CHECK_IN__FETCH_CONFIRMATION_PAGE_SUCCESS,
    CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS,
    CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_FAILED,
    CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
    CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK,
    CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_FAILED,
    CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS,
    CHECK_IN__RESET_FLOW_DATA,
    CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL,
    CHECK_IN__UPDATE_APIS_DATA
  } = checkInActionTypes;
  
  const params = { key: 'value' };
  const segment = 'segment';
  const args = [{ mbox: AdobeTargetConstants.CHECK_IN_CONFIRMATION_UPGRADE_BUTTON, params }];

  let getMboxConfig;
  let getNextTravelPassengerTransitionInfoMock;
  let getSegmentsMock;
  let getTargetParamsMock;
  let store;

  beforeEach(() => {
    store = mockStore({});
    getNextTravelPassengerTransitionInfoMock = jest.spyOn(UpdateAPIsHelpers, 'getNextTravelPassengerTransitionInfo');
    getTargetParamsMock = jest.spyOn(AdobeTargetActions, 'getTargetParams').mockReturnValue(() => Promise.resolve(params));
    getMboxConfig = jest.spyOn(AdobeTargetActions, 'getMboxConfig').mockReturnValue(() => Promise.resolve(args));
    getSegmentsMock = jest.spyOn(AdobeTargetActions, 'getSegments').mockReturnValue(() => Promise.resolve(segment));
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('check-in');
    jest.spyOn(connectedReactRouter, 'push');
    jest.spyOn(DialogActions, 'showDialog').mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
    BrowserObject.location.search = '';
  });

  describe('fetch reserve check in C1B confirmation page', () => {
    const request = {
      href: '/v1/mobile-air-operations/page/check-in/LKLMBO',
      method: 'GET',
      query: {
        'first-name': 'TERESA',
        'last-name': 'KINTZEL',
        'passenger-search-token':
          'og7Gc2LKmSGVEXyiCoKYVkfuO07Thdh9H9r95D2PVFkdokZyOJ8CfZLBML_zQp2JH-DdBRFRsjcgKwWcRVnUq-PXW1q0J9R_FkkdHw3yr4JfZHTZ-mH97Q5CWcUu1oqEEJayVjTXDReNFRZG_doHMA=='
      }
    };

    const response = {
      checkInViewReservationPage: { 
        _links: { 
          travelDocuments: [{
            href: '',
            method: 'POST',
            body: '',
            meta: {
              missingDocuments: [],
              destinationConfig: {}
            }
          }]
        },
        pnr: {
          confirmationNumber: 'LKLMBO'
        }
      }
    };

    describe('domestic flight', () => {
      it('should push directly to check in confirmation page when domestic flight', async () => {
        BrowserObject.location.pathname = '/air/check-in';
        getNextTravelPassengerTransitionInfoMock.mockReturnValue({ nextPagePath: '/check-in/confirmation' });

        await store.dispatch(CheckInActions.getReserveCheckInReservationWithLink(request));

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__RESET_FLOW_DATA
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK,
            request,
            isFetching: true
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS,
            response,
            isFetching: false
          },
          {
            flowName: 'checkIn',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            payload: {
              args: ['/check-in/confirmation'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);

        expect(CheckInApi.retrieveReservationDetailWithLink).toHaveBeenCalledWith(request);
      });
    });

    describe('international flights', () => {
      it('should open passport page when international flight and user is missing passport or emergency contact', async () => {
        BrowserObject.location.pathname = '/air/check-in';
        getNextTravelPassengerTransitionInfoMock.mockReturnValue({ nextPaxNumber: '1', nextPagePath: '/check-in/1/passportPage' });
        await store.dispatch(CheckInActions.getReserveCheckInReservationWithLink(request));

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__RESET_FLOW_DATA
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK,
            request,
            isFetching: true
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS,
            response,
            isFetching: false
          },
          {
            flowName: 'checkIn',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            payload: {
              args: ['/check-in/1/passportPage'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });

      it('should open additional passport page when international flight and user is missing additional info', async () => {
        BrowserObject.location.pathname = '/air/check-in';
        getNextTravelPassengerTransitionInfoMock.mockReturnValue({
          nextPaxNumber: '1',
          nextPagePath: '/check-in/1/additional-passport-info'
        });
        await store.dispatch(CheckInActions.getReserveCheckInReservationWithLink(request));

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__RESET_FLOW_DATA
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK,
            request,
            isFetching: true
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS,
            response,
            isFetching: false
          },
          {
            flowName: 'checkIn',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            payload: {
              args: ['/check-in/1/additional-passport-info'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });

      it('should open passport page for second pax when international flight and user is missing passport or emergency contact', async () => {
        BrowserObject.location.pathname = '/air/check-in';
        getNextTravelPassengerTransitionInfoMock.mockReturnValue({ nextPaxNumber: '2', nextPagePath: '/check-in/2/passportPage' });
        await store.dispatch(CheckInActions.getReserveCheckInReservationWithLink(request));

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__RESET_FLOW_DATA
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK,
            request,
            isFetching: true
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS,
            response,
            isFetching: false
          },
          {
            flowName: 'checkIn',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            payload: {
              args: ['/check-in/2/passportPage'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });

      it('should open additional passport page for second pax when international flight and user is missing additional info', async () => {
        BrowserObject.location.pathname = '/air/check-in';
        getNextTravelPassengerTransitionInfoMock.mockReturnValue({
          nextPaxNumber: '2',
          nextPagePath: '/check-in/2/additional-passport-info'
        });
        await store.dispatch(CheckInActions.getReserveCheckInReservationWithLink(request));

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__RESET_FLOW_DATA
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK,
            request,
            isFetching: true
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS,
            response,
            isFetching: false
          },
          {
            flowName: 'checkIn',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            payload: {
              args: ['/check-in/2/additional-passport-info'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });

      it('should catch errors if the retrieveReservationDetailWithLink API call errors out.', () => {
        const customizedError = { message: 'error' };

        CheckInApiMock.retrieveReservationDetailWithLink.mockRejectedValue(customizedError);

        return store.dispatch(CheckInActions.getReserveCheckInReservationWithLink(request)).catch((error) => {
          expect(error).toEqual({ message: 'error' });
          expect(store.getActions()).toEqual([
            {
              type: CHECK_IN__RESET_FLOW_DATA
            },
            {
              type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK,
              request,
              isFetching: true
            },
            {
              payload: {
                args: ['/air/check-in/'],
                method: 'push'
              },
              type: '@@router/CALL_HISTORY_METHOD'
            },
            {
              error: customizedError,
              isFetching: false,
              type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_FAILED
            }
          ]);
        });
      });
    });
  });

  describe('fetch reserve check in reservation details', () => {
    const response = {
      checkInViewReservationPage: {
        pnr: { confirmationNumber: '123PNR' }
      }
    };

    it('should push directly to check in confirmation page when domestic flight', async () => {
      getNextTravelPassengerTransitionInfoMock.mockReturnValue({ nextPagePath: '/check-in/confirmation' });
      await store.dispatch(
        CheckInActions.getReserveCheckInReservation(
          { firstName: 'firstName', lastName: 'lastName', recordLocator: '123pnr' },
          false
        )
      );
      expect(store.getActions()).toEqual([
        {
          type: CHECK_IN__RESET_FLOW_DATA
        },
        {
          type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS,
          isFetching: true
        },
        {
          type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
          response,
          pnr: { firstName: 'firstName', lastName: 'lastName', recordLocator: '123PNR' },
          isFetching: false
        },
        {
          flowName: 'checkIn',
          status: 'in_progress',
          type: 'SET_FLOW_STATUS'
        },
        {
          payload: {
            args: ['/check-in/confirmation'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
      expect(CheckInApi.retrieveReservationDetail).toHaveBeenCalledWith({
        firstName: 'firstName',
        lastName: 'lastName',
        recordLocator: '123PNR'
      });
    });

    describe('international flights', () => {
      it('should open passport page when international flight and user is missing passport or emergency contact', async () => {
        BrowserObject.location.pathname = '/air/check-in';
        getNextTravelPassengerTransitionInfoMock.mockReturnValue({ nextPaxNumber: '1', nextPagePath: '/check-in/1/passportPage' });
        await store.dispatch(
          CheckInActions.getReserveCheckInReservation(
            { firstName: 'firstName', lastName: 'lastName', recordLocator: '123pnr' },
            false
          )
        );

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__RESET_FLOW_DATA
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS,
            isFetching: true
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
            response,
            pnr: { firstName: 'firstName', lastName: 'lastName', recordLocator: '123PNR' },
            isFetching: false
          },
          {
            flowName: 'checkIn',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            payload: {
              args: ['/check-in/1/passportPage'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });

      it('should open additional passport page when international flight and user is missing additional info', async () => {
        getNextTravelPassengerTransitionInfoMock.mockReturnValue({
          nextPaxNumber: '1',
          nextPagePath: '/check-in/:paxNumber/additional-passport-info'
        });
        await store.dispatch(
          CheckInActions.getReserveCheckInReservation(
            { firstName: 'firstName', lastName: 'lastName', recordLocator: '123pnr' },
            false
          )
        );

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__RESET_FLOW_DATA
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS,
            isFetching: true
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
            response,
            pnr: { firstName: 'firstName', lastName: 'lastName', recordLocator: '123PNR' },
            isFetching: false
          },
          {
            flowName: 'checkIn',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            payload: {
              args: ['/check-in/1/additional-passport-info'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });

      it('should open passport page for second pax when international flight and user is missing passport or emergency contact', async () => {
        getNextTravelPassengerTransitionInfoMock.mockReturnValue({ nextPaxNumber: '2', nextPagePath: '/check-in/2/passportPage' });
        await store.dispatch(
          CheckInActions.getReserveCheckInReservation(
            { firstName: 'firstName', lastName: 'lastName', recordLocator: '123pnr' },
            false
          )
        );

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__RESET_FLOW_DATA
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS,
            isFetching: true
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
            response,
            pnr: { firstName: 'firstName', lastName: 'lastName', recordLocator: '123PNR' },
            isFetching: false
          },
          {
            flowName: 'checkIn',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            payload: {
              args: ['/check-in/2/passportPage'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });

      it('should open additional passport page for second pax when international flight and user is missing additional info', async () => {
        getNextTravelPassengerTransitionInfoMock.mockReturnValue({
          nextPaxNumber: '2',
          nextPagePath: '/check-in/2/additional-passport-info'
        });
        await store.dispatch(
          CheckInActions.getReserveCheckInReservation(
            { firstName: 'firstName', lastName: 'lastName', recordLocator: '123pnr' },
            false
          )
        );

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__RESET_FLOW_DATA
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS,
            isFetching: true
          },
          {
            type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
            response,
            pnr: { firstName: 'firstName', lastName: 'lastName', recordLocator: '123PNR' },
            isFetching: false
          },
          {
            flowName: 'checkIn',
            status: 'in_progress',
            type: 'SET_FLOW_STATUS'
          },
          {
            payload: {
              args: ['/check-in/2/additional-passport-info'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });

      it('should catch errors if the retrieveReservationDetail API call errors out.', () => {
        const customizedError = { message: 'error' };
        const request = { firstName: 'firstName', lastName: 'lastName', recordLocator: '123pnr' };

        CheckInApiMock.retrieveReservationDetail.mockRejectedValueOnce(customizedError);

        return store.dispatch(CheckInActions.getReserveCheckInReservation(request, true)).catch((error) => {
          expect(error).toEqual({ message: 'error' });
          expect(store.getActions()).toEqual([
            {
              type: CHECK_IN__RESET_FLOW_DATA
            },
            {
              isFetching: true,
              type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS
            },
            {
              payload: {
                args: ['/air/check-in/'],
                method: 'push'
              },
              type: '@@router/CALL_HISTORY_METHOD'
            },
            {
              error: customizedError,
              isFetching: false,
              type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_FAILED
            }
          ]);
        });
      });
      
      it('should catch errors if the retrieveReservationDetail API call errors out when isOnDetailsPage parameter is not passed.', () => {
        const customizedError = { message: 'error' };
        const request = { firstName: 'firstName', lastName: 'lastName', recordLocator: '123pnr' };

        CheckInApiMock.retrieveReservationDetail.mockRejectedValueOnce(customizedError);

        return store.dispatch(CheckInActions.getReserveCheckInReservation(request)).catch((error) => {
          expect(error).toEqual({ message: 'error' });
          expect(store.getActions()).toEqual([
            {
              type: CHECK_IN__RESET_FLOW_DATA
            },
            {
              isFetching: true,
              type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS
            },
            {
              error: customizedError,
              isFetching: false,
              type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_FAILED
            }
          ]);
        });
      });
    });
  });

  describe('check in', () => {
    const response = {
      checkInConfirmationPage: {
        flights: [{ boundIndex: 0 }],
        _links: {
          viewBoardingPassIssuance: {}
        }
      }
    };
    const request = {
      href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
      method: 'POST',
      body: {
        firstName: 'Shelton',
        lastName: 'Suen',
        recordLocator: 'X5F7UL',
        checkInSessionToken: 'token'
      },
      isLoggedIn: true
    };

    it('should trigger fetchConfirmationPageSuccess and loadConfirmationPagePlacements actions when check in API success', () => {
      const expectedActions = [
        {
          isFetching: true,
          type: CHECK_IN__FETCH_CONFIRMATION_PAGE
        },
        {
          isFetching: false,
          response: {
            checkInConfirmationPage: {
              _links: {
                viewBoardingPassIssuance: {}
              },
              flights: [
                {
                  boundIndex: 0
                }
              ]
            }
          },
          type: CHECK_IN__FETCH_CONFIRMATION_PAGE_SUCCESS
        },
        {
          type: CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS
        }
      ];

      return store.dispatch(CheckInActions.checkIn(request)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should play haptic feedback when check in succeeds', async () => {
      const playHapticFeedbackMock = jest.spyOn(HapticFeedbackHelper, 'playHapticFeedback');

      CheckInApi.checkInPassenger.mockReturnValue(Q.resolve(response));

      await store.dispatch(CheckInActions.checkIn(request));

      expect(playHapticFeedbackMock).toHaveBeenCalled();
    });

    it('should trigger fetchConfirmationPageFailed action when check in API failed', async () => {
      CheckInApi.checkInPassenger.mockReturnValue(Q.reject({ message: 'error' }));

      await store.dispatch(CheckInActions.checkIn(request)).catch((error) => {
        expect(error).toEqual({ message: 'error', errorHandler: CheckInErrorHandlerHelper.browserRefreshErrorHandler });
        expect(store.getActions()).toEqual([
          {
            isFetching: true,
            type: CHECK_IN__FETCH_CONFIRMATION_PAGE
          },
          {
            isFetching: false,
            type: CHECK_IN__FETCH_CONFIRMATION_PAGE_FAILED,
            error: { message: 'error', errorHandler: CheckInErrorHandlerHelper.browserRefreshErrorHandler }
          }
        ]);
      });
    });

    it('should dispatch fetchConfirmationPageFailed with custom error when the error code is CHECKIN_SESSION_TOKEN_EXPIRED', async () => {
      CheckInApi.checkInPassenger.mockReturnValue(Q.reject({ responseJSON: { code: 400511157 } }));

      await store.dispatch(CheckInActions.checkIn(request)).catch((error) => {
        expect(error).toEqual({ responseJSON: { code: 400511157 }, $customized: true });
        expect(store.getActions()).toEqual([
          {
            isFetching: true,
            type: CHECK_IN__FETCH_CONFIRMATION_PAGE
          },
          {
            isFetching: false,
            type: CHECK_IN__FETCH_CONFIRMATION_PAGE_FAILED,
            error: { responseJSON: { code: 400511157 }, $customized: true }
          }
        ]);
      });
    });

    it('should dispatch fetchConfirmationPageFailed with custom error when the error code is NO_PAX_ELIGIBLE_FOR_CHECKIN', async () => {
      CheckInApi.checkInPassenger.mockReturnValue(Q.reject({ responseJSON: { code: 400511206 } }));

      await store.dispatch(CheckInActions.checkIn(request)).catch((error) => {
        expect(error).toEqual({ responseJSON: { code: 400511206 }, $customized: true });
        expect(store.getActions()).toEqual([
          {
            isFetching: true,
            type: CHECK_IN__FETCH_CONFIRMATION_PAGE
          },
          {
            isFetching: false,
            type: CHECK_IN__FETCH_CONFIRMATION_PAGE_FAILED,
            error: { responseJSON: { code: 400511206 }, $customized: true }
          }
        ]);
      });
    });

    it('should dispatch clearConfirmationPage action when clearConfirmationPage triggered', async () => {
      BrowserObject.location.pathname = '/air/check-in';
      await store.dispatch(CheckInActions.clearConfirmationPage());

      expect(store.getActions()).toEqual([
        {
          type: 'CHECK_IN__CLEAR_CONFIRMATION_PAGE'
        }
      ]);
    });
  });

  describe('mobile boarding pass', () => {
    it('should return CHECK_IN__CLEAR_BOARDING_PASSES action type when clearBoardingPass action triggered', async () => {
      BrowserObject.location.pathname = '/air/check-in';
      await store.dispatch(CheckInActions.clearBoardingPass());

      expect(store.getActions()).toEqual([{ type: 'CHECK_IN__CLEAR_BOARDING_PASSES' }]);
    });

    describe('retrieveBoardingPass', () => {
      describe('fetch mobile boarding pass', () => {
        let retrieveBoardingPass;
        const response = new CheckInRetrieveBoardingPassBuilder().build();
        const responseWithSecurityDocs = new CheckInRetrieveBoardingPassBuilder().withSecurityDocument().build();
        const responseWithBothBoundsCheckedIn = new CheckInRetrieveBoardingPassBuilder()
          .withBothBoundsCheckedIn()
          .build();

        const boardingPassLink = {
          href: '/v1/mobile-air-operations/page/check-in/mobile-issuance/NH9PPB',
          method: 'POST',
          body: {
            passengers: [
              {
                firstName: 'BRAINY',
                lastName: 'SOON',
                checkInSessionToken: 'token',
                travelerID: '2401CB8100001D30'
              }
            ]
          }
        };

        beforeEach(() => {
          retrieveBoardingPass = jest.spyOn(CheckInApi, 'retrieveBoardingPass');
        });

        it('should trigger fetchBoardingPassSuccess action when called with link and shouldSetFlowStatus false when check in API success', async () => {
          BrowserObject.location.pathname = '/air/check-in';
          retrieveBoardingPass.mockReturnValue(Q.resolve(response));

          await store.dispatch(CheckInActions.retrieveBoardingPass(boardingPassLink, false));

          expect(store.getActions()).toEqual([
            {
              isFetching: true,
              type: CHECK_IN__FETCH_BOARDING_PASS
            },
            {
              isFetching: false,
              response,
              type: CHECK_IN__FETCH_BOARDING_PASS_SUCCESS
            }
          ]);
        });

        it('should fire off "security document pass" satellite event if documentType is SECURITY_DOCUMENT', async () => {
          BrowserObject.location.pathname = '/air/check-in';
          retrieveBoardingPass.mockReturnValue(Q.resolve(responseWithSecurityDocs));

          await store.dispatch(CheckInActions.retrieveBoardingPass(boardingPassLink, false));

          expect(store.getActions()).toEqual([
            {
              isFetching: true,
              type: CHECK_IN__FETCH_BOARDING_PASS
            },
            {
              isFetching: false,
              response: responseWithSecurityDocs,
              type: CHECK_IN__FETCH_BOARDING_PASS_SUCCESS
            }
          ]);
        });

        it('should not fire off "security document pass" satellite event if documentType is SECURITY_DOCUMENT', async () => {
          BrowserObject.location.pathname = '/air/check-in';

          responseWithSecurityDocs.checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView = undefined;

          retrieveBoardingPass.mockReturnValue(Q.resolve(responseWithSecurityDocs));

          await store.dispatch(CheckInActions.retrieveBoardingPass(boardingPassLink, false));

          expect(store.getActions()).toEqual([
            {
              isFetching: true,
              type: CHECK_IN__FETCH_BOARDING_PASS
            },
            {
              isFetching: false,
              response: responseWithSecurityDocs,
              type: CHECK_IN__FETCH_BOARDING_PASS_SUCCESS
            }
          ]);
        });

        it('should trigger fetchBoardingPassSuccess action when called with link and shouldSetFlowStatus true when check in API success', async () => {
          BrowserObject.location.pathname = '/air/check-in';
          retrieveBoardingPass.mockReturnValue(Q.resolve(response));

          await store.dispatch(CheckInActions.retrieveBoardingPass(boardingPassLink, true));

          expect(store.getActions()).toEqual([
            {
              isFetching: true,
              type: CHECK_IN__FETCH_BOARDING_PASS
            },
            {
              flowName: 'checkIn',
              status: 'in_progress',
              type: 'SET_FLOW_STATUS'
            },
            {
              isFetching: false,
              response,
              type: CHECK_IN__FETCH_BOARDING_PASS_SUCCESS
            }
          ]);
        });

        it('should trigger fetchBoardingPassSuccess action when called with link, pnr, travelerID and travelerSegmentIdentifier when check in API success', async () => {
          BrowserObject.location.pathname = '/air/check-in';
          retrieveBoardingPass.mockReturnValue(Q.resolve(response));

          await store.dispatch(CheckInActions.retrieveBoardingPass(boardingPassLink, false));

          expect(store.getActions()).toEqual([
            {
              isFetching: true,
              type: CHECK_IN__FETCH_BOARDING_PASS
            },
            {
              isFetching: false,
              response,
              type: CHECK_IN__FETCH_BOARDING_PASS_SUCCESS
            }
          ]);
        });

        it('should trigger fetchBoardingPassSuccess action when called with pnr and check in API success', async () => {
          BrowserObject.location.pathname = '/air/check-in';
          retrieveBoardingPass.mockReturnValue(Q.resolve(response));

          await store.dispatch(CheckInActions.retrieveBoardingPass(undefined, false));

          expect(store.getActions()).toEqual([
            {
              isFetching: true,
              type: CHECK_IN__FETCH_BOARDING_PASS
            },
            {
              isFetching: false,
              response,
              type: CHECK_IN__FETCH_BOARDING_PASS_SUCCESS
            }
          ]);
        });

        it('should play popup when both bounds are checked in and message with error code 207308211 is sent', async () => {
          retrieveBoardingPass.mockReturnValue(Q.resolve(responseWithBothBoundsCheckedIn));

          await store.dispatch(CheckInActions.retrieveBoardingPass(boardingPassLink, false));

          expect(store.getActions()[0]).toEqual({
            isFetching: true,
            type: CHECK_IN__FETCH_BOARDING_PASS
          });
          expect(store.getActions()[1]).toEqual({
            isFetching: false,
            response: responseWithBothBoundsCheckedIn,
            type: CHECK_IN__FETCH_BOARDING_PASS_SUCCESS
          });
        });

        it('should trigger fetchBoardingPassFailed action when check in API failed', async () => {
          retrieveBoardingPass.mockReturnValue(Q.reject({ message: 'error' }));

          await store.dispatch(CheckInActions.retrieveBoardingPass(boardingPassLink, false)).catch((error) => {
            expect(error).toEqual({ message: 'error', errorHandler: ErrorHandlerHelper.goBackErrorHandler });
            expect(store.getActions()).toEqual([
              {
                isFetching: true,
                type: CHECK_IN__FETCH_BOARDING_PASS
              },
              {
                isFetching: false,
                type: 'CHECK_IN__FETCH_BOARDING_PASS_FAILED',
                error: { message: 'error', errorHandler: ErrorHandlerHelper.goBackErrorHandler }
              }
            ]);
          });
        });

        it('should trigger fetchBoardingPassFailed action with custom error when check in API failed with CHECKIN_SESSION_TOKEN_EXPIRED', async () => {
          BrowserObject.location.pathname = '/air/check-in';
          retrieveBoardingPass.mockReturnValue(
            Q.reject({
              responseJSON: {
                code: 400511157
              }
            })
          );

          await store.dispatch(CheckInActions.retrieveBoardingPass(boardingPassLink, false)).catch((error) => {
            expect(error).toEqual(error);
            expect(store.getActions()).toEqual([
              {
                isFetching: true,
                type: CHECK_IN__FETCH_BOARDING_PASS
              },
              {
                type: 'CHECK_IN__CLEAR_CHECK_IN_SESSION_TOKEN'
              },
              {
                isFetching: false,
                type: 'CHECK_IN__FETCH_BOARDING_PASS_FAILED',
                error: {
                  $customized: true,
                  responseJSON: {
                    code: 400511157
                  }
                }
              }
            ]);
          });
        });
      });
    });
  });

  describe('show share link', () => {
    it('should dispatch show share link', () => {
      BrowserObject.location.pathname = '/air/check-in';
      store.dispatch(CheckInActions.showShareLink());

      expect(store.getActions()).toEqual([{ type: 'CHECK_IN__SHOW_SHARE_LINK' }]);
    });
  });

  describe('add nationality and emergency docs', () => {
    let addNationalityAndEmergencyDocsMock;
    let transformToPassportInfoRequestMock;
    let transitToNextPaxMock;
    let showSessionExpiredPopupMock;
    let requestData;
    let formData;
    let checkInSessionToken;
    let defaultCheckInData;

    beforeEach(() => {
      requestData = {
        someRequest: 'someRequest'
      };
      formData = {
        someFromData: 'someFromData'
      };
      checkInSessionToken = 'someToken';
      addNationalityAndEmergencyDocsMock = jest.spyOn(CheckInApi, 'addTravelDocuments');
      transformToPassportInfoRequestMock = jest.spyOn(UpdateAPIsTransformers, 'transformToPassportInfoRequest');
      transitToNextPaxMock = jest.fn();
      showSessionExpiredPopupMock = jest.fn();
      defaultCheckInData = {
        paxNumber: 1,
        requestData,
        formData,
        checkInSessionToken,
        shouldShowSaveEmergencyContactForAll: false,
        transitToNextPax: transitToNextPaxMock,
        showSessionExpiredPopup: showSessionExpiredPopupMock,
        suppressEmergencyContact: false
      };
    });

    describe('isMissingDocument as false', () => {
      let request;
      let response;

      beforeEach(() => {
        request = 'someRequest';
        response = 'someResponse';
      });

      it('transforms requestData and trigger addNationalityAndEmergencyDocumentsSuccess action', async () => {
        transformToPassportInfoRequestMock.mockReturnValue(request);
        addNationalityAndEmergencyDocsMock.mockReturnValue(Q(response));

        await store.dispatch(CheckInActions.addNationalityAndEmergencyDocuments(defaultCheckInData));

        expect(transformToPassportInfoRequestMock).toHaveBeenCalledWith(requestData, formData, checkInSessionToken, false);
        expect(addNationalityAndEmergencyDocsMock).toHaveBeenCalledWith(request);

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS,
            isFetching: true
          },
          {
            type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_SUCCESS,
            response,
            paxNumber: 1,
            formData: {
              someFromData: 'someFromData'
            },
            isFetching: false
          },
          {
            paxNumber: 1,
            type: CHECK_IN__CLEAN_APIS_DATA
          }
        ]);
      });

      it('triggers actions and transitToNextPaxMock if shouldShowSaveEmergencyContactForAll is ture', async () => {
        transformToPassportInfoRequestMock.mockReturnValue(request);
        addNationalityAndEmergencyDocsMock.mockReturnValue(Q(response));

        await store.dispatch(
          CheckInActions.addNationalityAndEmergencyDocuments(
            _.merge({}, defaultCheckInData, { shouldShowSaveEmergencyContactForAll: true })
          )
        );

        expect(transformToPassportInfoRequestMock).toHaveBeenCalledWith(requestData, formData, checkInSessionToken, false);
        expect(addNationalityAndEmergencyDocsMock).toHaveBeenCalledWith(request);

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS,
            isFetching: true
          },
          {
            type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_SUCCESS,
            response,
            paxNumber: 1,
            formData: {
              someFromData: 'someFromData'
            },
            isFetching: false
          },
          {
            formData: {
              someFromData: 'someFromData'
            },
            type: CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL
          },
          {
            paxNumber: 1,
            type: CHECK_IN__CLEAN_APIS_DATA
          }
        ]);
        expect(transitToNextPaxMock).toHaveBeenCalled();
      });
    });

    describe('isMissingDocument as true', () => {
      let request;
      let response;

      beforeEach(() => {
        request = 'someRequest';
        response = 'someResponse';
      });

      it('does call transitToNextPaxMock and push to additional info page if shouldShowSaveEmergencyContactForAll is ture', async () => {
        jest.spyOn(UpdateAPIsHelpers, 'isMissingAdditionalInfo').mockReturnValue(true);
        transformToPassportInfoRequestMock.mockReturnValue(request);
        addNationalityAndEmergencyDocsMock.mockReturnValue(Q(response));

        await store.dispatch(
          CheckInActions.addNationalityAndEmergencyDocuments(
            _.merge({}, defaultCheckInData, { shouldShowSaveEmergencyContactForAll: true })
          )
        );

        expect(transformToPassportInfoRequestMock).toHaveBeenCalledWith(requestData, formData, checkInSessionToken, false);
        expect(addNationalityAndEmergencyDocsMock).toHaveBeenCalledWith(request);

        expect(store.getActions()).toEqual([
          {
            type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS,
            isFetching: true
          },
          {
            type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_SUCCESS,
            response,
            paxNumber: 1,
            formData: {
              someFromData: 'someFromData'
            },
            isFetching: false
          },
          {
            formData: {
              someFromData: 'someFromData'
            },
            type: CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL
          },
          {
            paxNumber: 1,
            type: CHECK_IN__CLEAN_APIS_DATA
          },
          {
            payload: {
              args: ['/air/check-in/1/additional-required-info.html'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
        expect(transitToNextPaxMock).not.toBeCalled();
      });
    });

    it('trigger addNationalityAndEmergencyDocumentsFailed action when add nationality API failed', async () => {
      const request = 'someRequest';

      transformToPassportInfoRequestMock.mockReturnValue(request);
      addNationalityAndEmergencyDocsMock.mockReturnValue(Q.reject('error'));

      await store.dispatch(CheckInActions.addNationalityAndEmergencyDocuments(defaultCheckInData));
      expect(store.getActions()).toEqual([
        {
          type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS,
          isFetching: true
        },
        {
          type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_FAILED,
          error: 'error',
          isFetching: false
        }
      ]);
    });

    it('trigger add customized error and call showSessionExpiredPopup when add nationality API failed with check in session timed out', async () => {
      const request = 'someRequest';

      transformToPassportInfoRequestMock.mockReturnValue(request);
      addNationalityAndEmergencyDocsMock.mockReturnValue(
        Q.reject({
          responseJSON: {
            code: 400511157
          }
        })
      );

      await store.dispatch(CheckInActions.addNationalityAndEmergencyDocuments(defaultCheckInData));
      expect(store.getActions()).toEqual([
        {
          type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS,
          isFetching: true
        },
        {
          type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_FAILED,
          error: {
            responseJSON: {
              code: 400511157
            },
            $customized: true
          },
          isFetching: false
        }
      ]);
      expect(showSessionExpiredPopupMock).toBeCalled();
    });
  });

  describe('update APIS data', () => {
    it('should dispatch prepare travel document and record locator', () => {
      BrowserObject.location.pathname = '/air/check-in';
      const formData = {
        type: 'RESIDENT_ALIEN_CARD',
        number: 'abc-d22-222-222-222',
        issuedBy: 'AS',
        expiration: '2019-11-17'
      };

      store.dispatch(CheckInActions.updateAPISData(formData, 'permanentResidentCard', 1));

      expect(store.getActions()).toEqual([
        {
          type: CHECK_IN__UPDATE_APIS_DATA,
          formData,
          nodeName: 'permanentResidentCard',
          paxNumber: 1
        }
      ]);
    });
  });

  describe('add additional passport info docs', () => {
    let addAdditionalPassportInfoDocsMock;
    let transformToAdditionalInfoRequestMock;
    let requestData;
    let formData;
    let checkInSessionToken;

    beforeEach(() => {
      requestData = {
        someRequest: 'someRequest'
      };
      formData = {
        someFromData: 'someFromData'
      };
      checkInSessionToken = 'someToken';
      addAdditionalPassportInfoDocsMock = jest.spyOn(CheckInApi, 'addTravelDocuments');
      transformToAdditionalInfoRequestMock = jest.spyOn(UpdateAPIsTransformers, 'transformToAdditionalInfoRequest');
    });

    it('transforms requestData and trigger addAdditionalPassportInfoDocumentsSuccess action', async () => {
      BrowserObject.location.pathname = '/air/check-in';
      const response = 'someResponse';
      const request = 'someRequest';

      transformToAdditionalInfoRequestMock.mockReturnValue(request);
      addAdditionalPassportInfoDocsMock.mockReturnValue(Q(response));
      await store.dispatch(
        CheckInActions.addAdditionalPassportInfoDocuments(requestData, formData, checkInSessionToken)
      );

      expect(transformToAdditionalInfoRequestMock).toHaveBeenCalledWith(requestData, formData, checkInSessionToken);
      expect(addAdditionalPassportInfoDocsMock).toHaveBeenCalledWith(request);

      expect(store.getActions()).toEqual([
        {
          type: CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS,
          isFetching: true
        },
        {
          type: CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS_SUCCESS,
          response,
          isFetching: false
        }
      ]);
    });

    it('trigger addAdditionalPassportInfoDocumentsFailed action when add additional passport info API failed', (done) => {
      addAdditionalPassportInfoDocsMock.mockReturnValue(Q.reject('error'));

      store
        .dispatch(CheckInActions.addAdditionalPassportInfoDocuments(requestData, formData, checkInSessionToken))
        .catch((error) => {
          expect(error).toEqual('error');
          expect(store.getActions()).toEqual([
            {
              type: CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS,
              isFetching: true
            },
            {
              type: CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS_FAILED,
              error: 'error',
              isFetching: false
            }
          ]);
          done();
        });
    });

    it('trigger add customized error when add additional passport info API failed with check in session timed out', (done) => {
      BrowserObject.location.pathname = '/air/check-in';
      addAdditionalPassportInfoDocsMock.mockReturnValue(
        Q.reject({
          responseJSON: {
            code: 400511157
          }
        })
      );

      store
        .dispatch(CheckInActions.addAdditionalPassportInfoDocuments(requestData, formData, checkInSessionToken))
        .catch(() => {
          expect(store.getActions()).toEqual([
            {
              type: CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS,
              isFetching: true
            },
            {
              type: CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS_FAILED,
              error: {
                responseJSON: {
                  code: 400511157
                },
                $customized: true
              },
              isFetching: false
            }
          ]);
          done();
        });
    });
  });

  describe('save emergency contacts for all', () => {
    it('should dispatch save emergency contracts for all', () => {
      BrowserObject.location.pathname = '/air/check-in';
      store.dispatch(CheckInActions.saveEmergencyContactForAll('someFormData'));

      expect(store.getActions()).toEqual([
        {
          type: CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL,
          formData: 'someFormData'
        }
      ]);
    });
  });

  it('should call flow actions with check-in as flow name and set corresponding status', () => {
    BrowserObject.location.pathname = '/air/check-in';
    const flowActionsMock = jest.spyOn(FlowStatusActions, 'setFlowStatus');

    CheckInActions.setCheckInFlowStatus('someStatus');

    expect(flowActionsMock).toHaveBeenCalledWith('checkIn', 'someStatus');
  });

  it('should dispatch setCheckInFlowStatus with in progress and push to boarding position page when transitToBoardingPosition action triggered', async () => {
    BrowserObject.location.pathname = '/air/check-in';
    await store.dispatch(CheckInActions.transitToBoardingPosition());

    expect(store.getActions()).toEqual([
      {
        type: 'SET_FLOW_STATUS',
        flowName: 'checkIn',
        status: 'in_progress'
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          method: 'push',
          args: ['/air/check-in/boarding-positions.html']
        }
      }
    ]);
  });

  describe('goDirectlyToBoardingPasses', () => {
    const response = new CheckInRetrieveBoardingPassBuilder().build();

    let retrieveBoardingPass;
    let viewBoardingPassesLink;

    beforeEach(() => {
      retrieveBoardingPass = jest.spyOn(CheckInApi, 'retrieveBoardingPass');

      viewBoardingPassesLink = {
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/LWTUI4',
        method: 'POST',
        body: {
          firstName: 'BIGG',
          lastName: 'BOSS',
          passengerSearchToken: 'xWWq4_XJob1Bwi1FTvK_XHGC1uoIcHlYJUyCJQVfxF7mJs=',
          travelerID: ['2301CE080000E0C0']
        }
      };
    });

    it('should retrieveBoardingPass, updateViewBoardingPass and goto boarding pass page on retrieve success', async () => {
      retrieveBoardingPass.mockResolvedValue(response);

      await store.dispatch(CheckInActions.goDirectlyToBoardingPasses({
        viewBoardingPassesLink,
        recordLocator: 'PNR123'
      }));

      expect(store.getActions()[0]).toEqual({
        type: CHECK_IN__FETCH_BOARDING_PASS,
        isFetching: true
      });
      expect(store.getActions()[1]).toEqual({
        isFetching: false,
        response,
        type: CHECK_IN__FETCH_BOARDING_PASS_SUCCESS
      });
    });

    it('should retrieveBoardingPass, updateViewBoardingPass and goto boarding pass page on retrieve success when option firstName and lastName passed', async () => {
      retrieveBoardingPass.mockResolvedValue(response);

      await store.dispatch(
        CheckInActions.goDirectlyToBoardingPasses({
          viewBoardingPassesLink,
          recordLocator: 'PNR123',
          firstName: 'firstName',
          lastName: 'lastName'
        })
      );

      expect(store.getActions()).toEqual([{
        type: CHECK_IN__FETCH_BOARDING_PASS,
        isFetching: true
      },
      {
        isFetching: false,
        response,
        type: CHECK_IN__FETCH_BOARDING_PASS_SUCCESS
      }]);
    });
  });

  describe('loadConfirmationPagePlacements', () => {
    const {
      CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS,
      CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS,
      CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS_FAILED
    } = checkInActionTypes;
    const response = {
      checkInConfirmationPage: { _links: {} }
    };
    const fetchAction = { type: CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS };
    const fetchFailedAction = { type: CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS_FAILED };
    const defaultMboxes = [AdobeTargetConstants.CHECK_IN_CONFIRMATION_UPGRADE_BUTTON];

    it('should dispatch failed action when getSegments throws unhandled exception', async () => {
      getSegmentsMock.mockReturnValue(() => Promise.reject(new Error()));

      await store.dispatch(CheckInActions.loadConfirmationPagePlacements(response));

      expect(getTargetParamsMock).toHaveBeenCalledWith({}, CHECK_IN_CONFIRMATION_PAGE_ID);
      expect(getMboxConfig).toHaveBeenCalledWith(CHECK_IN_CONFIRMATION_PAGE_ID, params, defaultMboxes);
      expect(WcmActions.getPlacements).not.toBeCalled();
      expect(getSegmentsMock).toHaveBeenCalledWith(args);
      expect(store.getActions()).toEqual([fetchAction, fetchFailedAction]);
    });

    it('should dispatch failed action when getPlacements throws unhandled exception', async () => {
      WcmActions.getPlacements.mockReturnValue(() => Promise.reject(new Error()));

      await store.dispatch(CheckInActions.loadConfirmationPagePlacements(response));

      expect(getTargetParamsMock).toHaveBeenCalledWith({}, CHECK_IN_CONFIRMATION_PAGE_ID);
      expect(getMboxConfig).toHaveBeenCalledWith(CHECK_IN_CONFIRMATION_PAGE_ID, params, defaultMboxes);
      expect(getSegmentsMock).toHaveBeenCalledWith(args);
      expect(WcmActions.getPlacements).toHaveBeenCalledWith(CHECK_IN_CONFIRMATION_PAGE_ID, [''], segment);
      expect(store.getActions()).toEqual([fetchAction, fetchFailedAction]);
    });

    it('should dispatch success action when no errors', async () => {
      const content = 'content';
      const fetchSuccessAction = {
        type: CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS,
        response: content
      };

      WcmActions.getPlacements.mockImplementation(() => () => Promise.resolve(content));

      await store.dispatch(CheckInActions.loadConfirmationPagePlacements(response));

      expect(getTargetParamsMock).toHaveBeenCalledWith({}, CHECK_IN_CONFIRMATION_PAGE_ID);
      expect(getMboxConfig).toHaveBeenCalledWith(CHECK_IN_CONFIRMATION_PAGE_ID, params, defaultMboxes);
      expect(getSegmentsMock).toHaveBeenCalledWith(args);
      expect(WcmActions.getPlacements).toHaveBeenCalledWith(CHECK_IN_CONFIRMATION_PAGE_ID, [''], segment);
      expect(store.getActions()).toEqual([fetchAction, fetchSuccessAction]);
    });

    it('should dispatch getPlacements action with empty string appContext when response has no viewPremiumProductUpgrade or viewUpgradedBoarding link objects', async () => {
      await store.dispatch(CheckInActions.loadConfirmationPagePlacements(response));

      expect(WcmActions.getPlacements).toHaveBeenCalledWith(CHECK_IN_CONFIRMATION_PAGE_ID, [''], segment);
    });

    it('should dispatch getPlacements action with multiple appContext when response has delimitedAppContexts', async () => {
      await store.dispatch(CheckInActions.loadConfirmationPagePlacements({
        checkInConfirmationPage: {
          ...response.checkInConfirmationPage,
          delim: '|',
          mktg_data: {
            delimitedAppContexts: 'GETAWAYS1|GETAWAYS2'
          }
        }
        
      }));

      expect(WcmActions.getPlacements).toHaveBeenCalledWith(CHECK_IN_CONFIRMATION_PAGE_ID, ['GETAWAYS1', 'GETAWAYS2'], segment);
    });

    it('should dispatch getPlacements action with appContext value passed in response', async () => {
      const response = {
        checkInConfirmationPage: {
          mktg_data: {
            appContext: 'upgradeToBUS'
          }
        }
      };

      await store.dispatch(CheckInActions.loadConfirmationPagePlacements(response));

      expect(WcmActions.getPlacements).toHaveBeenCalledWith(CHECK_IN_CONFIRMATION_PAGE_ID, ['upgradeToBUS'], segment);
    });
  });

  describe('searchToken', () => {
    it('should dispatch getReserveCheckInReservationWithSearchToken action with the searchToken parameter and the nextPagePath is the checkInConfirmation page', async () => {
      BrowserObject.location.pathname = '/air/check-in/confirmation.html';
      BrowserObject.location.search = 'searchToken=abc123';
      getNextTravelPassengerTransitionInfoMock.mockReturnValue({ nextPagePath: '/air/check-in/confirmation.html' });

      const searchToken = 'abc123';

      await store.dispatch(CheckInActions.getReserveCheckInReservationWithSearchToken(searchToken));

      expect(CheckInApi.retrieveReservationDetail).toHaveBeenCalledWith({
        firstName: '',
        lastName: '',
        passengerSearchToken: searchToken,
        recordLocator: 'RECLOC'
      });
    });

    it('should dispatch getReserveCheckInReservationWithSearchToken action with the searchToken parameter and the nextPagePath is not the checkInConfirmation page', async () => {
      BrowserObject.location.pathname = '/air/check-in/confirmation.html';
      BrowserObject.location.search = 'searchToken=abc123';
      getNextTravelPassengerTransitionInfoMock.mockReturnValue({ nextPagePath: '/check-in/1/required-info.html' });

      const searchToken = 'abc123';

      await store.dispatch(CheckInActions.getReserveCheckInReservationWithSearchToken(searchToken));

      expect(CheckInApi.retrieveReservationDetail).toHaveBeenCalledWith({
        firstName: '',
        lastName: '',
        passengerSearchToken: searchToken,
        recordLocator: 'RECLOC'
      });
    });

    it('should dispatch getReserveCheckInReservationWithSearchToken action with the searchToken parameter and catch an error when the retrieveReservationDetail API call fails', () => {
      const customizedError = { message: 'error' };
      const searchToken = 'abc123';

      CheckInApiMock.retrieveReservationDetail.mockRejectedValueOnce(customizedError);

      return store.dispatch(CheckInActions.getReserveCheckInReservationWithSearchToken(searchToken)).catch((error) => {
        expect(error).toEqual({ message: 'error' });
        expect(store.getActions()).toEqual([
          { type: 'CHECK_IN__RESET_FLOW_DATA' },
          {
            isFetching: true,
            type: 'CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS'
          },
          {
            error: { message: 'error' },
            isFetching: false,
            type: 'CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_FAILED'
          }
        ]);
      });
    });
  });
});
