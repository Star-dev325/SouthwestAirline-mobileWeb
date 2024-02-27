import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import sameDayPaymentPageReducers from 'src/sameDay/reducers/sameDayPaymentPageReducers';

const { SAME_DAY__RESET_PAYMENT_INFO, SAME_DAY__SAVE_PAYMENT_INFO } = SameDayActionTypes;
const sameDayResetPaymentInfo = {
  response: {},
  type: SAME_DAY__RESET_PAYMENT_INFO
};
const sameDaySavePaymentInfo = {
  paymentInfo: { mockPaymentInfo: 'someValue' },
  type: SAME_DAY__SAVE_PAYMENT_INFO
};

describe('sameDayPaymentReducer', () => {
  it('when state is undefined and action is save payment info should return valid response', () => {
    expect(sameDayPaymentPageReducers(undefined, sameDaySavePaymentInfo)).toEqual(
      sameDaySavePaymentInfo.paymentInfo);
  });
  it('when state is undefined and action is reset payment info should return {} as response', () => {
    expect(sameDayPaymentPageReducers(undefined, sameDayResetPaymentInfo)).toEqual({});
  });

  it('when state and action are undefined should return an empty object', () => {
    expect(sameDayPaymentPageReducers(undefined, undefined)).toEqual({});
  });
  it('when state is {} and action is undefined should return {} as default', () => {
    expect(sameDayPaymentPageReducers({}, undefined)).toEqual({});
  });

  it('when action type does not match with any one of the defined types should return default state', () => {
    expect(sameDayPaymentPageReducers(undefined, { type: 'sameday' })).toEqual({});
  });
});
