import { getKtnRedress } from 'src/shared/analytics/eventStore/ktnRedressSelector';

describe('ktnRedressSelector', () => {
  context('editedKTN', () => {
    it('should return editedKTN as true when one is on file and a new one is passed in', () => {
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
                  knownTravelerId: '12392382'
                }
              }
            }
          }
        }
      };

      expect(getKtnRedress(state)).to.deep.equal({
        editedRedress: false,
        editedKTN: true
      });
    });
    it('should return editedKTN as false when one is not on file and a new one is passed in', () => {
      const state = {
        app: {
          viewReservation: {
            travelInformationPage: {
              response: {
                editPNRPassengerPage: {
                  redressNumber: 'On File',
                  knownTravelerId: null
                }
              },
              saveTravelInformationRequest: {
                body: {
                  knownTravelerId: '12392382'
                }
              }
            }
          }
        }
      };

      expect(getKtnRedress(state)).to.deep.equal({
        editedRedress: false,
        editedKTN: false
      });
    });
  });
  context('editedRedress', () => {
    it('should record editedRedress as true when one is on file and a new one is passed in', () => {
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
                  redressNumber: '123454321234'
                }
              }
            }
          }
        }
      };

      expect(getKtnRedress(state)).to.deep.equal({
        editedRedress: true,
        editedKTN: false
      });
    });
    it('should record editedRedress as false when one is not on file and a new one is passed in', () => {
      const state = {
        app: {
          viewReservation: {
            travelInformationPage: {
              response: {
                editPNRPassengerPage: {
                  redressNumber: null,
                  knownTravelerId: 'On File'
                }
              },
              saveTravelInformationRequest: {
                body: {
                  redressNumber: '123454321234'
                }
              }
            }
          }
        }
      };

      expect(getKtnRedress(state)).to.deep.equal({
        editedRedress: false,
        editedKTN: false
      });
    });
  });
});
