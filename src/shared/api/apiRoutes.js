import conf from 'src/shared/config/appConfig';

const baseUrl = '/';

const apiRoutes = {
  api: conf.API_KEY || baseUrl,
  luv: conf.LUV_API || baseUrl,
  car: conf.CAR_API || baseUrl,
  chapiMisc: conf.CHAPI_MISC || baseUrl,
  chapiAirOperations: conf.CHAPI_AIR_OPERATIONS || baseUrl,
  chapiAirBooking: conf.CHAPI_AIR_BOOKING || baseUrl,
  chapiAirShopping: conf.CHAPI_AIR_SHOPPING || baseUrl,
  content: conf.CONTENT_API || baseUrl,
  securityApi: conf.SECURITY_API || baseUrl,
  logging: conf.LOGGING_API || baseUrl,
  oAuthClientIdCookie: conf.OAUTH_CLIENT_ID_COOKIE || baseUrl,
  oAuthClientIdCorporate: conf.OAUTH_CLIENT_ID_CORPORATE || baseUrl,
  oAuthClientIdCorporateCookie: conf.OAUTH_CLIENT_ID_CORPORATE_COOKIE || baseUrl,
  apiUrl: conf.REMOTE_SERVICE_URL || baseUrl,
  apiGatewayChaseApi: conf.API_GATEWAY_CHASE_API || baseUrl,
  payPalWebviewCancelUrl: conf.PAYPAL_WEBVIEW_CANCEL_URL || baseUrl,
  payPalWebviewReturnUrl: conf.PAYPAL_WEBVIEW_RETURN_URL || baseUrl,
  swaVacationsUrl: conf.SWA_VACATIONS_URL,
  appEnv: conf.APP_ENV || '',
  ceptorSite: conf.CEPTOR_SITE || '',
  ceptorEnv: conf.CEPTOR_ENV || ''
};

export default apiRoutes;
