export const ROUTES = {
  BLANK: '/blank',
  CONTACT_TRACING: '/contact-tracing',
  FLIGHT_STATUS: '/flight-status',
  CAR_BOOKING: '/car/booking',
  AIR_BOOKING: '/air/booking/shopping/adult/outbound/results',
  AIR_BOOKING_APPLY_RAPID_REWARDS: '/air/booking/apply-rapid-rewards',
  AIR_BOOKING_LEGACY: '/air/booking/shopping',
  LOOKUP_TRAVEL_FUNDS: '/travel-funds/look-up',
  OFFERS: '/home/offers',
  UPGRADED_BOARDING: '/upgraded-boarding',
  UPGRADED_BOARDING_PAYMENT: '/upgraded-boarding/payment',
  UPGRADED_BOARDING_PURCHASE: '/upgraded-boarding/purchase',
  UPGRADED_BOARDING_CONFIRMATION: '/upgraded-boarding/confirmation',
  AIR_UPGRADE: '/air/upgrade',
  AIR_UPGRADE_SELECT_BOUNDS: '/air/upgrade/select-bounds',
  MY_ACCOUNT_PROMO_CODES: '/my-account/promo-codes'
};
export const NORMALIZED_ROUTES = {
  AIR_BOOKING_FLIGHT_SHOPPING: '/air/booking/adult/outbound/results',
  AIR_BOOKING_INDEX: '/air/booking'
};
export const NATIVE_FUNCTIONS = {
  EXIT: 'exit',
  PAGE_RENDERED: 'pageRendered',
  DISPLAY_LOGIN: 'displayLogin',
  UPDATE_FLIGHT_STATUS_SEARCHES: 'updateFlightStatusSearches',
  ENABLE_NAVIGATION_CONTROLS: 'enableNavigationControls',
  DISPLAY_APP_REVIEW: 'displayAppReview',
  LOGOUT: 'logout',
  SHARE_FLIGHT_STATUS_DETAILS: 'shareFlightStatusDetails',
  DISPLAY_APPLE_PAY: 'displayApplePay',
  CHASE_PROMO_CLICKED: 'handleChasePromoClicked',
  SAVE_CHASE_OFFERS: 'saveChaseOffers'
};
export const AUTH_EVENTS = {
  USER_CANCEL: 'USER_CANCEL'
};
export const LOGIN_TYPES = {
  NORMAL: 'normal',
  POINTS: 'points',
  PURCHASE: 'purchase',
  TRANSFER_TRAVEL_FUNDS: 'transferTravelFunds'
};
export const LOGIN_STATES = {
  PENDING: 'PENDING',
  NATIVE_LOG_IN: 'NATIVE_LOG_IN',
  NATIVE_LOG_OUT: 'NATIVE_LOG_OUT'
};
export const QUERY_PARAMS = {
  API_KEY: 'apiKey',
  CHANNEL: 'channel',
  CORPORATE_CHANNEL: 'corporateChannel',
  DEVICE_TYPE: 'deviceType',
  WEB_VIEW: 'webView',
  SHARE_FLIGHT_STATUS: 'shareFlightStatus',
  ADOBE_ID: 'adobe_mc',
  EXPERIENCE_ID: 'experienceId',
  APP_VERSION: 'appVersion',
  UPGRADE_TYPE: 'upgradeType'
};
export const COOKIES = {
  ADOBE_ID: 'adobe_mc',
  SHOW_LOGIN_BANNER: 'show_login_banner'
};
export const COOKIE_DURATION_DAYS = {
  LOGIN_BANNER: 14
};
export const TIME_OUTS = {
  HOT_STATE: 30,
  NATIVE_SESSION: 10080
};
export const REFERRERS = {
  PRICE: 'price',
  PURCHASE: 'purchase'
};
export const CHANNEL = {
  ANDROID: 'ANDROID',
  IOS: 'IOS'
};
export const appId = 'mobile-web';
