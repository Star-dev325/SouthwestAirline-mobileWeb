import { sandbox } from 'sinon';

import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import upcomingTripDetailsInterceptor from 'src/shared/interceptors/upcomingTripDetailsInterceptor';
import * as HistoryActions from 'src/shared/actions/historyActions';

const sinon = sandbox.create();

describe('upcomingTripDetailsInterceptor', () => {
  let addHistoryForceRedirectStub, mockHistory;

  beforeEach(() => {
    addHistoryForceRedirectStub = sinon.stub(HistoryActions, 'addHistoryForceRedirect');
    mockHistory = { location: { state: null }, push: sinon.stub() };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should intercept when user refreshes and state action is null', () => {
    const result = upcomingTripDetailsInterceptor({
      store: mockStore({}),
      action: {
        payload: {
          routeState: {
            action: null
          }
        }
      },
      history: mockHistory
    });

    result.interceptor();

    expect(addHistoryForceRedirectStub).to.have.been.calledWith('/my-account/upcoming-trips');
    expect(mockHistory.push).to.have.been.calledWith('/my-account/upcoming-trips');
  });

  it('should not intercept when user navigates normally to upcoming trips detail pages', () => {
    const result = upcomingTripDetailsInterceptor({
      action: {
        payload: {
          routeState: {
            action: 'push'
          }
        }
      }
    });

    expect(result).to.be.undefined;
    expect(addHistoryForceRedirectStub).to.not.be.called;
  });
});
