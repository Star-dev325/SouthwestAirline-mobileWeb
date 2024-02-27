import { sandbox } from 'sinon';
import forceBackToHomeInterceptor from 'src/shared/interceptors/forceBackToHomeInterceptor';

const sinon = sandbox.create();

describe('forceBackToHomeInterceptor', () => {
  let pushStub;
  let getStateStub;
  let mockInterceptorContext;

  beforeEach(() => {
    pushStub = sinon.stub();
    getStateStub = sinon.stub();

    mockInterceptorContext = {
      store: {
        getState: getStateStub
      },
      history: {
        push: pushStub
      }
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should go to home when forceBackToHome is true', () => {
    getStateStub.returns({
      persistentHistory: [{ forceBackToHome: true }]
    });

    const result = forceBackToHomeInterceptor(mockInterceptorContext);

    result.interceptor();

    expect(pushStub).to.be.calledWith('/');
  });

  it('should not go to home when forceBackToHome false', () => {
    getStateStub.returns({
      persistentHistory: [{ forceBackToHome: false }]
    });

    const result = forceBackToHomeInterceptor(mockInterceptorContext);

    expect(result).to.equal(undefined);
    expect(pushStub).to.not.be.called;
  });
});
