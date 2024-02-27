import { sandbox } from 'sinon';
import { mockStore, mockFlowConfig } from 'test/unit/helpers/interceptorTestUtils';
import lookUpTravelFundsPageInterceptor from 'src/shared/interceptors/lookUpTravelFundsPageInterceptor';

const sinon = sandbox.create();

describe('lookUpTravelFundsPageInterceptor', () => {
  let flowCleanerStub;

  beforeEach(() => {
    flowCleanerStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should clean flow on page transition and refresh', () => {
    let result = lookUpTravelFundsPageInterceptor({
      store: mockStore({
        action: null,
        search: '?cleanFlow=true'
      }),
      flowConfig: mockFlowConfig({ flowCleaner: flowCleanerStub })
    });

    result.interceptor();

    expect(flowCleanerStub).to.be.called;

    result = lookUpTravelFundsPageInterceptor({
      store: mockStore({
        action: 'push',
        search: '?cleanFlow=true'
      }),
      flowConfig: mockFlowConfig({ flowCleaner: flowCleanerStub })
    });

    result.interceptor();

    expect(flowCleanerStub).to.be.called;

    result = lookUpTravelFundsPageInterceptor({
      store: mockStore({
        action: 'replace',
        search: '?cleanFlow=true'
      }),
      flowConfig: mockFlowConfig({ flowCleaner: flowCleanerStub })
    });

    result.interceptor();

    expect(flowCleanerStub).to.be.called;
  });

  it('should return false when flow cleaner is not a function', () => {
    const result = lookUpTravelFundsPageInterceptor({
      store: mockStore({
        action: 'replace',
        search: '?cleanFlow=true'
      }),
      flowConfig: mockFlowConfig({ flowCleaner: undefined })
    });

    expect(result).to.be.false;
    expect(flowCleanerStub).not.to.be.called;
  });

  it('should return false when action is not `push`, `replace` or `null` ', () => {
    const result = lookUpTravelFundsPageInterceptor({
      store: mockStore({
        action: 'something else',
        search: '?cleanFlow=true'
      }),
      flowConfig: mockFlowConfig({ flowCleaner: flowCleanerStub })
    });

    expect(result).to.be.false;
    expect(flowCleanerStub).not.to.be.called;
  });

  it('should return false when it is back forward navigation', () => {
    const result = lookUpTravelFundsPageInterceptor({
      store: mockStore({
        action: 'pop',
        search: '?cleanFlow=true'
      }),
      flowConfig: mockFlowConfig({ flowCleaner: flowCleanerStub })
    });

    expect(result).to.be.false;
    expect(flowCleanerStub).not.to.be.called;
  });

  it('should return false when query cleanFlow is false', () => {
    const result = lookUpTravelFundsPageInterceptor({
      store: mockStore({
        action: 'replace',
        search: '?cleanFlow=false'
      }),
      flowConfig: mockFlowConfig({ flowCleaner: flowCleanerStub })
    });

    expect(result).to.be.false;
    expect(flowCleanerStub).not.to.be.called;
  });

  it('should return false when a popup is open', () => {
    const result = lookUpTravelFundsPageInterceptor({
      store: mockStore({
        action: 'replace',
        search: '?cleanFlow=true',
        state: { popup: 'open' }
      }),
      flowConfig: mockFlowConfig({ flowCleaner: flowCleanerStub })
    });

    expect(result).to.be.false;
    expect(flowCleanerStub).not.to.be.called;
  });
});
