import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import MyTripsPanel from 'src/myAccount/components/myTripsPanel';
import UpcomingTripBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripBuilder';

describe('My Trips Panel', () => {
  const noop = () => {};

  describe('saved flights prop', () => {
    describe('when user clicks on saved flights', () => {
      it('should call the onClickSavedFlights prop', () => {
        const onClickSavedFlightsMock = jest.fn();
        const props = buildProps({ onClickSavedFlights: onClickSavedFlightsMock });
        const { container } = render(<MyTripsPanel {...props} />);
        const savedFlightsButton = container.querySelector('div.my-trips-panel--saved-flights-button');

        fireEvent.click(savedFlightsButton);

        expect(onClickSavedFlightsMock).toHaveBeenCalled();
      });
    });
  });

  describe('next trip prop', () => {
    describe('when null', () => {
      it("renders the nextTrip as the Let's Go message", () => {
        const props = buildProps({ numberOfUpcomingTrips: 0 });
        const { container } = render(<MyTripsPanel {...props} />);
        const callToAction = container.querySelector('.my-trips-panel--book-trip-call-to-action');

        expect(callToAction.textContent).toContain(i18n('MY_ACCOUNT__MY_TRIPS_PANEL__LETS_GO'));
      });

      it('calls the onClickBookATrip prop', () => {
        const props = buildProps({
          numberOfUpcomingTrips: 0,
          onClickBookATrip: jest.fn()
        });

        const { container } = render(<MyTripsPanel {...props} />);

        fireEvent.click(container.querySelector('.my-trips-panel--book-trip-call-to-action'));

        expect(props.onClickBookATrip).toHaveBeenCalled();
      });

      it('shows the "Find a Trip" nav item', () => {
        const props = buildProps({
          numberOfUpcomingTrips: 0
        });

        const { container } = render(<MyTripsPanel {...props} />);

        expect(container.querySelector('div.my-trips-panel--find-a-trip').textContent).toContain(
          i18n('MY_ACCOUNT__MY_TRIPS_PANEL__FIND_A_TRIP')
        );
      });
    });

    describe('when given', () => {
      it('renders the nextTrip label as "Up Next" as well as the date range and trip title', () => {
        const props = buildProps({
          nextTrip: new UpcomingTripBuilder().build()
        });

        const { container } = render(<MyTripsPanel {...props} />);
        const nextTripDate = container.querySelector('.my-trips-panel--next-trip-date');
        const nextTripLabel = container.querySelector('.my-trips-panel--next-trip-label');
        const nextTripTitle = container.querySelector('.my-trips-panel--next-trip-title');

        expect(nextTripLabel.textContent).toContain(i18n('MY_ACCOUNT__MY_TRIPS_PANEL__UP_NEXT'));
        expect(nextTripDate.textContent).toContain('Oct 12 - 14');
        expect(nextTripTitle.textContent).toContain('Austin');
      });
    });
  });

  describe('past flights prop', () => {
    describe('when user clicks on past flights', () => {
      it('should call the onClickPastFlights prop', () => {
        const onClickPastFlightsMock = jest.fn();
        const props = buildProps({ onClickPastFlights: onClickPastFlightsMock });
        const { container } = render(<MyTripsPanel {...props} />);

        const pastButton = container
          .querySelector('.my-trips-panel--past-and-saved-links')
          .querySelector('.my-account-nav-item');

        fireEvent.click(pastButton);

        expect(onClickPastFlightsMock).toHaveBeenCalled();
      });
    });
  });

  describe('upcoming trips count label', () => {
    describe('when there is more than one upcoming trip', () => {
      it('should be pluralized', () => {
        const { container } = render(<MyTripsPanel {...buildProps({ numberOfUpcomingTrips: 2 })} />);

        expect(container.querySelector('div.my-trips-panel--upcoming-trip-count').textContent).toContain(
          '2 Upcoming Trips'
        );
      });
    });

    describe('when there is only one upcoming trip', () => {
      it('should not be shown', () => {
        const { container } = render(<MyTripsPanel {...buildProps({ numberOfUpcomingTrips: 1 })} />);

        expect(container.querySelector('.my-trips-panel--upcoming-trip-count')).toBeNull();
      });
    });

    describe('when upcoming trip response has not been received', () => {
      it('should not be shown', () => {
        const { container } = render(<MyTripsPanel {...buildProps({ upcomingTripsApiResponseWasReceived: false })} />);

        expect(container.querySelector('.my-trips-panel--upcoming-trip-count')).toBeNull();
      });
    });
  });

  const buildProps = (props = {}) => {
    const defaults = {
      numberOfUpcomingTrips: 0,
      onClickBookATrip: noop,
      onClickFindATrip: noop,
      onClickNextTrip: noop,
      onClickPastFlights: noop,
      onClickSavedFlights: noop,
      onClickUpcomingTripCount: noop,
      upcomingTripsApiResponseWasReceived: true
    };

    return { ...defaults, ...props };
  };
});
