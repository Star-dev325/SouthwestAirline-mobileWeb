import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { CarBookingRecentSearchesPage } from 'src/carBooking/pages/carBookingRecentSearchesPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const noop = jest.fn();

describe('CarBookingRecentSearchesPage', () => {
  let saveSelectedRecentSearchRequestStub;
  let deleteRecentSearchStub;
  let clearFormDataByIdStub;
  let goBackStub;

  const searchRequests = [
    {
      dropOff: 'DAL',
      dropOffDate: dayjs().format('YYYY-MM-DD'),
      dropOffTime: '11:30AM',
      pickUp: 'AUS',
      pickUpDate: dayjs().format('YYYY-MM-DD'),
      pickUpTime: '11:30AM',
      vehicleType: 'Mid-size'
    }
  ];

  beforeEach(() => {
    saveSelectedRecentSearchRequestStub = noop;
    deleteRecentSearchStub = noop;
    clearFormDataByIdStub = noop;
    goBackStub = noop;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const createPageComponent = (props = {}) => {
    const state = {
      app: {},
      router: {
        location: {
          search: ''
        }
      }
    };
    const defaultProps = {
      searchRequests: [],
      saveSelectedRecentSearchRequestFn: saveSelectedRecentSearchRequestStub,
      deleteRecentSearchFn: deleteRecentSearchStub,
      clearFormDataByIdFn: clearFormDataByIdStub,
      goBack: goBackStub
    };

    const mergedProps = { ...defaultProps, ...props };

    return render((
      <Provider store={createMockedFormStore(state)}>
        <Router>
          <CarBookingRecentSearchesPage {...mergedProps} />
        </Router>
      </Provider>
    ));
  };

  it('should display no-results message when there are no recent searches searches', () => {
    const { container } = createPageComponent();

    expect(container.querySelectorAll('[data-qa="recent-searches-no-results"]')).not.toBeNull();
  });

  it('should display as many search request cards as stored recent searches', () => {
    const { container } = createPageComponent({ searchRequests });
    const recentSearchCards = container.querySelectorAll('[data-qa="recent-search-card"]');

    expect(recentSearchCards).toHaveLength(1);
  });

  describe('edit searches', () => {
    describe('we have recent searches', () => {
      it('should have edit button and no delete button on the recent search card', () => {
        const { container } = createPageComponent({ searchRequests });
        const editButton = container.querySelector('.action-bar-buttons--item');
        const recentSearch = container.querySelector('[data-qa="recent-search-card"]');

        expect(editButton).toHaveTextContent(i18n('SHARED__RECENT_SEARCHES__EDIT'));
        expect(recentSearch.querySelector('.icon_delete')).not.toBeInTheDocument();
      });

      describe('click on Edit button', () => {
        it('should show DONE button', () => {
          const { container } = createPageComponent({ searchRequests });

          fireEvent.click(container.querySelector('.action-bar-buttons--item .button'));

          expect(container.querySelectorAll('.action-bar-buttons--item')).toHaveLength(1);
          expect(container.querySelector('.action-bar-buttons--item')).toHaveTextContent(i18n('SHARED__RECENT_SEARCHES__DONE'));
        });

        it('should show delete button on the recent searches', () => {
          const { container } = createPageComponent({ searchRequests });
          const recentSearch = container.querySelector('[data-qa="recent-search-card"]');
           
          fireEvent.click(container.querySelector('.button'));

          expect(recentSearch.querySelector('.icon_delete')).not.toBeNull();
        });

        describe('click on recent search delete button', () => {
          it('should delete the recent search', () => {
            const { container } = createPageComponent({ searchRequests });
            const recentSearch = container.querySelector('[data-qa="recent-search-card"]');
            
            fireEvent.click(container.querySelector('.button'));

            fireEvent.click(recentSearch.querySelector('.icon_delete'));

            expect(deleteRecentSearchStub).toHaveBeenCalledWith(searchRequests, 0);
          });
        });

        describe('click on Done button', () => {
          it('should switch back to EDIT button', () => {
            const { container } = createPageComponent({ searchRequests });

            fireEvent.click(container.querySelector('.button'));

            expect(container.querySelectorAll('.action-bar-buttons--item')).toHaveLength(1);
            expect(container.querySelector('.action-bar-buttons--item')).toHaveTextContent(i18n('SHARED__RECENT_SEARCHES__DONE'));
          });

          it('should hide delete button on the recent searches', () => {
            const { container } = createPageComponent({ searchRequests });

            fireEvent.click(container.querySelector('.button'));
            const recentSearch = container.querySelector('div[data-qa="recent-search-card"]');

            expect(recentSearch.querySelector('.icon_delete')).not.toBeNull();
          });
        });
      });
    });

    describe('click recent search card', () => {
      it('should trigger saveSelectedRecentSearchRequest action', () => {
        const { container } = createPageComponent({ searchRequests });
        const recentSearch = container.querySelector('[data-testid="recent-search-card-click"]');
        
        fireEvent.click(recentSearch);
        
        expect(saveSelectedRecentSearchRequestStub).toHaveBeenCalled();
        expect(saveSelectedRecentSearchRequestStub).toHaveBeenCalledWith(searchRequests[0]);
      });

      it('should transition to carBooking page with original form cleared', () => {
        const { container } = createPageComponent({ searchRequests });
        const recentSearch = container.querySelector('[data-testid="recent-search-card-click"]');
        
        fireEvent.click(recentSearch);

        expect(clearFormDataByIdStub).toHaveBeenCalled();
        expect(goBackStub).toHaveBeenCalledWith();
      });
    });

    describe('we do not have recent searches', () => {
      it('should not have edit button', () => {
        const { container } = createPageComponent();

        expect(container.querySelector('.action-bar-buttons--item')).toBeNull();
      });
    });
  });
});
