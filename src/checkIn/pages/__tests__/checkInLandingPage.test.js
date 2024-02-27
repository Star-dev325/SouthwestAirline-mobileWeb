import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { CheckInLandingPage } from 'src/checkIn/pages/checkInLandingPage';
import * as LoginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import UpcomingTripModelBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripsBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { mockErrorHeaderContainerWithJest } from 'test/unit/helpers/testUtils';

mockErrorHeaderContainerWithJest(jest);

describe('CheckInLandingPage', () => {
  let defaultProps;
  let fetchRecentTripSearchesFnStub;
  let fetchUpcomingTripsNonBlockingFnStub;
  let pushStub;
  let recentTripSearchesData;
  let retrieveCheckInReservationDetailsFnStub;
  let saveRecentTripSearchFnStub;

  beforeEach(() => {
    fetchRecentTripSearchesFnStub = jest.fn();
    fetchUpcomingTripsNonBlockingFnStub = jest.fn();
    pushStub = jest.fn();
    recentTripSearchesData = [];
    retrieveCheckInReservationDetailsFnStub = jest.fn(() => Promise.resolve());
    saveRecentTripSearchFnStub = jest.fn();

    defaultProps = {
      fetchRecentTripSearchesFn: fetchRecentTripSearchesFnStub,
      fetchUpcomingTripsNonBlockingFn: fetchUpcomingTripsNonBlockingFnStub,
      formData: null,
      isLoggedIn: false,
      push: pushStub,
      recentTripSearches: [],
      retrieveCheckInReservationDetailsFn: retrieveCheckInReservationDetailsFnStub,
      saveRecentTripSearchFn: saveRecentTripSearchFnStub,
      tripsThatNeedToCheckIn: []
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('page instance', () => {
    describe('rendered check in landing page', () => {
      it('should show check in eligible time range notice', () => {
        const { getByText } = createComponent(defaultProps);

        expect(getByText('CHECK_IN__CHECK_IN_ELIGIBLE_TIME_RANGE_NOTICE')).not.toBeNull();
      });

      describe('if you are logged in', () => {
        describe('and you are rendering checkInLandingPageInstance', () => {
          it('should fetch upcoming trips', () => {
            jest.spyOn(LoginSessionHelper, 'hasActiveSessionCookies').mockReturnValueOnce(true);
            createComponent({ ...defaultProps, isLoggedIn: true });
            expect(fetchUpcomingTripsNonBlockingFnStub).toBeCalled();
          });
        });

        describe("you don't have trips eligible for check in", () => {
          it('should not display the check in eligible trips link', () => {
            const { container } = createComponent({ ...defaultProps, isLoggedIn: true });

            expect(container.querySelector('.eligible-check-in-trips-link')).toBeNull();
          });
        });

        describe('you have 1 trip eligible for check in', () => {
          it('should display the check in eligible trips link', async () => {
            const { container } = createComponent({
              ...defaultProps,
              isLoggedIn: true,
              tripsThatNeedToCheckIn: new UpcomingTripModelBuilder()
                .withCheckinFlight({
                  firstName: 'first',
                  lastName: 'last',
                  recordLocator: 'ABC123'
                })
                .build().upcomingTripsPage
            });

            expect(container.querySelectorAll('.eligible-check-in-trips-link').length).toBe(1);

            await userEvent.click(container.querySelector('.eligible-check-in-trips-link--container'));

            expect(retrieveCheckInReservationDetailsFnStub).toBeCalledWith({
              firstName: 'first',
              lastName: 'last',
              recordLocator: 'ABC123'
            });
          });
        });

        describe('you have more then 1 trips eligible for check in', () => {
          it('should call pushStub with path when click on the trips link', async () => {
            const { container } = createComponent({
              ...defaultProps,
              isLoggedIn: true,
              tripsThatNeedToCheckIn: new UpcomingTripModelBuilder()
                .withCheckinFlight({
                  firstName: 'first',
                  lastName: 'last',
                  recordLocator: 'ABC123'
                })
                .withCheckinFlight()
                .build().upcomingTripsPage
            });

            await userEvent.click(container.querySelector('.eligible-check-in-trips-link--container'));
            expect(pushStub).toBeCalledWith('/my-account/upcoming-trips');
          });
        });
      });

      describe('if you are not logged in', () => {
        it('should not display the check in eligible trips link', () => {
          const { container } = createComponent(defaultProps);

          expect(container.querySelector('.eligible-check-in-trips-link')).toBeNull();
        });
      });

      describe('when using API gateway cookies', () => {
        it('should fetch upcoming trips if tokens exist', () => {
          jest.spyOn(LoginSessionHelper, 'hasActiveSessionCookies').mockReturnValueOnce(true);
          createComponent(defaultProps);

          expect(fetchUpcomingTripsNonBlockingFnStub).toBeCalled();
        });

        it('should not fetch upcoming trips if tokens are missing (even if isLoggedIn is true)', () => {
          createComponent({ ...defaultProps, isLoggedIn: true });

          expect(fetchUpcomingTripsNonBlockingFnStub).not.toBeCalled();
        });
      });

      describe('validation', () => {
        describe('when there are errors', () => {
          it('should show error icons on the fields that failed validation', async () => {
            const { getByText, container } = createComponent(defaultProps);

            await userEvent.click(getByText('VIEW_RESERVATION__RETRIEVE_RESERVATION'));

            waitFor(() => expect(container.querySelectorAll('.icon').length).toBe(4));
          });
        });
      });
    });
  });

  describe('recent trip search', () => {
    it('should render the recentTripSearches when searches are present', () => {
      recentTripSearchesData = [
        {
          firstName: 'Tom',
          lastName: 'Jones',
          recordLocator: 'UNGJ23'
        }
      ];
      const { queryByText } = createComponent({ ...defaultProps, recentTripSearches: recentTripSearchesData });

      expect(queryByText('SHARED__RECENT_SEARCHES__TRIP_SEARCH_TITLE')).not.toBeNull();
    });

    it('should not render the recentTripSearches when searches is empty', () => {
      const { queryByText } = createComponent(defaultProps);

      expect(queryByText('SHARED__RECENT_SEARCHES__TRIP_SEARCH_TITLE')).toBeNull();
    });

    it('should call the saveRecentTripSearchFn and fetchRecentTripSearchesFnStub when submit the form', async () => {
      const { getByText, getByPlaceholderText } = createComponent(defaultProps);

      await userEvent.type(getByPlaceholderText('SHARED__PLACEHOLDER__CONFIRMATION_NUMBER'), 'abcdef');
      await userEvent.type(getByPlaceholderText('SHARED__PLACEHOLDER__FIRST_NAME'), 'bobo');
      await userEvent.type(getByPlaceholderText('SHARED__PLACEHOLDER__LAST_NAME'), 'xu');

      await waitFor(() => userEvent.click(getByText('VIEW_RESERVATION__RETRIEVE_RESERVATION')));

      expect(saveRecentTripSearchFnStub).toBeCalledWith({
        firstName: 'bobo',
        lastName: 'xu',
        recordLocator: 'abcdef'
      });
      expect(fetchRecentTripSearchesFnStub).toBeCalled();
    });
  });

  const createComponent = (props = {}) => {
    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <CheckInLandingPage {...props} />
      </Provider>
    );
  };
});
