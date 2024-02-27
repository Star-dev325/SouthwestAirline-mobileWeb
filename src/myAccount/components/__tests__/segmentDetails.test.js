jest.mock('@swa-ui/encryption', () => ({
  useHref: jest.fn().mockReturnValue({ href: 'mock_href' })
}));
jest.mock('src/checkIn/components/mobileBoardingPassMessage', () => () => <div>greyBoxMessage</div>);

import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { SegmentDetails as SegmentDetailsComponent } from 'src/myAccount/components/segmentDetails';
import UpcomingTripsBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/upcoming-trips/upcomingTripsBuilder';
import FlightSegmentBuilder from 'test/builders/model/flightSegmentBuilder';
import FlightStatusBuilder from 'test/builders/model/flightStatusBuilder';

describe('SegmentDetails', () => {
  let props;

  beforeEach(() => {
    props = {
      _v1_infoNeededToAddEarlyBirdLink: null,
      confirmationNumber: '',
      links: {},
      onViewBoardingPassButtonClickCb: jest.fn(),
      onViewBoardingPositionsButtonClick: jest.fn(),
      onCheckInButtonClick: jest.fn(),
      onClickDetailsButton: jest.fn(),
      onSelectNewFlightForCancelledFlight: jest.fn(),
      onClickStandbyList: jest.fn(),
      onClickEBCheckInButton: jest.fn(),
      onUpgradedBoardingButtonClick: jest.fn(),
      pnr: {},
      segment: {
        greyBoxMessage: {
          body: 'grey box message'
        }
      },
      toggles: {
        AIRCRAFT_TYPE_TRIPCARD: false
      },
      UPGRADED_BOARDING: false
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should still render the segment even if no check in info to display', () => {
    props.segment = new FlightSegmentBuilder()
      .withInternationalFlight()
      .withCheckInEligible()
      .withHasCheckedIn(false)
      .build();
    const { container } = createComponent(props);

    expect(container).not.toBeNull();
  });

  describe('when viewing boarding positions', () => {
    it('should use the correct link', () => {
      props.segment = new FlightSegmentBuilder().withHasCheckedIn(true).build();
      const boardingPositionsButtonText = 'View Boarding Positions Button Text';

      props.links = {
        viewBoardingPositions: {
          href: 'test/url',
          body: {
            test: 'test',
            body: 'body',
            params: 'params'
          },
          labelText: 'View Boarding Positions Button Text',
          method: 'POST'
        }
      };
      const { container } = createComponent(props);

      const viewBoardingPositionsSelector = container.querySelector('[title="View Boarding Positions Button Text"]');

      fireEvent.click(viewBoardingPositionsSelector);

      expect(viewBoardingPositionsSelector.textContent).toEqual(boardingPositionsButtonText);
      expect(props.onViewBoardingPositionsButtonClick).toHaveBeenCalled();
    });
  });

  describe('when you are checked in', () => {
    beforeEach(() => {
      props.segment = new FlightSegmentBuilder()
        .withFlightStatus(new FlightStatusBuilder().withGate('B08').build())
        .withBoardingPosition('B', '09')
        .withHasCheckedIn(true)
        .build();
    });

    describe('domestic flight', () => {
      it('should show yellow boarding passes button', () => {
        props.links = {
          viewBoardingPositions: {
            href: 'test/url',
            body: {
              test: 'test',
              body: 'body',
              params: 'params'
            },
            labelText: 'View Boarding Positions Button Text',
            method: 'POST'
          }
        };

        const { container } = createComponent(props);

        expect(container.querySelector('[title="View Boarding Positions Button Text"]').textContent).toContain(
          'View Boarding Positions Button Text'
        );
      });

      it('should show yellow boarding passes button with default button if labelText does not exist', () => {
        props.links = {
          viewBoardingPositions: {
            href: 'test/url',
            body: {
              test: 'test',
              body: 'body',
              params: 'params'
            },
            method: 'POST'
          }
        };

        delete props.segment.isInternational;

        const { container } = createComponent(props);

        expect(container.querySelector('[title="SHARED__BUTTON_TEXT__BOARDING_PASSES"]').textContent).toContain(
          i18n('SHARED__BUTTON_TEXT__BOARDING_PASSES')
        );
      });
    });

    describe('international flight', () => {
      it('should show yellow boarding details button', () => {
        props.segment.isInternational = true;
        props.links = {
          viewBoardingPositions: {
            href: 'test/url',
            body: {
              test: 'test',
              body: 'body',
              params: 'params'
            },
            labelText: 'View Boarding Positions Button Text',
            method: 'POST'
          }
        };
        const { container } = createComponent(props);

        expect(container.querySelector('[title="View Boarding Positions Button Text"]').textContent).toContain(
          'View Boarding Positions Button Text'
        );
      });

      it('should show yellow boarding details button with default text if label not set', () => {
        props.segment.isInternational = true;
        props.links = {
          viewBoardingPositions: {
            href: 'test/url',
            body: {
              test: 'test',
              body: 'body',
              params: 'params'
            },
            method: 'POST'
          }
        };
        const { container } = createComponent(props);

        expect(container.querySelector('[title="SHARED__BUTTON_TEXT__BOARDING_DETAILS"]').textContent).toContain(
          i18n('SHARED__BUTTON_TEXT__BOARDING_DETAILS')
        );
      });
    });

    describe('but are no longer eligible to check in for a domestic flight', () => {
      beforeEach(() => {
        props.segment.checkInIneligibilityReason = 'MBP_UNAVAILABLE_TOO_CLOSE_TO_DEPARTURE_DOMESTIC';
        props.segment.isCheckInEligible = false;
      });

      it('should show view boarding positions button when provided', () => {
        props.links.viewBoardingPositions = jest.fn();

        const { container } = createComponent(props);

        expect(container.querySelector('[title="SHARED__BUTTON_TEXT__BOARDING_PASSES"]')).toBeNull();
      });
    });

    describe('but are no longer eligible to check in for an international flight', () => {
      beforeEach(() => {
        props.segment.checkInIneligibilityReason = 'MBP_UNAVAILABLE_TOO_CLOSE_TO_DEPARTURE_INTL';
        props.segment.isCheckInEligible = false;
        props.segment.isInternational = true;
      });

      it('should show view boarding positions button when provided', () => {
        props.links.viewBoardingPositions = jest.fn();

        const { container } = createComponent(props);

        expect(container.querySelector('[title="SHARED__BUTTON_TEXT__BOARDING_PASSES"]')).toBeNull();
      });
    });
  });

  describe('when flight is cancelled', () => {
    beforeEach(() => {
      const upcomingTripWithCancelledFight = new UpcomingTripsBuilder().withCancelledFlight().build();

      props.segment = upcomingTripWithCancelledFight.upcomingTripsPage[0].pages[0];
    });

    it('should display FlightSegmentDetails with outdated', () => {
      const { container } = createComponent(props);

      expect(container.querySelector('.flight-segment-details_outdated')).not.toBeNull();
    });

    it('should display button to show options and next steps', () => {
      const optionsAndNextSteps = {
        href: 'doNotUse',
        labelText: 'Options and next steps',
        url: 'https://www.southwest.com/help/changes-and-cancellations/changing-cancelling-flights#southwest-cancels-flight?clk=TRPCRD_SWACNCL_NEXT'
      };

      props.links = {
        optionsAndNextSteps
      };

      const { container } = createComponent(props);

      const optionsAndNextStepsButton = container.querySelector(`[title="${optionsAndNextSteps.labelText}"]`);

      expect(container.textContent).toContain(optionsAndNextSteps.labelText);
      expect(optionsAndNextStepsButton).toHaveAttribute('href', optionsAndNextSteps.url);
    });

    it('should not display button to select a new flight for domestic flight', () => {
      const { container } = createComponent(props);

      expect(container.textContent).not.toContain(i18n('CHECK_IN__SELECT_NEW_FLIGHT'));
    });
  });

  describe('actual time is different from original', () => {
    it('should have pass actual and original time to FlightSegmentDetails', () => {
      const upcomingTripWithCancelledFight = new UpcomingTripsBuilder().withOnboardingDelayedFlight().build();

      props.segment = upcomingTripWithCancelledFight.upcomingTripsPage[0].pages[0];

      const { container } = createComponent(props);

      expect(container.querySelector('.flight-segment-details--time-block-time').textContent).toEqual('6:10AM');
    });

    it('should pass original time as default to FlightSegmentDetails when flightStatus null', () => {
      const upcomingTripWithCancelledFight = new UpcomingTripsBuilder().withOnboardingDelayedFlight().build();

      upcomingTripWithCancelledFight.upcomingTripsPage[0].pages[0].flightStatus = null;
      props.segment = upcomingTripWithCancelledFight.upcomingTripsPage[0].pages[0];

      const { container } = createComponent(props);

      expect(container.querySelector('.flight-segment-details--time-block-time').textContent).toEqual('6:00AM');
    });
  });

  describe('when you are not checked in', () => {
    it('should not show Boarding Pass button even when viewBoardingPassIssuance link exist for other bound', () => {
      props.links = {
        viewBoardingPassIssuance: {
          href: 'test/url',
          body: {
            test: 'test',
            body: 'body',
            params: 'params'
          },
          labelText: 'View Boarding Pass Issuance Button Text',
          method: 'POST'
        }
      };
      props.segment = new FlightSegmentBuilder().withHasCheckedIn(false).build();
      const { container } = createComponent(props);

      expect(container.querySelector('button[title="Boarding Pass"]')).toBeNull();
    });

    it('should not show Boarding Details button even when viewBoardingPositions link exist for other bound', () => {
      props.links = {
        viewBoardingPositions: {
          href: 'test/url',
          body: {
            test: 'test',
            body: 'body',
            params: 'params'
          },
          labelText: 'View Boarding Positions Button Text',
          method: 'POST'
        }
      };
      props.segment = new FlightSegmentBuilder().withHasCheckedIn(false).build();
      const { container } = createComponent(props);

      expect(container.querySelector('button[title="Boarding Details"]')).toBeNull();
    });
  });

  describe('when segment is provided', () => {
    beforeEach(() => {
      props.segment = new FlightSegmentBuilder()
        .withFlightStatus(new FlightStatusBuilder().withGate('B08').build())
        .withHasCheckedIn(true)
        .withDepartureAirportDisplayName('Dallas (Love Field), TX - DAL')
        .withArrivalAirportDisplayName('Nashville, TN - BNA')
        .withDepartureTime('19:00')
        .withArrivalTime('20:10')
        .build();
    });

    it('should display the flight segment details', () => {
      const { container } = createComponent(props);
      const FlightSegmentDetails = container.querySelector('.flight-segment-details');

      expect(FlightSegmentDetails).toMatchSnapshot();
    });

    describe('when the view boarding pass link is provided', () => {
      beforeEach(() => {
        props.links = {
          viewBoardingPassIssuance: {
            href: 'test/url',
            body: {
              test: 'test',
              body: 'body',
              params: 'params'
            },
            labelText: 'View Boarding Pass Issuance Button Text',
            method: 'POST'
          }
        };
      });

      describe('when boarding group and position are provided', () => {
        beforeEach(() => {
          props.segment.boardingGroup = 'A';
          props.segment.boardingPosition = '18';
        });

        it('should render the boarding information with the gate', () => {
          const { container } = createComponent(props);

          expect(container.querySelectorAll('.boarding-information--item-info')[0].textContent).toEqual('B08');
        });
      });

      describe('when boarding group and position are not provided', () => {
        beforeEach(() => {
          props.segment.boardingGroup = null;
          props.segment.boardingPosition = null;
        });

        it('should not render boarding information', () => {
          const { container } = createComponent(props);

          expect(container.querySelector('.boarding-information--item-row')).toBeNull();
        });
      });
    });

    describe('when the view boarding position link is provided', () => {
      beforeEach(() => {
        props.links = {
          viewBoardingPositions: {
            href: 'test/url',
            body: {
              test: 'test',
              body: 'body',
              params: 'params'
            },
            labelText: 'View Boarding Positions Button Text',
            method: 'POST'
          }
        };
      });

      describe('when boarding group and position are provided', () => {
        beforeEach(() => {
          props.segment.boardingGroup = 'A';
          props.segment.boardingPosition = '18';
        });

        it('should render the boarding information with the gate', () => {
          const { container } = createComponent(props);

          expect(container.querySelectorAll('.boarding-information--item-info')[0].textContent).toEqual('B08');
        });
      });

      describe('when boarding group and position are not provided', () => {
        beforeEach(() => {
          props.segment.boardingGroup = null;
          props.segment.boardingPosition = null;
        });

        it('should not render boarding information', () => {
          const { container } = createComponent(props);

          expect(container.querySelector('.boarding-information--item-row')).toBeNull();
        });
      });
    });

    it('should show Details button when within 48 hours', () => {
      props.segment = new FlightSegmentBuilder()
        .withDepartureAirportDisplayName('Dallas (Love Field), TX - DAL')
        .withArrivalAirportDisplayName('Nashville, TN - BNA')
        .build();
      const detailsButtonText = 'View/Manage';

      props.links = {
        viewReservationViewPage: {
          href: 'test/url',
          labelText: 'View/Manage',
          method: 'GET'
        }
      };
      const { container } = createComponent(props);

      expect(container.querySelector('Button').textContent).toEqual(detailsButtonText);
    });

    it('should not show kiosk message when between 24 hours and 48 hours', () => {
      props.segment = new FlightSegmentBuilder()
        .withFlightStatus(new FlightStatusBuilder().build())
        .withHasCheckedIn(false)
        .withDepartureAirportDisplayName('Dallas (Love Field), TX - DAL')
        .withArrivalAirportDisplayName('Nashville, TN - BNA')
        .withDepartureTime('19:00')
        .withArrivalTime('20:10')
        .build();

      const { container } = createComponent(props);

      expect(container.querySelector('GrayMinHeightBox')).toBeNull();
    });

    describe('CheckIn Button', () => {
      beforeEach(() => {
        props.links = {
          checkInViewReservationPage: 'checkIn link',
          viewReservationViewPage: {
            href: 'test/url',
            labelText: 'View/Manage',
            method: 'GET'
          }
        };
      });

      it('should show Check in button when isCheckInEligible is true', () => {
        props.segment = new FlightSegmentBuilder().withCheckInEligible().build();

        const detailsButtonText = 'View/Manage';
        const { container } = createComponent(props);

        fireEvent.click(container.querySelectorAll('Button')[1]);

        expect(container.querySelectorAll('Button')[0].textContent).toContain(detailsButtonText);
        expect(container.querySelectorAll('Button')[1].textContent).toContain(i18n('SHARED__BUTTON_TEXT__CHECK_IN'));
        expect(props.onCheckInButtonClick).toHaveBeenCalled();
      });

      it('should not show Check in button when isCheckInEligible is false', () => {
        props.segment = new FlightSegmentBuilder().build();

        const detailsButtonText = 'View/Manage';
        const { container } = createComponent(props);

        expect(container.querySelectorAll('Button')[0].textContent).toContain(detailsButtonText);
      });
    });

    describe('Informational Message', () => {
      it(`should show positive message when within 48 hours and status is 'POSITIVE'`, () => {
        props.segment = new FlightSegmentBuilder()
          .withDepartureAirportDisplayName('Dallas (Love Field), TX - DAL')
          .withArrivalAirportDisplayName('Nashville, TN - BNA')
          .build();
        const { container } = createComponent(props);

        expect(container.querySelector('.detailed-trip-card--information')).not.toBeNull();
        expect(container.querySelector('.detailed-trip-card--information_positive').textContent).toEqual(
          'Check in begins 24 hours before departure.'
        );
      });

      it(`should show default message when within 48 hours and status is 'DEFAULT'`, () => {
        const defaultMessage = 'Check southwest.com or terminal screens for flight status.';

        props.segment = new FlightSegmentBuilder()
          .withDepartureAirportDisplayName('Dallas (Love Field), TX - DAL')
          .withArrivalAirportDisplayName('Nashville, TN - BNA')
          .withInformationalMessagingAndType(defaultMessage, 'DEFAULT')
          .build();

        const { container } = createComponent(props);

        expect(container.querySelector('.detailed-trip-card--information')).not.toBeNull();
        expect(container.querySelector('.detailed-trip-card--information_default').textContent).toEqual(defaultMessage);
      });

      it(`should show not show message block when message empty`, () => {
        props.segment = new FlightSegmentBuilder()
          .withDepartureAirportDisplayName('Dallas (Love Field), TX - DAL')
          .withArrivalAirportDisplayName('Nashville, TN - BNA')
          .withInformationalMessagingAndType(null, null)
          .build();
        const { container } = createComponent(props);

        expect(container.querySelector('.detailed-trip-card--information')).toBeNull();
      });
    });
  });

  describe('standby', () => {
    it('should render standby card when you are revenue pax and in standby list ', () => {
      props.segment = new FlightSegmentBuilder().withStandbyFlight().withNonRevenue(false).build();
      const { container } = createComponent(props);

      expect(container.querySelector('.standby-card')).not.toBeNull();
    });

    it('should render standby card when you are non-revenue and in standby list ', () => {
      props.segment = new FlightSegmentBuilder().withStandbyFlight().withNonRevenue(true).build();
      const { container } = createComponent(props);

      expect(container.querySelector('.standby-card')).not.toBeNull();
    });

    it('should not render standby card when you are not in standby list', () => {
      props.segment = new FlightSegmentBuilder().build();
      const { container } = createComponent(props);

      expect(container.querySelector('.standby-card')).toBeNull();
    });
  });

  describe('when view boarding pass', () => {
    beforeEach(() => {
      props.segment = new FlightSegmentBuilder().withHasCheckedIn(true).build();
      props.links = {
        viewBoardingPassIssuance: {
          href: 'test/url',
          body: {
            test: 'test',
            body: 'body',
            params: 'params'
          },
          labelText: 'View Boarding Pass Issuance Button Text',
          method: 'POST'
        }
      };
    });

    it('should display Boarding Pass', () => {
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('[title="View Boarding Pass Issuance Button Text"]'));

      expect(container.textContent).toContain('View Boarding Pass Issuance Button Text');
      expect(props.onViewBoardingPassButtonClickCb).toHaveBeenCalled();
    });

    it('should display Boarding Pass with default text when labelText not set', () => {
      props.links = {
        viewBoardingPassIssuance: {
          href: 'test/url',
          body: {
            test: 'test',
            body: 'body',
            params: 'params'
          },
          method: 'POST'
        }
      };
      const { container } = createComponent(props);

      expect(container.textContent).toContain(i18n('SHARED__BUTTON_TEXT__BOARDING_PASS'));
    });
  });

  describe('viewUpgradedBoarding present', () => {
    beforeEach(() => {
      const upcomingTrip = new UpcomingTripsBuilder().withViewUpgradedBoardingLink().build();

      props.segment = upcomingTrip.upcomingTripsPage[0].pages[0];
      props.links = upcomingTrip.upcomingTripsPage[0]._links;
    });

    it('should show Upgraded Boarding button when UPGRADED_BOARDING is true', () => {
      const updatedProps = { ...props };

      updatedProps.UPGRADED_BOARDING = true;

      const { container } = createComponent(updatedProps);

      expect(container).toMatchSnapshot();
    });

    it('should not show Upgraded Boarding button when UPGRADED_BOARDING is false', () => {
      const segmentDetails = createComponent(props);

      expect(segmentDetails).toMatchSnapshot();
    });

    it('should call onUpgradedBoardingButtonClick with viewUpgradedBoarding link object when user clicks Upgraded Boarding button', () => {
      const updatedProps = { ...props };

      updatedProps.UPGRADED_BOARDING = true;

      const { container } = createComponent(updatedProps);

      fireEvent.click(container.querySelector('.detailed-trip-card--upgraded-boarding-btn'));

      expect(props.onUpgradedBoardingButtonClick).toBeCalledWith(updatedProps.links.viewUpgradedBoarding);
    });
  });

  describe('overnight', () => {
    it('should show overnight indicator when isOvernight is true', () => {
      const updatedProps = { ...props, isOvernight: true };

      updatedProps.UPGRADED_BOARDING = true;

      const { container } = createComponent(updatedProps);

      expect(container.querySelector('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });

    it('should not show overnight indicator when isOvernight is false', () => {
      const updatedProps = { ...props, isOvernight: false };

      updatedProps.UPGRADED_BOARDING = true;

      const { container } = createComponent(updatedProps);

      expect(container.querySelector('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });

    it('should show track checked bags button when available', () => {
      props.links = {
        trackCheckedBags: {
          href: 'test/url',
          query: {
            first_name: 'test',
            last_name: 'body',
            record_locator: 'params'
          },
          labelText: 'track checked bags',
          method: 'POST'
        }
      };

      const { container } = createComponent(props);

      expect(container.querySelectorAll('Button')[0].textContent).toContain(props.links.trackCheckedBags.labelText);
    });

    it('should not return track bag checkin request when query params is not available', () => {
      const instance = React.createRef();

      createComponent({
        ...props,
        links: {
          trackCheckedBags: {
            href: 'test/url',
            labelText: 'track checked bags',
            method: 'POST'
          }
        },
        ref: instance
      });

      expect(instance.current._getCheckInRequestObject()).toBeUndefined();
    });

    it('should not return track bag checkin request when track checked bag is not available', () => {
      const instance = React.createRef();

      createComponent({
        ...props,
        ref: instance
      });

      expect(instance.current._getCheckInRequestObject()).toBeUndefined();
    });
  });
});

function createComponent(props) {
  return render(<SegmentDetailsComponent {...props} />);
}
