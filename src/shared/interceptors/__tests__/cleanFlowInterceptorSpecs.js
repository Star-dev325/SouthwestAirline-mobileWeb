import { sandbox } from 'sinon';
import { mockStore, mockFlowConfig } from 'test/unit/helpers/interceptorTestUtils';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';

const sinon = sandbox.create();

describe('cleanFlowInterceptor', () => {
  const entryPath = '/view-reservation';
  let flowCleanerStub;

  beforeEach(() => {
    flowCleanerStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should clean flow when transition to entry path and flowCleaner is function', () => {
    const result = cleanFlowInterceptor({
      store: mockStore({ action: 'push', pathname: entryPath }),
      flowConfig: generateFlowConfig({ entry: entryPath, flowCleaner: flowCleanerStub })
    });

    result.interceptor();

    expect(flowCleanerStub).to.be.called;
  });

  it('should return true when refresh on entry path and flowCleaner is function', () => {
    const result = cleanFlowInterceptor({
      store: mockStore({ action: null, pathname: entryPath }),
      flowConfig: generateFlowConfig({ entry: entryPath, flowCleaner: flowCleanerStub })
    });

    result.interceptor();

    expect(flowCleanerStub).to.be.called;
  });

  it('should return false when action is not `push` or `null` ', () => {
    const result = cleanFlowInterceptor({
      store: mockStore({ action: 'pop', pathname: entryPath }),
      flowConfig: generateFlowConfig({ entry: entryPath, flowCleaner: flowCleanerStub })
    });

    expect(result).to.be.false;
    expect(flowCleanerStub).not.to.be.called;
  });

  it('should return false when pathname is not entry path', () => {
    const result = cleanFlowInterceptor({
      store: mockStore({ action: 'push', pathname: 'some url' }),
      flowConfig: generateFlowConfig({ entry: entryPath, flowCleaner: flowCleanerStub })
    });

    expect(result).to.be.false;
    expect(flowCleanerStub).not.to.be.called;
  });

  it('should return false when flowCleaner is not function', () => {
    const result = cleanFlowInterceptor({
      store: mockStore({ action: 'push', pathname: entryPath }),
      flowConfig: generateFlowConfig({ entry: entryPath, flowCleaner: undefined })
    });

    expect(result).to.be.false;
    expect(flowCleanerStub).not.to.be.called;
  });

  function generateFlowConfig({ entry, flowUrlRange = [], flowCleaner }) {
    return mockFlowConfig({ entry, exit: '/car/cancel/confirmation', flowUrlRange, flowCleaner });
  }
});
