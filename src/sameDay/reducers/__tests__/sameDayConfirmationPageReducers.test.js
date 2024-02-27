import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import sameDayConfirmationPageReducers from 'src/sameDay/reducers/sameDayConfirmationPageReducers';

jest.mock('src/wcm/transformers/wcmTransformer.js', () => ({
  toDynamicPlacement: jest.fn().mockReturnValue({ key: 'ContentModule1' })
}));

const {
  SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS,
  SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND,
  SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS
} = SameDayActionTypes;

const sameDayConfirmationPagePlacementSuccess = {
  type: SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS,
  response: { contentModule1: { key: 'ContentModule1' } }
};

const sameDayConfirmationPagePlacementAction = {
  type: SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS,
  response: {}
};

const sameDayUpdateSameDayConfirmationSuccess = {
  type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_SUCCESS,
  response: { contentModule2: { key: 'ContentModule2' } }
};

const sameDayUpdateSameDayConfirmationAction = {
  type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION,
  response: {}
};

const sameDayUpdateSameDayConfirmationRefundAction = {
  type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND,
  response: {}
};

const sameDayUpdateSameDayConfirmationRefundSuccess = {
  type: SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND_SUCCESS,
  response: { contentModule3: { key: 'ContentModule3' } }
};

const defaultResponse = {
  response: {},
  placement: {}
};

const actions = [
  [
    sameDayConfirmationPagePlacementSuccess,
    { ...defaultResponse, placement: { sameDayConfirmationContentModule1: { key: 'ContentModule1' } } }
  ],
  [sameDayConfirmationPagePlacementAction, defaultResponse],
  [
    sameDayUpdateSameDayConfirmationSuccess,
    { ...defaultResponse, response: { contentModule2: { key: 'ContentModule2' } } }
  ],
  [sameDayUpdateSameDayConfirmationAction, defaultResponse],
  [
    sameDayUpdateSameDayConfirmationRefundSuccess,
    { ...defaultResponse, response: { contentModule3: { key: 'ContentModule3' } } }
  ],
  [sameDayUpdateSameDayConfirmationRefundAction, defaultResponse]
];

describe('sameDayConfirmationPageReducers', () => {
  describe('when state is false', () => {
    it('should return correct response for action type SAME_DAY__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS', () => {
      expect(sameDayConfirmationPageReducers(false, sameDayConfirmationPagePlacementSuccess)).toEqual({
        ...defaultResponse,
        placement: {
          sameDayConfirmationContentModule1: {
            key: 'ContentModule1'
          }
        }
      });
    });

    describe('when action is undefined', () => {
      it('should return empty', () => {
        expect(sameDayConfirmationPageReducers(false, undefined)).toEqual(defaultResponse);
      });
    });

    describe('when both state and action are empty', () => {
      it('should return empty object', () => {
        expect(sameDayConfirmationPageReducers({}, {})).toEqual(defaultResponse);
      });
    });

    describe('when state is empty with correct action', () => {
      actions.forEach(([action, expected]) => {
        it(`should return correct response for action type ${action.type}`, () => {
          expect(sameDayConfirmationPageReducers({}, action)).toEqual(expected);
        });
      });
    });
  });
});
