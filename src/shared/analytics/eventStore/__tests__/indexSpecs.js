import * as eventStoreAnalytics from 'src/shared/analytics/eventStore/index';
import ViewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';

describe('analyticsForEventStore', () => {
  context('analytics actions for event store', () => {
    it('should return analytics actions for earlyBird from selectors', () => {
      const { analyticsActionsForEventStore } = eventStoreAnalytics;

      expect(analyticsActionsForEventStore).to.include.members([
        ViewReservationActionTypes.VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS
      ]);

      expect(analyticsActionsForEventStore).to.have.lengthOf(1);
    });
  });

  context('generateEventStore', () => {
    it('should return all fields with false when there is no saved travel information in the body of link', () => {
      const state = {};
      const actionType = ViewReservationActionTypes.VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS;

      const result = eventStoreAnalytics.generateEventStore(state, actionType);

      expect(result).to.deep.equal({
        addedRR: false,
        addedRedress: false,
        addedKTN: false,
        addedPassport: false,
        addedEmergencyContact: false,
        edited: {
          editedKTN: false,
          editedRedress: false
        }
      });
    });

    it('should return all fields with true when all fields saved travel information are in the body of link', () => {
      const state = {
        app: {
          viewReservation: {
            travelInformationPage: {
              saveTravelInformationRequest: {
                body: {
                  accountNumber: '6014293930',
                  knownTravelerId: '12392382',
                  redressNumber: '3828388383',
                  passportInformation: {
                    passportNumber: 'KSJFW98239'
                  },
                  emergencyContact: {
                    name: 'Lee Ann',
                    contactPhone: {
                      number: '469-422-4938',
                      countryCode: 'US'
                    }
                  }
                }
              }
            }
          }
        }
      };
      const actionType = ViewReservationActionTypes.VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS;

      const result = eventStoreAnalytics.generateEventStore(state, actionType);

      expect(result).to.deep.equal({
        addedRR: true,
        addedRedress: true,
        addedKTN: true,
        addedPassport: true,
        addedEmergencyContact: true,
        edited: {
          editedKTN: false,
          editedRedress: false
        }
      });
    });

    it('should show that the customer has edited their KTN and redress when they change a number on file', () => {
      const state = {
        app: {
          viewReservation: {
            travelInformationPage: {
              response: {
                editPNRPassengerPage: {
                  redressNumber: 'On File',
                  knownTravelerId: 'On File'
                }
              },
              saveTravelInformationRequest: {
                body: {
                  knownTravelerId: '12392382',
                  redressNumber: '3828388383'
                }
              }
            }
          }
        }
      };
      const actionType = ViewReservationActionTypes.VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS;

      const result = eventStoreAnalytics.generateEventStore(state, actionType);

      expect(result).to.deep.equal({
        addedRR: false,
        addedRedress: true,
        addedKTN: true,
        addedPassport: false,
        addedEmergencyContact: false,
        edited: {
          editedKTN: true,
          editedRedress: true
        }
      });
    });
  });
});
