// @flow
import { getErrorLogTimestamp, getLocationPathname } from 'src/shared/api/helpers/loggingHelper';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

const DEFAULT_REDIRECT_URL_WHITELIST = {
  AIR_BOOKING: getNormalizedRoute({ routeName: 'purchase' })
};

export const hasValidExternalPaymentRedirectUrl = (
  redirectUrl: string,
  redirectUrlWhitelist: * = DEFAULT_REDIRECT_URL_WHITELIST
) => Object.values(redirectUrlWhitelist).includes(redirectUrl);

export const toExternalPaymentPageError = (redirectUrl: string) => [
  {
    action: '',
    component: 'externalPaymentPage',
    count: 1,
    details: `invalid redirectUrl: ${redirectUrl}`,
    errorCode: null,
    httpCode: null,
    level: LOG_LEVEL.ERROR,
    location: getLocationPathname(),
    message: 'invalid redirectUrl',
    timestamp: getErrorLogTimestamp()
  }
];
