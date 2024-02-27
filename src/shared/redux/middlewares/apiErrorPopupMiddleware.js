import _ from 'lodash';
import { showErrorPopUp } from 'src/shared/actions/sharedActions';
import { showNativeAppLogin } from 'src/shared/actions/webViewActions';
import { isBlankPage } from 'src/shared/helpers/webViewHelper';
import { isAuthenticationError, isSessionTimeoutError } from 'src/shared/helpers/errorCodesHelper';
import { transformToHttpRequestError } from 'src/shared/transformers/httpErrorTransformer';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import AccessTokenExpiredError from 'src/shared/errors/accessTokenExpiredError';
import UserNotLoginError from 'src/shared/errors/userNotLoginError';
import { removeAccountInfo } from 'src/shared/helpers/accountInfoHelper';
import { cleanUpEndOfSession } from 'src/shared/actions/accountActions';
import i18n from '@swa-ui/locale';
import { getCurrentAppFlow } from 'src/shared/selectors/appSelector';
import SharedConstants from 'src/shared/constants/sharedConstants';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import { isPointsBooking } from 'src/shared/selectors/priceSelectors';

const { APP_FLOWS } = SharedConstants;

export default function apiErrorPopupMiddleware(store) {
  return (next) => (action) => {
    const { error, shouldHideError, shouldRedirectToHomePage } = action;

    const state = _.cloneDeep(store.getState());
    const persistentHistory = _.get(state, 'persistentHistory');
    const currentState = getCurrentRouteState(persistentHistory);
    const currentPath = _.get(currentState, 'pathname');
    const routeAction = _.get(currentState, 'action');

    const isSessionExpiredError = error instanceof AccessTokenExpiredError || error instanceof UserNotLoginError;
    const isWebView = _.get(state, 'app.webView.isWebView');
    const isAuthError = isAuthenticationError(transformToHttpRequestError(error));
    const isWebViewBackground = isWebView && isBlankPage(currentPath);
    const isSessionErrorOnReload =
      isSessionExpiredError && currentPath === '/' && (routeAction === 'POP' || routeAction === null);
    const selectedCompany = _.get(state, 'app.account.corporateInfo.selectedCompany');
    const isDialogOpen = _.get(state, 'app.dialog.active', false);
    const loginType = isPointsBooking(state) ? LOGIN_TYPES.POINTS : LOGIN_TYPES.PURCHASE;
    const loginOptions = getCurrentAppFlow(state) === APP_FLOWS.AIR_UPGRADE
      &&{ loginType, continueAsGuest: !isPointsBooking(state) };
    const redirectToHomePage = (shouldRedirectToHomePage && shouldRedirectToHomePage(state, error)) || isSessionTimeoutError(error);

    if (
      (error instanceof AccessTokenExpiredError && error.isCorporate) ||
      (error instanceof UserNotLoginError && selectedCompany)
    ) {
      error.message = i18n('ERROR__CORPORATE_SESSION_EXPIRED');
    }

    if (isWebView && isAuthError) {
      store.dispatch(showNativeAppLogin(loginOptions));
    } else if (isSessionErrorOnReload) {
      removeAccountInfo();
      store.dispatch(cleanUpEndOfSession());
    } else if (error && !shouldHideError && !_.get(error, '$customized') && !isWebViewBackground) {
      !isDialogOpen && store.dispatch(showErrorPopUp(error, redirectToHomePage));
    }

    return next(action);
  };
}
