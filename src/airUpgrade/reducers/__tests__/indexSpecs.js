import airUpgradeReducers from 'src/airUpgrade/reducers';

describe('AirUpgrade Reducers', () => {
  let defaultState;

  beforeEach(() => {
    defaultState = {
      airUpgradeReducer: {
        viewUpgradeReservationPage: {}
      },
      upgradeFarePagePlacement: {},
      upgradeSelectBoundsPage: {
        resumeAfterLogin: false,
        searchRequest: {}
      }
    };
  });

  it('should create default store structure when @@INIT action is triggered', () => {
    const action = {
      type: '@@INIT'
    };

    expect(airUpgradeReducers(undefined, action)).to.deep.equal(defaultState);
  });
});
