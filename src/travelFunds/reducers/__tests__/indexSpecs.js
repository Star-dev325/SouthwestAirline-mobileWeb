import travelFunds from 'src/travelFunds/reducers';

describe('TravelFunds Reducers', () => {
  let defaultState;

  beforeEach(() => {
    defaultState = {
      lookUpTravelFundsPage: {
        viewTravelFund: {
          retrievedFunds: []
        },
        message: null,
        currentlySelectedTab: 'travel-funds',
        validateFunds: {},
        transferTravelFundsConfirmation: {},
        associateFundsMessage: {},
        previousTravelFundsSearch: {},
        resumeAfterLogin: {},
        placements: []
      }
    };
  });

  it('should create default store structure when @@INIT action is triggered', () => {
    const action = {
      type: '@@INIT'
    };

    expect(travelFunds(undefined, action)).to.deep.equal(defaultState);
  });
});
