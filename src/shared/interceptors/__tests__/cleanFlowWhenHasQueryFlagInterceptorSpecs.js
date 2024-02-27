import { sandbox } from 'sinon';
import _ from 'lodash';
import cleanFlowWhenHasQueryFlagInterceptor from 'src/shared/interceptors/cleanFlowWhenHasQueryFlagInterceptor';

const sinon = sandbox.create();

describe('cleanFlowWhenHasQueryFlagInterceptor', () => {
  let flowCleanerStub;
  let getStateStub;
  let mockInterceptorContext;
  let persistentHistory;

  beforeEach(() => {
    flowCleanerStub = sinon.stub();

    persistentHistory = [
      {
        action: 'push',
        search: '?cleanFlow=true'
      }
    ];
    getStateStub = sinon.stub().returns({ persistentHistory });

    mockInterceptorContext = {
      store: {
        getState: getStateStub
      },
      flowConfig: {
        flowCleaner: flowCleanerStub
      }
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should clean flow state when not browser back or forward and search param clean flow flag is true', () => {
    const result = cleanFlowWhenHasQueryFlagInterceptor(mockInterceptorContext);

    result.interceptor();

    expect(flowCleanerStub).to.be.called;
  });

  it('should not clean flow state when browser back or forward', () => {
    _.set(persistentHistory, '[0].action', 'pop');
    getStateStub.returns({ persistentHistory });

    const result = cleanFlowWhenHasQueryFlagInterceptor(mockInterceptorContext);

    expect(flowCleanerStub).to.not.be.called;
    expect(result).to.be.equal(undefined);
  });

  it('should not clean flow state when clean flow flag is not specified in search params', () => {
    _.set(persistentHistory, '[0].search', '');
    getStateStub.returns({ persistentHistory });

    const result = cleanFlowWhenHasQueryFlagInterceptor(mockInterceptorContext);

    expect(flowCleanerStub).to.not.be.called;
    expect(result).to.be.equal(undefined);
  });

  it('should not clean flow state when flowCleaner is not specified', () => {
    _.set(mockInterceptorContext, 'flowConfig.flowCleaner', undefined);

    const result = cleanFlowWhenHasQueryFlagInterceptor(mockInterceptorContext);

    expect(flowCleanerStub).to.not.be.called;
    expect(result).to.be.equal(undefined);
  });
});
