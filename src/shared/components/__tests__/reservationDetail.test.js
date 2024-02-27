jest.mock('@swa-ui/encryption', () => ({
  __esModule: true,
  useHref: () => ({ href: 'mock_href' })
}));
jest.mock('src/shared/actions/dialogActions', () => ({
  showDialog: jest.fn()
}));
jest.mock('src/shared/enhancers/withFeatureToggles', () => (Component) => Component);
const FAKE_TYPE = { type: 'FAKE_TYPE' };

jest.mock('src/shared/actions/flowStatusActions', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ ...FAKE_TYPE })
}));
jest.mock('src/shared/actions/sharedActions', () => ({
  updateViewBoardingPass: jest.fn()
}));
jest.mock('src/standby/actions/standbyActions');
jest.mock('src/viewReservation/actions/viewReservationActions');
jest.mock('src/contactTracing/actions/contactTracingActions');
jest.mock('src/checkIn/actions/checkInActions');
jest.mock('src/companion/actions/companionActions');
jest.mock('src/shared/components/errorHeader/errorHeaderContainer', () => () => <div />);
jest.mock('src/checkIn/components/mobileBoardingPassMessage', () => () => <div />);

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import * as checkInActions from 'src/checkIn/actions/checkInActions';
import * as CompanionActions from 'src/companion/actions/companionActions';
import * as ContactTracingActions from 'src/contactTracing/actions/contactTracingActions';
import * as sharedActions from 'src/shared/actions/sharedActions';
import ReservationDetail from 'src/shared/components/reservationDetail';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import * as StandbyActions from 'src/standby/actions/standbyActions';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';
import { MESSAGE_KEY_EDIT_NAME_CONFIRMATION_VIEW_RESERVATION } from 'src/viewReservation/constants/viewReservationConstants';
import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';

