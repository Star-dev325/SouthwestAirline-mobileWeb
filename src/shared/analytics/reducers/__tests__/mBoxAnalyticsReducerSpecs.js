import mBoxAnalyticsReducer from 'src/shared/analytics/reducers/mBoxAnalyticsReducer';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const {
  MBOX_ANALYTICS_UPDATE_TOTAL_CALLS,
  MBOX_ANALYTICS_UPDATE_FAILED_CALLS,
  MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT
} = AnalyticsActionTypes;

describe('mBoxAnalyticsReducer', () => {
  context('update total calls', () => {
    it('should set total calls to 1 if 1 is passed in', () => {
      const newState = mBoxAnalyticsReducer(undefined, {
        type: MBOX_ANALYTICS_UPDATE_TOTAL_CALLS,
        payload: { totalMboxCallsCounter: 1 }
      });

      expect(newState.totalMboxCallsCounter).to.equal(1);
      expect(newState.failedMboxCallsCounter).to.equal(0);
    });

    it('should return default state when action is undefined', () => {
      expect(mBoxAnalyticsReducer()).to.deep.equal({
        totalMboxCallsCounter: 0,
        mBoxTimeOutArtifact: '',
        failedMboxCallsCounter: 0
      });
    });
  });

  context('update total failed calls', () => {
    it('should set total failed calls to 2 if 2 is passed in', () => {
      const newState = mBoxAnalyticsReducer(undefined, {
        type: MBOX_ANALYTICS_UPDATE_FAILED_CALLS,
        payload: { failedMboxCallsCounter: 2 }
      });

      expect(newState.failedMboxCallsCounter).to.equal(2);
    });
  });
  context('update timeout artifact', () => {
    it('should set update timeout artifact with the artifact passed in', () => {
      const newState = mBoxAnalyticsReducer(undefined, {
        type: MBOX_ANALYTICS_UPDATE_TIMEOUT_ARTIFACT,
        payload: { mBoxTimeOutArtifact: 'TARGET_TIMEOUT' }
      });

      expect(newState.mBoxTimeOutArtifact).to.equal('TARGET_TIMEOUT');
    });
  });
});
