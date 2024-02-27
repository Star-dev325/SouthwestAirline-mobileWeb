import { sandbox } from 'sinon';
import airBookingCorporateRedirectInterceptor from 'src/shared/interceptors/airBookingCorporateRedirectInterceptor';

const sinon = sandbox.create();

describe('airBookingCorporateRedirectInterceptor', () => {
  let pushStub;
  let getStateStub;
  let mockInterceptorContext;
  let mockState;

  beforeEach(() => {
    pushStub = sinon.stub();
    getStateStub = sinon.stub();

    mockInterceptorContext = {
      store: {
        getState: getStateStub
      },
      history: {
        push: pushStub
      },
      flowConfig: {
        entry: '/air/booking/shopping'
      }
    };

    mockState = {
      app: {
        account: {
          isTokenConverted: true
        }
      },
      persistentHistory: [
        {
          action: 'push',
          pathname: '/'
        },
        {
          action: 'pop',
          pathname: '/air/booking/shopping/adult/outbound/results',
          backFrom: {
            pathname: '/car/booking'
          }
        }
      ]
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should redirect to booking entry page when coming back from a non-booking page and having a token that was previously converted', () => {
    getStateStub.returns(mockState);

    const result = airBookingCorporateRedirectInterceptor(mockInterceptorContext);

    result.interceptor();

    expect(pushStub).to.be.calledWith(mockInterceptorContext.flowConfig.entry);
  });

  it('should not redirect if token was not previously converted', () => {
    mockState.app.account.isTokenConverted = false;
    getStateStub.returns(mockState);

    const result = airBookingCorporateRedirectInterceptor(mockInterceptorContext);

    expect(result).to.equal(undefined);
    expect(pushStub).to.not.be.called;
  });

  it('should not redirect if coming back from page within the booking flow', () => {
    mockState.persistentHistory[1].backFrom.pathname = '/air/booking/shopping/select-fare';
    getStateStub.returns(mockState);

    const result = airBookingCorporateRedirectInterceptor(mockInterceptorContext);

    expect(result).to.equal(undefined);
    expect(pushStub).to.not.be.called;
  });

  it('should not redirect if on booking entry page', () => {
    mockState.persistentHistory[1].pathname = '/air/booking/shopping';
    getStateStub.returns(mockState);

    const result = airBookingCorporateRedirectInterceptor(mockInterceptorContext);

    expect(result).to.equal(undefined);
    expect(pushStub).to.not.be.called;
  });
});
