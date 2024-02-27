import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

import chaseAnalyticsReducer from 'src/shared/analytics/reducers/chaseAnalyticsReducer';

import { DEFAULT_OFFERS } from 'src/chase/constants/chaseConstants';

describe('ChaseAnalyticsReducer', () => {
  context('offers', () => {
    it('should set offers to passed in payload', () => {
      const payload = {
        offerIdentifier: 'offerIdentifier',
        highValueIndicator: 'false',
        acquisitionSourceCodes: 'acquisitionSourceCodes'
      };

      const action = { type: AnalyticsActionTypes.CHASE_ANALYTICS__UPDATE_CHASE_CODES, payload };

      const state = chaseAnalyticsReducer(undefined, action);

      expect(state.offers).to.deep.equal(payload);
    });

    it('should set offers to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = chaseAnalyticsReducer(undefined, action);

      expect(state.offers).to.deep.equal(DEFAULT_OFFERS);
    });

    it('should set offers to default case for undefined action', () => {
      const state = chaseAnalyticsReducer(undefined, undefined);

      expect(state.offers).to.deep.equal(DEFAULT_OFFERS);
    });
  });

  context('chasebannershown', () => {
    it('should set chasebannershown to passed in parameter', () => {
      const isChaseBannerShown = true;

      const action = { type: ChaseActionTypes.CHASE__SET_CHASE_BANNER_SHOWN, isChaseBannerShown };

      const state = chaseAnalyticsReducer(undefined, action);

      expect(state.chasebannershown).to.be.true;
    });

    it('should set chasebannershown to false on SHARED__ROUTE_CHANGED', () => {
      const action = { type: SharedActionTypes.SHARED__ROUTE_CHANGED };

      const state = chaseAnalyticsReducer(undefined, action);

      expect(state.chasebannershown).to.be.false;
    });

    it('should set chasebannershown to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = chaseAnalyticsReducer(undefined, action);

      expect(state.chasebannershown).to.be.false;
    });

    it('should set chasebannershown to default case for undefined action', () => {
      const state = chaseAnalyticsReducer(undefined, undefined);

      expect(state.chasebannershown).to.be.false;
    });
  });

  context('chaseflowcompleted', () => {
    it('should set chaseflowcompleted to passed in parameter', () => {
      const isChaseFlowCompleted = true;

      const action = { type: ChaseActionTypes.CHASE__UPDATE_CHASE_FLOW_COMPLETED, isChaseFlowCompleted };

      const state = chaseAnalyticsReducer(undefined, action);

      expect(state.chaseflowcompleted).to.be.true;
    });

    it('should set chaseflowcompleted to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = chaseAnalyticsReducer(undefined, action);

      expect(state.chaseflowcompleted).to.be.false;
    });

    it('should set chaseflowcompleted to default case for undefined action', () => {
      const state = chaseAnalyticsReducer(undefined, undefined);

      expect(state.chasebannershown).to.be.false;
    });
  });

  context('creditStatus', () => {
    it('should set creditStatus to passed in parameter', () => {
      const creditStatus = 'APPROVED';

      const action = { type: ChaseActionTypes.CHASE__SET_CHASE_CREDIT_STATUS, creditStatus };

      const state = chaseAnalyticsReducer(undefined, action);

      expect(state.creditStatus).to.deep.equal('APPROVED');
    });

    it('should set creditStatus to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = chaseAnalyticsReducer(undefined, action);

      expect(state.creditStatus).to.deep.equal('');
    });

    it('should set creditStatus to default case for undefined action', () => {
      const state = chaseAnalyticsReducer(undefined, undefined);

      expect(state.creditStatus).to.deep.equal('');
    });
  });
});
