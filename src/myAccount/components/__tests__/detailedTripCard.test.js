jest.mock('@swa-ui/encryption', () => ({
  useHref: jest.fn().mockReturnValue({ href: 'mock_href' })
}));

import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import DetailedTripCard from 'src/myAccount/components/detailedTripCard';
import UpcomingTripBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripBuilder';
import UpcomingTripsBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripsBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();

describe('DetailedTripCard', () => {
  describe('when trip is within 24', () => {
    it('should show the boarding banner when trip has a segment that is boarding', () => {
      const page = new UpcomingTripBuilder().withBannerTypeAndText('POSITIVE', 'Now Boarding').build();
      const { _links, confirmationNumber, dates, pages, tripType } = page;

      const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });

      expect(container.querySelector('.banner_positive .banner-name').textContent).toContain('Now Boarding');
    });
  });

  describe('when there is a cancelled flight', () => {
    it('should show red banner', () => {
      const upcomingTripWithCancelledFight = new UpcomingTripsBuilder().withCancelledFlight().build();
      const oneSegmentEligibleTrip = upcomingTripWithCancelledFight.upcomingTripsPage[0];
      const { _links, confirmationNumber, dates, pages, tripType } = oneSegmentEligibleTrip;

      const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });

      expect(container.querySelector('.banner_negative .banner-name').textContent).toContain('Cancelled');
      expect(container.querySelector('.banner_negative .boarding-time').textContent).toContain('Boards 05:15AM');
    });
  });

  describe('segment header', () => {
    it('should show the confirmation number', () => {
      const tripThatIsCheckInEligibleTwoSegments = new UpcomingTripBuilder().with2SegmentsOnBound().build();
      const { _links, confirmationNumber, dates, pages, tripType } = tripThatIsCheckInEligibleTwoSegments;

      const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });

      expect(container.querySelectorAll('.trip-card-header--confirmation-number_number')).toHaveLength(2);
    });

    it('should display the trip card header with the destination first and a horizontal rule beneath the trip card header', () => {
      const upcomingTripThatIsWithin24HoursApiResponse = new UpcomingTripsBuilder()
        .withViewBoardingPositionFlight()
        .build();
      const trip = upcomingTripThatIsWithin24HoursApiResponse.upcomingTripsPage[0];
      const { _links, confirmationNumber, dates, pages, tripType } = trip;

      const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });

      expect(container).toMatchSnapshot();
    });

    describe('header uses segment destination description not trip destination description', () => {
      it('should show trip destination description for 1st trip card when not departed', () => {
        const upcomingNotDepartedTrip = new UpcomingTripsBuilder().withOneWayFlightHasConnection().build()
          .upcomingTripsPage[0];
        const { _links, confirmationNumber, dates, pages, tripType } = upcomingNotDepartedTrip;

        const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });
        const expectedDestinationAirport = upcomingNotDepartedTrip.pages[0].destinationDescription;

        expect(
          container.querySelector('.trip-card-header').querySelector('.trip-card-header--destination-airport')
            .textContent
        ).toContain(expectedDestinationAirport);
      });

      it('should show trip destination description for 2nd trip card when not departed', () => {
        const upcomingNotDepartedTrip = new UpcomingTripsBuilder().withOneWayFlightHasConnection().build()
          .upcomingTripsPage[0];
        const { _links, confirmationNumber, dates, pages, tripType } = upcomingNotDepartedTrip;

        const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });
        const expectedDestinationAirport = upcomingNotDepartedTrip.pages[1].destinationDescription;

        expect(
          container.querySelectorAll('.trip-card-header')[1].querySelector('.trip-card-header--destination-airport')
            .textContent
        ).toContain(expectedDestinationAirport);
      });

      it('should show segment destination description for 1st trip card when a connection', () => {
        const upcomingDepartedTrip = new UpcomingTripsBuilder().withDepartedFlightHasConnection().build()
          .upcomingTripsPage[0];
        const { _links, confirmationNumber, dates, pages, tripType } = upcomingDepartedTrip;

        const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });
        const expectedDestinationAirport = upcomingDepartedTrip.pages[0].destinationDescription;

        expect(
          container.querySelector('.trip-card-header').querySelector('.trip-card-header--destination-airport')
            .textContent
        ).toContain(expectedDestinationAirport);
      });
    });
  });

  describe('standbyCard', () => {
    let tripThatIsCheckInEligibleTwoSegments;

    beforeEach(() => {
      tripThatIsCheckInEligibleTwoSegments = new UpcomingTripBuilder().build();

      tripThatIsCheckInEligibleTwoSegments.pages[0].standbyFlight = {
        arrivalAirportCode: 'AUS',
        arrivalTime: '09:55',
        departureTime: '09:00',
        flightNumber: '726',
        hasWifi: true,
        viewStandbyList: {
          body: {},
          href: '/v1/mobile-air-operations/page/standby',
          method: 'GET',
          query: {}
        }
      };
    });

    it('should show standby banner for non-rev passenger', () => {
      tripThatIsCheckInEligibleTwoSegments.pages[0].isNonRevPnr = true;
      tripThatIsCheckInEligibleTwoSegments.pages[0].bannerType = 'DEFAULT';
      tripThatIsCheckInEligibleTwoSegments.pages[0].bannerText = 'You are on standby to MDW';

      const { _links, confirmationNumber, dates, pages, tripType } = tripThatIsCheckInEligibleTwoSegments;

      const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });

      expect(container.querySelector('.banner.banner_default .banner-name').textContent).toContain(
        'You are on standby to MDW'
      );
    });
  });

  describe('carousel', () => {
    it('should not have a carousel for one segment', () => {
      const oneSegmentEligibleTrip = new UpcomingTripBuilder().build();
      const { _links, confirmationNumber, dates, pages, tripType } = oneSegmentEligibleTrip;

      const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });

      expect(container.querySelector('.carousel-dots-container')).toBeNull();
    });

    it('should have a carousel for multiple segments', () => {
      const tripThatIsCheckInEligibleTwoSegments = new UpcomingTripBuilder().with2SegmentsOnBound().build();
      const { _links, confirmationNumber, dates, pages, tripType } = tripThatIsCheckInEligibleTwoSegments;

      const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });

      expect(container.querySelectorAll('.carousel-dots-container')).toHaveLength(1);
    });
  });

  describe('overnight', () => {
    it('should show overnight indicator when isOvernight is true', () => {
      const page = new UpcomingTripBuilder().withOvernight().build();
      const { _links, confirmationNumber, dates, pages, tripType } = page;

      const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });

      expect(container.querySelector('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });

    it('should not show overnight indicator when isOvernight is false', () => {
      const page = new UpcomingTripBuilder().withoutOvernight().build();
      const { _links, confirmationNumber, dates, pages, tripType } = page;

      const { container } = createComponent({ _links, confirmationNumber, dates, pages, tripType });

      expect(container.querySelector('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      UPGRADED_BOARDING: false,
      onCheckInButtonClick: () => {},
      onClickDetailsButton: () => {},
      onClickEBCheckInButton: () => {},
      onClickStandbyList: () => {},
      onSelectNewFlightForCancelledFlight: () => {},
      onUpgradedBoardingButtonClick: () => {},
      onViewBoardingPassButtonClickCb: () => {},
      onViewBoardingPositionsButtonClick: () => {},
      pnr: {},
      tripIndex: 0
    };

    const tripCardProps = { ...defaultProps, ...props };
    const store = mockStore({
      app: {
        toggles: {
          AIRCRAFT_TYPE_TRIPCARD: false
        }
      }
    });

    return render(
      <Provider store={store}>
        <DetailedTripCard {...tripCardProps} />
      </Provider>
    );
  };
});
