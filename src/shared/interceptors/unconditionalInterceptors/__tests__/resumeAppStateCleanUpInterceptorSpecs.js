import store2 from 'store2';
import { sandbox } from 'sinon';
import resumeAppStateCleanUpInterceptor from 'src/shared/interceptors/unconditionalInterceptors/resumeAppStateCleanUpInterceptor';

import * as InterceptorHelpers from 'src/shared/helpers/interceptorHelpers';
import StorageKeys from 'src/shared/helpers/storageKeys';
import SharedConstants from 'src/shared/constants/sharedConstants';

const { APP_STATE_KEY } = StorageKeys;
const { EXTERNAL_TARGETS } = SharedConstants;

const sinon = sandbox.create();

describe('resumeAppStateCleanUpInterceptor', () => {
  let getStub;
  let removeStub;
  let isRouteChangeStub;
  let isMatchPathStub;

  beforeEach(() => {
    getStub = sinon.stub(store2.session, 'get');
    removeStub = sinon.stub(store2.session, 'remove');
    isRouteChangeStub = sinon.stub(InterceptorHelpers, 'isRouteChange');
    isMatchPathStub = sinon.stub(InterceptorHelpers, 'isMatchPath');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should not remove APP_STATE_KEY when action is not route change', () => {
    const action = 'action';

    isRouteChangeStub.returns(false);

    const result = resumeAppStateCleanUpInterceptor({ action });

    expect(result).to.be.undefined;
    expect(getStub).to.not.have.been.called;
    expect(isRouteChangeStub).to.have.been.calledWith({ action });
    expect(isMatchPathStub).to.not.have.been.called;
    expect(removeStub).to.not.have.been.called;
  });

  it('should not remove APP_STATE_KEY when stored pathname matches', () => {
    const action = 'action';
    const pathname = 'pathname';
    const matchStub = sinon.stub();

    getStub.returns({ pathname });
    isRouteChangeStub.returns(true);
    isMatchPathStub.returns(matchStub.returns(true));

    const result = resumeAppStateCleanUpInterceptor({ action });

    expect(result).to.be.undefined;
    expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
    expect(isRouteChangeStub).to.have.been.calledWith({ action });
    expect(matchStub).to.have.been.calledWith({ action });
    expect(isMatchPathStub).to.have.been.calledWith(pathname);
    expect(removeStub).to.not.have.been.called;
  });

  it('should not remove APP_STATE_KEY when path is chase offer apply', () => {
    const action = 'action';
    const pathname = 'pathname';
    const target = EXTERNAL_TARGETS.CHASE;
    const matchStub = sinon.stub();
    const chaseMatchStub = sinon.stub();

    getStub.returns({ pathname, target });
    isRouteChangeStub.returns(true);
    isMatchPathStub.onCall(0).returns(matchStub.returns(false));
    isMatchPathStub.onCall(1).returns(chaseMatchStub.returns(true));

    const result = resumeAppStateCleanUpInterceptor({ action });

    expect(result).to.be.undefined;
    expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
    expect(isRouteChangeStub).to.have.been.calledWith({ action });
    expect(matchStub).to.have.been.calledWith({ action });
    expect(isMatchPathStub.getCall(0)).to.have.been.calledWith(pathname);
    expect(isMatchPathStub.getCall(1)).to.have.been.calledWith('/chase/offer/apply');
    expect(removeStub).to.not.have.been.called;
  });

  it('should not remove APP_STATE_KEY when path is external payment page', () => {
    const action = 'action';
    const pathname = 'pathname';
    const target = EXTERNAL_TARGETS.EXTERNAL_PAYMENT;
    const matchStub = sinon.stub();
    const upliftMatchStub = sinon.stub();

    getStub.returns({ pathname, target });
    isRouteChangeStub.returns(true);
    isMatchPathStub.onCall(0).returns(matchStub.returns(false));
    isMatchPathStub.onCall(1).returns(upliftMatchStub.returns(true));

    const result = resumeAppStateCleanUpInterceptor({ action });

    expect(result).to.be.undefined;
    expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
    expect(isRouteChangeStub).to.have.been.calledWith({ action });
    expect(matchStub).to.have.been.calledWith({ action });
    expect(isMatchPathStub.getCall(0)).to.have.been.calledWith(pathname);
    expect(isMatchPathStub.getCall(1)).to.have.been.calledWith('payment/external');
    expect(removeStub).to.not.have.been.called;
  });

  it('should remove APP_STATE_KEY when pathname is not stored', () => {
    const action = 'action';
    const pathname = undefined;
    const matchStub = sinon.stub();

    getStub.returns({ pathname });
    isRouteChangeStub.returns(true);
    isMatchPathStub.returns(matchStub.returns(true));

    const result = resumeAppStateCleanUpInterceptor({ action });

    expect(result).to.be.undefined;
    expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
    expect(isRouteChangeStub).to.have.been.calledWith({ action });
    expect(isMatchPathStub).to.have.been.calledWith(pathname);
    expect(removeStub).to.have.been.calledWith(APP_STATE_KEY);
  });

  it('should remove APP_STATE_KEY when stored pathname does not match', () => {
    const action = 'action';
    const pathname = 'invalid-pathname';
    const matchStub = sinon.stub();

    getStub.returns({ pathname });
    isRouteChangeStub.returns(true);
    isMatchPathStub.returns(matchStub.returns(false));

    const result = resumeAppStateCleanUpInterceptor({ action });

    expect(result).to.be.undefined;
    expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
    expect(isRouteChangeStub).to.have.been.calledWith({ action });
    expect(isMatchPathStub).to.have.been.calledWith(pathname);
    expect(removeStub).to.have.been.calledWith(APP_STATE_KEY);
  });

  it('should remove APP_STATE_KEY when path is not chase offer apply', () => {
    const action = 'action';
    const pathname = 'pathname';
    const target = EXTERNAL_TARGETS.CHASE;
    const matchStub = sinon.stub();
    const chaseMatchStub = sinon.stub();

    getStub.returns({ pathname, target });
    isRouteChangeStub.returns(true);
    isMatchPathStub.onCall(0).returns(matchStub.returns(false));
    isMatchPathStub.onCall(1).returns(chaseMatchStub.returns(false));

    const result = resumeAppStateCleanUpInterceptor({ action });

    expect(result).to.be.undefined;
    expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
    expect(isRouteChangeStub).to.have.been.calledWith({ action });
    expect(isMatchPathStub).to.have.been.calledWith(pathname);
    expect(removeStub).to.have.been.calledWith(APP_STATE_KEY);
  });

  it('should not remove APP_STATE_KEY when path is not external payment page', () => {
    const action = 'action';
    const pathname = 'pathname';
    const target = EXTERNAL_TARGETS.EXTERNAL_PAYMENT;
    const matchStub = sinon.stub();
    const upliftMatchStub = sinon.stub();

    getStub.returns({ pathname, target });
    isRouteChangeStub.returns(true);
    isMatchPathStub.onCall(0).returns(matchStub.returns(false));
    isMatchPathStub.onCall(1).returns(upliftMatchStub.returns(false));

    const result = resumeAppStateCleanUpInterceptor({ action });

    expect(result).to.be.undefined;
    expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
    expect(isRouteChangeStub).to.have.been.calledWith({ action });
    expect(matchStub).to.have.been.calledWith({ action });
    expect(isMatchPathStub.getCall(0)).to.have.been.calledWith(pathname);
    expect(isMatchPathStub.getCall(1)).to.have.been.calledWith('payment/external');
    expect(removeStub).to.have.been.calledWith(APP_STATE_KEY);
  });
});
