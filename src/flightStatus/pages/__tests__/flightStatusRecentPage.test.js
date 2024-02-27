jest.mock('test/unit/helpers/testUtils', () => ({
  mockErrorHeaderContainer: jest.fn()
}));
import { fireEvent, render } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { Provider } from 'react-redux';
import * as FlightStatusSearchActions from 'src/flightStatus/actions/flightStatusSearchActions';
import { flightStatusOldRoutes } from 'src/flightStatus/constants/flightStatusRoutes';
import FlightSearchHistoryLocalStorageHelper from 'src/flightStatus/helper/flightSearchHistoryLocalStorageHelper';
import { FlightStatusRecentPage } from 'src/flightStatus/pages/flightStatusRecentPage';
import { transformToFlightSearchRequest } from 'src/flightStatus/transformers/flightStatusTransformer';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';

describe('FlightStatusRecentPage', () => {
  let clearFormDataByIdMock;
  let goBackMock;
  let onDeleteMock;
  let saveSelectedMock;

  beforeEach(() => {
    FlightStatusSearchActions.getRecentSearchesFromLocalStorage();
    clearFormDataByIdMock = jest.fn();
    goBackMock = jest.fn();
    mockErrorHeaderContainer();
    onDeleteMock = jest.fn();
    prepareSearchRequestInStore();
    saveSelectedMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    FlightSearchHistoryLocalStorageHelper.reset();
  });

  describe('render', () => {
    it('should render recent searches list only contain yesterday, today and tomorrow', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('[data-qa="recent-search-card"]')).toHaveLength(2);
    });
  });

  describe('Delete button', () => {
    it('should delete one flight status recent search when user click delete button on edit mode', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.action-bar--right-buttons').querySelector('Button'));
      fireEvent.click(container.querySelector('.recent-search-card--delete-icon'));

      expect(onDeleteMock).toBeCalledWith(FlightSearchHistoryLocalStorageHelper.get()[0]);
    });
  });

  describe('user click the recent card', () => {
    it('should go back to flight status landing page with original form cleared', () => {
      const { container } = createComponent({
        initialEntries: [flightStatusOldRoutes['index'], flightStatusOldRoutes['recent']],
        initialIndex: 1
      });

      fireEvent.click(container.querySelector('.segment'));

      expect(clearFormDataByIdMock).toHaveBeenCalled();
      expect(goBackMock).toHaveBeenCalled();
    });

    it('should reset the flight status landing page form cached data before go back', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.segment'));

      expect(saveSelectedMock).toBeCalledWith(FlightSearchHistoryLocalStorageHelper.get()[0]);
    });
  });

  const createComponent = (props = {}) => {
    const initialProps = {
      clearFormDataByIdFn: clearFormDataByIdMock,
      goBack: goBackMock,
      onDeleteCurrentSearchFn: onDeleteMock,
      saveSelectedRecentSearchRequestFn: saveSelectedMock,
      searches: FlightSearchHistoryLocalStorageHelper.get()
    };
    const mergedProps = { ...initialProps, ...props };
    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <FlightStatusRecentPage {...mergedProps} />
      </Provider>
    );
  };

  const prepareSearchRequestInStore = () => {
    FlightSearchHistoryLocalStorageHelper.reset();
    FlightSearchHistoryLocalStorageHelper.save(
      transformToFlightSearchRequest('AUS', 'BWL', dayjs().subtract(3, 'days').format('YYYY-MM-DD'), '321')
    );
    FlightSearchHistoryLocalStorageHelper.save(
      transformToFlightSearchRequest('AUS', 'BWL', dayjs().subtract(2, 'days').format('YYYY-MM-DD'), '321')
    );
    FlightSearchHistoryLocalStorageHelper.save(
      transformToFlightSearchRequest('AUS', 'BWL', dayjs().subtract(1, 'days').format('YYYY-MM-DD'))
    );
    FlightSearchHistoryLocalStorageHelper.save(
      transformToFlightSearchRequest('AUS', 'BWL', dayjs().format('YYYY-MM-DD'), '321')
    );
  };
});
