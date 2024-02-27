import travelFundActionTypes from 'src/travelFunds/actions/travelFundsActionTypes';
import lookUpTravelFundsPageReducer from 'src/travelFunds/reducers/lookUpTravelFundsPageReducer';
import * as wcmTransformer from 'src/wcm/transformers/wcmTransformer';

const {
  TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_SUCCESS,
  TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS,
  TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS_SUCCESS,
  TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_SUCCESS,
  TRAVEL_FUNDS__RESUME_AFTER_LOGIN,
  TRAVEL_FUNDS__SAVE_PREV_SEARCH
} = travelFundActionTypes;

describe('lookUpTravelFundsPageReducer', () => {
  let defaultState;
  const mktg_data = 'mock mktg data';
  const mockTravelFund = {
    currentAmount: {
      amount: '50.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    displayName: 'Southwest Gift Card',
    fundIdentifier: 'XXXXXXXXXXX-1234',
    travelFundType: 'GIFT_CARD'
  };

  beforeEach(() => {
    defaultState = {
      associateFundsMessage: {},
      currentlySelectedTab: 'travel-funds',
      message: null,
      placements: [],
      previousTravelFundsSearch: {},
      resumeAfterLogin: {},
      transferTravelFundsConfirmation: {},
      validateFunds: {},
      viewTravelFund: {
        retrievedFunds: []
      }
    };
  });

  describe('initial state', () => {
    it('should create default store structure when @@INIT action is triggered', () => {
      const action = {
        type: '@@INIT'
      };
      const expectedResult = defaultState;
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('resetLookupFlowData ', () => {
    it('should create default store structure when TRAVEL_FUNDS__RESET_LOOK_UP_FUNDS_FLOW_DATA action is triggered', () => {
      const action = {
        type: 'TRAVEL_FUNDS__RESET_LOOK_UP_FUNDS_FLOW_DATA'
      };
      const expectedResult = defaultState;
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('updateSelectedLookupTab ', () => {
    it('should set the currently selected lookup tab in redux', () => {
      const action = {
        type: 'TRAVEL_FUNDS__UPDATE_SELECTED_LOOKUP_TAB',
        selection: 'fake-selection'
      };
      const expectedResult = { ...defaultState, currentlySelectedTab: 'fake-selection' };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('fetch travel funds', () => {
    const response = {
      mktg_data,
      viewTravelFund: [mockTravelFund]
    };

    it('should have a travel fund in state when TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS action is triggered', () => {
      const action = {
        type: 'TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS',
        response
      };
      const expectedResult = {
        ...defaultState,
        viewTravelFund: {
          retrievedFunds: response.viewTravelFund,
          mktg_data
        }
      };

      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });

    it('should only have latest fund in state when TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS action is triggered twice', () => {
      const latestFund = {
        currentAmount: {
          amount: '150.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Southwest Gift Card',
        fundIdentifier: 'XXXXXXXXXXX-000',
        travelFundType: 'GIFT_CARD'
      };
      const secondResponse = { ...response, viewTravelFund: [latestFund] };
      const action = {
        type: 'TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS',
        response
      };
      const secondAction = {
        type: 'TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS',
        response: secondResponse
      };
      const expectedResult1 = {
        ...defaultState,
        viewTravelFund: {
          retrievedFunds: response.viewTravelFund,
          mktg_data
        }
      };
      const expectedResult2 = {
        ...defaultState,
        viewTravelFund: { retrievedFunds: secondResponse.viewTravelFund }
      };
      const result1 = lookUpTravelFundsPageReducer(undefined, action);
      const result2 = lookUpTravelFundsPageReducer(result1, secondAction);

      expect(result1).toMatchObject(expectedResult1);
      expect(result2).toMatchObject(expectedResult2);
    });

    it('should add multiple funds to the array when response has multiple funds', () => {
      const multipleFunds = [mockTravelFund, mockTravelFund];
      const action = {
        type: 'TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS',
        response: { ...response, viewTravelFund: multipleFunds }
      };
      const expectedResult = {
        ...defaultState,
        viewTravelFund: {
          retrievedFunds: multipleFunds,
          mktg_data
        }
      };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('fetch unused funds', () => {
    const response = {
      viewTravelFund: [mockTravelFund],
      mktg_data
    };

    it('should set state to empty array when TRAVEL_FUNDS__FETCH_UNUSED_FUNDS is triggered', () => {
      const action = {
        type: 'TRAVEL_FUNDS__FETCH_UNUSED_FUNDS'
      };
      const expectedResult = { ...defaultState, viewTravelFund: { retrievedFunds: [] } };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });

    it('should set state to empty array when TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS is triggered', () => {
      const action = {
        type: 'TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS'
      };
      const expectedResult = { ...defaultState, viewTravelFund: { retrievedFunds: [] } };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });

    it('should have a travel fund in state when TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS action is triggered', () => {
      const action = {
        type: 'TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS',
        response
      };

      expect(lookUpTravelFundsPageReducer(undefined, action)).toMatchObject({
        ...defaultState,
        viewTravelFund: {
          retrievedFunds: response.viewTravelFund,
          mktg_data
        }
      });
    });

    it('should store a message when TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS action is triggered when message has value', () => {
      const action = {
        response: {
          message: 'a message',
          mktg_data,
          viewTravelFund: []
        },
        type: 'TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS'
      };
      const expectedResult = {
        ...defaultState,
        message: 'a message',
        viewTravelFund: {
          mktg_data,
          retrievedFunds: action.response.viewTravelFund
        }
      };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });

    it('should set message to null when TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS is called', () => {
      const action = {
        type: 'TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS',
        response: {
          mktg_data,
          viewTravelFund: []
        }
      };
      const expectedResult = {
        ...defaultState,
        message: null,
        viewTravelFund: {
          mktg_data,
          retrievedFunds: action.response.viewTravelFund
        }
      };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });

    it('should clear the retrievedFunds property when TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED is called', () => {
      const action = {
        type: 'TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED'
      };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(defaultState);
    });

    it('should clear the retrievedFunds property when TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_FAILED is called', () => {
      const action = {
        type: 'TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_FAILED'
      };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(defaultState);
    });
  });

  describe('validateFunds', () => {
    it('should save response when action type is TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_SUCCESS', () => {
      const action = {
        type: TRAVEL_FUNDS__FETCH_VALIDATE_FUNDS_SUCCESS,
        response: {
          validateTransferPage: 'validateTransferPage'
        }
      };
      const expectedResult = { ...defaultState, validateFunds: { validateTransferPage: 'validateTransferPage' } };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('transferTravelFundsConfirmation', () => {
    it('should save response when action type is TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS', () => {
      const action = {
        type: TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS,
        response: {
          transferConfirmationPage: 'transferConfirmationPage'
        }
      };
      const expectedResult = {
        ...defaultState,
        transferTravelFundsConfirmation: { transferConfirmationPage: 'transferConfirmationPage' }
      };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('associateFundsMessage', () => {
    let associateFundsResult;

    beforeEach(() => {
      associateFundsResult = {
        associateFundsMessage: {
          message: 'associateTravelFunds'
        },
        currentlySelectedTab: 'travel-funds',
        message: null,
        placements: [],
        previousTravelFundsSearch: {},
        resumeAfterLogin: {},
        transferTravelFundsConfirmation: {},
        validateFunds: {},
        viewTravelFund: {
          retrievedFunds: []
        }
      };
    });

    it('should save response when action type is TRAVEL_FUNDS__FETCH_TRANSFER_TRAVEL_FUNDS_SUCCESS', () => {
      const action = {
        type: TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_SUCCESS,
        response: {
          message: 'associateTravelFunds'
        }
      };
      const expectedResult = associateFundsResult;
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });

    describe('isRefreshCall is false', () => {
      it('should reset associateFundsMessage when action type is TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS', () => {
        const action = {
          type: TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_SUCCESS,
          response: {
            message: 'associateTravelFunds'
          }
        };
        const secondAction = {
          type: 'TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS',
          response: {
            viewTravelFund: [],
            isRefreshCall: false,
            mktg_data
          }
        };
        const expectedResult = associateFundsResult;
        const result = lookUpTravelFundsPageReducer(undefined, action);
        const expectedResult2 = {
          ...defaultState,
          viewTravelFund: {
            retrievedFunds: secondAction.response.viewTravelFund,
            mktg_data
          }
        };
        const result2 = lookUpTravelFundsPageReducer(associateFundsResult, secondAction);

        expect(result).toMatchObject(expectedResult);
        expect(result2).toMatchObject(expectedResult2);
      });

      it('should reset associateFundsMessage when action type is TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS', () => {
        const action = {
          type: TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_SUCCESS,
          response: {
            message: 'associateTravelFunds'
          }
        };
        const secondAction = {
          type: 'TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS',
          response: {
            viewTravelFund: [],
            mktg_data,
            isRefreshCall: false
          }
        };
        const expectedResult = associateFundsResult;
        const result = lookUpTravelFundsPageReducer(undefined, action);
        const expectedResult2 = {
          ...defaultState,
          viewTravelFund: {
            retrievedFunds: secondAction.response.viewTravelFund,
            mktg_data
          }
        };
        const result2 = lookUpTravelFundsPageReducer(associateFundsResult, secondAction);

        expect(result).toMatchObject(expectedResult);
        expect(result2).toMatchObject(expectedResult2);
      });
    });

    describe('isRefreshCall is true', () => {
      it('should not associateFundsMessage when action type is TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS', () => {
        const action = {
          type: TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_SUCCESS,
          response: {
            message: 'associateTravelFunds'
          }
        };
        const secondAction = {
          type: 'TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS',
          response: {
            viewTravelFund: [],
            mktg_data,
            isRefreshCall: true
          }
        };
        const expectedResult = associateFundsResult;
        const expectedResult2 = {
          ...associateFundsResult,
          viewTravelFund: {
            retrievedFunds: secondAction.response.viewTravelFund,
            mktg_data
          }
        };
        const result = lookUpTravelFundsPageReducer(undefined, action);
        const result2 = lookUpTravelFundsPageReducer(associateFundsResult, secondAction);

        expect(result).toMatchObject(expectedResult);
        expect(result2).toMatchObject(expectedResult2);
      });

      it('should reset associateFundsMessage when action type is TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS', () => {
        const action = {
          type: TRAVEL_FUNDS__ASSOCIATE_TRAVEL_FUNDS_SUCCESS,
          response: {
            message: 'associateTravelFunds'
          }
        };
        const secondAction = {
          type: 'TRAVEL_FUNDS__FETCH_UNUSED_FUNDS_SUCCESS',
          response: {
            viewTravelFund: [],
            isRefreshCall: true,
            mktg_data
          }
        };
        const expectedResult = associateFundsResult;
        const expectedResult2 = {
          ...associateFundsResult,
          viewTravelFund: {
            retrievedFunds: secondAction.response.viewTravelFund,
            mktg_data
          }
        };
        const result = lookUpTravelFundsPageReducer(undefined, action);
        const result2 = lookUpTravelFundsPageReducer(associateFundsResult, secondAction);

        expect(result).toMatchObject(expectedResult);
        expect(result2).toMatchObject(expectedResult2);
      });
    });
  });

  describe('previousTravelFundsSearch', () => {
    it('should save request when action type is TRAVEL_FUNDS__SAVE_PREV_SEARCH', () => {
      const action = {
        type: TRAVEL_FUNDS__SAVE_PREV_SEARCH,
        request: 'previousSearch'
      };
      const expectedResult = { ...defaultState, previousTravelFundsSearch: 'previousSearch' };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('resumeAfterLogin', () => {
    it('should save request when action type is TRAVEL_FUNDS__RESUME_AFTER_LOGIN', () => {
      const action = {
        type: TRAVEL_FUNDS__RESUME_AFTER_LOGIN,
        shouldResume: true,
        requestInfo: { test: 'object' }
      };
      const expectedResult = {
        ...defaultState,
        resumeAfterLogin: {
          shouldResume: true,
          requestInfo: { test: 'object' }
        }
      };
      const result = lookUpTravelFundsPageReducer(undefined, action);

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('placements', () => {
    let toDynamicPlacementMock;
    const response = {
      results: {
        contentModule5: {},
        contentModule1: {},
        defaultTestPlacement1: {}
      }
    };

    beforeEach(() => {
      toDynamicPlacementMock = jest.spyOn(wcmTransformer, 'toDynamicPlacement');
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should sort, filter and call toDynamicPlacement on each promo', () => {
      toDynamicPlacementMock
        .mockReturnValueOnce({ key: 'dynamicPlacement1' })
        .mockReturnValueOnce({ key: 'dynamicPlacement2' });
      const action = { type: TRAVEL_FUNDS__FETCH_TRAVEL_FUNDS_PAGE_PLACEMENTS_SUCCESS, response };
      const state = lookUpTravelFundsPageReducer(undefined, action);

      expect(toDynamicPlacementMock.mock.calls[0][0]).toMatchObject(response, 'contentModule1');
      expect(toDynamicPlacementMock.mock.calls[1][0]).toMatchObject(response, 'contentModule5');
      expect(state.placements.length).toBe(2);
      expect(state.placements).toMatchObject([{ key: 'dynamicPlacement1' }, { key: 'dynamicPlacement2' }]);
    });
  });
});
