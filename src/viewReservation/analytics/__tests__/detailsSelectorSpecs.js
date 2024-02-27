import _ from 'lodash';
import { getDetails } from 'src/viewReservation/analytics/detailsSelector';
import { ANALYTICS_DEFAULT } from 'src/viewReservation/reducers/travelInformationPageReducers';

describe('detailsSelector', () => {
  let travelInformationAnalytics;
  let expectedTravelInfoAnalytics;

  beforeEach(() => {
    travelInformationAnalytics = {
      ...ANALYTICS_DEFAULT
    };
    expectedTravelInfoAnalytics = {
      change: {
        firstName: false,
        middleName: false,
        lastName: false
      }
    };
  });

  context('getDetails', () => {
    it('should generate the pnr, isOnStandBy, multiPax and isReaccom', () => {
      const state = {
        app: {
          viewReservation: {
            travelInformationPage: {
              response: {
                editPNRPassengerPage: {
                  _analytics: {
                    daysToTrip: '0'
                  }
                }
              }
            },
            flightReservation: {
              confirmationNumber: 'ABC123',
              bounds: [{ standbyFlight: false }],
              isSwabiz: true,
              passengers: [
                {
                  name: 'Tang Claw',
                  accountNumber: null,
                  passengerReference: '2',
                  hasAnyEarlyBird: false,
                  hasCompletePassportInfo: false,
                  checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
                  isCheckedIn: false,
                  isCheckInEligible: true,
                  isUnaccompaniedMinor: false
                },
                {
                  name: 'Tang Phillips',
                  accountNumber: null,
                  passengerReference: '4',
                  hasAnyEarlyBird: false,
                  hasCompletePassportInfo: false,
                  checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
                  isCheckedIn: false,
                  isCheckInEligible: true,
                  isUnaccompaniedMinor: false
                },
                {
                  name: 'Charith Terris',
                  accountNumber: null,
                  passengerReference: '3',
                  hasAnyEarlyBird: false,
                  hasCompletePassportInfo: false,
                  checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
                  isCheckedIn: false,
                  isCheckInEligible: true,
                  isUnaccompaniedMinor: false
                }
              ],
              _links: {
                reaccom: null
              },
              viewReservationAnalytics: {
                recordLocator: 'ABC123',
                gdsTicketType: null,
                isInternational: false,
                isSwabiz: true
              },
              _analytics: {
                'air.odout': 'DALCUN',
                'air.odret': 'CUNDAL',
                'pnr.isinternational': '1'
              }
            }
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({
        isOnStandby: false,
        isMultiPax: true,
        daysToTrip: 'Zero',
        gdsTicketType: null,
        isInternational: false,
        isSwabiz: true,
        isReaccom: false,
        recordLocator: 'ABC123',
        checkInButton: false,
        'air.odout': 'DALCUN',
        'air.odret': 'CUNDAL',
        'pnr.isinternational': '1',
        ...expectedTravelInfoAnalytics
      });
    });

    it('should set isMultiPax to false if only one passenger', () => {
      const state = {
        app: {
          viewReservation: {
            travelInformationPage: {
              response: {
                editPNRPassengerPage: {
                  _analytics: {
                    daysToTrip: undefined
                  }
                }
              },
              analytics: ANALYTICS_DEFAULT
            },
            flightReservation: {
              confirmationNumber: 'XYZ456',
              bounds: [{ standbyFlight: false }],
              isSwabiz: true,
              passengers: [
                {
                  name: 'Tang Claw',
                  accountNumber: null,
                  passengerReference: '2',
                  hasAnyEarlyBird: false,
                  hasCompletePassportInfo: false,
                  checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
                  isCheckedIn: false,
                  isCheckInEligible: true,
                  isUnaccompaniedMinor: false
                }
              ],
              _links: {
                reaccom: null
              },
              viewReservationAnalytics: {
                recordLocator: 'XYZ456',
                gdsTicketType: null,
                isInternational: false,
                isSwabiz: true
              },
              _analytics: {
                'air.odout': 'DALCUN',
                'air.odret': 'CUNDAL',
                'pnr.isinternational': '1'
              }
            }
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({
        isOnStandby: false,
        isMultiPax: false,
        daysToTrip: undefined,
        gdsTicketType: null,
        isInternational: false,
        isSwabiz: true,
        isReaccom: false,
        recordLocator: 'XYZ456',
        checkInButton: false,
        'air.odout': 'DALCUN',
        'air.odret': 'CUNDAL',
        'pnr.isinternational': '1',
        ...expectedTravelInfoAnalytics
      });
    });

    it('should set checkInButton to true if isCheckInEligible is true and isCheckedIn is false', () => {
      const state = {
        app: {
          viewReservation: {
            travelInformationPage: {
              response: {
                editPNRPassengerPage: {
                  _analytics: {
                    daysToTrip: undefined
                  }
                }
              },
              analytics: ANALYTICS_DEFAULT
            },
            flightReservation: {
              confirmationNumber: 'XYZ456',
              bounds: [{ standbyFlight: false }],
              isSwabiz: true,
              isCheckInEligible: true,
              isCheckedIn: false,
              passengers: [
                {
                  name: 'Tang Claw',
                  accountNumber: null,
                  passengerReference: '2',
                  hasAnyEarlyBird: false,
                  hasCompletePassportInfo: false,
                  checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
                  isCheckedIn: false,
                  isCheckInEligible: true,
                  isUnaccompaniedMinor: false
                }
              ],
              _links: {
                reaccom: null
              },
              viewReservationAnalytics: {
                recordLocator: 'XYZ456',
                gdsTicketType: null,
                isInternational: false,
                isSwabiz: true
              },
              _analytics: {
                'air.odout': 'DALCUN',
                'air.odret': 'CUNDAL',
                'pnr.isinternational': '1'
              }
            }
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({
        isOnStandby: false,
        isMultiPax: false,
        daysToTrip: undefined,
        gdsTicketType: null,
        isInternational: false,
        isSwabiz: true,
        isReaccom: false,
        recordLocator: 'XYZ456',
        checkInButton: true,
        'air.odout': 'DALCUN',
        'air.odret': 'CUNDAL',
        'pnr.isinternational': '1',
        ...expectedTravelInfoAnalytics
      });
    });

    it('should set checkInButton to false if isCheckInEligible is false and isCheckedIn is true', () => {
      const state = {
        app: {
          viewReservation: {
            travelInformationPage: {
              response: {
                editPNRPassengerPage: {
                  _analytics: {
                    daysToTrip: undefined
                  }
                }
              },
              analytics: ANALYTICS_DEFAULT
            },
            flightReservation: {
              confirmationNumber: 'XYZ456',
              bounds: [{ standbyFlight: false }],
              isSwabiz: true,
              isCheckInEligible: false,
              isCheckedIn: true,
              passengers: [
                {
                  name: 'Tang Claw',
                  accountNumber: null,
                  passengerReference: '2',
                  hasAnyEarlyBird: false,
                  hasCompletePassportInfo: false,
                  checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
                  isCheckedIn: false,
                  isCheckInEligible: true,
                  isUnaccompaniedMinor: false
                }
              ],
              _links: {
                reaccom: null
              },
              viewReservationAnalytics: {
                recordLocator: 'XYZ456',
                gdsTicketType: null,
                isInternational: false,
                isSwabiz: true
              },
              _analytics: {
                'air.odout': 'DALCUN',
                'air.odret': 'CUNDAL',
                'pnr.isinternational': '1'
              }
            }
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({
        isOnStandby: false,
        isMultiPax: false,
        daysToTrip: undefined,
        gdsTicketType: null,
        isInternational: false,
        isSwabiz: true,
        isReaccom: false,
        recordLocator: 'XYZ456',
        checkInButton: false,
        'air.odout': 'DALCUN',
        'air.odret': 'CUNDAL',
        'pnr.isinternational': '1',
        ...expectedTravelInfoAnalytics
      });
    });

    it('should set isReaccom to true if the PNR is reaccom', () => {
      const state = {
        app: {
          viewReservation: {
            travelInformationPage: {
              response: {
                editPNRPassengerPage: {
                  _analytics: {
                    daysToTrip: undefined
                  }
                }
              },
              analytics: ANALYTICS_DEFAULT
            },
            flightReservation: {
              confirmationNumber: 'XYZ456',
              bounds: [{ standbyFlight: false }],
              isSwabiz: true,
              passengers: [
                {
                  name: 'Tang Claw',
                  accountNumber: null,
                  passengerReference: '2',
                  hasAnyEarlyBird: false,
                  hasCompletePassportInfo: false,
                  checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
                  isCheckedIn: false,
                  isCheckInEligible: true,
                  isUnaccompaniedMinor: false
                }
              ],
              _links: {
                reaccom: {
                  href: '/v1/mobile-air-booking/page/flights/reaccom/reservations/current/XYZ456',
                  method: 'GET'
                }
              },
              viewReservationAnalytics: {
                recordLocator: 'XYZ456',
                gdsTicketType: null,
                isInternational: false,
                isSwabiz: true
              },
              _analytics: {
                'air.odout': 'DALCUN',
                'air.odret': 'CUNDAL',
                'pnr.isinternational': '1'
              }
            }
          }
        }
      };

      expect(getDetails(state)).to.deep.equal({
        isOnStandby: false,
        isMultiPax: false,
        daysToTrip: undefined,
        gdsTicketType: null,
        isInternational: false,
        isSwabiz: true,
        isReaccom: true,
        recordLocator: 'XYZ456',
        checkInButton: false,
        'air.odout': 'DALCUN',
        'air.odret': 'CUNDAL',
        'pnr.isinternational': '1',
        ...expectedTravelInfoAnalytics
      });
    });

    context('traveler name changes', () => {
      let defaultState;
      let origName;

      beforeEach(() => {
        origName = {
          firstName: 'Fred',
          middleName: 'Rock',
          lastName: 'Flintstone'
        };

        travelInformationAnalytics = {
          origName,
          changedName: _.cloneDeep(origName)
        };

        defaultState = {
          app: {
            viewReservation: {
              travelInformationPage: {
                response: {
                  editPNRPassengerPage: {
                    _analytics: {
                      daysToTrip: '0'
                    }
                  }
                },
                analytics: ANALYTICS_DEFAULT
              }
            }
          }
        };
      });

      it('should set change object to default values', () => {
        const state = defaultState;
        const action = { type: 'INIT' };

        const newState = getDetails(state, action);

        expect(newState.change).to.deep.equal(expectedTravelInfoAnalytics.change);
      });

      it('should set change object when firstName changes', () => {
        travelInformationAnalytics.changedName.firstName = 'NewName';
        const state = defaultState;

        state.app.viewReservation.travelInformationPage.analytics = travelInformationAnalytics;

        const newState = getDetails(state);

        expect(newState.change).to.deep.equal({
          firstName: true,
          middleName: false,
          lastName: false
        });
      });

      it('should set change object when middleName changes', () => {
        travelInformationAnalytics.changedName.middleName = 'NewName';
        const state = defaultState;

        state.app.viewReservation.travelInformationPage.analytics = travelInformationAnalytics;

        const newState = getDetails(state);

        expect(newState.change).to.deep.equal({
          firstName: false,
          middleName: true,
          lastName: false
        });
      });

      it('should set change object when lastName changes', () => {
        travelInformationAnalytics.changedName.lastName = 'NewName';
        const state = defaultState;

        state.app.viewReservation.travelInformationPage.analytics = travelInformationAnalytics;

        const newState = getDetails(state);

        expect(newState.change).to.deep.equal({
          firstName: false,
          middleName: false,
          lastName: true
        });
      });

      it('should set change object when user has no middleName and no middleName added (withForm feature/issue)', () => {
        travelInformationAnalytics.origName.middleName = null;
        travelInformationAnalytics.changedName.middleName = '';
        const state = defaultState;

        state.app.viewReservation.travelInformationPage.analytics = travelInformationAnalytics;

        const newState = getDetails(state);

        expect(newState.change).to.deep.equal({
          firstName: false,
          middleName: false,
          lastName: false
        });
      });

      it('should set change object to defaults when no origName and changedName', () => {
        travelInformationAnalytics.origName = null;
        travelInformationAnalytics.changedName = null;
        const state = defaultState;

        state.app.viewReservation.travelInformationPage.analytics = travelInformationAnalytics;

        const newState = getDetails(state);

        expect(newState.change).to.deep.equal({
          firstName: false,
          middleName: false,
          lastName: false
        });
      });

      it('should set change object to defaults when has origName and no changedName', () => {
        travelInformationAnalytics.changedName = null;
        const state = defaultState;

        state.app.viewReservation.travelInformationPage.analytics = travelInformationAnalytics;

        const newState = getDetails(state);

        expect(newState.change).to.deep.equal({
          firstName: false,
          middleName: false,
          lastName: false
        });
      });
    });
  });
});
