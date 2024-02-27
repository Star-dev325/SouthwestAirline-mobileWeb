import sinonModule from 'sinon';
import forceRedirectToHomeInterceptor from 'src/shared/interceptors/forceRedirectToHomeInterceptor';

const sinon = sinonModule.sandbox.create();

describe('forceRedirectToHomeInterceptor', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should redirect to home page', () => {
    const mockHistory = {
      replace: sinon.stub(),
      push: sinon.stub()
    };
    const mockAction = {
      payload: {
        location: {
          pathname: '/travel-advisories'
        },
        action: null
      }
    };

    forceRedirectToHomeInterceptor({ action: mockAction, history: mockHistory }).interceptor();

    expect(mockHistory.push).to.have.been.calledWith('/');
  });
});
