import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import { isRedirectingPath as isRedirectingPathReducer } from 'src/shared/reducers/isRedirectingPathReducer';

describe('isRedirectingPathReducer', () => {
  const initialState = false;

  it('should have correct initial state', () => {
    expect(
      isRedirectingPathReducer(undefined, {
        type: 'INVALID_ACTION'
      })
    ).to.deep.equal(initialState);
  });

  it('should return true when setIsRedirectingPath is dispatched with isRedirectingPath true', () => {
    const state = isRedirectingPathReducer(null, {
      type: SharedActionTypes.SHARED__SET_IS_REDIRECTING_PATH,
      isRedirectingPath: true
    });

    expect(state).to.be.deep.equal(true);
  });

  it('should return false when setIsRedirectingPath is dispatched with isRedirectingPath false', () => {
    const state = isRedirectingPathReducer(null, {
      type: SharedActionTypes.SHARED__SET_IS_REDIRECTING_PATH,
      isRedirectingPath: false
    });

    expect(state).to.be.deep.equal(false);
  });

  it('should return default state when action is undefined', () => {
    expect(isRedirectingPathReducer().response).to.deep.equal(undefined);
  });
});
