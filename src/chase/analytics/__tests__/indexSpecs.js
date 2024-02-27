import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const { CHASE__SET_CHASE_BANNER_SHOWN, CHASE__UPDATE_CHASE_FLOW_COMPLETED, CHASE__SET_CHASE_CREDIT_STATUS } =
  ChaseActionTypes;
const { SHARED__ROUTE_CHANGED } = SharedActionTypes;
const { CHASE_ANALYTICS__UPDATE_CHASE_CODES } = AnalyticsActionTypes;

const sinon = sandbox.create();

describe('index', () => {
  let analyticsActionsForChaseBooking, generateUpdatedChaseBookingStore;

  beforeEach(() => {
    const chaseAnalytics = proxyquire('src/chase/analytics', {
      'src/chase/analytics': sinon.stub().returns('chase data')
    });

    ({ generateUpdatedChaseBookingStore, analyticsActionsForChaseBooking } = chaseAnalytics);
  });

  afterEach(() => sinon.restore());

  context('analyticsActionsForChaseBooking', () => {
    it('should return analytics actions', () => {
      expect(analyticsActionsForChaseBooking).to.deep.equal([
        CHASE_ANALYTICS__UPDATE_CHASE_CODES,
        CHASE__SET_CHASE_BANNER_SHOWN,
        CHASE__SET_CHASE_CREDIT_STATUS,
        CHASE__UPDATE_CHASE_FLOW_COMPLETED,
        SHARED__ROUTE_CHANGED
      ]);
    });
  });

  context('generateChaseStore', () => {
    const offerIdentifier = 'offerIdentifier';
    const acquisitionSourceCodes = 'acquisitionSourceCodes';
    const chasebannershown = true;
    const chaseflowcompleted = true;
    const creditStatus = '';

    const state = {
      analytics: {
        ChaseAnalytics: {
          offers: { offerIdentifier, acquisitionSourceCodes },
          chasebannershown,
          chaseflowcompleted
        }
      }
    };

    it('should generate fields that listen to CHASE_ANALYTICS__UPDATE_CHASE_CODES action', () => {
      const result = generateUpdatedChaseBookingStore(state, CHASE_ANALYTICS__UPDATE_CHASE_CODES);

      expect(result).to.deep.equal({
        chase: { acquisitionSourceCodes, offerIdentifier, chasebannershown, chaseflowcompleted, creditStatus }
      });
    });

    it('should generate fields that listen to CHASE__SET_CHASE_BANNER_SHOWN action', () => {
      const result = generateUpdatedChaseBookingStore(state, CHASE__SET_CHASE_BANNER_SHOWN);

      expect(result).to.deep.equal({
        chase: { acquisitionSourceCodes, offerIdentifier, chasebannershown, chaseflowcompleted, creditStatus }
      });
    });

    it('should generate fields that listen to CHASE__SET_CHASE_CREDIT_STATUS action', () => {
      const result = generateUpdatedChaseBookingStore(state, CHASE__SET_CHASE_CREDIT_STATUS);

      expect(result).to.deep.equal({
        chase: { acquisitionSourceCodes, offerIdentifier, chasebannershown, chaseflowcompleted, creditStatus }
      });
    });

    it('should generate fields that listen to CHASE__UPDATE_CHASE_FLOW_COMPLETED action', () => {
      const result = generateUpdatedChaseBookingStore(state, CHASE__UPDATE_CHASE_FLOW_COMPLETED);

      expect(result).to.deep.equal({
        chase: { acquisitionSourceCodes, offerIdentifier, chasebannershown, chaseflowcompleted, creditStatus }
      });
    });

    it('should generate fields that listen to SHARED__ROUTE_CHANGED action', () => {
      const result = generateUpdatedChaseBookingStore(state, SHARED__ROUTE_CHANGED);

      expect(result).to.deep.equal({
        chase: { acquisitionSourceCodes, offerIdentifier, chasebannershown, chaseflowcompleted, creditStatus }
      });
    });
  });
});
