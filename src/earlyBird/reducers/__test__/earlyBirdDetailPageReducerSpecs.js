import EarlyBirdDetailPageReducer from 'src/earlyBird/reducers/earlyBirdDetailPageReducers';
import EarlyBirdActionsTypes from 'src/earlyBird/actions/earlyBirdActionTypes';

const { EARLY_BIRD__FETCH_RESERVATION_SUCCESS } = EarlyBirdActionsTypes;

describe('EarlyBirdDetailPageReducer', () => {
  it('should init response as empty object', () => {
    const reducer = EarlyBirdDetailPageReducer(undefined, { type: '@@Init' });

    expect(reducer.response).to.deep.eql({});
  });

  it('should save response when the EARLY_BIRD__FETCH_RESERVATION_SUCCESS action is triggered', () => {
    const reducer = EarlyBirdDetailPageReducer(undefined, {
      type: EARLY_BIRD__FETCH_RESERVATION_SUCCESS,
      response: { data: 'testResponse' }
    });

    expect(reducer.response).to.deep.eql({ data: 'testResponse' });
  });

  it('should return default state when action is undefined', () => {
    expect(EarlyBirdDetailPageReducer().response).to.be.empty;
  });
});
