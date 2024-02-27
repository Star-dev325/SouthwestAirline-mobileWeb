import sameDayPricingPage from 'src/sameDay/reducers/sameDayPricingPageReducers';
import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';

const { SAME_DAY__FETCH_SAME_DAY_PRICING_INFO, SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS
} = SameDayActionTypes;

const actionSameDayPricingInfo = { type: SAME_DAY__FETCH_SAME_DAY_PRICING_INFO };
const actionSameDayPricingInfoSuccess = {
  type: SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS,
  response: { val: 'response' }
};

describe('sameDayPricingPage', () => {
  describe('when action is undefined', () => {
    it('should return true', () => {
      expect(sameDayPricingPage(true, undefined)).toEqual(true);
    });

    it('should return false', () => {
      expect(sameDayPricingPage(false, undefined)).toEqual(false);
    });
  });

  describe('when action type is undefined', () => {
    const action = { type: undefined };

    it('should return true', () => {
      expect(sameDayPricingPage(true, action)).toEqual(true);
    });

    it('should return false', () => {
      expect(sameDayPricingPage(false, action)).toEqual(false);
    });
  });

  describe('when action is empty', () => {
    it('should return true', () => {
      expect(sameDayPricingPage(true, {})).toEqual(true);
    });

    it('should return false', () => {
      expect(sameDayPricingPage(false, {})).toEqual(false);
    });
  });

  describe('when state is false', () => {
    it('should return empty object with action', () => {
      expect(sameDayPricingPage(false, actionSameDayPricingInfo)).toEqual({});
    });

    it('should return empty object when state is undefined', () => {
      expect(sameDayPricingPage(undefined, actionSameDayPricingInfo)).toEqual({});
    });

    it('should return response with action', () => {
      expect(sameDayPricingPage(false, actionSameDayPricingInfoSuccess)).toEqual(
        actionSameDayPricingInfoSuccess.response
      );
    });

    describe('when action is undefined', () => {
      it('should return false', () => {
        expect(sameDayPricingPage(false, undefined)).toEqual(false);
      });
    });

    describe('when action type is undefined', () => {
      const action = { type: undefined };

      it('should return false', () => {
        expect(sameDayPricingPage(false, action)).toEqual(false);
      });
    });

    describe('when action is empty', () => {
      it(' should return false ', () => {
        expect(sameDayPricingPage(false, {})).toEqual(false);
      });
    });

    describe('when both state and action are empty', () => {
      it('should return empty object', () => {
        expect(sameDayPricingPage({}, {})).toEqual({});
      });
    });

    describe('when state is empty with correct action', () => {
      it('should return {}', () => {
        expect(sameDayPricingPage({}, actionSameDayPricingInfo)).toEqual({});
      });

      it('should return response', () => {
        expect(sameDayPricingPage({}, actionSameDayPricingInfoSuccess)).toEqual(
          actionSameDayPricingInfoSuccess.response
        );
      });
    });
  });
});
