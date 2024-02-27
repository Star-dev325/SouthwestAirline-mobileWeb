import * as localeStoreAnalytics from 'src/shared/analytics/localeStore/index';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const { SET_LOCALE } = AnalyticsActionTypes;

describe('analytics for locale store', () => {
  context('analytics actions for LocaleStore', () => {
    it('should return analytics actions for save account info from selectors', () => {
      const { analyticsActionsForLocaleStore } = localeStoreAnalytics;

      expect(analyticsActionsForLocaleStore).to.include.members([SET_LOCALE]);

      expect(analyticsActionsForLocaleStore).to.have.lengthOf(1);
    });
  });

  context('generate LocaleStore', () => {
    it('should return en', () => {
      const state = {};
      const actionType = SET_LOCALE;

      const result = localeStoreAnalytics.generateLocaleStore(state, actionType);

      expect(result).to.deep.equal({
        locale: 'en'
      });
    });
  });
});
