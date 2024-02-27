import { applyTravelFunds } from 'src/shared/reducers/applyTravelFundsReducers';

describe('applyTravelFundsPageReducers', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      response: {},
      currentlySelectedTab: 'travel-funds'
    };
  });

  it('should initialize state', () => {
    const action = { type: '@@INIT' };

    expect(applyTravelFunds(undefined, action)).to.deep.equal(initialState);
  });

  it('SHARED__RESET_CALCULATE_FLOW_DATA', () => {
    const action = {
      type: 'SHARED__RESET_CALCULATE_FLOW_DATA'
    };

    expect(applyTravelFunds(undefined, action)).to.deep.equal({
      response: {},
      currentlySelectedTab: 'travel-funds'
    });
  });

  context('response node', () => {
    it('should populate the response node when SHARED__CALC_FUNDS_SUCCESS action is triggered', () => {
      const action = {
        type: 'SHARED__CALC_FUNDS_SUCCESS',
        response: 'response'
      };

      expect(applyTravelFunds(undefined, action)).to.deep.equal({
        response: 'response',
        currentlySelectedTab: 'travel-funds'
      });
    });

    it('should return default state when action is undefined', () => {
      expect(applyTravelFunds()).to.deep.equal({
        response: {},
        currentlySelectedTab: 'travel-funds'
      });
    });
  });

  context('updateSelectedApplyTab ', () => {
    it('should set the currently selected lookup tab in redux', () => {
      const action = {
        type: 'TRAVEL_FUNDS__UPDATE_SELECTED_APPLY_TAB',
        selection: 'luv-voucher'
      };

      expect(applyTravelFunds(undefined, action)).to.deep.equal({
        response: {},
        currentlySelectedTab: 'luv-voucher'
      });
    });
  });

  it('should populate the response node when SHARED__REMOVE_TRAVEL_FUND_SUCCESS action is triggered', () => {
    const action = {
      type: 'SHARED__REMOVE_TRAVEL_FUND_SUCCESS',
      response: 'response'
    };

    expect(applyTravelFunds(undefined, action)).to.deep.equal({
      currentlySelectedTab: 'travel-funds',
      response: 'response'
    });
  });

  it('should populate the response node when SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS action is triggered', () => {
    const action = {
      type: 'SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS',
      response: 'response'
    };

    expect(applyTravelFunds(undefined, action)).to.deep.equal({
      currentlySelectedTab: 'travel-funds',
      response: 'response'
    });
  });
});
