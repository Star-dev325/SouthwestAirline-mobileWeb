import specialAssistanceAnalyticsReducers from 'src/shared/analytics/reducers/specialAssistanceAnalyticsReducers';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const { SPECIAL_ASSISTANCE_SELECTED } = AnalyticsActionTypes;

describe('specialAssistanceStoreReducer', () => {
  context('selectionMade', () => {
    it('should set selectionMade to true if action.selection is true', () => {
      const newState = specialAssistanceAnalyticsReducers(undefined, {
        type: SPECIAL_ASSISTANCE_SELECTED,
        selected: true
      });

      expect(newState.selectionMade).to.equal(true);
    });

    it('should set selectionMade to false if action.selection is false', () => {
      const newState = specialAssistanceAnalyticsReducers(undefined, {
        type: SPECIAL_ASSISTANCE_SELECTED,
        selected: false
      });

      expect(newState.selectionMade).to.equal(false);
    });

    it('should return default state when action is undefined', () => {
      expect(specialAssistanceAnalyticsReducers().selectionMade).to.deep.equal(false);
    });
  });
});
