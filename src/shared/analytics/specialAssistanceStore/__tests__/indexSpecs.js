import * as specialAssistanceStoreAnalytics from 'src/shared/analytics/specialAssistanceStore/index';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

describe('analytics for user store', () => {
  context('analytics actions for UserStore', () => {
    it('should return analytics actions for selectionMade from selectors', () => {
      const { analyticsActionsForSpecialAssistanceStore } = specialAssistanceStoreAnalytics;

      expect(analyticsActionsForSpecialAssistanceStore).to.include.members([
        AnalyticsActionTypes.SPECIAL_ASSISTANCE_SELECTED
      ]);

      expect(analyticsActionsForSpecialAssistanceStore).to.have.lengthOf(1);
    });
  });

  context('generate SpecialAssistanceStore', () => {
    it('should return undefined if nothing exists', () => {
      const state = {};
      const actionType = AnalyticsActionTypes.SPECIAL_ASSISTANCE_SELECTED;

      const result = specialAssistanceStoreAnalytics.generateSpecialAssistanceStore(state, actionType);

      expect(result).to.deep.equal({
        selectionMade: undefined
      });
    });

    it('should return the data as stored in redux', () => {
      const state = {
        analytics: {
          SpecialAssistanceStore: {
            selectionMade: true
          }
        }
      };
      const actionType = AnalyticsActionTypes.SPECIAL_ASSISTANCE_SELECTED;

      const result = specialAssistanceStoreAnalytics.generateSpecialAssistanceStore(state, actionType);

      expect(result).to.deep.equal({
        selectionMade: true
      });
    });
  });
});
