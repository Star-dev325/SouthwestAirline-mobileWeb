import _ from 'lodash';
import React from 'react';
import store2 from 'store2';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import SharedConstants from 'src/shared/constants/sharedConstants';
import StorageKeys from 'src/shared/helpers/storageKeys';
import * as AppSelector from 'src/shared/selectors/appSelector';
import withAppStateHandler from 'src/shared/enhancers/withAppStateHandler';

const { APP_STATE_KEY } = StorageKeys;
const { ANALYTICS_STORES_PATH } = SharedConstants;

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('WithAppStateHandler', () => {
  const FakeComponent = () => <div />;
  const appState = { app: 'state' };
  const pathname = 'pathname';
  const history = { location: { pathname } };

  let originalWindowStores;

  beforeEach(() => {
    originalWindowStores = _.get(window, ANALYTICS_STORES_PATH);

    sinon.stub(AppSelector, 'getNeededAppState').returns(appState);
  });

  afterEach(() => {
    sinon.restore();
    _.set(window, ANALYTICS_STORES_PATH, originalWindowStores);
  });

  context('render', () => {
    it('should omit props', () => {
      const wrapper = createComponent({});

      expect(wrapper.find('FakeComponent').props()).to.contain.key('persistAppStateFn');
      expect(wrapper.find('FakeComponent').props()).to.contain.key('shouldResumeAppStateFn');
      expect(wrapper.find('FakeComponent').props()).to.contain.key('resumeAppStateFn');
    });
  });

  it('should handle persistAppStateFn', () => {
    const target = 'target';
    const analytics = 'analytics';

    const sessionStub = sinon.stub(store2, 'session');

    _.set(window, ANALYTICS_STORES_PATH, analytics);

    const wrapper = createComponent();

    const persistAppStateFn = wrapper.find(FakeComponent).prop('persistAppStateFn');

    persistAppStateFn(target);

    expect(sessionStub).to.have.been.calledWith(APP_STATE_KEY, { app: appState, analytics, pathname, target });
  });

  it('should handle persistAppStateFn when router missing', () => {
    const target = 'target';
    const analytics = 'analytics';

    const sessionStub = sinon.stub(store2, 'session');

    _.set(window, ANALYTICS_STORES_PATH, analytics);

    const wrapper = createComponent({}, {}, true);

    const persistAppStateFn = wrapper.find(FakeComponent).prop('persistAppStateFn');

    persistAppStateFn(target);

    expect(sessionStub).to.have.been.calledWith(APP_STATE_KEY, {
      app: appState,
      analytics,
      pathname: undefined,
      target
    });
  });

  context('should handle shouldResumeAppStateFn', () => {
    let getStub;

    beforeEach(() => {
      getStub = sinon.stub(store2.session, 'get');
    });

    it('when session data does not exist', () => {
      const target = 'target';

      getStub.returns(undefined);

      const wrapper = createComponent();

      const shouldResumeAppStateFn = wrapper.find(FakeComponent).prop('shouldResumeAppStateFn');
      const result = shouldResumeAppStateFn(target);

      expect(result).to.be.false;
      expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
    });

    it('when passed in target does not equal persisted target', () => {
      const target = 'new-target';

      getStub.returns({ target: 'persisted-target' });

      const wrapper = createComponent();

      const shouldResumeAppStateFn = wrapper.find(FakeComponent).prop('shouldResumeAppStateFn');
      const result = shouldResumeAppStateFn(target);

      expect(result).to.be.false;
      expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
    });

    it('when passed in target equals persisted target', () => {
      const target = 'target';

      getStub.returns({ target });

      const wrapper = createComponent();

      const shouldResumeAppStateFn = wrapper.find(FakeComponent).prop('shouldResumeAppStateFn');
      const result = shouldResumeAppStateFn(target);

      expect(result).to.be.true;
      expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
    });
  });

  context('should handle resumeAppStateFn', () => {
    let getStub;
    let removeStub;

    beforeEach(() => {
      getStub = sinon.stub(store2.session, 'get');
      removeStub = sinon.stub(store2.session, 'remove');
    });

    it('when analytics data does not exist in session data', () => {
      getStub.returns(undefined);

      const wrapper = createComponent();

      const resumeAppStateFn = wrapper.find(FakeComponent).prop('resumeAppStateFn');

      return resumeAppStateFn().then(() => {
        expect(getStub).to.have.been.calledWith(APP_STATE_KEY);
        expect(removeStub).to.have.been.calledWith(APP_STATE_KEY);
        expect(_.get(window, ANALYTICS_STORES_PATH)).to.deep.equal(originalWindowStores);
      });
    });

    it('when analytics data does exist in session data', () => {
      const analytics = 'analytics';

      getStub.returns({ analytics });

      const wrapper = createComponent();

      const resumeAppStateFn = wrapper.find(FakeComponent).prop('resumeAppStateFn');

      return resumeAppStateFn().then(() => {
        expect(removeStub).to.have.been.calledWith(APP_STATE_KEY);
        expect(_.get(window, ANALYTICS_STORES_PATH)).to.deep.equal(analytics);
      });
    });
  });

  const createComponent = (props = {}, state = {}, overrideState = false) => {
    const defaultProps = {};
    const finalProps = _.merge({}, defaultProps, props);

    const defaultState = {
      router: history
    };
    const finalState = overrideState ? state : _.merge({}, defaultState, state);

    const WithAppStateHandler = withAppStateHandler(FakeComponent);

    return mount(
      <Provider store={mockStore({ ...finalState })}>
        <WithAppStateHandler {...finalProps} />
      </Provider>
    );
  };
});
