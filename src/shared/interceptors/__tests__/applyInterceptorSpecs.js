import sinonModule from 'sinon';
import applyInterceptor from 'src/shared/interceptors/applyInterceptor';

const sinon = sinonModule.sandbox.create();

describe('applyInterceptor', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should invoke interceptor when interceptor in arguments', () => {
    const interceptorStub = sinon.stub();
    const nextStub = sinon.stub();

    applyInterceptor({
      interceptor: interceptorStub,
      next: nextStub
    });

    expect(interceptorStub).to.have.been.called;
    expect(nextStub).to.have.been.called;
  });

  it('should invoke next when no interceptor in arguments', () => {
    const nextStub = sinon.stub();

    applyInterceptor({
      next: nextStub
    });

    expect(nextStub).to.have.been.called;
  });
});
