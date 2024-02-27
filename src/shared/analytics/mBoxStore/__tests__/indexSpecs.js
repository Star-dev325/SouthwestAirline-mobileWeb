import * as mBoxStoreAnalytics from 'src/shared/analytics/mBoxStore/index';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

describe('Analytics actions for mBox store', () => {
  context('Analytics actions for mBoxStore', () => {
    it('should generate the correct actions', () => {
      const analyticsActionsForMboxStore = mBoxStoreAnalytics.analyticsActionsForMBoxStore;

      expect(analyticsActionsForMboxStore).to.include.members([
        AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_TOTAL_CALLS,
        AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_FAILED_CALLS,
        AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT,
        SharedActionTypes.SHARED__ROUTE_CHANGED
      ]);

      expect(analyticsActionsForMboxStore).to.have.lengthOf(4);
    });
  });

  context('generate mBox store with empty state', () => {
    it('should return undefined if nothing is in the mBox store for total', () => {
      const state = {};
      const actionType = AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_TOTAL_CALLS;
      const result = mBoxStoreAnalytics.generateMBoxStore(state, actionType);

      expect(result).to.deep.equal({
        Total_mboxCalls_Counter: undefined
      });
    });
    it('should return undefined if nothing is in the mBox store for total failed', () => {
      const state = {};
      const actionType = AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_FAILED_CALLS;
      const result = mBoxStoreAnalytics.generateMBoxStore(state, actionType);

      expect(result).to.deep.equal({
        Failed_mboxCalls_Counter: undefined
      });
    });
    it('should return undefined if nothing is in the mBox store for timeout artifact', () => {
      const state = {};
      const actionType = AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT;
      const result = mBoxStoreAnalytics.generateMBoxStore(state, actionType);

      expect(result).to.deep.equal({
        mBox_TimeOut_Artifact: undefined
      });
    });
  });

  context('generate mBox store with full state', () => {
    let state;

    beforeEach(() => {
      state = {
        analytics: {
          mBoxStore: {
            totalMboxCallsCounter: 1,
            failedMboxCallsCounter: 1,
            mBoxTimeOutArtifact: 'SPA_TIMEOUT'
          }
        }
      };
    });
    it('should generate the proper values of total calls', () => {
      const actionType = AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_TOTAL_CALLS;
      const result = mBoxStoreAnalytics.generateMBoxStore(state, actionType);

      expect(result).to.deep.equal({
        Total_mboxCalls_Counter: 1
      });
    });
    it('should generate the proper values of total failed calls', () => {
      const actionType = AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_FAILED_CALLS;
      const result = mBoxStoreAnalytics.generateMBoxStore(state, actionType);

      expect(result).to.deep.equal({
        Failed_mboxCalls_Counter: 1
      });
    });
    it('should generate the proper values of total failed calls', () => {
      const actionType = AnalyticsActionTypes.MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT;
      const result = mBoxStoreAnalytics.generateMBoxStore(state, actionType);

      expect(result).to.deep.equal({
        mBox_TimeOut_Artifact: 'SPA_TIMEOUT'
      });
    });
  });
});
