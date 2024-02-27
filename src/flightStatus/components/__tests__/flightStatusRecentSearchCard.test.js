import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import FlightStatusRecentSearchCard from 'src/flightStatus/components/flightStatusRecentSearchCard';

describe('FlightStatusRecentSearchCard Component', () => {
  let onRecentSearchCardClickedMock;
  let onDeleteCurrentSearchMock;

  beforeEach(() => {
    onRecentSearchCardClickedMock = jest.fn();
    onDeleteCurrentSearchMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when there are recent searches', () => {
    let recentSearchRequest;

    beforeEach(() => {
      recentSearchRequest = {
        from: 'DAL',
        to: 'AUS',
        date: '2017-07-12'
      };
    });

    it('should display FlightsConnect which contain the origin and destination airport code', () => {
      const { container } = createComponent({ searchRequest: recentSearchRequest });
      const flightsConnect = container.querySelector('.flights-connect');

      expect(flightsConnect).not.toBeNull();
      expect(flightsConnect.textContent).toContain('DAL');
      expect(flightsConnect.textContent).toContain('AUS');
    });

    it('should render the flight status search with correct search date', () => {
      const { container } = createComponent({ searchRequest: recentSearchRequest });

      expect(container.querySelector('.travel-period').textContent).toContain('Wed, Jul 12');
    });

    it('should not display the flight number when user search flight status without it', () => {
      const { container } = createComponent({ searchRequest: recentSearchRequest });

      expect(container.querySelector('.travel-period').textContent).not.toContain('Flight');
    });

    it('should render the flight number when user search flight status with it', () => {
      const { container } = createComponent({ searchRequest: { ...recentSearchRequest, flightNumber: '897' } });

      expect(container.querySelector('.travel-period').textContent).toContain('- Flight 897');
    });

    it('should call onDeleteCurrentSearch', () => {
      const { container } = createComponent({ searchRequest: recentSearchRequest });

      fireEvent.click(container.querySelector('.segment'));

      expect(onRecentSearchCardClickedMock).toHaveBeenCalledWith(recentSearchRequest);
    });

    it('should call onRecentSearchCardClicked', () => {
      const { container } = createComponent({ searchRequest: recentSearchRequest, shouldShowDeleteButton: true });

      fireEvent.click(container.querySelector('.recent-search-card--delete-icon'));

      expect(onDeleteCurrentSearchMock).toHaveBeenCalledWith(recentSearchRequest);
    });
  });

  const createComponent = (props = {}) => {
    const componentProps = {
      onDeleteCurrentSearch: onDeleteCurrentSearchMock,
      onRecentSearchCardClicked: onRecentSearchCardClickedMock,
      shouldShowDeleteButton: false,
      ...props
    };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <FlightStatusRecentSearchCard {...componentProps} />
      </Provider>
    );
  };
});
