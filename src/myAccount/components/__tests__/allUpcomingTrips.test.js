jest.mock('@swa-ui/encryption', () => ({
  useHref: jest.fn().mockReturnValue({ href: 'mock_href' })
}));

import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import AllUpcomingTrips from 'src/myAccount/components/allUpcomingTrips';
import UpcomingTripBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();

describe('When user navigates to upcoming trips page', () => {
  const noop = () => {};
  let tripThatIsNotWithin48Hours;
  let tripWithin48Hours;

  beforeEach(() => {
    tripThatIsNotWithin48Hours = new UpcomingTripBuilder().withIsWithin48Hours(false).build();
    tripWithin48Hours = new UpcomingTripBuilder().withIsWithin48Hours(true).build();
  });

  describe('and has no upcoming trips', () => {
    it('the page should not display trip cards', () => {
      const { container } = createComponent([]);

      expect(container.querySelector('.compact-trip-card')).toBeNull();
      expect(container.querySelector('.detailed-trip-card')).toBeNull();
    });
  });

  describe('and has one upcoming trip', () => {
    describe('which is within 48 hours', () => {
      it('the page should show flight details', () => {
        const { container } = createComponent([tripWithin48Hours]);

        expect(container.querySelector('.detailed-trip-card')).not.toBeNull();
        expect(container.querySelector('.compact-trip-card')).toBeNull();
      });

      it('should not show flight details when pages is null', () => {
        tripWithin48Hours = new UpcomingTripBuilder().withIsWithin48Hours(true).withNonPages().build();

        const { container } = createComponent([tripWithin48Hours]);

        expect(container.querySelector('.detailed-trip-card')).toBeNull();
        expect(container.querySelector('.compact-trip-card')).not.toBeNull();
      });
    });

    describe('which does not have pages', () => {
      it(`the page should not show flight details`, () => {
        const tripWithin48HoursNoPages = tripWithin48Hours;

        tripWithin48HoursNoPages.pages = [];
        tripWithin48HoursNoPages.isWithin48Hours = false;

        const { container } = createComponent([tripWithin48HoursNoPages]);

        expect(container.querySelector('.compact-trip-card')).not.toBeNull();
        expect(container.querySelector('.detailed-trip-card')).toBeNull();
      });
    });

    describe('which is not within 48 hours', () => {
      it(`the page should not show flight details`, () => {
        const { container } = createComponent([tripThatIsNotWithin48Hours]);

        expect(container.querySelector('.detailed-trip-card')).toBeNull();
        expect(container.querySelector('.compact-trip-card')).not.toBeNull();
      });
    });
  });

  describe('and has two upcoming flights', () => {
    describe('where both are within 48 hours', () => {
      it('the page should display two detailed trip card', () => {
        const { container } = createComponent([tripWithin48Hours, tripWithin48Hours]);

        expect(container.querySelectorAll('.detailed-trip-card')).toHaveLength(2);
      });
    });

    describe('where one is within 48 hours and the other is not', () => {
      it('the page should display two trip cards where one has flight details', () => {
        const { container } = createComponent([tripWithin48Hours, tripThatIsNotWithin48Hours]);

        expect(container.querySelector('.compact-trip-card')).not.toBeNull();
        expect(container.querySelector('.detailed-trip-card')).not.toBeNull();
      });
    });
  });

  const createComponent = (upcomingTrips) => {
    const defaultProps = {
      onCheckInButtonClick: noop,
      onClickEBCheckInButton: noop,
      onClickStandbyList: noop,
      onClickTripCard: noop,
      onSelectNewFlightForCancelledFlight: noop,
      onUpgradedBoardingButtonClick: noop,
      onViewBoardingPassButtonClickCb: noop,
      onViewBoardingPositionsButtonClick: noop,
      UPGRADED_BOARDING: false
    };

    const store = mockStore({
      app: {
        toggles: {
          AIRCRAFT_TYPE_TRIPCARD: false
        }
      }
    });

    const props = { trips: upcomingTrips, ...defaultProps };

    return render(
      <Provider store={store}>
        <AllUpcomingTrips {...props} />
      </Provider>
    );
  };
});
