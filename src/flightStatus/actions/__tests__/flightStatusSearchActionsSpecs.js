import { sandbox } from 'sinon';
import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';
import * as FlightStatusSearchActions from 'src/flightStatus/actions/flightStatusSearchActions';
import FlightSearchHistoryLocalStorageHelper from 'src/flightStatus/helper/flightSearchHistoryLocalStorageHelper';
import * as FlightStatusChapiApi from 'src/shared/api/flightStatusApi';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as AppSelector from 'src/shared/selectors/appSelector';
import FlightStatusDetailsBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/flight-status/flightStatusDetailsBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';

const {
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS,
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS,
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_FAILED,
  FLIGHT_STATUS__RESET_FLOW_DATA,
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS,
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS,
  FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_FAILED,
  FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS,
  FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_SUCCESS,
  FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_FAILED,
  FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST,
  FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS
} = flightStatusActionTypes;

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('FlightStatusSearchActions', () => {
  let store;
  let pushStub;
  let saveSearchRequestStub;
  let searchRequest;

  beforeEach(() => {
    BrowserObject.location = null;
    store = mockStore();
    pushStub = sinon.stub();

    searchRequest = {
      from: 'DAL',
      to: 'AUS',
      date: '2015-10-01'
    };

    saveSearchRequestStub = sinon.stub(FlightSearchHistoryLocalStorageHelper, 'save');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('sync actions', () => {
    context('saveSearchRequest', () => {
      it('should trigger FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST action when called', () => {
        expect(FlightStatusSearchActions.saveSelectedRecentSearchRequest(searchRequest)).to.be.deep.equal({
          type: FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST,
          selectedRecentSearchRequest: searchRequest
        });
      });
    });

    context('getRecentSearchesFromLocalStorage', () => {
      it('should set recent searches in redux tree to searches from local store when getting searches from local storage', async () => {
        await store.dispatch(FlightStatusSearchActions.getRecentSearchesFromLocalStorage());
        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS,
            searches: []
          }
        ]);
      });
    });

    context('deleteRecentSearchRequest', () => {
      it('should trigger action FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS when delete recent search request is called', () => {
        store.dispatch(FlightStatusSearchActions.deleteRecentSearchRequest(searchRequest));
        expect(store.getActions()).to.be.deep.equal([
          {
            type: FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS,
            searches: []
          }
        ]);
      });
    });
  });

  context('async actions', () => {
    let filteredResponse;
    let getFilteredSearchRequestsStub;

    beforeEach(() => {
      filteredResponse = [searchRequest];
      getFilteredSearchRequestsStub = sinon
        .stub(FlightSearchHistoryLocalStorageHelper, 'get')
        .returns(filteredResponse);
    });

    context('fetchFlightStatus', () => {
      it('should trigger actions and page route change when FlightStatusChapiApi.searchForFlights API is success and shouldGoToNextPage is true', async () => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('flight-status');
        BrowserObject.location = { pathname: '/flight-status/:from/:to/:date' };
      
        const response = {
          flightSchedulesPage: {
            flights: [
              {
                date: searchRequest.date,
                flightNumbers: [searchRequest.flightNumber],
                from: searchRequest.from,
                to: searchRequest.to
              }
            ]
          }
        };

        sinon.stub(FlightStatusChapiApi, 'searchForFlights').returns(Promise.resolve(response));

        await store.dispatch(FlightStatusSearchActions.fetchFlightStatus(searchRequest, true, pushStub));

        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__RESET_FLOW_DATA
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS,
            isFetching: true
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS,
            isFetching: false,
            response
          },
          {
            type: FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS,
            searches: filteredResponse
          }
        ]);

        expect(saveSearchRequestStub).to.have.been.calledWith(searchRequest);
        expect(getFilteredSearchRequestsStub).to.have.been.called;
        expect(pushStub).to.have.been.calledWith('/flight-status/DAL/AUS/2015-10-01');
      });

      it('should trigger actions and normalized page route when FlightStatusChapiApi.searchForFlights API is success and shouldGoToNextPage is true', async () => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('flight-status');
        BrowserObject.location = { pathname: '/air/flight-status/results.html' };
      
        const response = {
          flightSchedulesPage: {
            flights: [
              {
                date: searchRequest.date,
                flightNumbers: [searchRequest.flightNumber],
                from: searchRequest.from,
                to: searchRequest.to
              }
            ]
          }
        };

        sinon.stub(FlightStatusChapiApi, 'searchForFlights').returns(Promise.resolve(response));

        await store.dispatch(FlightStatusSearchActions.fetchFlightStatus(searchRequest, true, pushStub));

        expect(saveSearchRequestStub).to.have.been.calledWith(searchRequest);
        expect(getFilteredSearchRequestsStub).to.have.been.called;
        expect(pushStub).to.have.been.calledWith('/air/flight-status/results.html?departureDate=2015-10-01&destinationAirportCode=AUS&originationAirportCode=DAL');
      });

      it('should trigger actions when FlightStatusChapiApi.searchForFlights API is success and shouldGoToNextPage is false', async () => {
        const response = {
          flightSchedulesPage: {
            flights: [
              {
                from: searchRequest.from,
                to: searchRequest.to,
                date: searchRequest.date,
                flightNumbers: [searchRequest.flightNumber]
              }
            ]
          }
        };

        sinon.stub(FlightStatusChapiApi, 'searchForFlights').returns(Promise.resolve(response));

        await store.dispatch(FlightStatusSearchActions.fetchFlightStatus(searchRequest, false, pushStub));

        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__RESET_FLOW_DATA
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS,
            isFetching: true
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS,
            isFetching: false,
            response
          }
        ]);

        expect(saveSearchRequestStub).to.not.have.been.called;
        expect(getFilteredSearchRequestsStub).to.not.have.been.called;
      });

      it('should trigger actions when FlightStatusChapiApi.searchForFlights API fails', async () => {
        sinon.stub(FlightStatusChapiApi, 'searchForFlights').returns(Promise.reject('error'));

        await store.dispatch(FlightStatusSearchActions.fetchFlightStatus(searchRequest, true, pushStub));

        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__RESET_FLOW_DATA
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS,
            isFetching: true
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_FAILED,
            error: 'error',
            isFetching: false
          }
        ]);

        expect(pushStub).to.not.have.been.called;
      });
    });

    context('fetchFlightDetails', () => {
      beforeEach(() => {
        searchRequest = {
          date: '2015-10-01',
          flightNumber: '100',
          from: 'DAL',
          to: 'AUS'
        };
      });

      it('should trigger actions and page route changed when FlightStatusChapiApi.lookUpFlightDetails API is success and shouldGoToNextPage is true', async () => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('flight-status');
        BrowserObject.location = { pathname: '/flight-details' };

        const response = {
          flightStatusDetailsPage: {
            flightCards: [
              {
                legs: [
                  {
                    flightNumber: searchRequest.flightNumber
                  }
                ]
              }
            ]
          }
        };

        sinon.stub(FlightStatusChapiApi, 'lookUpFlightDetails').returns(Promise.resolve(response));

        await store.dispatch(FlightStatusSearchActions.fetchFlightDetails(searchRequest, true, pushStub, true));
        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__RESET_FLOW_DATA
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS,
            isFetching: true
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS,
            isFetching: false,
            response
          },
          {
            type: FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS,
            searches: filteredResponse
          }
        ]);

        expect(saveSearchRequestStub).to.have.been.calledWith(searchRequest);
        expect(getFilteredSearchRequestsStub).to.have.been.called;
        expect(pushStub).to.have.been.calledWith('/flight-details?date=2015-10-01&flightNumber=100&from=DAL&to=AUS');
      });

      it('should trigger actions when FlightStatusChapiApi.lookUpFlightDetails API is success and shouldGoToNextPage is false', async () => {
        const response = {
          flightStatusDetailsPage: {
            flightCards: [
              {
                legs: [
                  {
                    flightNumber: searchRequest.flightNumber
                  }
                ]
              }
            ]
          }
        };

        searchRequest = { flightKeys: '2015-10-01%3ADALAUS100' };
        sinon.stub(FlightStatusChapiApi, 'lookUpFlightDetails').returns(Promise.resolve(response));

        await store.dispatch(FlightStatusSearchActions.fetchFlightDetails(searchRequest, false, pushStub, true, true));
        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__RESET_FLOW_DATA
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS,
            isFetching: true
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS,
            isFetching: false,
            response
          }
        ]);

        expect(saveSearchRequestStub).to.not.have.been.called;
        expect(getFilteredSearchRequestsStub).to.not.have.been.called;
      });

      it('should trigger actions and page route changed when flight has a connection and FlightStatusChapiApi.lookUpFlightDetails API is success and goToNextPage is true', async () => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('flight-status');
        BrowserObject.location = { pathname: '/flight-details' };
 
        const searchRequestWithConnection = {
          from: 'DAL',
          to: 'CVG',
          date: '2015-10-01',
          flightNumber: '100',
          connectingAirportCode: 'AUS',
          secondFlightNumber: '200'
        };
        const response = {
          flightStatusDetailsPage: {
            flightCards: [
              {
                legs: [
                  {
                    flightNumber: searchRequestWithConnection.flightNumber
                  },
                  {
                    flightNUmber: searchRequestWithConnection.secondFlightNumber
                  }
                ]
              }
            ]
          }
        };

        sinon.stub(FlightStatusChapiApi, 'lookUpFlightDetails').returns(Promise.resolve(response));

        await store.dispatch(
          FlightStatusSearchActions.fetchFlightDetails(searchRequestWithConnection, true, pushStub, true)
        );
        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__RESET_FLOW_DATA
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS,
            isFetching: true
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS,
            isFetching: false,
            response
          },
          {
            type: FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS,
            searches: filteredResponse
          }
        ]);

        expect(saveSearchRequestStub).to.have.been.calledWith(searchRequestWithConnection);
        expect(getFilteredSearchRequestsStub).to.have.been.called;
        expect(pushStub).to.have.been.calledWith(
          '/flight-details?from=DAL&to=CVG&date=2015-10-01&flightNumber=100&connectingAirportCode=AUS&secondFlightNumber=200'
        );
      });

      it('should trigger actions when FlightStatusChapiApi.lookUpFlightDetails API is success and shouldGoToNextPage is false and shouldResetFlowData is false', async () => {
        const response = {
          flightStatusDetailsPage: {
            flightCards: [
              {
                legs: [
                  {
                    flightNumber: searchRequest.flightNumber
                  }
                ]
              }
            ]
          }
        };

        searchRequest = { flightKeys: '2015-10-01%3ADALAUS100' };
        sinon.stub(FlightStatusChapiApi, 'lookUpFlightDetails').returns(Promise.resolve(response));

        await store.dispatch(FlightStatusSearchActions.fetchFlightDetails(searchRequest, false, pushStub, false));
        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS,
            isFetching: true
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS,
            isFetching: false,
            response
          }
        ]);

        expect(saveSearchRequestStub).to.not.have.been.called;
        expect(getFilteredSearchRequestsStub).to.not.have.been.called;
      });

      it('should trigger actions when FlightStatusChapiApi.lookUpFlightDetails API fails', async () => {
        sinon.stub(FlightStatusChapiApi, 'lookUpFlightDetails').returns(Promise.reject('error'));

        await store.dispatch(FlightStatusSearchActions.fetchFlightDetails(searchRequest, true, pushStub, true));

        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__RESET_FLOW_DATA
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS,
            isFetching: true
          },
          {
            type: FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_FAILED,
            isFetching: false,
            error: 'error'
          }
        ]);

        expect(pushStub).to.not.have.been.called;
      });
    });

    context('lookUpFlightDetails', () => {
      it('should trigger actions when FlightStatusChapiApi.lookUpFlightDetails API is success', async () => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('flight-status');
        BrowserObject.location = { pathname: '/flight-details' };

        const response = new FlightStatusDetailsBuilder().build();
        const request = {
          href: 'abc',
          query: {
            'flight-keys': '2023-05-17:SFODEN3717|2023-05-18:DENLGA528'
          }
        };

        sinon.stub(FlightStatusChapiApi, 'lookUpFlightDetails').returns(Promise.resolve(response));

        await store.dispatch(FlightStatusSearchActions.lookUpFlightStatusDetails(request, pushStub));

        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS,
            isFetching: true
          },
          {
            type: FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_SUCCESS,
            isFetching: false,
            response
          }
        ]);

        expect(pushStub).to.have.been.calledWith(
          '/flight-details?flightKeys=2023-05-17%3ASFODEN3717%7C2023-05-18%3ADENLGA528'
        );
      });

      it('should trigger actions when FlightStatusChapiApi.lookUpFlightDetails API fails', async () => {
        sinon.stub(FlightStatusChapiApi, 'lookUpFlightDetails').returns(Promise.reject('error'));

        await store.dispatch(FlightStatusSearchActions.lookUpFlightStatusDetails({}, pushStub));

        expect(store.getActions()).to.deep.equal([
          {
            type: FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS,
            isFetching: true
          },
          {
            type: FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_FAILED,
            isFetching: false,
            error: 'error'
          }
        ]);

        expect(pushStub).to.have.not.been.called;
      });
    });
  });
});
