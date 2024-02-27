import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { SearchFlightsResultsPage } from 'src/flightStatus/pages/searchFlightsResultsPage';
import * as urlHelper from 'src/shared/helpers/urlHelper';
import FlightSchedulesPageBuilder from 'test/builders/apiResponse/flightSchedulesPageBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('searchFlightResultsPage', () => {
  let fetchFlightStatusFnMock;
  let isOnOldRouteMock;
  let lookUpFlightStatusDetailsFnMock;
  let mockResponse;
  let pushMock;

  beforeEach(() => {
    fetchFlightStatusFnMock = jest.fn();
    isOnOldRouteMock = jest.spyOn(urlHelper, 'isOnOldRoute');
    lookUpFlightStatusDetailsFnMock = jest.fn();
    mockResponse = new FlightSchedulesPageBuilder().withNumberOfFlight(2).build().flightSchedulesPage;
    pushMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should create a FlightCard for each flight status object', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.flight-card')).toHaveLength(2);
    });

    it('should pass flight to flight cards', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should create call fetchFlightStatusFnMock for old flight status route with query params', () => {
      createComponent({
        flightSchedulesPage: {},
        query: {
          departureDate: '2017-02-02',
          destinationAirportCode: 'HOU',
          originationAirportCode: 'DAL'
        }
      });

      expect(fetchFlightStatusFnMock).toHaveBeenCalledWith(
        { date: '2017-02-02', from: 'DAL', to: 'HOU' },
        false,
        pushMock
      );
    });

    it('should create call fetchFlightStatusFnMock for old flight status route without query params', () => {
      createComponent({
        flightSchedulesPage: {}
      });

      expect(fetchFlightStatusFnMock).toHaveBeenCalledWith(
        { date: '2017-02-02', from: 'DAL', to: 'HOU' },
        false,
        pushMock
      );
    });

    it('should create call fetchFlightStatusFnMock for normalized flight status route with query params', () => {
      isOnOldRouteMock.mockReturnValue(false);
      createComponent({
        flightSchedulesPage: {},
        query: {
          departureDate: '2017-02-02',
          destinationAirportCode: 'HOU',
          originationAirportCode: 'DAL'
        }
      });

      expect(fetchFlightStatusFnMock).toHaveBeenCalledWith(
        { date: '2017-02-02', from: 'DAL', to: 'HOU' },
        false,
        pushMock
      );
    });

    it('should create call fetchFlightStatusFnMock for normalized flight status route without query params', () => {
      isOnOldRouteMock.mockReturnValue(false);
      createComponent({
        flightSchedulesPage: {}
      });

      expect(fetchFlightStatusFnMock).toHaveBeenCalledWith(
        { date: '2017-02-02', from: 'DAL', to: 'HOU' },
        false,
        pushMock
      );
    });

    it('should trigger lookUpFlightDetails action when user click the flightCard', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.flight-card'));

      expect(lookUpFlightStatusDetailsFnMock).toBeCalledWith(
        {
          href: '/v1/mobile-air-operations/page/flight-status/details',
          method: 'GET',
          query: {
            "flight-keys": "2017-02-02:DALHOU1628"
          }
        },
        pushMock
      );
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      fetchFlightStatusFn: fetchFlightStatusFnMock,
      flightSchedulesPage: { response: mockResponse },
      lookUpFlightStatusDetailsFn: lookUpFlightStatusDetailsFnMock,
      params: {
        date: '2017-02-02',
        from: 'DAL',
        to: 'HOU'
      },
      push: pushMock
    };
    const combinedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockStoreWithRouterMiddleware()()}>
        <SearchFlightsResultsPage {...combinedProps} />
      </Provider>
    );
  };
});
