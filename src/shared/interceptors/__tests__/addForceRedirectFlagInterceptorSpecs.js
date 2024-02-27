import sinonModule from 'sinon';
import addForceRedirectFlagInterceptor from 'src/shared/interceptors/addForceRedirectFlagInterceptor';

const sinon = sinonModule.sandbox.create();

describe('addForceRedirectFlagInterceptor', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should call next action and redirect if popup is not open', () => {
    const nextStub = sinon.stub();
    const mockAction = { payload: { pathname: '/url' } };
    const mockHistory = { location: { state: null }, push: sinon.stub() };

    addForceRedirectFlagInterceptor({ next: nextStub, action: mockAction, history: mockHistory }).interceptor();

    expect(mockHistory.push).to.have.been.calledWith('/url');
  });

  it('should call next action and redirect and retain location state if popup is open', () => {
    const nextStub = sinon.stub();
    const mockAction = { payload: { pathname: '/url' } };
    const mockHistory = { location: { state: { popup: 'open' } }, push: sinon.stub() };

    addForceRedirectFlagInterceptor({ next: nextStub, action: mockAction, history: mockHistory }).interceptor();

    expect(mockHistory.push).to.have.been.calledWith({ pathname: '/url', state: { popup: 'open' } });
  });
});
