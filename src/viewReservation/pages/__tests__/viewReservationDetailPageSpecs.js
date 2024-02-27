import * as EncryptionHref from '@swa-ui/encryption/useHref';
import { shallow } from 'enzyme';
import _ from 'lodash';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinonModule from 'sinon';
import * as AirUpgradeActions from 'src/airUpgrade/actions/airUpgradeActions';
import { AIR_UPGRADE_FARE_OPTIONS } from 'src/airUpgrade/constants/airUpgradeConstants';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { transformResponseToViewReservationDetail } from 'src/shared/transformers/reservationTransformer';
import { ViewReservationDetailPage as ViewReservationDetailPageClass } from 'src/viewReservation/pages/viewReservationDetailPage';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { integrationMount, mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';

const { location } = BrowserObject;
const sinon = sinonModule.sandbox.create();

describe('ViewReservationDetailPage', () => {
  let viewReservationDetailPage;
  let clearFlightReservationStub, clearViewReservationDetailsStub, saveUpgradeTypeFnStub;
  let retrieveTravelInformationStub;
  let retrieveFlightReservationStub, ViewReservationActions, ViewReservationDetailPage;
  let getUpgradeFareReservationFnStub;
  let pushStub;

  beforeEach(() => {
    sinon.stub(AppSelector, 'getCurrentAppFlow').returns('reservation');
    mockErrorHeaderContainer(sinon);
    ViewReservationActions = require('src/viewReservation/actions/viewReservationActions');
    clearViewReservationDetailsStub = sinon.stub(ViewReservationActions, 'clearViewReservationDetails');
    retrieveTravelInformationStub = sinon
      .stub(ViewReservationActions, 'retrieveTravelInformation')
      .returns({ type: 'fakeTYpe' });
    retrieveFlightReservationStub = sinon.stub(ViewReservationActions, 'retrieveFlightReservation').returns({
      type: 'MOCK_ACTION'
    });
    getUpgradeFareReservationFnStub = sinon.stub(AirUpgradeActions, 'getUpgradeFareReservation').returns({
      type: 'MOCK_ACTION'
    });
    clearViewReservationDetailsStub = sinon.stub(ViewReservationActions, 'clearFlightReservation').returns({
      type: 'MOCK_ACTION'
    });
    pushStub = sinon.stub();
    saveUpgradeTypeFnStub = sinon.stub();
    ViewReservationDetailPage = require('src/viewReservation/pages/viewReservationDetailPage').default;
    sinon.stub(EncryptionHref, 'useHref').returns({ href: 'mock_href' });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should render the page header', async () => {
      const viewReservationDetailPage = createComponent();
      const subHeader = viewReservationDetailPage.find('SubHeader');

      expect(subHeader).to.have.text('DAL - ATL');
    });

    context('boarding information', () => {
      beforeEach(() => {
        viewReservationDetailPage = createComponent(
          {},
          {
            destinationDescription: 'Dallas (Love Field)',
            date: 'Jul 27 - 30',
            originAirport: 'Dallas (Love Field), TX',
            destinationAirport: 'Austin, TX'
          }
        );
      });

      it('should display trip date and destination informaiton', () => {
        const TripDateAndDestCity = viewReservationDetailPage.find('TripDateAndDestCity');

        expect(TripDateAndDestCity.find('.trip-date-dest-city--trip-date')).to.have.text('Jul 27 - 30');
        expect(TripDateAndDestCity.find('.trip-date-dest-city--destination-airport')).to.have.text(
          'Dallas (Love Field)'
        );
      });

      it('should display airport information', () => {
        const AirportDetail = viewReservationDetailPage.find('.airport-info--detail');

        expect(AirportDetail.at(0)).to.have.text('Dallas (Love Field), TX toAustin, TX');
      });

      context('passenger information', () => {
        const initReservationState = {
          passengers: [
            {
              name: 'Audrey Hepburn',
              accountNumber: '123456789',
              hasAnyEarlyBird: false,
              passengerReference: '1',
              isCheckedIn: false,
              hasCompletePassportInfo: false,
              hasExtraSeat: false
            }
          ],
          destinationDescription: 'Dallas (Love Field)',
          date: 'Jul 27 - 30',
          originAirport: 'Dallas (Love Field), TX',
          destinationAirport: 'Austin, TX',
          confirmationNumber: 'CONFIR'
        };

        beforeEach(() => {
          viewReservationDetailPage = createComponent({}, initReservationState);
        });

        context('companion', () => {
          it('should show companion info when this PNR has companion and user has logged in', () => {
            const accountState = {
              isLoggedIn: true
            };
            const reservationState = _.merge({}, initReservationState, {
              companion: {
                name: 'Companion Wang',
                firstName: 'Companion',
                lastName: 'Wang',
                confirmationNumber: 'ABCDEF'
              },
              isInternational: false
            });

            viewReservationDetailPage = createComponent({}, reservationState, accountState);
            const companionComponent = viewReservationDetailPage.find('[data-qa="companion-reservation-ABCDEF"]');

            expect(companionComponent.find('[data-qa="userName"]')).to.have.text('Companion Wang');
            expect(companionComponent.find('.passenger-record-locator')).to.have.text('ABCDEF');
            expect(companionComponent).to.contain.text('Must check in separately.');
          });

          it('should not show companion info when this PNR does not have companion', () => {
            const companionComponent = viewReservationDetailPage.find('[data-qa="companion-reservation-ABCDEF"]');

            expect(companionComponent).to.not.exist;
          });

          it('should show earlybird icon when companion has earlyBird', () => {
            const accountState = {
              isLoggedIn: true
            };
            const reservationState = _.merge({}, initReservationState, {
              companion: {
                name: 'Companion Wang',
                confirmationNumber: 'ABCDEF',
                firstName: 'Companion',
                lastName: 'Wang',
                hasEarlyBird: true
              },
              isInternational: false
            });

            viewReservationDetailPage = createComponent({}, reservationState, accountState);
            const companionComponent = viewReservationDetailPage.find('[data-qa="companion-reservation-ABCDEF"]');

            expect(companionComponent.find('Icon').prop('type')).to.equal('early-bird');
          });
        });

        context('domestic flight', () => {
          it('should display the PASSENGER and CONFIRMATION label and passenger name', () => {
            const passengerLabel = viewReservationDetailPage.find('[data-qa="passenger-label"]');
            const confirmationLabel = viewReservationDetailPage.find('[data-qa="confirmation-label"]');
            const confirmationNumber = viewReservationDetailPage.find('.passenger-record-locator');
            const passengerName = viewReservationDetailPage.find('[data-qa="userName"]').first();

            expect(passengerLabel).to.have.text('PASSENGER(S)');
            expect(confirmationLabel).to.have.text('CONFIRMATION #');
            expect(confirmationNumber).to.have.text('CONFIR');
            expect(passengerName).to.have.text('Audrey Hepburn');
          });
        });

        context('international flight', () => {
          beforeEach(() => {
            const reservationState = _.merge({}, initReservationState, {
              isInternational: true,
              passengers: [
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
              ],
              _links: {
                contactInformation: {
                  href: '/v1/mobile-air-booking/page/view-reservation/contact-info',
                  method: 'POST',
                  body: {
                    passengerSearchToken:
                      '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ',
                    contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a'
                  }
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
                change: { href: 'change-link' },
                cancel: { href: 'cancel-link' },
                cancelBound: { href: 'cancelBound-link' }
              }
            });

            viewReservationDetailPage = createComponent({}, reservationState);
          });

          it('should display the PASSENGER and CONFIRMATION label and passenger name', () => {
            const passengerLabel = viewReservationDetailPage.find('[data-qa="passenger-label"]');
            const confirmationLabel = viewReservationDetailPage.find('[data-qa="confirmation-label"]');
            const confirmationNumber = viewReservationDetailPage.find('.passenger-record-locator');
            const passengerName = viewReservationDetailPage.find('[data-qa="userName"]').first();

            expect(passengerLabel).to.have.text('PASSENGER(S)');
            expect(confirmationLabel).to.have.text('CONFIRMATION #');
            expect(confirmationNumber).to.have.text('CONFIR');
            expect(passengerName).to.have.text('Audrey Hepburn');
          });

          it('should transition to passport page when user click the first passenger name', () => {
            const editPNRPassengers = [
              {
                href: 'href',
                method: 'GET',
                query: {
                  'first-name': 'Yang',
                  'last-name': 'Zeng',
                  'passenger-reference': '1'
                }
              }
            ];

            click(viewReservationDetailPage.find('.passenger-reservation-info--passenger-name').at(0));
            expect(retrieveTravelInformationStub).to.have.been.calledWith(editPNRPassengers[0], 'CONFIR', undefined, true);
          });

          it('should transition to passport page when user click the second passenger name', () => {
            const editPNRPassengers = [
              {
                href: 'href',
                method: 'GET',
                query: {
                  'first-name': 'Tang',
                  'last-name': 'Tang',
                  'passenger-reference': '2'
                }
              }
            ];

            click(viewReservationDetailPage.find('.passenger-reservation-info--passenger-name').at(1));
            expect(retrieveTravelInformationStub).to.have.been.calledWith(editPNRPassengers[0], 'CONFIR');
          });

          it('should transition to contact select page when user clicks on day of travel contact info', () => {
            const contactInformationLinks = {
              body: {
                contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a',
                passengerSearchToken:
                  '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ'
              },
              href: '/v1/mobile-air-booking/page/view-reservation/contact-info',
              method: 'POST'
            };
            const wrapper = createComponent({ params: { recordLocator: 'AAAAA' } }, {}, {}, {}, true);

            wrapper.instance()._onContactInfoClick();
            expect(pushStub).to.have.been.calledWith(
              '/air/manage-reservation/contact-information.html',
              null,
              { clk: 'AOMiten' },
              {
                firstName: 'STEVEN',
                lastName: 'JACKIE',
                isInternalNav: true,
                ...contactInformationLinks
              }
            );
          });

          it('should transition to air upgrade select bounds page when user clicks on upgrade my flight', () => {
            const wrapper = createComponent({}, {}, {}, {}, true);

            wrapper.instance()._onUpgradeMyFlight();

            expect(saveUpgradeTypeFnStub).to.have.been.calledWith(AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS);
            expect(getUpgradeFareReservationFnStub).to.have.been.called;
          });

          it.skip('should not transition to air upgrade select bounds page when user clicks on upgrade my flight ', () => {
            const viewReservationDetail = viewReservationDetailPage.find('ReservationDetail').find('UpsellDetails');

            click(viewReservationDetail.find('button'));
            expect(getUpgradeFareReservationFnStub).to.not.have.been.called;
          });
        });
      });
    });

    context('view boarding pass', () => {
      it('should display view boarding pass button when the trip is eligible to view boarding pass ', () => {
        const reservationState = {
          _links: {
            viewBoardingPassIssuance: {
              body: {
                checkInSessionToken: null,
                firstName: 'STEVEN',
                lastName: 'JACKIE',
                recordLocator: 'ABC123',
                travelerID: ['123']
              },
              href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
              method: 'POST'
            },
            change: { href: 'change-link' },
            cancel: { href: 'cancel-link' }
          }
        };

        viewReservationDetailPage = createComponent({}, reservationState);

        const viewBoardingPassButton = viewReservationDetailPage.find('YellowButton');

        expect(viewBoardingPassButton).to.have.text('View Boarding Pass');
      });

      it('should not display view boarding pass button when the trip is not eligible to view boarding pass', () => {
        const reservationState = {
          _links: {
            viewBoardingPassIssuance: null,
            change: { href: 'change-link' },
            cancel: { href: 'cancel-link' }
          }
        };

        viewReservationDetailPage = createComponent({}, reservationState);

        const viewBoardingPassButton = viewReservationDetailPage.find('YellowButton');

        expect(viewBoardingPassButton).to.not.exist;
      });
    });

    context('view boarding position', () => {
      it('should display view boarding position button when the trip is eligible to view boarding position', () => {
        const reservationState = {
          _links: {
            viewBoardingPositions: {
              href: '/v1/mobile-air-operations/page/check-in',
              method: 'POST',
              body: {
                recordLocator: 'J5LOZM',
                firstName: 'YANG',
                lastName: 'LU'
              }
            },
            change: { href: 'change-url' },
            cancel: { href: 'cancel-link' }
          },
          passengers: [{ isCheckedIn: true }],
          checkInIneligibilityReason: 'some reason'
        };

        viewReservationDetailPage = createComponent({}, reservationState);

        const viewBoardingPositionButton = viewReservationDetailPage.find('YellowButton').at(1);

        expect(viewBoardingPositionButton).to.have.text('Boarding Passes');
      });

      it('should not display view boarding position button when the trip is not eligible to view boarding position', () => {
        const reservationState = {
          _links: {
            viewBoardingPassIssuance: null,
            viewBoardingPositions: null,
            change: { href: 'change-url' },
            cancel: { href: 'cancel-link' }
          },
          passengers: [{ isCheckedIn: false }],
          checkInIneligibilityReason: 'some reason'
        };

        viewReservationDetailPage = createComponent({}, reservationState);

        const viewBoardingPositionButton = viewReservationDetailPage.find('YellowButton');

        expect(viewBoardingPositionButton).to.not.exist;
      });
    });

    context('flight summary card', () => {
      it('should show on flight summary for one-way', () => {
        const reservationState = {
          bounds: [
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
              passengers: new ViewReservationBuilder().generateBoundPassengersList(1, 'Wanna Get Away')
            }
          ]
        };

        viewReservationDetailPage = createComponent({}, reservationState);

        expect(viewReservationDetailPage.find('FlightSummaryCard')).to.be.lengthOf(1);
        expect(viewReservationDetailPage.find('FlightSummaryCardHeader')).to.have.text('DepartingFri, Aug 25, 2017');
      });

      it('should show on flight summary for round trip', () => {
        const reservationState = {
          bounds: [
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
              isNextDayArrival: false
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
              isNextDayArrival: false
            }
          ]
        };

        viewReservationDetailPage = createComponent({}, reservationState);

        expect(viewReservationDetailPage.find('FlightSummaryCard')).to.be.lengthOf(2);
        expect(viewReservationDetailPage.find('FlightSummaryCardHeader').at(0)).to.have.text(
          'DepartingFri, Aug 25, 2017'
        );
        expect(viewReservationDetailPage.find('FlightSummaryCardHeader').at(1)).to.have.text(
          'ReturningMon, Aug 28, 2017'
        );
      });
    });
  });

  context('UNSAFE_componentWillReceiveProps', () => {
    it('should retrieve reservation detail when component receive new recordLocator', () => {
      const accountState = {
        isLoggedIn: true,
        accountInfo: {
          companionName: {
            firstName: 'Tom',
            lastName: 'Robert'
          },
          companionFullName: 'Tom Robert'
        }
      };
      const reservationState = {
        companion: {
          name: 'Tom Robert',
          firstName: 'Tom',
          lastName: 'Robert',
          confirmationNumber: 'ABCDEF'
        },
        isInternational: false
      };

      location.href = 'http://example.com/view-reservation/trip-details/XCV3RW';

      viewReservationDetailPage = createComponent({}, reservationState, accountState, {
        location: {
          pathname: '/view-reservation/trip-details/XCV3RW',
          search: '',
          state: {
            firstName: 'Helen',
            lastName: 'Wang'
          }
        },
        path: '/view-reservation/trip-details/:recordLocator',
        dispatchPageLoadPath: '/view-reservation/trip-details/XCV3RW'
      });

      click(viewReservationDetailPage.find('Button').at(3));

      const actualArgsForCall1 = _omitExtraFieldsFromResponse(retrieveFlightReservationStub.args[0][0]);

      expect(retrieveFlightReservationStub).to.have.been.calledTwice;

      expect(actualArgsForCall1).to.deep.equal({
        companionInfo: {
          companionFullName: 'Tom Robert',
          companionName: { firstName: 'Tom', lastName: 'Robert' }
        },
        firstName: 'Helen',
        isLoggedIn: true,
        lastName: 'Wang',
        recordLocator: 'XCV3RW',
        hasEditedName: false,
        passengerSearchToken: null,
        dispatchPageLoadComplete: {
          action: 'POP',
          location: {
            pathname: '/view-reservation/trip-details/XCV3RW',
            search: '',
            state: {
              firstName: 'Helen',
              lastName: 'Wang'
            }
          }
        }
      });

      const actualArgsForCall2 = _omitExtraFieldsFromResponse(retrieveFlightReservationStub.args[1][0]);

      expect(actualArgsForCall2).to.deep.equal({
        companionInfo: {
          companionFullName: 'Tom Robert',
          companionName: { firstName: 'Tom', lastName: 'Robert' }
        },
        firstName: 'Tom',
        isLoggedIn: true,
        lastName: 'Robert',
        recordLocator: 'ABCDEF',
        hasEditedName: false,
        passengerSearchToken: null,
        dispatchPageLoadComplete: {
          action: 'PUSH',
          location: {
            pathname: '/view-reservation/trip-details/ABCDEF',
            search: '',
            state: {
              firstName: 'Tom',
              lastName: 'Robert'
            }
          }
        }
      });
    });

    it('should retrieve reservation detail when user returns to this page after performing name edit', () => {
      const hasEditedName = true;
      const passengerSearchToken = 'pax-token';
      const accountState = {
        isLoggedIn: true
      };
      const reservationState = {
        isInternational: false
      };

      viewReservationDetailPage = createComponent({}, reservationState, accountState, {
        location: {
          pathname: '/view-reservation/trip-details/XCV3RW',
          search: '',
          state: {
            firstName: 'Helen',
            lastName: 'Wang',
            hasEditedName,
            passengerSearchToken
          }
        },
        path: '/view-reservation/trip-details/:recordLocator',
        dispatchPageLoadPath: '/view-reservation/trip-details/XCV3RW'
      });

      expect(retrieveFlightReservationStub).to.have.been.calledOnce;

      const actualArgs = _omitExtraFieldsFromResponse(retrieveFlightReservationStub.args[0][0]);

      expect(actualArgs).to.be.deep.equal({
        recordLocator: 'XCV3RW',
        firstName: 'Helen',
        lastName: 'Wang',
        hasEditedName,
        passengerSearchToken,
        isLoggedIn: true,
        dispatchPageLoadComplete: {
          action: 'POP',
          location: {
            pathname: '/view-reservation/trip-details/XCV3RW',
            search: '',
            state: {
              firstName: 'Helen',
              lastName: 'Wang',
              hasEditedName,
              passengerSearchToken
            }
          }
        },
        companionInfo: {
          companionFullName: undefined,
          companionName: undefined
        }
      });
    });
  });

  context('componentDidMount', () => {
    it('should retrieve reservation detail when user come to this page', () => {
      const accountState = {
        isLoggedIn: true,
        accountInfo: {
          companionName: {
            firstName: 'Tom',
            lastName: 'Robert'
          },
          companionFullName: 'Tom Robert'
        }
      };
      const reservationState = {
        companion: {
          name: 'Tom Robert',
          firstName: 'Tom',
          lastName: 'Robert',
          confirmationNumber: 'ABCDEF'
        },
        isInternational: false
      };

      viewReservationDetailPage = createComponent({}, reservationState, accountState, {
        location: {
          pathname: '/view-reservation/trip-details/XCV3RW',
          search: '',
          state: {
            firstName: 'Helen',
            lastName: 'Wang'
          }
        },
        path: '/view-reservation/trip-details/:recordLocator',
        dispatchPageLoadPath: '/view-reservation/trip-details/XCV3RW'
      });

      expect(retrieveFlightReservationStub).to.have.been.calledOnce;

      const actualArgs = _omitExtraFieldsFromResponse(retrieveFlightReservationStub.args[0][0]);

      expect(actualArgs).to.be.deep.equal({
        recordLocator: 'XCV3RW',
        firstName: 'Helen',
        lastName: 'Wang',
        hasEditedName: false,
        passengerSearchToken: null,
        companionInfo: {
          companionFullName: 'Tom Robert',
          companionName: {
            firstName: 'Tom',
            lastName: 'Robert'
          }
        },
        isLoggedIn: true,
        dispatchPageLoadComplete: {
          action: 'POP',
          location: {
            pathname: '/view-reservation/trip-details/XCV3RW',
            search: '',
            state: {
              firstName: 'Helen',
              lastName: 'Wang'
            }
          }
        }
      });
    });

    it('should retrieve reservation detail when user come to this page with recordLocator in state with Normalized route', () => {
      const accountState = {
        isLoggedIn: true,
        accountInfo: {
          companionName: {
            firstName: 'Tom',
            lastName: 'Robert'
          },
          companionFullName: 'Tom Robert'
        }
      };
      const reservationState = {
        companion: {
          name: 'Tom Robert',
          firstName: 'Tom',
          lastName: 'Robert',
          confirmationNumber: 'ABCDEF'
        },
        isInternational: false
      };

      viewReservationDetailPage = createComponent({}, reservationState, accountState, {
        location: {
          pathname: '/air/manage-reservation/view.html',
          search: '',
          state: {
            firstName: 'Helen',
            lastName: 'Wang',
            recordLocator: 'XCV3RW'
          }
        },
        path: '/air/manage-reservation/view.html',
        dispatchPageLoadPath: '/air/manage-reservation/view.html'
      });

      expect(retrieveFlightReservationStub).to.have.been.calledOnce;

      const actualArgs = _omitExtraFieldsFromResponse(retrieveFlightReservationStub.args[0][0]);

      expect(actualArgs).to.be.deep.equal({
        recordLocator: 'XCV3RW',
        firstName: 'Helen',
        lastName: 'Wang',
        hasEditedName: false,
        passengerSearchToken: null,
        companionInfo: {
          companionFullName: 'Tom Robert',
          companionName: {
            firstName: 'Tom',
            lastName: 'Robert'
          }
        },
        isLoggedIn: true,
        dispatchPageLoadComplete: {
          action: 'POP',
          location: {
            pathname: '/air/manage-reservation/view.html',
            search: '',
            state: {
              firstName: 'Helen',
              lastName: 'Wang',
              recordLocator: 'XCV3RW'
            }
          }
        }
      });
    });

    it('should retrieve reservation detail when user come to this page with searchToken', () => {
      const accountState = {
        isLoggedIn: true,
        accountInfo: {
          companionName: {
            firstName: 'Tom',
            lastName: 'Robert'
          },
          companionFullName: 'Tom Robert'
        }
      };
      const reservationState = {
        companion: {
          name: 'Tom Robert',
          firstName: 'Tom',
          lastName: 'Robert',
          confirmationNumber: 'ABCDEF'
        },
        isInternational: false
      };

      viewReservationDetailPage = createComponent({}, reservationState, accountState, {
        location: {
          pathname: '/air/manage-reservation/view.html',
          search: '?searchToken=ae1sdfaeg21dsfwgsadgsdgadgsadgasdg',
          state: {}
        },
        path: '/air/manage-reservation/view.html',
        dispatchPageLoadPath: '/air/manage-reservation/view.html'
      });

      expect(retrieveFlightReservationStub).to.have.been.calledOnce;

      const actualArgs = _omitExtraFieldsFromResponse(retrieveFlightReservationStub.args[0][0]);

      expect(actualArgs).to.be.deep.equal({
        passengerSearchToken: 'ae1sdfaeg21dsfwgsadgsdgadgsadgasdg',
        companionInfo: {
          companionFullName: 'Tom Robert',
          companionName: {
            firstName: 'Tom',
            lastName: 'Robert'
          }
        },
        isLoggedIn: true
      });
    });
  });

  context('componentWillUnmount', () => {
    it('should clear the viewReservationDetailStore', () => {
      viewReservationDetailPage = createComponent();

      viewReservationDetailPage.unmount();

      expect(clearViewReservationDetailsStub).to.be.called;
    });
  });

  const createComponent = (
    props = {},
    reservationState = {},
    accountState = {},
    options = {
      location: {
        pathname: '/view-reservation/trip-details/AAAAAA',
        search: '',
        state: {
          firstName: 'Fred',
          lastName: 'Asberry'
        }
      },
      path: '/view-reservation/trip-details/:recordLocator',
      dispatchPageLoadPath: '/view-reservation/trip-details/AAAAAA'
    },
    shouldShallow = false
  ) => {
    const initialState = configureMockStore()({});
    const defaultProps = {
      push: pushStub,
      messages: [
        {
          key: 'REACCOM_VIEW_RESERVATION',
          icon: 'reaccomIcon',
          header: 'reaccomHeader',
          body: 'reaccomBody'
        }
      ],
      companionName: {
        firstName: 'Fred',
        lastName: ''
      },
      history: { action: '', location: { pathname: '' } },
      location: {
        pathname: '/view-reservation/trip-details/AAAAA',
        state: {
          firstName: 'STEVEN',
          lastName: 'JACKIE'
        }
      },
      viewReservationViewPage: {
        _links: {
          contactInformation: {
            body: {
              contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a',
              passengerSearchToken:
                '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ'
            },
            href: '/v1/mobile-air-booking/page/view-reservation/contact-info',
            method: 'POST'
          },
          upgradeMyFlight: {
            body: {
              contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a',
              passengerSearchToken:
                '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ'
            }
          }
        }
      },
      isUserLoggedIn: false,
      retrieveFlightReservationFn: retrieveFlightReservationStub,
      retrieveFlightReservationWithTokenFn: retrieveFlightReservationStub,
      clearFlightReservationFn: clearFlightReservationStub,
      saveUpgradeTypeFn: saveUpgradeTypeFnStub,
      getUpgradeFareReservationFn: getUpgradeFareReservationFnStub,
      retrieveTravelInformationFn: retrieveTravelInformationStub,
      viewReservationSearchRequest: {
        body: {
          firstName: 'bob',
          lastName: 'builder',
          recordLocator: '12345s'
        }
      }
    };
    const updatedState = _.merge(
      {},
      initialState,
      transformResponseToViewReservationDetail(new ViewReservationBuilder().withUpsellDetails().build()),
      reservationState
    );
    const finalState = {};

    _.set(finalState, 'app.viewReservation.flightReservation', updatedState);
    _.set(finalState, 'app.account', accountState);

    return shouldShallow
      ? shallow(<ViewReservationDetailPageClass {..._.merge({}, defaultProps, props)} />)
      : integrationMount({
        location: options.location,
        path: options.path
      })(finalState, ViewReservationDetailPage, _.merge({}, defaultProps, props));
  };

  const _omitExtraFieldsFromResponse = (response) =>
    _.omit(response, ['dispatchPageLoadComplete.location.key', 'dispatchPageLoadComplete.location.hash']);
});
