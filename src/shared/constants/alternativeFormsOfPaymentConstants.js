import { FIELD_ERROR_MESSAGE } from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';

export const EXTERNAL_PAYMENT_PAGE_URL = '/payment/external';

export const PAYMENT_METHODS = {
  APPLE_PAY: 'ApplePay',
  UPLIFT: 'PayMonthly'
};

export const INITIAL_AVAILABILITY = {
  paymentMethod: '',
  isAvailable: false,
  isActive: false,
  hasError: false,
  lastUpdateFailed: false,
  parameters: {},
  shouldDisplay: false
};

export const INITIAL_TRIP_INFO = {
  air_reservations: [{}],
  travelers: [{}]
};

export const validationTransformer = {
  firstName: {
    ceptorParam: 'givenName',
    requiredErrorMessage: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_VALID')
  },
  lastName: {
    ceptorParam: 'familyName',
    requiredErrorMessage: i18n('SHARED__ERROR_MESSAGES__PASSENGER_LAST_NAME_VALID')
  },
  addressLine1: {
    ceptorParam: 'addressLines',
    requiredErrorMessage: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_1_LENGTH')
  },
  addressLine2: {
    ceptorParam: 'addressLines'
  },
  city: {
    ceptorParam: 'locality',
    requiredErrorMessage: i18n('SHARED__ERROR_MESSAGES__CITY')
  },
  stateProvinceRegion: {
    ceptorParam: 'administrativeArea',
    requiredErrorMessage: i18n('SHARED__ERROR_MESSAGES__STATE_PROVINCE_REGION')
  },
  zipOrPostalCode: {
    ceptorParam: 'postalCode',
    requiredErrorMessage: i18n('SHARED__ERROR_MESSAGES__ZIP_POSTAL_CODE')
  },
  isoCountryCode: {
    ceptorParam: 'countryCode'
  }
};

export const invalidUsStateError = {
  stateProvinceRegion: {
    msg: i18n('SHARED__ERROR_MESSAGES__STATE_PROVINCE_REGION'),
    type: FIELD_ERROR_MESSAGE
  }
};

export const APPLICATION_TYPES = {
  AIR_BOOKING: 'air/booking',
  AIR_CHANGE: 'air/change',
  AIR_UPGRADE: 'air/upgrade',
  COMPANION: 'companion',
  EARLYBIRD: 'earlybird',
  SAME_DAY: 'same-day',
  UPGRADED_BOARDING: 'upgraded-boarding'
};

export const APPLICATION_TYPES_UPLIFT = {
  'air/booking': 'air-booking',
  'air/change': 'air-change',
  'air/upgrade': 'air/upgrade',
  companion: 'companion',
  earlybird: 'earlybird',
  'same-day': 'same-day',
  'upgraded-boarding': 'upgraded-boarding'
};

export const PRICE_TYPES = {
  UP_TRIP_TOTAL: 'up-trip-total',
  UP_EARLY_BIRD_CHECK_IN: 'up-early-bird-check-in'
};

export const DEFAULT_ERROR_AFP_CODES_TO_DISPLAY = ['811', '813'];
export const DEFAULT_UPLIFT_TIME_TO_TRAVEL_HOURS_LIMIT = 24;
export const DEFAULT_UPLIFT_PAX_AGE_LIMIT = 18;
