import store2 from 'store2';
import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import resumeAppStateInterceptor from 'src/shared/interceptors/resumeAppStateInterceptor';
import * as InterceptorHelpers from 'src/shared/helpers/interceptorHelpers';
import * as SharedActions from 'src/shared/actions/sharedActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import StorageKeys from 'src/shared/helpers/storageKeys';

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('resumeAppStateInterceptor', () => {
  let getStub;
  let isMatchPathStub;
  let saveAppStateStub;
  let setFlowStatusStub;

  beforeEach(() => {
    getStub = sinon.stub(store2.session, 'get');
    isMatchPathStub = sinon.stub(InterceptorHelpers, 'isMatchPath');
    saveAppStateStub = sinon.stub(SharedActions, 'saveAppState');
    setFlowStatusStub = sinon.stub(FlowStatusActions, 'setFlowStatus');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('should not run interceptor', () => {
    it('when pathname does not exist in session storage', () => {
      const store = mockStore({});
      const action = 'action';
      const matchStub = sinon.stub();

      getStub.returns(undefined);
      isMatchPathStub.returns(matchStub.returns(true));

      const result = resumeAppStateInterceptor({ store, action });

      expect(result).to.be.undefined;
      expect(getStub).to.have.been.calledWith(StorageKeys.APP_STATE_KEY);
      expect(matchStub).to.have.been.calledWith({ action });
      expect(isMatchPathStub).to.have.been.calledWith(undefined);
      expect(saveAppStateStub).to.not.have.been.called;
      expect(setFlowStatusStub).to.not.have.been.called;

      expect(store.getActions()).to.deep.equal([]);
    });

    it('when pathname exists in session storage and does not match path', () => {
      const store = mockStore({});
      const action = 'action';
      const pathname = 'pathname';
      const matchStub = sinon.stub();

      getStub.returns({ pathname });
      isMatchPathStub.returns(matchStub.returns(false));

      const result = resumeAppStateInterceptor({ store, action });

      expect(result).to.be.undefined;
      expect(getStub).to.have.been.calledWith(StorageKeys.APP_STATE_KEY);
      expect(matchStub).to.have.been.calledWith({ action });
      expect(isMatchPathStub).to.have.been.calledWith(pathname);
      expect(saveAppStateStub).to.not.have.been.called;
      expect(setFlowStatusStub).to.not.have.been.called;

      expect(store.getActions()).to.deep.equal([]);
    });
  });

  context('should run interceptor', () => {
    it('when pathname exists in session storage and matches path', () => {
      const store = mockStore({});
      const action = 'action';
      const pathname = 'pathname';
      const app = 'app';
      const flowName = 'flowName';
      const flowConfig = { name: flowName };
      const matchStub = sinon.stub();

      const saveAppStateAction = { type: 'saveAppState' };
      const setFlowStatusAction = { type: 'setFlowStatus' };

      getStub.returns({ pathname, app });
      isMatchPathStub.returns(matchStub.returns(true));
      saveAppStateStub.returns(saveAppStateAction);
      setFlowStatusStub.returns(setFlowStatusAction);

      const result = resumeAppStateInterceptor({ store, action, flowConfig });

      result.interceptor();

      expect(getStub).to.have.been.calledWith(StorageKeys.APP_STATE_KEY);
      expect(matchStub).to.have.been.calledWith({ action });
      expect(isMatchPathStub).to.have.been.calledWith(pathname);
      expect(saveAppStateStub).to.have.been.calledWith({ app });
      expect(setFlowStatusStub).to.have.been.calledWith(flowName, STATUS.IN_PROGRESS);

      expect(store.getActions()).to.deep.equal([saveAppStateAction, setFlowStatusAction]);
    });
  });
});
