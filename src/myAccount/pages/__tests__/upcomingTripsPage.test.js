jest.mock('@swa-ui/encryption', () => ({
  useHref: jest.fn().mockReturnValue({ href: 'mock_href' })
}));
jest.mock('src/shared/helpers/browserObject', () => ({
  ...jest.requireActual,
  location: { pathname: 'account' }
}));

import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { UpcomingTripsPage } from 'src/myAccount/pages/upcomingTripsPage';
import UpcomingTripBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripBuilder';
import UpcomingTripsBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripsBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';
import FakeClock from 'test/unit/helpers/fakeClock';

describe('UpcomingTripsPage', () => {
  const getUpgradedBoardingReservationFnMock = jest.fn();
  let checkEnhancedStandbyNearAirportFnMock;
  let checkInFnMock;
  let clearFlightReservationFnMock;
  let clearUpcomingTripsFnMock;
  let getReserveCheckInReservationFnMock;
  let getUpcomingTripsFnMock;
  let goDirectlyToBoardingPassesFnMock;
  let pushMock;
  let resetCheckInFlowDataFnMock;
  let resetSelectedAirportInfoFnMock;
  let retrieveBookingTeaserFnMock;
  let retrieveCarReservationFnMock;
  let retrieveFlightReservationFnMock;
  let retrieveReservationChangeableFnMock;
  let setFlowStatusFnMock;
  let setTripTypeForDetailsPageFnMock;
  let showShareLinkForCheckinFnMock;
  let transitToBoardingPositionFnMock;
  let updateIsRevenueAnalyticsFnMock;
  let viewBoardingPassesLink;

  beforeEach(() => {
    checkEnhancedStandbyNearAirportFnMock = jest.fn();
    checkInFnMock = jest.fn().mockResolvedValue('');
    clearFlightReservationFnMock = jest.fn();
    clearUpcomingTripsFnMock = jest.fn();
    getReserveCheckInReservationFnMock = jest.fn();
    getUpcomingTripsFnMock = jest.fn();
    goDirectlyToBoardingPassesFnMock = jest.fn();
    pushMock = jest.fn();
    resetCheckInFlowDataFnMock = jest.fn();
    resetSelectedAirportInfoFnMock = jest.fn();
    retrieveBookingTeaserFnMock = jest.fn();
    retrieveCarReservationFnMock = jest.fn().mockResolvedValue('');
    retrieveFlightReservationFnMock = jest.fn().mockResolvedValue('');
    retrieveReservationChangeableFnMock = jest.fn().mockResolvedValue('');
    setFlowStatusFnMock = jest.fn();
    setTripTypeForDetailsPageFnMock = jest.fn();
    showShareLinkForCheckinFnMock = jest.fn();
    transitToBoardingPositionFnMock = jest.fn();
    updateIsRevenueAnalyticsFnMock = jest.fn();
    viewBoardingPassesLink = {
      body: {
        checkInSessionToken: null,
        firstName: 'STEVEN',
        lastName: 'JACKIE',
        recordLocator: 'ABC123',
        travelerID: ['123']
      },
      href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
      labelText: 'Boarding pass',
      method: 'POST'
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generally', () => {
    describe('on mount', () => {
      it('should fetch upcoming trips', () => {
        createComponent();

        expect(getUpcomingTripsFnMock).toHaveBeenCalled();
      });

      it('should display number of upcoming trips', () => {
        const { container } = createComponent();

        expect(container.querySelector('.my-trips-number-header')).not.toBeNull();
      });
    });

    it('should clear upcoming trips on unmount', () => {
      const { unmount } = createComponent();

      unmount();

      expect(getUpcomingTripsFnMock).toHaveBeenCalled();
    });
  });

  describe('with no upcoming trips', () => {
    it('should display BookingTeaser', () => {
      const { container } = createComponent();

      expect(container.querySelector('.booking-teaser-btn-wrapper')).not.toBeNull();
    });

    it('should not display all upcoming trips', () => {
      const { container } = createComponent();

      expect(container.querySelector('.trip-card')).toBeNull();
    });

    it('should push to the air booking search page on clicking the "Book A Trip" button', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('button'));

      expect(pushMock).toHaveBeenCalledWith('/air/booking/');
    });
  });

  describe('with upcoming trips', () => {
    it('should not display BookingTeaser', () => {
      const { container } = createComponent({
        upcomingTripsPage: new UpcomingTripsBuilder().withCheckinFlight().build().upcomingTripsPage
      });

      expect(container.querySelector('.booking-teaser-btn-wrapper')).toBeNull();
    });

    it('should display all upcoming trips', () => {
      const { container } = createComponent({
        upcomingTripsPage: new UpcomingTripsBuilder().withCheckinFlight().build().upcomingTripsPage
      });

      expect(container.querySelector('.trip-card')).not.toBeNull();
    });

    describe('and you tap a trip card with flight', () => {
      it('should transition to details for that card', () => {
        const { container } = createComponent({
          upcomingTripsPage: new UpcomingTripsBuilder().withCheckinFlight().build().upcomingTripsPage
        });

        fireEvent.click(container.querySelector('.detailed-trip-card--detail-button'));

        expect(pushMock).toHaveBeenCalledWith('/my-account/upcoming-trip-details/0?recordLocator=QIP34B', null, null, {
          firstName: 'STEVEN',
          lastName: 'JACKIE'
        });
      });

      it('should clear flight reservation', () => {
        const { container } = createComponent({
          upcomingTripsPage: new UpcomingTripsBuilder().withCheckinFlight().build().upcomingTripsPage
        });

        fireEvent.click(container.querySelector('.detailed-trip-card--detail-button'));

        expect(clearFlightReservationFnMock).toHaveBeenCalled();
      });
    });

    describe('and one multi segment flight is check in eligible', () => {
      describe('when one departure or arrival time is in a different timezone than the current device timezone', () => {
        beforeEach(() => {
          FakeClock.setTimeTo('2016-01-22T00:00:00.000-05:00');
        });

        afterEach(() => {
          FakeClock.restore();
        });

        it('should show times of each segment in the timezone for their airports', () => {
          const { container } = createComponent({
            upcomingTripsPage: new UpcomingTripsBuilder().withCheckinFlight().build().upcomingTripsPage
          });

          FakeClock.tick();

          expect(container.querySelector('.flight-segment-details--time-block-time').textContent).toContain('6:35AM');
        });
      });

      describe('but has not checked in yet', () => {
        it('should show `Check in` button for each segment', () => {
          const { container } = createComponent({
            upcomingTripsPage: mockWithOneCheckInEligibleFlightNotCheckedInYet().upcomingTripsPage
          });

          expect(container.querySelectorAll('Button')[1].textContent).toContain(i18n('SHARED__BUTTON_TEXT__CHECK_IN'));
        });

        it('should call check in confirmation page when click check in button', () => {
          const { container } = createComponent({
            upcomingTripsPage: mockWithOneCheckInEligibleFlightNotCheckedInYet().upcomingTripsPage
          });

          fireEvent.click(container.querySelectorAll('Button')[1]);

          expect(getReserveCheckInReservationFnMock).toHaveBeenCalledWith(
            {
              firstName: 'STEVEN',
              lastName: 'JACKIE',
              recordLocator: 'STMXQ6'
            },
            false
          );
        });

        describe('and you are within one hour of departure domestic flight', () => {
          it('should display a detailed trip-card', () => {
            const withinOneHourDomesticTrip = new UpcomingTripBuilder()
              .withCheckInIneligibilityReason('MBP_UNAVAILABLE_TOO_CLOSE_TO_DEPARTURE_DOMESTIC')
              .build();

            const { container } = createComponent({
              upcomingTripsPage: new UpcomingTripsBuilder().addUpcomingTrip(withinOneHourDomesticTrip).build()
                .upcomingTripsPage
            });

            expect(container.querySelector('.detailed-trip-card')).not.toBeNull();
          });

          it('should not have any buttons', () => {
            const withinOneHourDomesticTrip = new UpcomingTripBuilder()
              .withCheckInIneligibilityReason('MBP_UNAVAILABLE_TOO_CLOSE_TO_DEPARTURE_DOMESTIC')
              .build();

            const { queryByText } = createComponent({
              upcomingTripsPage: new UpcomingTripsBuilder().addUpcomingTrip(withinOneHourDomesticTrip).build()
                .upcomingTripsPage
            });

            expect(queryByText(i18n('SHARED__BUTTON_TEXT__CHECK_IN'))).toBeNull();
          });
        });

        describe('and you are within 90 minutes of departure international flight', () => {
          it('should display a detailed trip-card', () => {
            const within90MinutesInternationalTrip = new UpcomingTripBuilder()
              .withInternational()
              .withCheckInIneligibilityReason('MBP_UNAVAILABLE_TOO_CLOSE_TO_DEPARTURE_DOMESTIC')
              .build();

            const { container } = createComponent({
              upcomingTripsPage: new UpcomingTripsBuilder().addUpcomingTrip(within90MinutesInternationalTrip).build()
                .upcomingTripsPage
            });

            expect(container.querySelector('.detailed-trip-card')).not.toBeNull();
          });

          it('should not have any buttons', () => {
            const within90MinutesInternationalTrip = new UpcomingTripBuilder()
              .withInternational()
              .withCheckInIneligibilityReason('MBP_UNAVAILABLE_TOO_CLOSE_TO_DEPARTURE_DOMESTIC')
              .build();

            const { queryByText } = createComponent({
              upcomingTripsPage: new UpcomingTripsBuilder().addUpcomingTrip(within90MinutesInternationalTrip).build()
                .upcomingTripsPage
            });

            expect(queryByText(i18n('SHARED__BUTTON_TEXT__CHECK_IN'))).toBeNull();
          });
        });

        const mockWithOneCheckInEligibleFlightNotCheckedInYet = () => {
          const trip = new UpcomingTripBuilder().withCheckInEligible().withCheckedIn(false).build();

          return new UpcomingTripsBuilder().addUpcomingTrip(trip).build();
        };
      });

      describe('and has already checked in', () => {
        describe('and is eligible for mobile boarding pass', () => {
          it('should show `Boarding Pass` button for each segment', () => {
            const { container } = createComponent({
              upcomingTripsPage: mobileBoardingPassEligibleFlight().upcomingTripsPage
            });

            const yellowButton = container.querySelector('.button--yellow');

            expect(yellowButton.textContent).toContain('Boarding pass');
          });

          it('should show boarding group and position for each segment', () => {
            const { container } = createComponent({
              upcomingTripsPage: mobileBoardingPassEligibleFlight().upcomingTripsPage
            });

            expect(container).toMatchSnapshot();
          });

          it('should not show the visit a kiosk message', () => {
            const { container } = createComponent({
              upcomingTripsPage: mobileBoardingPassEligibleFlight().upcomingTripsPage
            });

            expect(container.textContent).not.toContain(i18n('CHECK_IN__VISIT_A_KIOSK'));
          });

          describe('when click view boarding pass', () => {
            it('should call goDirectlyToBoardingPassesFnStub with viewBoardingPassIssuance', () => {
              const { container } = createComponent({
                upcomingTripsPage: mobileBoardingPassEligibleFlight().upcomingTripsPage
              });

              fireEvent.click(container.querySelector('.button--yellow'));

              expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
                firstName: 'STEVEN',
                lastName: 'JACKIE',
                queryParams: null,
                recordLocator: 'STMXQ6',
                viewBoardingPassesLink
              });
            });

            it('should call resetFlowData action to reset the check in flow status', () => {
              const { container } = createComponent({
                upcomingTripsPage: mobileBoardingPassEligibleFlight().upcomingTripsPage
              });

              fireEvent.click(container.querySelector('.button--yellow'));

              expect(resetCheckInFlowDataFnMock).toHaveBeenCalled();
            });

            it('should call showShareLink action to set shouldShowShareLink to true', () => {
              const { container } = createComponent({
                upcomingTripsPage: mobileBoardingPassEligibleFlight().upcomingTripsPage
              });

              fireEvent.click(container.querySelector('.button--yellow'));

              expect(showShareLinkForCheckinFnMock).toHaveBeenCalled();
            });

            it('should call goDirectlyToBoardingPassesFnStub when click `Boarding Pass` and have no query params', () => {
              const { container } = createComponent({
                upcomingTripsPage: mobileBoardingPassEligibleFlight().upcomingTripsPage
              });

              fireEvent.click(container.querySelector('.button--yellow'));

              expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
                firstName: 'STEVEN',
                lastName: 'JACKIE',
                queryParams: null,
                recordLocator: 'STMXQ6',
                viewBoardingPassesLink
              });
            });

            it('should call goDirectlyToBoardingPassesFnStub when click `Security document` and have secdoc_upcomingtrips', () => {
              const upcomingTripsPageData = mobileBoardingPassEligibleFlight('Security document').upcomingTripsPage;

              const { container } = createComponent({
                upcomingTripsPage: upcomingTripsPageData
              });

              viewBoardingPassesLink = {
                body: {
                  checkInSessionToken: null,
                  firstName: 'STEVEN',
                  lastName: 'JACKIE',
                  recordLocator: 'ABC123',
                  travelerID: ['123']
                },
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
                labelText: 'Security document',
                method: 'POST'
              };

              fireEvent.click(container.querySelector('.button--yellow'));

              expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
                firstName: 'STEVEN',
                lastName: 'JACKIE',
                queryParams: { clk: 'secdoc_upcomingtrips' },
                recordLocator: 'STMXQ6',
                viewBoardingPassesLink
              });
            });
          });

          const mobileBoardingPassEligibleFlight = (labelText) => {
            const checkInEligibleTrip = new UpcomingTripBuilder()
              .with2SegmentsOnBound()
              .withCheckedIn(true)
              .withIsWithin24Hours(true)
              .withFlightStatus()
              .withBoardingPositions([
                { group: 'A', position: '16' },
                { group: 'B', position: '39' }
              ])
              .withBoardingPassIssuanceLink(labelText)
              .build();

            return new UpcomingTripsBuilder().addUpcomingTrip(checkInEligibleTrip).build();
          };
        });

        describe('and is NOT eligible for mobile boarding pass', () => {
          it('should show `Boarding Details` button for each segment', () => {
            const { container } = createComponent({
              upcomingTripsPage: checkedInButNotEligibleForMobileBoardingPassFlight().upcomingTripsPage
            });
            const yellowButton = container.querySelector('.button--yellow');

            expect(yellowButton.textContent).toContain(i18n('SHARED__BUTTON_TEXT__BOARDING_PASSES'));
          });

          describe('when click view boarding position', () => {
            it('should call resetFlowData and checkIn action', () => {
              const { queryByText } = createComponent({
                upcomingTripsPage: checkedInButNotEligibleForMobileBoardingPassFlight().upcomingTripsPage
              });

              fireEvent.click(queryByText(i18n('SHARED__BUTTON_TEXT__BOARDING_PASSES')));

              expect(resetCheckInFlowDataFnMock).toHaveBeenCalled();
              expect(checkInFnMock).toHaveBeenCalledWith({
                body: {
                  checkInSessionToken: null,
                  firstName: 'STEVEN',
                  lastName: 'JACKIE',
                  recordLocator: 'FRNSLQ'
                },
                href: '/v1/mobile-air-operations/page/check-in',
                isLoggedIn: true,
                method: 'POST'
              });
            });

            it('should call transitToBoardingPosition when the checkIn API is successful', async () => {
              const { queryByText } = createComponent({
                upcomingTripsPage: checkedInButNotEligibleForMobileBoardingPassFlight().upcomingTripsPage
              });

              fireEvent.click(queryByText(i18n('SHARED__BUTTON_TEXT__BOARDING_PASSES')));

              await checkInFnMock;

              expect(transitToBoardingPositionFnMock).toHaveBeenCalled();
            });

            it('should not call transitToBoardingPosition when the checkIn API is failed', () => {
              checkInFnMock = jest.fn().mockRejectedValue('');

              const { queryByText } = createComponent({
                upcomingTripsPage: checkedInButNotEligibleForMobileBoardingPassFlight().upcomingTripsPage
              });

              fireEvent.click(queryByText(i18n('SHARED__BUTTON_TEXT__BOARDING_PASSES')));

              expect(transitToBoardingPositionFnMock).not.toHaveBeenCalled();
            });
          });

          it('should not show the short visit a kiosk message', () => {
            const { container } = createComponent({
              upcomingTripsPage: checkedInButNotEligibleForMobileBoardingPassFlight().upcomingTripsPage
            });

            expect(container.textContent).not.toContain(i18n('CHECK_IN__VISIT_A_KIOSK'));
          });

          const checkedInButNotEligibleForMobileBoardingPassFlight = () => {
            const alreadyCheckedInFlight = new UpcomingTripBuilder()
              .withFlightStatus()
              .withIsWithin24Hours(true)
              .withRecordLocator('FRNSLQ')
              .withCheckedIn(true)
              .withBoardingPositionsLink()
              .withMobileBoardingPassEligible(false)
              .build();

            return new UpcomingTripsBuilder().addUpcomingTrip(alreadyCheckedInFlight).build();
          };
        });
      });
    });

    describe('and multiple flights are check-in eligible', () => {
      describe('when the check-in button is clicked', () => {
        it('should call the check in retrieve reservation action with the correct first and last name', () => {
          const { getAllByText } = createComponent({
            upcomingTripsPage: _mockWithMultipleCheckInEligibleFlights([
              {
                recordLocator: 'ABC123',
                'first-name': 'Test',
                'last-name': 'Tester'
              },
              {
                recordLocator: 'DEF456',
                'first-name': 'RON',
                'last-name': 'HACKMANN'
              }
            ]).upcomingTripsPage
          });

          fireEvent.click(getAllByText(i18n('SHARED__BUTTON_TEXT__CHECK_IN'))[1]);

          expect(getReserveCheckInReservationFnMock).toHaveBeenCalledWith(
            {
              firstName: 'RON',
              lastName: 'HACKMANN',
              recordLocator: 'DEF456'
            },
            false
          );
        });
      });

      const _mockWithMultipleCheckInEligibleFlights = (pnrs) => {
        let upcomingTripsBuilder = new UpcomingTripsBuilder();

        pnrs.forEach((pnr) => {
          const flight = new UpcomingTripBuilder()
            .withRecordLocator(pnr.recordLocator)
            .withPassengerName(pnr['first-name'], pnr['last-name'])
            .withCheckInEligible()
            .withCheckedIn(false)
            .withIsWithin24Hours(true)
            .build();

          upcomingTripsBuilder = upcomingTripsBuilder.addUpcomingTrip(flight);
        });

        return upcomingTripsBuilder.build();
      };
    });

    describe('and a trip is not check in eligible', () => {
      describe('but is less than 24 hours from now', () => {
        it('should not have any buttons', () => {
          const within24HoursSelecteeTrip = new UpcomingTripBuilder()
            .withCheckInIneligibilityReason('MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER')
            .build();

          const { queryByText } = createComponent({
            upcomingTripsPage: new UpcomingTripsBuilder().addUpcomingTrip(within24HoursSelecteeTrip).build()
          });

          expect(queryByText(i18n('SHARED__BUTTON_TEXT__CHECK_IN'))).toBeNull();
        });
      });
    });

    describe('when a flight is cancelled', () => {
      it('should show the options and next steps button', () => {
        const { container } = createComponent({
          upcomingTripsPage: new UpcomingTripsBuilder().withCancelledFlight().build()
            .upcomingTripsPage
        });

        expect(container.querySelector('.button--yellow').textContent).toContain('Options and next steps');
      });

      it('should show cancelled flight status', () => {
        const { container } = createComponent({
          upcomingTripsPage: new UpcomingTripsBuilder().withCancelledFlight().build()
            .upcomingTripsPage
        });

        expect(container.querySelector('.detailed-trip-card .flight-segment-details_outdated')).not.toBeNull();
      });
    });
  });

  describe('with standby flight', () => {
    it('should push to standby when clicking standby link and is revenue passenger', () => {
      const { container } = createComponent({
        upcomingTripsPage: new UpcomingTripsBuilder()
          .withCheckinFlight()
          .addUpcomingTrip(new UpcomingTripBuilder().withStandby().withNonRev(false).build())
          .build().upcomingTripsPage
      });

      const standbyLink = container.querySelector('.standby-card--link a');

      expect(standbyLink).not.toBeNull();

      fireEvent.click(standbyLink);

      expect(checkEnhancedStandbyNearAirportFnMock).toHaveBeenCalledWith(
        {
          'arrival-time': '09:55',
          'carrier-code': 'WN',
          'departure-date': '2017-10-12',
          'departure-time': '09:00',
          'destination-airport': 'AUS',
          'first-name': 'ITEST',
          'flight-number': '726',
          'has-wifi': true,
          'last-name': 'WANG',
          'origin-airport': 'DAL',
          'record-locator': 'STMXQ6'
        },
        true,
        true
      );
    });

    it('should use the enhanced standby api when ENHANCED_STANDBY_LIST toggle is on', () => {
      const { container } = createComponent(
        {
          useEnhancedStandbyList: true,
          upcomingTripsPage: new UpcomingTripsBuilder()
            .withCheckinFlight()
            .addUpcomingTrip(new UpcomingTripBuilder().withEnhancedStandby().withNonRev(false).build())
            .build().upcomingTripsPage
        },
        { ENHANCED_STANDBY_LIST: true }
      );

      fireEvent.click(container.querySelector('.standby-card--link a'));

      expect(checkEnhancedStandbyNearAirportFnMock).toHaveBeenCalledWith(
        {
          body: { standbyToken: 'enhanced-standby-token' },
          href: '/v1/mobile-air-operations/page/standby/STMXQ6',
          labelText: 'View standby list',
          method: 'POST'
        },
        true,
        true
      );
    });

    it('should not use the enhanced standby api when enhanced link is not provided', () => {
      const { container } = createComponent(
        {
          useEnhancedStandbyList: true,
          upcomingTripsPage: new UpcomingTripsBuilder()
            .withCheckinFlight()
            .addUpcomingTrip(new UpcomingTripBuilder().withStandby().withNonRev(false).build())
            .build().upcomingTripsPage
        },
        { ENHANCED_STANDBY_LIST: true }
      );

      fireEvent.click(container.querySelector('.standby-card--link a'));

      expect(checkEnhancedStandbyNearAirportFnMock).toHaveBeenCalledWith(
        {
          'arrival-time': '09:55',
          'carrier-code': 'WN',
          'departure-date': '2017-10-12',
          'departure-time': '09:00',
          'destination-airport': 'AUS',
          'first-name': 'ITEST',
          'flight-number': '726',
          'has-wifi': true,
          'last-name': 'WANG',
          'origin-airport': 'DAL',
          'record-locator': 'STMXQ6'
        },
        true,
        true
      );
    });
  });

  describe('Upgraded Boarding button', () => {
    it('should call getUpgradedBoardingReservationFn with correct link object when user clicks Upgraded Boarding button', () => {
      const upcomingTripsPage = new UpcomingTripsBuilder().withViewUpgradedBoardingLink().build().upcomingTripsPage;

      const { container } = createComponent({ upcomingTripsPage, UPGRADED_BOARDING: true });

      const upgradedBoardingButton = container.querySelector('.detailed-trip-card--upgraded-boarding-btn');

      fireEvent.click(upgradedBoardingButton);

      expect(getUpgradedBoardingReservationFnMock).toHaveBeenCalledWith({
        body: { passengerSearchToken: 'testToken' },
        href: 'v1/mobile-air-operations/page/upgraded-boarding/4TY8HO',
        labelText: 'Upgrade boarding position to A1 - A15',
        method: 'POST'
      });
    });
  });

  const createComponent = (props = {}, toggles = {}) => {
    const defaultProps = {
      AIRCRAFT_TYPE_TRIPCARD: false,
      bookingTeaser: {
        alt_text: '',
        image: '/content/mkt/images/product_features/destination_content_icon.jpg',
        product_attributes: [],
        product_description: '',
        product_heading: '',
        product_tagline: '',
        style: 'image'
      },
      checkEnhancedStandbyNearAirportFn: checkEnhancedStandbyNearAirportFnMock,
      checkInFn: checkInFnMock,
      checkStandbyNearAirportFn: checkEnhancedStandbyNearAirportFnMock,
      clearFlightReservationFn: clearFlightReservationFnMock,
      clearUpcomingTripsFn: clearUpcomingTripsFnMock,
      getReserveCheckInReservationFn: getReserveCheckInReservationFnMock,
      getUpcomingTripsFn: getUpcomingTripsFnMock,
      getUpgradedBoardingReservationFn: getUpgradedBoardingReservationFnMock,
      goDirectlyToBoardingPassesFn: goDirectlyToBoardingPassesFnMock,
      isLoggedIn: true,
      push: pushMock,
      resetCheckInFlowDataFn: resetCheckInFlowDataFnMock,
      resetSelectedAirportInfoFn: resetSelectedAirportInfoFnMock,
      retrieveBookingTeaserFn: retrieveBookingTeaserFnMock,
      retrieveCarReservationFn: retrieveCarReservationFnMock,
      retrieveFlightReservationFn: retrieveFlightReservationFnMock,
      retrieveReservationChangeableFn: retrieveReservationChangeableFnMock,
      setFlowStatusFn: setFlowStatusFnMock,
      setTripTypeForDetailsPageFn: setTripTypeForDetailsPageFnMock,
      showShareLinkForCheckinFn: showShareLinkForCheckinFnMock,
      transitToBoardingPositionFn: transitToBoardingPositionFnMock,
      upcomingTripsPage: [],
      updateIsRevenueAnalyticsFn: updateIsRevenueAnalyticsFnMock,
      UPGRADED_BOARDING: false
    };

    const store = createMockStore()({
      app: {
        errorHeader: { errorMessage: null, hasError: false },
        toggles: {
          AIRCRAFT_TYPE_TRIPCARD: false,
          ...toggles
        }
      }
    });

    const mergedProps = { ...defaultProps, ...props };

    return render(
      <MemoryRouter>
        <Provider store={store}>
          <UpcomingTripsPage {...mergedProps} />
        </Provider>
      </MemoryRouter>
    );
  };
});
