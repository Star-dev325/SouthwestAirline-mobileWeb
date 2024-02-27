import sinonModule from 'sinon';
import forceRedirectInterceptor from 'src/shared/interceptors/forceRedirectInterceptor';

const sinon = sinonModule.sandbox.create();

describe('forceRedirectInterceptor', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should redirect to prevRouteState forceRedirect pathname and continue the action', () => {
    const mockPersistentHistory = [
      {
        pathname: '/url',
        action: null,
        forceRedirect: '/redirect-pathname'
      },
      {
        action: 'pop',
        pathname: '/url1'
      }
    ];
    const mockHistory = {
      push: sinon.stub()
    };
    const nextStub = sinon.stub();
    const mockStore = {
      getState() {
        return {
          persistentHistory: mockPersistentHistory
        };
      }
    };

    forceRedirectInterceptor({ store: mockStore, next: nextStub, history: mockHistory }).interceptor();

    expect(mockHistory.push).to.have.been.calledWith('/redirect-pathname');
  });
});
