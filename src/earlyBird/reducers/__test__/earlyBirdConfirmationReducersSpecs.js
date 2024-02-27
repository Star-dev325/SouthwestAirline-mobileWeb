import EarlyBirdConfirmationReducers from 'src/earlyBird/reducers/earlyBirdConfirmationReducers';
import EarlyBirdActionsTypes from 'src/earlyBird/actions/earlyBirdActionTypes';

const { EARLY_BIRD__FETCH_PURCHASE_SUCCESS } = EarlyBirdActionsTypes;

describe('EarlyBirdDetailPageReducer', () => {
  it('should init response as empty object', () => {
    const reducer = EarlyBirdConfirmationReducers(undefined, { type: '@@Init' });

    expect(reducer.response).to.deep.eql({});
  });

  it('should save response when the EARLY_BIRD__FETCH_RESERVATION_SUCCESS action is triggered', () => {
    const reducer = EarlyBirdConfirmationReducers(undefined, {
      type: EARLY_BIRD__FETCH_PURCHASE_SUCCESS,
      response: { data: 'testResponse' }
    });

    expect(reducer.response).to.deep.eql({ data: 'testResponse' });
  });

  it('should return default state when action is undefined', () => {
    expect(EarlyBirdConfirmationReducers().response).to.be.empty;
  });
});
