import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import cancelStandbyListConfirmationPageReducers from 'src/standby/reducers/cancelStandbyListConfirmationPageReducers';

const { 
  SAME_DAY__UPDATE_SAME_DAY_CANCELLATION,
  SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS 
} = SameDayActionTypes;
const sameDayCancellation = { type: SAME_DAY__UPDATE_SAME_DAY_CANCELLATION };
const sameDayCancellationSuccess = {
  type: SAME_DAY__UPDATE_SAME_DAY_CANCELLATION_SUCCESS,
  response: { val: 'response' }
};

describe('cancelStandbyListConfirmationPageReducers', () => {
  describe('when action is undefined', () => {
    it('should return true when state is true', () => {
      expect(cancelStandbyListConfirmationPageReducers(true, undefined)).toEqual(true);
    });

    it('should return false when state is false', () => {
      expect(cancelStandbyListConfirmationPageReducers(false, undefined)).toEqual(false);
    });
  });

  describe('when action type is undefined', () => {
    const action = { type: undefined };

    it('should return true when state is true', () => {
      expect(cancelStandbyListConfirmationPageReducers(true, action)).toEqual(true);
    });

    it('should return false when state is false', () => {
      expect(cancelStandbyListConfirmationPageReducers(false, action)).toEqual(false);
    });
  });

  describe('when action is empty', () => {
    it('should return true when state is true', () => {
      expect(cancelStandbyListConfirmationPageReducers(true, {})).toEqual(true);
    });

    it('should return false when state is false', () => {
      expect(cancelStandbyListConfirmationPageReducers(false, {})).toEqual(false);
    });
  });

  describe('when state is false', () => {
    it('should return empty object with action for same day cancellation', () => {
      expect(cancelStandbyListConfirmationPageReducers(false, sameDayCancellation)).toEqual({});
    });

    it('should return empty object with action', () => {
      expect(cancelStandbyListConfirmationPageReducers(undefined, sameDayCancellation)).toEqual({});
    });

    it('should return response with success action for same day cancellation', () => {
      expect(cancelStandbyListConfirmationPageReducers(false, sameDayCancellationSuccess)).toEqual(
        sameDayCancellationSuccess.response
      );
    });

    describe('when both state and action are empty', () => {
      it('should return empty object', () => {
        expect(cancelStandbyListConfirmationPageReducers({}, {})).toEqual({});
      });
    });

    describe('when state is empty with correct action', () => {
      it('should return empty object for same day cancellation', () => {
        expect(cancelStandbyListConfirmationPageReducers({}, sameDayCancellation)).toEqual({});
      });

      it('should return response for same day cancellation', () => {
        expect(cancelStandbyListConfirmationPageReducers({}, sameDayCancellationSuccess)).toEqual(
          sameDayCancellationSuccess.response
        );
      });
    });
  });
});
