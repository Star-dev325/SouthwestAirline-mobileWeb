jest.mock('src/shared/helpers/urlHelper', () => ({
  isOnOldRoute: jest.fn().mockReturnValue(true),
  getNormalizedRoute: jest.fn().mockReturnValue(true)
}));

import i18n from '@swa-ui/locale';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import * as AirportsActions from 'src/airports/actions/airportsActions';
import * as FlightStatusLandingPageFile from 'src/flightStatus/pages/flightStatusLandingPage';
import { FlightStatusLandingPage } from 'src/flightStatus/pages/flightStatusLandingPage';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';
import waitFor from 'test/unit/helpers/waitFor';
import * as urlHelper from 'src/shared/helpers/urlHelper';
import { FLIGHT_STATUS_SEARCH_FORM } from 'src/shared/constants/formIds';

describe('FlightStatusLandingPage', () => {
  const ANALYTICS_FORM_NAME = 'flight-status-search';

  let analyticsTrackSubmitFormMock;
  let fetchFlightDetailsFnMock;
  let fetchFlightStatusFnMock;
  let loadAirportsFnMock;
  let loadRecentlySearchedFnMock;
  let stateWithFlightNumber;
  let stateWithoutFlightNumber;
  let updateFormDataValueMock;
  let updateSelectedAirportInfoFnMock;

  beforeEach(() => {
    analyticsTrackSubmitFormMock = jest.spyOn(AnalyticsActions, 'trackSubmitForm');
    fetchFlightDetailsFnMock = jest.fn();
    fetchFlightStatusFnMock = jest.fn();
    jest.spyOn(FlightBookingApi, 'fetchShoppingDetails').mockReturnValue(Promise.resolve({}));
    loadAirportsFnMock = jest.spyOn(AirportsActions, 'loadAirports').mockResolvedValue({});
    loadRecentlySearchedFnMock = jest.spyOn(AirportsActions, 'loadRecentlySearched');
    updateFormDataValueMock = jest.spyOn(FormDataActions, 'updateFormDataValue');
    updateSelectedAirportInfoFnMock = jest.fn();

    stateWithFlightNumber = {
      app: {
        flightStatus: {
          selectedRecentSearchRequest: {
            date: '2018-03-23',
            flightNumber: '100',
            from: 'DAL',
            to: 'AUS'
          }
        }
      }
    };
    stateWithoutFlightNumber = {
      app: {
        flightStatus: {
          selectedRecentSearchRequest: {
            date: '2018-03-23',
            from: 'DAL',
            to: 'AUS'
          }
        }
      }
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call loadAirports and loadRecentlySearched', (done) => {
    const state = {
      app: {
        flightStatus: {
          selectedRecentSearchRequest: {
            date: '2018-03-23',
            from: 'DAL',
            to: 'DAL'
          }
        },
        toggles: {}
      }
    };

    createComponent(true, state, true);

    waitFor.untilAssertPass(() => {
      expect(loadAirportsFnMock).toBeCalled();
      expect(loadRecentlySearchedFnMock).toBeCalled();
    }, done);
  });

  describe('submitForm', () => {
    it('should route to the searchFlightsResults page when successful CHAPI search response', (done) => {
      const instance = React.createRef();
      const formData = {
        destinationAirport: 'AUS',
        flightNumber: '',
        originAirport: 'DAL',
        selectedDate: '2018-03-23'
      };
      const _transitionToNextPageMock = jest.fn();

      createComponent(true, stateWithoutFlightNumber, true, { instance });

      instance.current._transitionToNextPage = _transitionToNextPageMock;
      instance.current._onSubmit(formData);

      waitFor.untilAssertPass(() => {
        expect(analyticsTrackSubmitFormMock).toBeCalledWith(ANALYTICS_FORM_NAME);
        expect(_transitionToNextPageMock).toBeCalledWith({
          date: '2018-03-23',
          flightNumber: '',
          from: 'DAL',
          to: 'AUS'
        });
        expect(updateFormDataValueMock).toBeCalledWith('FLIGHT_STATUS_SEARCH_FORM', formData);
      }, done);
    });

    it('should route to the flightDetails page when successful CHAPI search for flight response', (done) => {
      const instance = React.createRef();
      const formData = {
        destinationAirport: 'AUS',
        flightNumber: '100',
        originAirport: 'DAL',
        selectedDate: '2018-03-23'
      };
      const _transitionToNextPageMock = jest.fn();

      createComponent(true, stateWithFlightNumber, true, { instance });

      instance.current._transitionToNextPage = _transitionToNextPageMock;
      instance.current._onSubmit(formData);

      waitFor.untilAssertPass(() => {
        expect(_transitionToNextPageMock).toHaveBeenCalledWith({
          date: '2018-03-23',
          flightNumber: '100',
          from: 'DAL',
          to: 'AUS'
        });
        expect(analyticsTrackSubmitFormMock).toHaveBeenCalledWith(ANALYTICS_FORM_NAME);
        expect(updateFormDataValueMock).toHaveBeenCalledWith('FLIGHT_STATUS_SEARCH_FORM', formData);
      }, done);
    });
  });

  describe('error dialog', () => {
    it('should display popup with error message when both origin and destination airport are the same', (done) => {
      const state = {
        app: {
          flightStatus: {
            selectedRecentSearchRequest: {
              date: '2018-03-23',
              from: 'DAL',
              to: 'DAL'
            }
          },
          toggles: {}
        }
      };

      const { container } = createComponent(true, state);

      fireEvent.submit(container.querySelector('form'));

      waitFor.untilAssertPass(() => {
        expect(container.querySelector('.popup-title').textContent).toContain(
          i18n('SHARED__ERROR_MESSAGES__DEPARTURE_AND_ARRIVAL_NOT_BE_SAME')
        );
      }, done);
    });
  });

  describe('deep linking', () => {
    it('should call updateFormDataValueMock for normalized flight status route with query params', () => {
      urlHelper.isOnOldRoute.mockReturnValueOnce(false);
      createComponent(true, stateWithFlightNumber, true, {
        query: {
          departureDate: '2017-02-02',
          destinationAirportCode: 'HOU',
          originationAirportCode: 'DAL'
        }
      });

      expect(updateFormDataValueMock).toHaveBeenCalledWith(
        FLIGHT_STATUS_SEARCH_FORM,
        { destinationAirport: "HOU", originAirport: "DAL", selectedDate: "2017-02-02" }
      );
    });

    it('should not call fetchFlightStatusFnMock when there is no query params', () => {
      urlHelper.isOnOldRoute.mockReturnValueOnce(false);
      createComponent();

      expect(updateFormDataValueMock).not.toHaveBeenCalled();
    });

    it('should call fetchFlightStatusFnMock on old route', () => {
      urlHelper.isOnOldRoute.mockReturnValueOnce(false);
      createComponent(true, stateWithFlightNumber, true, {
        query: {
          departureDate: '2017-02-02',
          destinationAirportCode: 'HOU',
          originationAirportCode: 'DAL'
        }
      });

      expect(updateFormDataValueMock).toHaveBeenCalled();
    });

    it('should call fetchFlightStatusFnMock on new route', () => {
      urlHelper.isOnOldRoute.mockReturnValueOnce(true);
      createComponent(true, stateWithFlightNumber, true, {
        query: {
          departureDate: '2017-02-02',
          destinationAirportCode: 'HOU',
          originationAirportCode: 'DAL'
        }
      });

      expect(updateFormDataValueMock).toHaveBeenCalled();
    });
  });

  const createComponent = (withDialog = false, state = {}, shouldUseClass, props = {}) => {
    const defaultProps = {
      allAirports: [],
      analyticsTrackSubmitFormFn: analyticsTrackSubmitFormMock,
      fetchFlightDetailsFn: fetchFlightDetailsFnMock,
      fetchFlightStatusFn: fetchFlightStatusFnMock,
      getRecentSearchesFromLocalStorageFn: () => {},
      loadAirportsFn: loadAirportsFnMock,
      loadRecentlySearchedFn: loadRecentlySearchedFnMock,
      recentlySearched: [],
      updateFormDataValueFn: updateFormDataValueMock,
      updateSelectedAirportInfoFn: updateSelectedAirportInfoFnMock
    };
    const mergedProps = { ...defaultProps, ...props };
    const Component = shouldUseClass ? FlightStatusLandingPage : FlightStatusLandingPageFile.default;

    return integrationRender({ withDialog })(state, Component, { ...mergedProps });
  };
});
