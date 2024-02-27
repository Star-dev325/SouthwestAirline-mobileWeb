import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import { viewBoardingPass as viewBoardingPassReducer } from 'src/shared/reducers/viewBoardingPassReducer';

describe('viewBoardingPassReducer', () => {
  let initialState;
  let viewBoardingPass;
  let viewBoardingPassIssuance;

  beforeEach(() => {
    viewBoardingPass = {
      body: {
        checkInSessionToken: null,
        firstName: 'STEVEN',
        lastName: 'JACKIE',
        recordLocator: 'ABC123'
      },
      href: '/v1/mobile-air-operations/page/view-boarding-pass',
      method: 'POST'
    };
    viewBoardingPassIssuance = {
      body: {
        checkInSessionToken: null,
        firstName: 'STEVEN',
        lastName: 'JACKIE',
        recordLocator: 'ABC123',
        travelerID: ['123']
      },
      href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
      method: 'POST'
    };
    initialState = {};
  });

  it('should have correct initial state', () => {
    expect(
      viewBoardingPassReducer(undefined, {
        type: 'INVALID_ACTION'
      })
    ).to.deep.equal(initialState);
  });

  it('should return viewBoardingPass when updateViewBoardingPass is dispatched', () => {
    const state = viewBoardingPassReducer(null, {
      type: SharedActionTypes.SHARED__UPDATE_VIEW_BOARDING_PASS,
      payload: viewBoardingPass
    });

    expect(state).to.be.deep.equal(viewBoardingPass);
  });

  it('should return viewBoardingPassIssuance when updateViewBoardingPass is dispatched', () => {
    const state = viewBoardingPassReducer(null, {
      type: SharedActionTypes.SHARED__UPDATE_VIEW_BOARDING_PASS,
      payload: viewBoardingPassIssuance
    });

    expect(state).to.be.deep.equal(viewBoardingPassIssuance);
  });

  it('should return default state when action is undefined', () => {
    expect(viewBoardingPassReducer().response).to.deep.equal(undefined);
  });
});
