import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import sameDayPageReducers from 'src/sameDay/reducers';

const {
  SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS,
  SAME_DAY__FETCH_SAME_DAY_PRICING_INFO,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  SAME_DAY__RESET_FLOW_DATA,
  SAME_DAY__UPDATE_SAME_DAY_CANCELLATION,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION
} = SameDayActionTypes;

describe('SameDayReducers', () => {
  const getTestDescription = (type, isSuccessType = false) => {
    if (isSuccessType) {
      return `return initial state when ${type} action is triggered`;
    } else {
      return `return empty {} when ${type} action is triggered with undefined state`;
    }
  };

  const defaultState = {
    sameDayConfirmationPage: {
      response: {},
      placement: {}
    },
    sameDayPaymentPage: {},
    sameDayShoppingPage: {
      sameDayFlightDetails: {},
      sameDayShoppingInformation: {}
    },
    sameDaySelectFarePage: {},
    sameDayPricingPage: {},
    sameDayRefundPage: {}
  };

  const actions = [
    {
      type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
      expectedState: defaultState,
      testDescription: getTestDescription(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO)
    },
    {
      type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS,
      response: { val: 'response' },
      expectedState: {
        ...defaultState,
        sameDayShoppingPage: {
          ...defaultState.sameDayShoppingPage,
          sameDayShoppingInformation: { val: 'response' }
        }
      },
      testDescription: getTestDescription(SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS, true)
    },
    {
      type: SAME_DAY__FETCH_SAME_DAY_PRICING_INFO,
      expectedState: defaultState,
      testDescription: getTestDescription(SAME_DAY__FETCH_SAME_DAY_PRICING_INFO)
    },
    {
      type: SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS,
      response: { val: 'response' },
      expectedState: {
        ...defaultState,
        sameDayPricingPage: { val: 'response' }
      },
      testDescription: getTestDescription(SAME_DAY__FETCH_SAME_DAY_PRICING_INFO_SUCCESS, true)
    },
    {
      type: SAME_DAY__UPDATE_SAME_DAY_CANCELLATION,
      expectedState: defaultState,
      testDescription: getTestDescription(SAME_DAY__UPDATE_SAME_DAY_CANCELLATION)
    },
    {
      type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION,
      expectedState: defaultState,
      testDescription: getTestDescription(SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION)
    },
    {
      type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS,
      response: { val: 'response' },
      expectedState: {
        ...defaultState,
        sameDayConfirmationPage: {
          ...defaultState.sameDayConfirmationPage,
          response: { val: 'response' }
        }
      },
      testDescription: getTestDescription(SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS, true)
    },
    {
      type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND,
      expectedState: defaultState,
      testDescription: getTestDescription(SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND)
    },
    {
      type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS,
      response: { val: 'response' },
      expectedState: {
        sameDayConfirmationPage: {
          response: {
            val: 'response'
          },
          placement: {}
        },
        sameDayPricingPage: {},
        sameDayPaymentPage: {},
        sameDayRefundPage: { val: 'response' },
        sameDayShoppingPage: {
          sameDayFlightDetails: {},
          sameDayShoppingInformation: {}
        },
        sameDaySelectFarePage: {}
      },
      testDescription: getTestDescription(SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS, true)
    }
  ];

  actions.forEach(({ type, response, expectedState, testDescription }) => {
    it(`should ${testDescription}`, () => {
      const action = { type, response };

      expect(sameDayPageReducers(undefined, action)).toEqual(expectedState);
    });
  });

  it('should return default state when action is undefined', () => {
    const initialState = {
      sameDayConfirmationPage: {
        response: {},
        placement: {}
      },
      sameDayPaymentPage: {},
      sameDayPricingPage: {
        response: {}
      },
      sameDayRefundPage: {},
      sameDayShoppingPage: {
        sameDayFlightDetails: {},
        sameDayShoppingInformation: {}
      },
      sameDaySelectFarePage: {}
    };

    expect(sameDayPageReducers(initialState, undefined)).toEqual(initialState);
  });

  it('should return default state when reset action is called', () => {
    const initialState = {
      sameDayConfirmationPage: {
        placement: {},
        response: {}
      },
      sameDayPaymentPage: {},
      sameDayPricingPage: {},
      sameDayRefundPage: {},
      sameDaySelectFarePage: {},
      sameDayShoppingPage: {
        sameDayFlightDetails: {},
        sameDayShoppingInformation: {}
      }
    };

    expect(sameDayPageReducers(initialState, { type: SAME_DAY__RESET_FLOW_DATA })).toEqual(initialState);
  });
});
