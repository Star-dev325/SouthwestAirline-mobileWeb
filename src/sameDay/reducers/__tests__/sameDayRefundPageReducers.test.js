import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import sameDayRefundPageReducers from 'src/sameDay/reducers/sameDayRefundPageReducers';
import SameDayRefundMethodBuilder from 'test/builders/apiResponse/sameDayRefundMethodBuilder';

const { SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND, SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS } =
  SameDayActionTypes;

const defaultResponse = {
  ...new SameDayRefundMethodBuilder().build().sameDayRefundMethod
};

const sameDayUpdateSameDayConfirmationRefundAction = {
  type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND,
  response: {}
};

const sameDayUpdateSameDayConfirmationRefundSuccess = {
  type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS,
  response: defaultResponse
};

const actions = [
  [sameDayUpdateSameDayConfirmationRefundSuccess, defaultResponse],
  [sameDayUpdateSameDayConfirmationRefundAction, {}]
];

describe('sameDayRefundPageReducers', () => {
  describe('when state is empty', () => {
    describe('when action is undefined', () => {
      it('should return empty', () => {
        expect(sameDayRefundPageReducers({}, undefined)).toEqual({});
      });
    });

    describe('when both state and action are empty', () => {
      it('should return empty object', () => {
        expect(sameDayRefundPageReducers({}, {})).toEqual({});
      });
    });

    describe('when state is empty with correct action', () => {
      actions.forEach(([action, expected]) => {
        it(`should return correct response for action type ${action.type}`, () => {
          expect(sameDayRefundPageReducers({}, action)).toEqual(expected);
        });
      });
    });
  });
});
