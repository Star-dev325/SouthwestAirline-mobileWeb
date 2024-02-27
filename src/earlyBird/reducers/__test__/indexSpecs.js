import earlyBirdReducers from 'src/earlyBird/reducers/index';
import earlyBirdActionTypes from 'src/earlyBird/actions/earlyBirdActionTypes';

const { EARLY_BIRD__RESET_FLOW_DATA } = earlyBirdActionTypes;

describe('early bird reducers', () => {
  it('should reset earlyBird flow data when dispatch reset action', () => {
    const previousState = { checkInPage: { banner: 'banner' } };
    const initialState = earlyBirdReducers(undefined, { type: '@@INIT' });

    expect(earlyBirdReducers(previousState, { type: EARLY_BIRD__RESET_FLOW_DATA })).to.deep.equal(initialState);
  });
});
