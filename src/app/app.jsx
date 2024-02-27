// @flow
import appConfig from 'src/shared/config/appConfig';
import { getAirBaggageReservationSchema as getEncryptionSchema } from '@swa-ui/air-baggage';
import { EncryptionProvider } from '@swa-ui/encryption';
import { ErrorBoundary } from '@swa-ui/error';
import { isHybridEnabled } from '@swa-ui/hybrid';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchBootstrapData } from 'src/app/helpers/bootstrapHelper';
import UUIDRepo from 'src/app/stores/uuidRepo';
import { enrollOldRoutes, enrollRoutes } from 'src/enroll/constants/enrollRoutes';
import SimulateHybridButton from 'src/shared/simulateHybrid/components/simulateHybridButton';
import SimulateHybridModal from 'src/shared/simulateHybrid/components/simulateHybridModal';
import { resetNavMenus } from 'src/homeAndNav/actions/homepageActions';
import Drawer from 'src/homeAndNav/components/drawer';
import NavContainer from 'src/homeAndNav/components/navContainer';
import { initializeChatBot } from 'src/homeAndNav/helpers/salesforceChatHelper';
import ReLoginModal from 'src/login/components/reLoginModal';
import { getAccountInfo, logout, refreshCorporateInfo } from 'src/shared/actions/accountActions';
import { addHistoryBackToHome } from 'src/shared/actions/historyActions';
import { loadInitialData, retrieveFeatureToggles, routeChanged } from 'src/shared/actions/sharedActions';
import environment from 'src/shared/api/apiRoutes';
import { encryptionProviderLoggerAdapter } from 'src/shared/api/helpers/loggingHelper';
import Dialog from 'src/shared/components/dialog';
import GlobalHeader from 'src/shared/components/globalHeader';
import Spinner from 'src/shared/components/spinner';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import SharedConstants from 'src/shared/constants/sharedConstants';
import withFeatureToggles from 'src/shared/enhancers/withFeatureToggles';
import withScrollToTop from 'src/shared/enhancers/withScrollToTop';
import withWebView from 'src/shared/enhancers/withWebView';
import { addUniversalErrorListener } from 'src/shared/errors/universalExceptionError';
import * as AccountInfoHelper from 'src/shared/helpers/accountInfoHelper';
import experienceIdHelper from 'src/shared/helpers/experienceIdHelper';
import { hasActiveSessionCookies, hasCorporateToken } from 'src/shared/helpers/loginSessionHelper';
import { buildPathWithParamAndQuery, transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { verifyFromPaypal } from 'src/shared/helpers/paypalHelper';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import ErrorPage from 'src/shared/pages/errorPage';

import type { Node } from 'react';
import type { Match, RouterHistory } from 'react-router';
import type { MenuListItemType } from 'src/homeAndNav/flow-typed/homeAndNav.types';

const { OAUTH } = SharedConstants;
const channelId = hasCorporateToken() ? OAUTH.CHANNEL_ID_CORPORATE : OAUTH.CHANNEL_ID;
const jwtSettings = fetchBootstrapData(BootstrapConstants.JWT_SETTINGS, {});

type AppState = {
  appReady: boolean,
  appRef: { current: null | HTMLDivElement },
  isLoggedIn: boolean
};

type AppProps = {
  addHistoryBackToHomeFn: (boolean) => void,
  appReady: boolean,
  children?: Node,
  getAccountInfoFn: () => void,
  history: RouterHistory,
  isAccountInfoFetched: boolean,
  isJourneyBannerDisplayed: boolean,
  loadInitialDataFn: () => void,
  location: HistoryLocation,
  logoutFn: () => Promise<*>,
  match: Match,
  refreshCorporateInfoFn: () => void,
  resetNavMenusFn: () => void,
  retrieveFeatureTogglesFn: () => Promise<*>,
  routeChangedFn: (HistoryLocation, string) => void,
  UI_ENCRYPTION: boolean
};

const { USER_CAN_CHANGE_TOGGLES } = appConfig;

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      appReady: false,
      appRef: React.createRef(),
      isLoggedIn: AccountInfoHelper.isLoggedIn()
    };

    props.retrieveFeatureTogglesFn().then(props.loadInitialDataFn);
  }

  componentDidMount() {
    const {
      history: { action },
      location,
      routeChangedFn
    } = this.props;

    routeChangedFn(location, action);
    addUniversalErrorListener();
    this._restoreOrGenerateUUID();
    initializeChatBot();
    this._getAccountInfo();
    this._refreshCorporateInfo();
  }

  UNSAFE_componentWillReceiveProps(nextProps: AppProps) {
    if (this.props.location !== nextProps.location) {
      this.props.routeChangedFn(nextProps.location, nextProps.history.action);
    }
  }

  _getAccountInfo = () => {
    const { getAccountInfoFn, isAccountInfoFetched, location } = this.props;

    if (this.state.isLoggedIn || hasActiveSessionCookies()) {
      const isFromPaypal = verifyFromPaypal(location.pathname);
      const accountInfoExpiration = _.get(AccountInfoHelper.getAccountInfo(), 'expirationDate');
      const shouldGetAccountInfo =
        !isAccountInfoFetched && !isFromPaypal && (!isHybridEnabled() || dayjs().isAfter(accountInfoExpiration));

      shouldGetAccountInfo && getAccountInfoFn();
    }
  };

  _refreshCorporateInfo = () => {
    const { location, refreshCorporateInfoFn } = this.props;

    if (this.state.isLoggedIn) {
      const isFromPaypal = verifyFromPaypal(location.pathname);

      !isFromPaypal && refreshCorporateInfoFn();
    }
  };

  _restoreOrGenerateUUID = () => {
    const savedExperienceId = experienceIdHelper.loadSavedExperienceId();

    if (savedExperienceId) {
      UUIDRepo.restoreUUID(savedExperienceId);
    } else {
      UUIDRepo.generateUUID();
      experienceIdHelper.saveExperienceIdToSessionStore(UUIDRepo.getUUID());
    }
  };

  _getAppViewSize = () => {
    const globalHeaderDom = document.getElementById('appGlobalHeader');
    const appDom = document.getElementById('app');

    return {
      globalHeaderHeight: globalHeaderDom ? globalHeaderDom.clientHeight : 0,
      appScrollTop: appDom ? appDom.scrollTop : 0
    };
  };

  _onNavClick = (item: MenuListItemType) => {
    const { link, linkType, routeName, isWcmLink, params, query } = item;
    const target = routeName || link;
    const targetWithParamAndQuery = buildPathWithParamAndQuery(target, params, query);

    if (isWcmLink) {
      wcmTransitionTo({ linkType, target: targetWithParamAndQuery });
    } else {
      routeName ? this.props.history.push(targetWithParamAndQuery) : window.open(link);
    }
  };

  _onLoginButtonClick = ({ transitionToSimpleLoginForm }: { transitionToSimpleLoginForm: boolean }) => {
    const previousPage = this.props.location.pathname;
    const enrollPages = [...Object.values(enrollRoutes), ...Object.values(enrollOldRoutes)];
    const loginPath = '/login?clk=GNAVLOGIN';
    // eslint-disable-next-line
    const { ...query } = transformSearchToQuery(this.props.location.search);

    if (transitionToSimpleLoginForm) {
      this.props.history.push(
        buildPathWithParamAndQuery(loginPath, null, {
          simpleLogin: true,
          to: previousPage,
          params: this.props.match.params,
          query
        })
      );
    } else {
      this.props.history.push(
        buildPathWithParamAndQuery(loginPath, null, {
          to: _.includes(enrollPages, previousPage) ? '/' : previousPage,
          params: this.props.match.params,
          query
        })
      );
    }
  };

  _onLogoutClick = (clkCode: string) => {
    const { logoutFn, addHistoryBackToHomeFn } = this.props;

    logoutFn().then(() => {
      addHistoryBackToHomeFn(true);
      this.props.history.push(clkCode);
    });
  };

  _renderCustomFonts = () => (
    <>
      <div aria-hidden="true" className="fairwater-script hidden-font">
        &nbsp;
      </div>
      <div aria-hidden="true" className="southwest-sans hidden-font">
        &nbsp;
      </div>
      <div aria-hidden="true" className="southwest-sans bold hidden-font">
        &nbsp;
      </div>
    </>
  );

  _renderEncryptionProviderWithChildren = () => (
    <EncryptionProvider
      apiKey={environment.api}
      channelId={channelId}
      jwtSettings={jwtSettings}
      logger={encryptionProviderLoggerAdapter}
      schemas={getEncryptionSchema()}
    >
      {this._renderChildren()}
    </EncryptionProvider>
  );

  _renderChildren = () => {
    const { appReady, children } = this.props;

    return appReady ? children : null;
  };

  render() {
    const { history, isJourneyBannerDisplayed, UI_ENCRYPTION } = this.props;
    const { appRef } = this.state;
    const appOffsetTop = appRef.current && isJourneyBannerDisplayed ? appRef.current.offsetTop : 0;
    const ErrorFallback = (errorProps) => <ErrorPage {...errorProps} />;
    const logoClkCode = '/?clk=GNAVLOGO';
    const headerClkCode = '/?clk=GNAVLOGOUT2';
    const navClkCode = '/?clk=GNAVLOGOUT';

    return (
      <div className="app" ref={appRef} id="app" style={{ height: `calc(100% - ${appOffsetTop}px)` }}>
        <Dialog />
        <ReLoginModal />
        <div className="app__contents" id="appContents">
          <GlobalHeader
            ref="globalHeader"
            id="appGlobalHeader"
            onLogoClick={() => history.push(logoClkCode)}
            onLoginClick={this._onLoginButtonClick}
            onLogoutClick={() => this._onLogoutClick(headerClkCode)}
          />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {!isHybridEnabled() && UI_ENCRYPTION ? this._renderEncryptionProviderWithChildren() : this._renderChildren()}
          </ErrorBoundary>
          { USER_CAN_CHANGE_TOGGLES && <SimulateHybridModal /> }
          { USER_CAN_CHANGE_TOGGLES && <SimulateHybridButton /> }
        </div>
        <Drawer
          appOffsetTop={appOffsetTop}
          appSizeGetter={this._getAppViewSize}
          isJourneyBannerDisplayed={isJourneyBannerDisplayed}
        >
          <NavContainer
            onLoginClick={this._onNavClick}
            onLogoutClick={() => this._onLogoutClick(navClkCode)}
            onNavClick={this._onNavClick}
          />
        </Drawer>
        <Spinner />
        {this._renderCustomFonts()}
      </div>
    );
  }
}

const enhancers = _.flowRight(
  withRouter,
  withScrollToTop,
  withFeatureToggles,
  withWebView,
  connect(
    (state) => ({
      appReady: state.app.appReady,
      isAccountInfoFetched: _.get(state, 'app.account.isAccountInfoFetched'),
      isJourneyBannerDisplayed: _.get(state, 'app.isJourneyBannerDisplayed', false),
      UI_ENCRYPTION: _.get(state, 'app.toggles.UI_ENCRYPTION', false)
    }),
    {
      addHistoryBackToHomeFn: addHistoryBackToHome,
      getAccountInfoFn: getAccountInfo,
      loadInitialDataFn: loadInitialData,
      logoutFn: logout,
      refreshCorporateInfoFn: refreshCorporateInfo,
      resetNavMenusFn: resetNavMenus,
      retrieveFeatureTogglesFn: retrieveFeatureToggles,
      routeChangedFn: routeChanged
    }
  )
);

export default enhancers(App);