describe('ReservationDetail', () => {
  const boundPassengers = new ViewReservationBuilder().generateBoundPassengersList(1, 'Wanna Get Away');
  let checkStandbyNearAirportFnStub, goDirectlyToBoardingPassesStub;
  let goToCompanionPricingPageStub;
  let goToContactTracingMock;
  let onContactInfoClickStub;
  let query;
  let ReservationDetailProps;
  let resetFlowDataStub;
  let retrieveTravelInformationStub;
  let showShareLinkStub;
  let store;

  beforeEach(() => {
    onContactInfoClickStub = jest.fn();
    query = {
      'arrival-time': '06:55',
      'carrier-code': 'WN',
      'departure-date': '2017-11-16',
      'departure-time': '06:00',
      'destination-airport': 'MDW',
      'first-name': 'AMBER',
      'flight-number': '1479',
      'has-wifi': true,
      'last-name': 'AWESOME',
      'origin-airport': 'ATL',
      'record-locator': 'STMXQ6'
    };
    ReservationDetailProps = {
      _links: {
        cancelBound: { href: 'cancelBound-link' },
        change: {
          href: '/v1/change/fakeRecordLocator',
          query: { 'first-name': 'firstName', 'last-name': 'lastName' }
        },
        editPNRPassengers: [
          {
            href: 'href',
            method: 'GET',
            query: {
              'passenger-reference': '1',
              'first-name': 'Yang',
              'last-name': 'Zeng'
            }
          },
          {
            href: 'href',
            method: 'GET',
            query: {
              'passenger-reference': '2',
              'first-name': 'Tang',
              'last-name': 'Tang'
            }
          }
        ],
        sameDayUpdates: {
          body: {
            passengerSearchToken:
              'DiP1aMwftceY4qdxOYj_nnNGJX0YFN1S2MzSTzImhWXOgCjxzvyVC4IxTc4sclK_ImTFcwoS0AbjZpGPA1Z5Y09cPPeLGUWY2ZKpbZfoOPrb7T-vZ8JHlYHnb85UbRd3R5p2MP-YnJdGJSJS'
          },
          href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
          labelText: 'Same-day change and standby',
          method: 'POST'
         
        },
        viewStandbyList: {
          href: '/v1/mobile-air-operations/page/standby',
          method: 'GET',
          query
        },
        viewBoardingPassIssuance: {
          body: {
            checkInSessionToken: null,
            firstName: 'STEVEN',
            lastName: 'JACKIE',
            travelerID: ['0000000000000001']
          },
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/QIQAJZ',
          method: 'POST'
        }
      },
      bounds: [new BoundDetailBuilder().build()],
      checkInIneligibilityReason: null,
      confirmationNumber: 'K9VJKX',
      date: '',
      dayOfTravelContactInfo: '',
      destinationAirport: '',
      destinationDescription: '',
      firstName: 'Bob',
      hasUnaccompaniedMinor: false,
      isCheckInEligible: true,
      isDynamicWaiver: false,
      isInternational: false,
      isNonRevPnr: false,
      isUserLoggedIn: false,
      messages: [
        {
          body: 'reaccomBody',
          header: 'reaccomHeader',
          icon: 'reaccomIcon',
          key: 'REACCOM_VIEW_RESERVATION'
        }
      ],
      onContactInfoClick: onContactInfoClickStub,
      originAirport: '',
      pageHeader: '',
      passengers: [
        {
          accountNumber: '328329329',
          hasAnyEarlyBird: true,
          hasCompletePassportInfo: false,
          hasExtraSeat: false,
          isCheckedIn: false,
          isCheckInEligible: true,
          name: 'AMBER AWESOME',
          passengerReference: '2'
        }
      ],
      sameDayBlockedMessage: null,
      standbyFlight: {
        arrivalAirportCode: 'AUS',
        arrivalTime: '09:55',
        departureTime: '09:00',
        flightNumber: '726',
        hasWifi: true
      },
      toggles: {
        AIRCRAFT_TYPE_VIEWRES: false
      }
    };
    goToCompanionPricingPageStub = jest
      .spyOn(CompanionActions, 'goToCompanionPricingPage')
      .mockReturnValue({ ...FAKE_TYPE });

    retrieveTravelInformationStub = jest
      .spyOn(ViewReservationActions, 'retrieveTravelInformation')
      .mockReturnValue({ ...FAKE_TYPE });

    goToContactTracingMock = jest
      .spyOn(ContactTracingActions, 'goToContactTracing')
      .mockReturnValue({ ...FAKE_TYPE });

    jest.spyOn(checkInActions, 'setCheckInFlowStatus');

    jest.spyOn(sharedActions, 'updateViewBoardingPass');

    goDirectlyToBoardingPassesStub = jest
      .spyOn(checkInActions, 'goDirectlyToBoardingPasses')
      .mockReturnValue({ ...FAKE_TYPE });

    resetFlowDataStub = jest.spyOn(checkInActions, 'resetFlowData').mockReturnValue({ ...FAKE_TYPE });

    showShareLinkStub = jest.spyOn(checkInActions, 'showShareLink').mockReturnValue({ ...FAKE_TYPE });

    checkStandbyNearAirportFnStub = jest
      .spyOn(StandbyActions, 'checkStandbyNearAirport')
      .mockReturnValue({ type: 'CHECK_STANDBY_NEAR_AIRPORT_FAKE_TYPE' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render correctly', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render the page header', () => {
      ReservationDetailProps.pageHeader = 'DAL - AUS';
      const { queryByText } = createComponent();

      expect(queryByText('DAL - AUS')).toBeTruthy();
    });

    it('should pass shouldShowAddCompanionButton to boarding info according to addCompanion', () => {
      ReservationDetailProps = {
        ...ReservationDetailProps,
        _links: {
          addCompanion: {
            body: {
              companionPricingRequestToken: ''
            },
            href: '/v1/mobile-air-booking/page/flights/prices/KCPY7L/companion',
            method: 'POST'
          }
        }
      };
      const { container } = createComponent();

      expect(container.querySelector('[data-qa="add-companion"]').textContent).toBe('+VIEW_RESERVATION__BOARDING_INFO__ADD_COMPANION');
    });

    describe('pass shouldSuppressUnmodifiablePnr to boarding info according', () => {
      it('should pass true when change, reaccom and cancel links are empty', () => {
        ReservationDetailProps = { ...ReservationDetailProps,
          _links: {
            change: null,
            cancelBound: null,
            reaccom: null
          }
        };
        const { queryByText } = createComponent();

        expect(queryByText('VIEW_RESERVATION__BOARDING_INFO__CHANGE_BUTTON_TEXT')).toBeFalsy();
      });
    });

    it('should render boarding information banner with correct props', () => {
      ReservationDetailProps.isDynamicWaiver = true;
      ReservationDetailProps.hasAnyCancelledFlights = false;

      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    describe('boarding information', () => {
      beforeEach(() => {
        ReservationDetailProps.destinationDescription = 'Dallas (Love Field)';
        ReservationDetailProps.date = 'Jul 27 - 30';
        ReservationDetailProps.originAirport = 'Dallas (Love Field), TX';
        ReservationDetailProps.destinationAirport = 'Austin, TX';
      });

      it('should display trip date and destination information', () => {
        const { queryByText } = createComponent();

        expect(queryByText('Jul 27 - 30')).toBeTruthy();
        expect(queryByText('Dallas (Love Field)')).toBeTruthy();
      });

      it('should display airport information', () => {
        const { queryByText } = createComponent();

        expect(queryByText('Dallas (Love Field), TX toAustin, TX')).toBeTruthy();
      });

      describe('passenger information', () => {
        beforeEach(() => {
          ReservationDetailProps.passengers = [
            {
              name: 'Audrey Hepburn',
              accountNumber: '123456789',
              hasAnyEarlyBird: false,
              passengerReference: '1',
              isCheckedIn: false,
              hasCompletePassportInfo: false,
              hasExtraSeat: false
            }
          ];
          ReservationDetailProps.confirmationNumber = 'CONFIR';
        });

        describe('domestic flight', () => {
          it('should display the PASSENGER and CONFIRMATION label and passenger name', () => {
            const { queryAllByText } = createComponent();

            expect(queryAllByText('SHARED__PASSENGER_RESERVATION_TITLE__PASSENGERS').length).toBe(1);
            expect(queryAllByText('SHARED__PASSENGER_RESERVATION_TITLE__CONFIRMATION').length).toBe(1);
            expect(queryAllByText('Audrey Hepburn').length).toBe(2);
            expect(queryAllByText('CONFIR').length).toBe(1);
          });
        });

        describe('international flight', () => {
          beforeEach(() => {
            ReservationDetailProps.isInternational = true;
            ReservationDetailProps.passengers = [
              {
                name: 'Audrey Hepburn',
                accountNumber: '123456789',
                hasAnyEarlyBird: false,
                passengerReference: '1',
                isCheckedIn: false,
                hasCompletePassportInfo: false,
                hasExtraSeat: false
              },
              {
                name: 'Tang Tang',
                accountNumber: '999999999',
                hasAnyEarlyBird: false,
                passengerReference: '2',
                isCheckedIn: false,
                hasCompletePassportInfo: false,
                hasExtraSeat: false
              }
            ];

            ReservationDetailProps._links = {
              change: { href: 'change-link' },
              cancelBound: { href: 'cancelBound-link' },
              editPNRPassengers: [
                {
                  href: 'href',
                  method: 'GET',
                  query: {
                    'passenger-reference': '1',
                    'first-name': 'Yang',
                    'last-name': 'Zeng'
                  }
                },
                {
                  href: 'href',
                  method: 'GET',
                  query: {
                    'passenger-reference': '2',
                    'first-name': 'Tang',
                    'last-name': 'Tang'
                  }
                }
              ]
            };
          });

          it('should display the PASSENGER and CONFIRMATION label and passenger name', () => {
            const { queryAllByText } = createComponent();

            expect(queryAllByText('SHARED__PASSENGER_RESERVATION_TITLE__PASSENGERS').length).toBe(1);
            expect(queryAllByText('SHARED__PASSENGER_RESERVATION_TITLE__CONFIRMATION').length).toBe(1);
            expect(queryAllByText('Audrey Hepburn').length).toBe(1);
          });

          it('should transition to passport page when user click the first passenger name', () => {
            const { container } = createComponent();

            fireEvent.click(container.querySelectorAll('.passenger-reservation-info--passenger-name')[0]);

            expect(retrieveTravelInformationStub).toBeCalledWith(
              ReservationDetailProps._links.editPNRPassengers[0],
              'CONFIR',
              undefined,
              true
            );
          });

          it('should transition to passport page when user click the second passenger name', () => {
            const { container } = createComponent();

            fireEvent.click(container.querySelectorAll('.passenger-reservation-info--passenger-name')[1]);

            expect(retrieveTravelInformationStub).toBeCalledWith(
              ReservationDetailProps._links.editPNRPassengers[1],
              'CONFIR',
              undefined,
              true
            );
          });
        });
      });

      describe('contact tracing', () => {
        it('should not be shown when link is not provided', () => {
          const { container } = createComponent();

          expect(container.querySelector('.boarding-info--contact-tracing-button')).toBeFalsy();
          expect(goToContactTracingMock).not.toBeCalled();
        });

        it('should forward props when link is provided', () => {
          const contactTracing = { href: 'contact-tracings' };

          ReservationDetailProps = {
            ...ReservationDetailProps,
            _links: {
              contactTracing
            } };

          const { container } = createComponent();

          expect(container.querySelector('.boarding-info--contact-tracing-button')).toBeTruthy();
          fireEvent.click(container.querySelector('.boarding-info--contact-tracing-button'));
          expect(goToContactTracingMock).toBeCalled();
        });
      });
    });

    describe('companion', () => {
      beforeEach(() => {
        ReservationDetailProps.destinationDescription = 'Dallas (Love Field)';
        ReservationDetailProps.date = 'Jul 27 - 30';
        ReservationDetailProps.originAirport = 'Dallas (Love Field), TX';
        ReservationDetailProps.destinationAirport = 'Austin, TX';
      });

      it('should show companion info when this PNR has companion and user has logged in', () => {
        ReservationDetailProps.companion = {
          name: 'Companion Wang',
          firstName: 'Companion',
          lastName: 'Wang',
          confirmationNumber: 'ABCDEF'
        };
        ReservationDetailProps.isInternational = false;

        const { queryByText } = createComponent({
          app: {
            account: {
              isLoggedIn: true
            }
          }
        });

        expect(queryByText('Companion Wang')).toBeTruthy();
        expect(queryByText('ABCDEF')).toBeTruthy();
        expect(queryByText('VIEW_RESERVATION__BOARDING_INFO__COMPANION_RESERVATION_MESSAGE')).toBeTruthy();
      });

      it('should not show companion info when this PNR does not have companion', () => {
        ReservationDetailProps.companion = null;

        const { container } = createComponent();
        const companionComponent = container.querySelector('[data-qa="companion-reservation-ABCDEF"]');

        expect(companionComponent).toBeFalsy();
      });

      it('should show earlybird icon when companion has earlyBird', () => {
        ReservationDetailProps.companion = {
          name: 'Companion Wang',
          confirmationNumber: 'ABCDEF',
          firstName: 'Companion',
          lastName: 'Wang',
          hasEarlyBird: true
        };

        const { container } = createComponent({
          app: {
            account: {
              isLoggedIn: true
            }
          }
        });
        const companionComponent = container.querySelector('[data-qa="companion-reservation-ABCDEF"]');

        expect(companionComponent.querySelector('.icon_early-bird')).toBeTruthy();
      });
    });

    describe('view boarding pass', () => {
      it('should display view boarding pass button when the trip is eligible to view boarding pass ', () => {
        const { queryByText } = createComponent();

        expect(queryByText('SHARED__BUTTON_TEXT__VIEW_BOARDING_PASS')).toBeTruthy();
      });

      it('should not display view boarding pass button when the trip is not eligible to view boarding pass', () => {
        ReservationDetailProps._links = {
          viewBoardingPassIssuance: null
        };
        const { queryByText } = createComponent();

        expect(queryByText('SHARED__BUTTON_TEXT__VIEW_BOARDING_PASS')).toBeFalsy();
      });
    });

    describe('view boarding position', () => {
      it('should display view boarding position button when the trip is eligible to view boarding position and international trip', () => {
        ReservationDetailProps._links = {
          viewBoardingPositions: {
            href: '/v1/mobile-air-operations/page/check-in',
            method: 'POST',
            body: {
              recordLocator: 'J5LOZM',
              firstName: 'YANG',
              lastName: 'LU'
            }
          },
          change: { href: 'change-link' },
          cancelBound: { href: 'cancelBound-link' }
        };
        ReservationDetailProps.passengers[0].name = 'FUNFUN LIU';
        ReservationDetailProps.passengers[0].isCheckedIn = true;
        ReservationDetailProps.confirmationNumber = 'TESTAA';
        ReservationDetailProps.checkInIneligibilityReason = 'some reason';
        ReservationDetailProps.isInternational = true;

        const { queryByText } = createComponent();

        expect(queryByText('SHARED__BUTTON_TEXT__VIEW_BOARDING_DETAILS')).toBeTruthy();
      });

      it('should not display view boarding position button when the trip is not eligible to view boarding position', () => {
        ReservationDetailProps._links = {
          viewBoardingPassIssuance: null
        };
        const { container, queryByText } = createComponent();

        expect(queryByText('SHARED__BUTTON_TEXT__VIEW_BOARDING_DETAILS')).toBeFalsy();

        const mobileBoardingPassMessage = container.querySelector('[data-qa="passenger-kiosk-message"]');

        expect(mobileBoardingPassMessage).toBeFalsy();
      });
    });

    describe('flight summary card', () => {
      describe('for one-way flight', () => {
        beforeEach(() => {
          ReservationDetailProps.bounds = [
            {
              boundType: 'DEPARTING',
              departureStatus: null,
              departureStatusType: null,
              arrivalStatus: null,
              arrivalStatusType: null,
              flights: [
                {
                  number: '233',
                  wifiOnBoard: false
                },
                {
                  number: '65',
                  wifiOnBoard: true
                }
              ],
              travelTime: '3h 55m',
              departureDate: '2017-08-25',
              departureTime: '07:35',
              departureAirport: {
                name: 'Austin',
                state: 'TX',
                code: 'AUS',
                country: null
              },
              arrivalTime: '12:30',
              arrivalAirport: {
                name: 'Atlanta',
                state: 'GA',
                code: 'ATL',
                country: null
              },
              passengerTypeCounts: {
                adult: 1
              },
              fareProductDetails: {
                label: 'Anytime',
                fareRulesUrl: '/fare-rules/anytime'
              },
              fareType: 'Anytime',
              passengerFareTypeInfo: {
                adult: {
                  passengerCount: 1,
                  passengerType: 'adult',
                  fareType: 'Anytime',
                  fareLabel: 'Anytime',
                  fareRulesUrl: '/fare-rules/anytime'
                }
              },
              stops: [
                {
                  departureStatus: null,
                  departureStatusType: null,
                  arrivalStatus: null,
                  arrivalStatusType: null,
                  airport: {
                    name: 'Dallas (Love Field)',
                    state: 'TX',
                    code: 'DAL',
                    country: null
                  },
                  arrivalTime: '08:35',
                  departureTime: '10:00',
                  changePlanes: true
                }
              ],
              isNextDayArrival: false,
              passengers: boundPassengers
            }
          ];
        });

        it('should show on flight summary', () => {
          const { container, getAllByText } = createComponent();

          expect(container.querySelectorAll('.flight-summary-card').length).toBe(1);
          expect(getAllByText('Fri, Aug 25, 2017').length).toBe(1);
        });

        it('should render with PassengerPrice component', () => {
          const { container } = createComponent({}, ReservationDetailProps);

          expect(container).toMatchSnapshot();
        });
      });

      describe('for round-trip', () => {
        beforeEach(() => {
          ReservationDetailProps.bounds = [
            {
              boundType: 'DEPARTING',
              departureStatus: null,
              departureStatusType: null,
              arrivalStatus: null,
              arrivalStatusType: null,
              flights: [
                {
                  number: '1622',
                  wifiOnBoard: true
                }
              ],
              travelTime: '2h 15m',
              departureDate: '2017-08-25',
              departureTime: '06:10',
              departureAirport: {
                name: 'Austin',
                state: 'TX',
                code: 'AUS',
                country: null
              },
              arrivalTime: '09:25',
              arrivalAirport: {
                name: 'Atlanta',
                state: 'GA',
                code: 'ATL',
                country: null
              },
              passengerTypeCounts: {
                adult: 1
              },
              fareProductDetails: {
                label: 'Wanna Get Away',
                fareRulesUrl: '/fare-rules/wanna-get-away'
              },
              fareType: 'WannaGetAway',
              passengerFareTypeInfo: {
                adult: {
                  passengerCount: 1,
                  passengerType: 'adult',
                  fareType: 'Wanna Get Away',
                  fareLabel: 'Wanna Get Away',
                  fareRulesUrl: '/fare-rules/wanna-get-away'
                }
              },
              stops: [],
              isNextDayArrival: false,
              passengers: boundPassengers
            },
            {
              boundType: 'RETURNING',
              departureStatus: null,
              departureStatusType: null,
              arrivalStatus: null,
              arrivalStatusType: null,
              flights: [
                {
                  number: '177',
                  wifiOnBoard: false
                },
                {
                  number: '152',
                  wifiOnBoard: false
                }
              ],
              travelTime: '4h 10m',
              departureDate: '2017-08-28',
              departureTime: '10:30',
              departureAirport: {
                name: 'Atlanta',
                state: 'GA',
                code: 'ATL',
                country: null
              },
              arrivalTime: '13:40',
              arrivalAirport: {
                name: 'Austin',
                state: 'TX',
                code: 'AUS',
                country: null
              },
              passengerTypeCounts: {
                adult: 1
              },
              fareProductDetails: {
                label: 'Wanna Get Away',
                fareRulesUrl: '/fare-rules/wanna-get-away'
              },
              fareType: 'WannaGetAway',
              passengerFareTypeInfo: {
                adult: {
                  passengerCount: 1,
                  passengerType: 'adult',
                  fareType: 'Wanna Get Away',
                  fareLabel: 'Wanna Get Away',
                  fareRulesUrl: '/fare-rules/wanna-get-away'
                }
              },
              stops: [
                {
                  departureStatus: null,
                  departureStatusType: null,
                  arrivalStatus: null,
                  arrivalStatusType: null,
                  airport: {
                    name: 'Dallas (Love Field)',
                    state: 'TX',
                    code: 'DAL',
                    country: null
                  },
                  arrivalTime: '11:35',
                  departureTime: '12:45',
                  changePlanes: true
                }
              ],
              isNextDayArrival: false,
              passengers: boundPassengers
            }
          ];
        });

        it('should show on flight summary for round trip', () => {
          const { container, getAllByText } = createComponent();

          expect(container.querySelectorAll('.flight-summary-card').length).toBe(2);
          expect(getAllByText('Fri, Aug 25, 2017').length).toBe(1);
          expect(getAllByText('Mon, Aug 28, 2017').length).toBe(1);
        });

        it('should render with PassengerPrice components', () => {
          const { container } = createComponent({}, ReservationDetailProps);

          expect(container).toMatchSnapshot();
        });
      });
    });

    it('should display add early bird button when the earlyBird link exists', () => {
      ReservationDetailProps._links = {
        earlyBird: {
          href: '/v1/mobile-air-booking/page/early-bird/RJXDW8'
        },
        change: { href: 'change-url' },
        cancelBound: { href: 'cancelBound-link' }
      };
      const { container } = createComponent();

      expect(container.querySelector('.boarding-info--early-bird-button').textContent).toBe('SHARED__EARLY_BIRD__CHECK_IN_TITLE');
    });

    it('should not display add early bird button when the earlyBird link does not exist', () => {
      ReservationDetailProps._links = {
        earlyBird: null,
        change: { href: 'change-link' },
        cancelBound: { href: 'cancelBound-link' }
      };
      const { container } = createComponent();

      expect(container.querySelector('.boarding-info--early-bird-button')).toBeFalsy();
    });

    it('should display Edit Name success message when message is included in chapi response', () => {
      const messages = [
        {
          key: MESSAGE_KEY_EDIT_NAME_CONFIRMATION_VIEW_RESERVATION,
          body: 'Edit Name Success Message'
        }
      ];

      ReservationDetailProps.messages = messages;
      const { container, queryByText } = createComponent();

      expect(container.querySelector('.success-banner').textContent).toBe('Edit Name Success Message');
      expect(queryByText(messages[0].body)).toBeTruthy();
    });

    it('should not display Edit Name success message when message is included in chapi response', () => {
      const { container } = createComponent();

      expect(container.querySelector('.success-banner')).toBeFalsy();
    });

    it('should display PassengerPrice component with lap child details', () => {
      const ReservationDetailPropsWithLapChild = { ...ReservationDetailProps };

      ReservationDetailPropsWithLapChild.bounds[0].passengers.push({ count: 1, type: 'Lap Child' });

      const { container } = createComponent({}, ReservationDetailPropsWithLapChild);

      expect(container).toMatchSnapshot();
    });
  });

  describe('upsell details', () => {
    it('should render upsellDetails if it is provided', () => {
      const props = { ...ReservationDetailProps,
        ...new ViewReservationBuilder().withUpsellDetails().build().viewReservationViewPage,
        originAirport: 'TX',
        destinationAirport: 'GA'
      };

      const { container } = createComponent({}, props);

      expect(container).toMatchSnapshot();
    });
  });

  describe('click event', () => {
    describe('view boarding pass', () => {
      beforeEach(() => {
        ReservationDetailProps._links = {
          viewBoardingPass: {},
          viewBoardingPassIssuance: { fake: 'data' },
          change: { href: 'change-link' },
          cancelBound: { href: 'cancelBound-link' }
        };
        ReservationDetailProps.passengers[0].name = 'FUNFUN LIU';
        ReservationDetailProps.passengers[0].isCheckedIn = true;
        ReservationDetailProps.confirmationNumber = 'TESTAA';
      });

      it('should start new checkin session', () => {
        const { queryByText } = createComponent();

        fireEvent.click(queryByText('SHARED__BUTTON_TEXT__VIEW_BOARDING_PASS'));

        expect(resetFlowDataStub).toBeCalled();
      });

      it('should call action showShareLink', () => {
        const { queryByText } = createComponent();

        fireEvent.click(queryByText('SHARED__BUTTON_TEXT__VIEW_BOARDING_PASS'));

        expect(showShareLinkStub).toBeCalled();
      });

      it('should call goDirectlyToBoardingPasses', () => {
        const { queryByText } = createComponent();

        fireEvent.click(queryByText('SHARED__BUTTON_TEXT__VIEW_BOARDING_PASS'));

        expect(goDirectlyToBoardingPassesStub).toBeCalled();
      });
    });

    describe('view boarding position', () => {
      beforeEach(() => {
        ReservationDetailProps._links = {
          viewBoardingPositions: {
            href: '/v1/mobile-air-operations/page/check-in',
            method: 'POST',
            body: {
              recordLocator: 'J5LOZM',
              firstName: 'YANG',
              lastName: 'LU'
            }
          },
          change: { href: 'change-link' },
          cancelBound: { href: 'cancelBound-link' }
        };
        ReservationDetailProps.passengers[0].isCheckedIn = true;
        ReservationDetailProps.checkInIneligibilityReason = 'some reason';
      });

      it('should have View Boarding Details button when isInternational false', () => {
        const { queryByText } = createComponent();

        expect(queryByText('SHARED__BUTTON_TEXT__BOARDING_PASSES')).toBeTruthy();
      });
    });

    describe('add companion button', () => {
      let wrapper;

      describe('user has logged in', () => {
        beforeEach(() => {
          jest.spyOn(AccountInfoHelper, 'isLoggedIn').mockReturnValue(true);
          ReservationDetailProps.isUserLoggedIn = true;
          ReservationDetailProps.confirmationNumber = 'S9XBNR';
          ReservationDetailProps = { ...ReservationDetailProps,
            _links: {
              addCompanion: {
                body: {
                  companionPricingRequestToken: ''
                },
                href: '/v1/mobile-air-booking/page/flights/prices/KCPY7L/companion',
                method: 'POST'
              }
            }
          };
          wrapper = createComponent({
            app: {
              account: {
                isLoggedIn: true
              }
            }
          });
        });

        it('should show add companion button when trip is eligible to add companion', () => {
          expect(wrapper.container.querySelector('[data-qa="add-companion"]').textContent).toBe('+VIEW_RESERVATION__BOARDING_INFO__ADD_COMPANION');
        });

        it('should call goToCompanionPricingPage with correct arguments when click add companion button', () => {
          fireEvent.click(wrapper.container.querySelector('button[data-qa="add-companion"]'));

          expect(goToCompanionPricingPageStub).toBeCalledWith({
            body: {
              companionPricingRequestToken: ''
            },
            href: '/v1/mobile-air-booking/page/flights/prices/KCPY7L/companion',
            method: 'POST'
          });
        });
      });

      describe('user not logged in', () => {
        it('should not show add companion button', () => {
          jest.spyOn(AccountInfoHelper, 'isLoggedIn').mockReturnValue(false);
          ReservationDetailProps.confirmationNumber = 'S9XBNR';
          const { container } = createComponent();

          expect(container.querySelector('[data-qa="add-companion"]')).toBeFalsy();
        });
      });
    });

    describe('check in button', () => {
      let change, checkIn;
      const cancelBound = {
        url: 'cancelBound-link'
      };

      beforeEach(() => {
        checkIn = {
          href: '/v1/mobile-air-operations/page/check-in',
          method: 'GET',
          query: {
            recordLocator: 'J5LOZM',
            'first-name': 'YANG',
            'last-name': 'LU'
          }
        };
        change = { href: 'change-link' };
        ReservationDetailProps._links = { checkIn, change, cancelBound };
        ReservationDetailProps.confirmationNumber = 'J5LOZM';
      });

      it('should render CheckIn Button', () => {
        const { container } = createComponent();
        const button = container.querySelector('.boarding-info--checkin-button');

        expect(button).toBeTruthy();
      });
    });

    describe('click standby list', () => {
      it('should transition to standby page if user is near the airport less than 2 km', () => {
        const bounds = [new BoundDetailBuilder().withStandby().build()];
        const { container } = createComponent({}, { bounds });

        fireEvent.click(container.querySelector('.standby-card--link').querySelector('a'));

        expect(store.getActions()).toMatchObject([{ type: 'CHECK_STANDBY_NEAR_AIRPORT_FAKE_TYPE' }]);
        expect(checkStandbyNearAirportFnStub).toBeCalledWith(query, true, true);
      });
    });
  });

  const createComponent = (state = {}, props = {}) => {
    const defaultState = {
      app: {
        account: {
          isLoggedIn: false
        }
      }
    };

    store = createMockStore()({ ...defaultState, ...state });

    return render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/my-account/upcoming-trip-details/:tripIndex',
            search: '?recordLocator=TESTAA',
            state: {
              firstName: 'FUNFUN',
              lastName: 'LIU'
            }
          }
        ]}
        initialIndex={0}
      >
        <Provider store={store}>
          <ReservationDetail {...ReservationDetailProps} {...props} />
        </Provider>
      </MemoryRouter>
    );
  };
});
