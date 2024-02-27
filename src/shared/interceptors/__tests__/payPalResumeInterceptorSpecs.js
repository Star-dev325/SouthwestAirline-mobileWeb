import { sandbox } from 'sinon';
import _ from 'lodash';
import store2 from 'store2';

import createMockStore from 'test/unit/helpers/createMockStore';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import { STATUS } from 'src/shared/constants/flowConstants';

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('payPalResumeInterceptor', () => {
  let store;
  let mockInterceptorContext;
  let hasPayPalDataStub;
  let action;
  let matchPathRegExp;
  let flowConfig;

  beforeEach(() => {
    store = mockStore({
      persistentHistory: ['fakeHistoryOne', 'fakeHistoryTwo']
    });
    action = {
      type: 'SHARED__ROUTE_CHANGED',
      location: {
        pathname: undefined
      }
    };
    flowConfig = {
      name: undefined
    };

    mockInterceptorContext = { store, action, flowConfig };
  });

  afterEach(() => {
    sinon.restore();
  });

  context('in airBooking', () => {
    beforeEach(() => {
      matchPathRegExp = '/air/booking/review/paypal';

      _.set(action, 'location.pathname', '/air/booking/review/paypal');
      _.set(flowConfig, 'name', 'airBooking');
    });

    it('should set airBooking flow status to be in progress when transition to payPal resume path and local storage has paypal data', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(true);

      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      result.interceptor();

      expect(hasPayPalDataStub).to.be.called;
      expect(store.getActions()).to.be.deep.equal([
        {
          type: 'SET_FLOW_STATUS',
          flowName: 'airBooking',
          status: STATUS.IN_PROGRESS
        }
      ]);
    });

    it('should have no airBooking flow status actions set when local storage does not have payPal data', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(false);

      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      expect(result).to.be.undefined;
      expect(hasPayPalDataStub).to.be.called;
      expect(store.getActions()).to.be.deep.equal([]);
    });

    it('should have no airBooking flow status actions set when transition to a path which is not payPal resume path and local storage does not have payPal data', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(true);
      _.set(mockInterceptorContext, 'action.location.pathname', '/some/other/path');
      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      expect(result).to.be.undefined;
      expect(hasPayPalDataStub).to.not.be.called;
      expect(store.getActions()).to.be.deep.equal([]);
    });

    it('should have no airBooking flow status actions set when local storage has PayPal data with right path but url address pushed directly in a new tab', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(true);
      const storeWithOneHistory = createMockStore()({
        persistentHistory: ['fakeHistory']
      });

      mockInterceptorContext = { store: storeWithOneHistory, action, flowConfig };

      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      expect(result).to.be.undefined;
      expect(hasPayPalDataStub).to.not.be.called;
      expect(store.getActions()).to.be.deep.equal([]);
    });
  });

  context('in earlyBird', () => {
    beforeEach(() => {
      matchPathRegExp = '/earlybird/checkin/[0-9A-Z]{6}/review/paypal';

      _.set(action, 'location.pathname', '/earlybird/checkin/PNR123/review/paypal');
      _.set(flowConfig, 'name', 'earlyBird');
    });

    it('should set earlyBird flow status to be in progress when transition to paypal resume path and local storage has paypal data', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(true);

      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      result.interceptor();

      expect(hasPayPalDataStub).to.be.called;
      expect(store.getActions()).to.be.deep.equal([
        {
          type: 'SET_FLOW_STATUS',
          flowName: 'earlyBird',
          status: STATUS.IN_PROGRESS
        }
      ]);
    });

    it('should have no earlyBird flow status actions set when local storage does not have paypal data', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(false);

      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      expect(result).to.be.undefined;
      expect(hasPayPalDataStub).to.be.called;
      expect(store.getActions()).to.be.deep.equal([]);
    });

    it('should have no earlyBird flow status actions set when transition to a path which is not paypal resume path and local storage does not have paypal data', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(true);
      _.set(mockInterceptorContext, 'action.location.pathname', '/some/other/path');
      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      expect(result).to.be.undefined;
      expect(hasPayPalDataStub).to.not.be.called;
      expect(store.getActions()).to.be.deep.equal([]);
    });
  });

  context('in airChange', () => {
    beforeEach(() => {
      matchPathRegExp = '/air/change/pricing/review/paypal';

      _.set(action, 'location.pathname', '/air/change/pricing/review/paypal');
      _.set(flowConfig, 'name', 'airChange');
    });

    it('should set airChange flow status to be in progress when transition to paypal resume path and local storage has paypal data', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(true);

      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      result.interceptor();

      expect(hasPayPalDataStub).to.be.called;
      expect(store.getActions()).to.be.deep.equal([
        {
          type: 'SET_FLOW_STATUS',
          flowName: 'airChange',
          status: STATUS.IN_PROGRESS
        }
      ]);
    });

    it('should have no airChange flow status actions set when local storage does not have paypal data', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(false);

      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      expect(result).to.be.undefined;
      expect(hasPayPalDataStub).to.be.called;
      expect(store.getActions()).to.be.deep.equal([]);
    });

    it('should have no airChange flow status actions set when transition to a path which is not paypal resume path and local storage does not have paypal data', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(true);
      _.set(mockInterceptorContext, 'action.location.pathname', '/some/other/path');
      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      expect(result).to.be.undefined;
      expect(hasPayPalDataStub).to.not.be.called;
      expect(store.getActions()).to.be.deep.equal([]);
    });

    it('should have no airChange flow status actions set when flowConfig name is undefined', () => {
      hasPayPalDataStub = sinon.stub(store2.session, 'has').returns(true);
      _.set(flowConfig, 'name', undefined);
      const result = payPalResumeInterceptor(matchPathRegExp)(mockInterceptorContext);

      expect(result).to.be.undefined;
      expect(store.getActions()).to.be.deep.equal([]);
    });
  });
});
