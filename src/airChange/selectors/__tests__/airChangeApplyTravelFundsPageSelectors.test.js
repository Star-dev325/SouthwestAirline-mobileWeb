import * as AirChangeApplyTravelFundsPageSelectors from 'src/airChange/selectors/airChangeApplyTravelFundsPageSelectors';

describe('airChangeApplyTravelFundsPageSelectors', () => {
  describe('isUpgradeFlow', () => {
    it('should return true', () => {
      const state = { app: { airChange: { changePricingPage: { response: { _meta: { isUpgrade: true } } } } } };

      expect(AirChangeApplyTravelFundsPageSelectors.isUpgradeFlow(state)).toBeTruthy();
    });

    it('should return false', () => {
      expect(AirChangeApplyTravelFundsPageSelectors.isUpgradeFlow()).toBeFalsy();
    });
  });

  describe('getChangePricingPageLink', () => {
    it('should return upgrade value from state', () => {
      const state = {
        app: {
          airChange: {
            changePricingPage: {
              response: {
                _meta: {
                  isUpgrade: true
                }
              }
            }
          },
          airUpgrade: {
            airUpgradeReducer: {
              viewUpgradeReservationPage: {
                _links: {
                  changePricingPage: {
                    airUpgradeContent: 'value'
                  }
                }
              }
            }
          }
        }
      };

      expect(AirChangeApplyTravelFundsPageSelectors.getChangePricingPageLink(state)).toMatchObject({ airUpgradeContent: 'value' });
    });

    it('should return change value from state', () => {
      const state = {
        app: {
          airChange: {
            changeShoppingPage: {
              response: {
                _links: {
                  changePricingPage: {
                    airChangeContent: 'value'
                  }
                }
              }
            }
          },
          airUpgrade: {
            airUpgradeReducer: {
              viewUpgradeReservationPage: {
                _links: {
                  changePricingPage: {
                    airUpgradeContent: 'value'
                  }
                }
              }
            }
          }
        }
      };

      expect(AirChangeApplyTravelFundsPageSelectors.getChangePricingPageLink(state)).toMatchObject({ airChangeContent: 'value' });
    });
  });
});
