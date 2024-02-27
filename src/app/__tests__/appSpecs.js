import dayjs from 'dayjs';
import { shallow } from 'enzyme';
import _ from 'lodash';
import proxyquire from 'proxyquire';
import React from 'react';
import { sandbox } from 'sinon';
import { DAYJS_TIMESTAMP_FORMAT } from 'src/shared/constants/dayjsConstants';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import browser from 'src/shared/helpers/browserObject';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { integrationMount } from 'test/unit/helpers/testUtils';
import waitFor from 'test/unit/helpers/waitFor';

const sinon = sandbox.create();

describe('app.jsx', () => {
  const children = (<div className="mock-children">Mock Child</div>);
  const MockEncryptionContext = React.createContext();
  const MockEncryptionProvider = (props) => (
    <MockEncryptionContext.Provider>{props.children}</MockEncryptionContext.Provider>
  );
  let addHistoryBackToHomeFnStub;
  let addUniversalErrorListenerStub;
  let App;
  let fetchBootstrapDataFnStub;
  let generateUUIDStub;
  let getAccountInfoFnStub;
  let initializeChatBotStub;
  let isLoggedInStub;
  let isHybridEnabledStub;
  let loadInitialDataFnStub;
  let loadSavedExperienceIdStub;
  let logoutFnStub;
  let mockEnvironment;
  let openInBrowserStub;
  let refreshCorporateInfoFnStub;
  let removeEventListenerStub;
  let resetNavMenusFnStub;
  let restoreUUIDStub;
  let retrieveFeatureTogglesFnStub;
  let routeChangedFnStub;
  let saveExperienceIdStub;
  let verifyFromPaypalStub;
  let wcmTransitionToStub;

  beforeEach(() => {
    addHistoryBackToHomeFnStub = sinon.stub();
    addUniversalErrorListenerStub = sinon.stub();
    fetchBootstrapDataFnStub = sinon.stub().returns(
      {
        configs: [
          {
            id: 'mockFeatureOne'
          },
          {
            id: 'mockFeatureTwo'
          }
        ],
        keyConfigMap: {
          featureOne: 'mockFeatureOne',
          featureTwo: 'mockFeatureTwo'
        }
      }
    );
    generateUUIDStub = sinon.stub();
    getAccountInfoFnStub = sinon.stub();
    initializeChatBotStub = sinon.stub();
    isLoggedInStub = sinon.stub();
    isHybridEnabledStub = sinon.stub().returns(false);
    loadInitialDataFnStub = sinon.stub();
    loadSavedExperienceIdStub = sinon.stub();
    logoutFnStub = sinon.stub().returns(Promise.resolve());
    refreshCorporateInfoFnStub = sinon.stub();
    removeEventListenerStub = sinon.stub(window, 'removeEventListener');
    resetNavMenusFnStub = sinon.stub();
    restoreUUIDStub = sinon.stub();
    retrieveFeatureTogglesFnStub = sinon.stub().resolves();
    routeChangedFnStub = sinon.stub();
    saveExperienceIdStub = sinon.stub();
    verifyFromPaypalStub = sinon.stub();
    wcmTransitionToStub = sinon.stub();

    ({ App } = proxyquire('src/app/app', {
      '@swa-ui/error': {
        ErrorBoundary: function ErrorBoundary() {
          return null;
        }
      },
      '@swa-ui/hybrid': {
        isHybridEnabled: isHybridEnabledStub
      },
      'src/shared/errors/universalExceptionError': {
        addUniversalErrorListener: addUniversalErrorListenerStub
      },
      'src/homeAndNav/helpers/salesforceChatHelper': {
        initializeChatBot: initializeChatBotStub
      },
      'src/shared/helpers/accountInfoHelper': {
        isLoggedIn: isLoggedInStub
      },
      'src/shared/helpers/paypalHelper': {
        verifyFromPaypal: verifyFromPaypalStub
      },
      'src/app/stores/uuidRepo': {
        default: {
          getUUID: sinon.stub(),
          generateUUID: generateUUIDStub,
          restoreUUID: restoreUUIDStub
        }
      },
      'src/shared/helpers/experienceIdHelper': {
        default: {
          loadSavedExperienceId: loadSavedExperienceIdStub,
          saveExperienceIdToSessionStore: saveExperienceIdStub
        }
      },
      'src/shared/helpers/wcmTransitionHelper': {
        wcmTransitionTo: wcmTransitionToStub
      },
      '@swa-ui/encryption': {
        EncryptionProvider: MockEncryptionProvider
      },
      'src/app/helpers/bootstrapHelper': {
        fetchBootstrapData: fetchBootstrapDataFnStub
      }
    }));
    mockEnvironment = require('src/shared/api/apiRoutes').default;
    mockEnvironment.oAuthClientIdCookie = 'mweb-client-id';
    mockEnvironment.api = 'mockApiKey';
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should load initial app data', (done) => {
    createComponent();

    waitFor.untilAssertPass(async () => {
      expect(retrieveFeatureTogglesFnStub).to.have.been.called;
      await retrieveFeatureTogglesFnStub;
      expect(loadInitialDataFnStub).to.have.been.called;
    }, done);
  });

  it('should have Spinner component', () => {
    const app = createComponent();

    expect(app.find('Spinner')).to.exist;
  });

  context('global header', () => {
    context('drawer menu', () => {
      context('drawer login link', () => {
        it('should use onLoginClick', () => {
          const item = {
            isWcmLink: false,
            params: null,
            query: { to: '/my-account' },
            routeName: '/login'
          };
          const app = createComponent();
          const pushStub = sinon.stub(app.instance().props.history, 'push');
          const onLoginClick = app.find('NavContainer').prop('onLoginClick');

          onLoginClick(item);

          expect(pushStub).to.have.been.calledWith('/login?to=%2Fmy-account');
        });
      });

      context('clicking drawer navigation link', () => {
        it('should use wcmTransitionTo with app linkType and target params', () => {
          const proxyquireApp = proxyquire('src/app/app', {
            '@swa-ui/error': {
              ErrorBoundary: sinon.stub().returns(null)
            },
            'src/shared/helpers/wcmTransitionHelper': { default: wcmTransitionToStub }
          }).App;
          const item = {
            linkType: 'app',
            routeName: '/target',
            isWcmLink: true
          };
          const mountedProxyApp = createComponent({}, {}, proxyquireApp);
          const onNavClick = mountedProxyApp.find('NavContainer').prop('onNavClick');

          onNavClick(item);

          expect(wcmTransitionToStub).to.have.been.calledWith({
            linkType: 'app',
            target: '/target'
          });
        });

        context('when isWcmLink is false', () => {
          it('should use push for relative routes', () => {
            const item = {
              routeName: '/target',
              isWcmLink: false
            };
            const app = createComponent();
            const pushStub = sinon.stub(app.instance().props.history, 'push');
            const onNavClick = app.find('NavContainer').prop('onNavClick');

            onNavClick(item);

            expect(pushStub).to.have.been.calledWith('/target');
          });

          it('should use browser open for links', () => {
            openInBrowserStub = sinon.spy(browser.window, 'open');
            const item = {
              link: '/link',
              isWcmLink: false
            };
            const app = createComponent();
            const onNavClick = app.find('NavContainer').prop('onNavClick');

            onNavClick(item);

            expect(openInBrowserStub).to.have.been.calledWith('/link');
          });
        });
      });
    });

    it('clicking logo should push to /?clk=GNAVLOGO route', () => {
      const app = createComponent();
      const pushStub = sinon.stub(app.instance().props.history, 'push');

      click(app.find('.home-link'));

      expect(pushStub).to.be.calledWith('/?clk=GNAVLOGO');
    });

    context('login/enroll/logout button', () => {
      it('clicking simple login button should push to simple login page', () => {
        isLoggedInStub.returns(false);
        sinon.stub(AccountInfoHelper, 'getAccountInfo').returns({});

        const appWrapper = createComponent();
        const pushStub = sinon.stub(appWrapper.instance().props.history, 'push');
        const logoutButton = appWrapper.find('LoginButton');

        logoutButton.props().onLoginClick({ transitionToSimpleLoginForm: true });

        expect(pushStub).to.be.calledWith('/login?clk=GNAVLOGIN&simpleLogin=true&to=%2F&params%5Bfake%5D=param&');
      });

      it('clicking simple login button should push to simple login page excluding existing clk code', () => {
        isLoggedInStub.returns(false);
        sinon.stub(AccountInfoHelper, 'getAccountInfo').returns({});

        const newProps = { location: { search: '?cleanFlow=true&clk=TESTCLK' } };
        const appWrapper = createComponent(newProps);
        const pushStub = sinon.stub(appWrapper.instance().props.history, 'push');
        const logoutButton = appWrapper.find('LoginButton');

        logoutButton.props().onLoginClick({ transitionToSimpleLoginForm: true });

        expect(pushStub).to.be.calledWith(
          '/login?clk=GNAVLOGIN&simpleLogin=true&params%5Bfake%5D=param&query%5BcleanFlow%5D=true&query%5Bclk%5D=TESTCLK'
        );
      });

      it('clicking login/enroll button should push to full login page', () => {
        isLoggedInStub.returns(false);
        sinon.stub(AccountInfoHelper, 'getAccountInfo').returns({});

        const appWrapper = createComponent();
        const pushStub = sinon.stub(appWrapper.instance().props.history, 'push');
        const logoutButton = appWrapper.find('LoginButton');

        logoutButton.props().onLoginClick({ transitionToSimpleLoginForm: false });

        expect(pushStub).to.be.calledWith('/login?clk=GNAVLOGIN&to=%2F&params%5Bfake%5D=param&');
      });

      it('clicking logout button should dispatch actions and push to root', (done) => {
        isLoggedInStub.returns(true);
        sinon.stub(AccountInfoHelper, 'getAccountInfo').returns({});

        const appWrapper = createComponent();
        const logoutButton = appWrapper.find('LoginButton');

        logoutButton.props().onLogoutClick();

        waitFor.untilAssertPass(() => {
          expect(logoutFnStub).to.be.called;
          expect(addHistoryBackToHomeFnStub).to.be.called;
          expect(appWrapper.instance().props.history.location.pathname).to.equal('/');
        }, done);
      });
    });
  });

  context('componentDidMount', () => {
    it('should record route change when the first time loading the App', () => {
      createComponent();
      expect(routeChangedFnStub).to.have.been.called;
    });

    it('should add universal exception error listener', () => {
      createComponent();
      expect(addUniversalErrorListenerStub).to.have.been.called;
    });

    it('should initialize chatbot', () => {
      createComponent();
      expect(initializeChatBotStub).to.have.been.called;
    });

    context('account info', () => {
      it('should fetch account info when user is logged in but account info not fetched and not returning from paypal', () => {
        isLoggedInStub.returns(true);
        verifyFromPaypalStub.returns(false);

        createComponent();

        expect(getAccountInfoFnStub).to.have.been.called;
      });

      it('should fetch account info when user is logged in and account info not fetched and not returning from paypal and in webview with expired account info in local storage', () => {
        isLoggedInStub.returns(true);
        verifyFromPaypalStub.returns(false);
        sinon
          .stub(AccountInfoHelper, 'getAccountInfo')
          .returns({ expirationDate: dayjs().subtract(5, 'minutes').format(DAYJS_TIMESTAMP_FORMAT) });

        createComponent();

        expect(getAccountInfoFnStub).to.have.been.called;
      });

      it('should not fetch account info if already fetched', () => {
        isLoggedInStub.returns(true);
        verifyFromPaypalStub.returns(false);

        createComponent({ isAccountInfoFetched: true });

        expect(getAccountInfoFnStub).to.have.not.been.called;
      });

      it('should not fetch account info if logged in user is returning from paypal', () => {
        isLoggedInStub.returns(true);
        isHybridEnabledStub.returns(true);
        verifyFromPaypalStub.returns(true);

        createComponent();

        expect(getAccountInfoFnStub).to.have.not.been.called;
      });

      it('should not fetch account info when user has logged in and account info not fetched while paypal data not exist and in webview', () => {
        isLoggedInStub.returns(true);
        isHybridEnabledStub.returns(true);
        verifyFromPaypalStub.returns(false);

        createComponent();

        expect(getAccountInfoFnStub).to.have.not.been.called;
      });
    });

    context('corporate info', () => {
      context('user is logged in', () => {
        it('should be refreshed when not from paypal', () => {
          isLoggedInStub.returns(true);
          verifyFromPaypalStub.returns(false);
          createComponent();

          expect(refreshCorporateInfoFnStub).to.have.been.called;
        });

        it('should not be refreshed when from paypal', () => {
          isLoggedInStub.returns(true);
          verifyFromPaypalStub.returns(true);
          createComponent();

          expect(refreshCorporateInfoFnStub).to.not.have.been.called;
        });
      });

      it('should not be refreshed when not logged in', () => {
        isLoggedInStub.returns(false);
        createComponent();

        expect(refreshCorporateInfoFnStub).to.not.have.been.called;
      });
    });

    context('experience id', () => {
      it('should restore the experienceId if it was saved in Session Storage', () => {
        const mockSavedExperienceId = 'MOCK_EXPERIENCE_ID';

        loadSavedExperienceIdStub.returns(mockSavedExperienceId);

        createComponent();

        expect(restoreUUIDStub).to.have.been.calledOnce.calledWith(mockSavedExperienceId);
        expect(generateUUIDStub).to.have.not.been.called;
        expect(saveExperienceIdStub).to.have.not.been.called;
      });

      it(`should generate a new experienceId and save it to Session Storage if it wasn't found in Session Storage`, () => {
        loadSavedExperienceIdStub.returns(undefined);

        createComponent();

        expect(restoreUUIDStub).to.have.not.been.called;
        expect(generateUUIDStub).to.have.been.calledOnce;
        expect(saveExperienceIdStub).to.have.been.calledOnce;
      });

      it(`should generate a new experienceId and save it to Session Storage if the value stored in Session Storage is empty`, () => {
        loadSavedExperienceIdStub.returns('');

        createComponent();

        expect(restoreUUIDStub).to.have.not.been.called;
        expect(generateUUIDStub).to.have.been.calledOnce;
        expect(saveExperienceIdStub).to.have.been.calledOnce;
      });
    });
  });

  context('isJourneyBannerDisplayed', () => {
    it('should match the snapshot when isJourneyBannerDisplayed and appRef.current values are false', () => {
      const wrapper = createComponent({ isJourneyBannerDisplayed: false }, {}, {}, true);

      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when isJourneyBannerDisplayed value is true', () => {
      const wrapper = createComponent({ isJourneyBannerDisplayed: true }, {}, {}, true);

      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when isJourneyBannerDisplayed and appRef.current values are true', () => {
      sinon.stub(React, 'createRef').returns({ current: { offsetTop: 60 } });

      const wrapper = createComponent({ isJourneyBannerDisplayed: true }, {}, {}, true);

      expect(wrapper).toMatchSnapshot();
    });
  });

  context('componentWillUnmount', () => {
    it('should remove event listener', () => {
      const component = createComponent();

      component.unmount();

      expect(removeEventListenerStub).to.have.been.called;
    });
  });

  describe('when UI_ENCRYPTION toggle is true', () => {
    describe('when isHybridEnabled is true', () => {
      it('should not include the Encryption Provider', () => {
        isHybridEnabledStub.returns(true);
        const wrapper = createComponent({ children, UI_ENCRYPTION: true }, {}, {}, true);
  
        expect(wrapper.find('MockEncryptionProvider')).toMatchSnapshot();
      });

      it('should render the children', () => {
        isHybridEnabledStub.returns(true);
        const wrapper = createComponent({ children, UI_ENCRYPTION: true }, {}, {}, true);
  
        expect(wrapper.find('.mock-children')).toMatchSnapshot();
      });
    });

    describe('when isHybridEnabled is false', () => {
      it('should include the Encryption Provider', () => {
        const wrapper = createComponent({ children, UI_ENCRYPTION: true }, {}, {}, true);

        expect(wrapper.find('MockEncryptionProvider')).toMatchSnapshot();
      });

      it('should render children', () => {
        const wrapper = createComponent({ children, UI_ENCRYPTION: true }, {}, {}, true);
  
        expect(wrapper.find('.mock-children')).toMatchSnapshot();
      });
    });
  });

  describe('when UI_ENCRYPTION toggle is false', () => {
    describe('when isHybridEnabled is true', () => {
      it('should not include the Encryption Provider', () => {
        isHybridEnabledStub.returns(true);
        const wrapper = createComponent({ UI_ENCRYPTION: false }, {}, {}, true);
  
        expect(wrapper.find('MockEncryptionProvider')).toMatchSnapshot();
      });

      it('should render the children', () => {
        isHybridEnabledStub.returns(true);
        const wrapper = createComponent({ UI_ENCRYPTION: false }, {}, {}, true);
  
        expect(wrapper.find('.mock-children')).toMatchSnapshot();
      });
    });

    describe('when isHybridEnabled is false', () => {
      it('should not include the Encryption Provider', () => {
        const wrapper = createComponent({ UI_ENCRYPTION: false }, {}, {}, true);

        expect(wrapper.find('MockEncryptionProvider')).toMatchSnapshot();
      });

      it('should render the children', () => {
        const wrapper = createComponent({ UI_ENCRYPTION: false }, {}, {}, true);

        expect(wrapper.find('.mock-children')).toMatchSnapshot();
      });
    });  

    describe('when appReady is false', () => {
      it('should not render children', () => {
        const wrapper = createComponent({ appReady: false, children }, {}, {}, true);

        expect(wrapper.find('.mock-children')).toMatchSnapshot();
      });
    });

    describe('when appReady is true', () => {
      it('should render children', () => {
        const wrapper = createComponent({ children }, {}, {}, true);

        expect(wrapper.find('.mock-children')).toMatchSnapshot();
      });
    });
  });

  const createComponent = (props = {}, state = {}, component = App, shouldShallow = false) => {
    const mergedProps = _.merge(
      {},
      {
        addHistoryBackToHomeFn: addHistoryBackToHomeFnStub,
        appReady: true,
        getAccountInfoFn: getAccountInfoFnStub,
        isAccountInfoFetched: false,
        isJourneyBannerDisplayed: false,
        isHybridEnabled: false,
        loadInitialDataFn: loadInitialDataFnStub,
        logoutFn: logoutFnStub,
        match: { params: { fake: 'param' } },
        refreshCorporateInfoFn: refreshCorporateInfoFnStub,
        resetNavMenusFn: resetNavMenusFnStub,
        retrieveFeatureTogglesFn: retrieveFeatureTogglesFnStub,
        routeChangedFn: routeChangedFnStub,
        UI_ENCRYPTION: false
      },
      props
    );

    return shouldShallow
      ? shallow(<App {...mergedProps} history={{}} location={{}} />)
      : integrationMount({ location: '/', path: '/' })(state, component, { ...mergedProps });
  };
});
