export default {
  APP_FLOWS: {
    AIR_BOOKING: 'air/booking',
    AIR_CANCEL: 'air/cancel',
    AIR_CHANGE: 'air/change',
    AIR_REACCOM: 'air/reaccom',
    AIR_UPGRADE: 'air/upgrade',
    CAR_BOOKING: 'car/booking',
    CAR_CANCEL: 'car/cancel',
    CHECK_IN: 'check-in',
    COMPANION: 'companion',
    EARLYBIRD: 'earlybird',
    ENROLL: 'enroll',
    FLIGHT_STATUS: 'flight-status',
    LOW_FARE_CALENDAR: 'air/low-fare-calendar',
    MY_ACCOUNT: 'account',
    SAME_DAY: 'same-day',
    STANDBY: 'standby',
    TRAVEL_FUNDS: 'travel-funds',
    UPGRADED_BOARDING: 'upgraded-boarding',
    VIEW_RESERVATION: 'reservation'
  },
  OAUTH: {
    CHANNEL_ID: 'MWEB',
    CHANNEL_ID_CORPORATE: 'MWEB_CORP',
    CONTENT_TYPE: 'application/x-www-form-urlencoded',
    GRANT_TYPE: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    RESPONSE_TYPE: 'id_token swa_token',
    SCOPE: 'openid'
  },
  minorAcknowledge:
    'I acknowledge that this enrollment is for a Customer who is under 13 years old. I also acknowledge that I am the parent or legal guardian of this child and consent to their participation in the Rapid Rewards® program and / or to receive promotional e - mails.',
  minorAgeThreshold: 13,
  rulesAcknowledge:
    'I acknowledge I have read and accept the <a href="https://www.southwest.com/html/customer-service/faqs.html?topic=rapid_rewards_program_terms_and_conditions">Rules and Regulations.</a>',
  ANALYTICS_STORES_PATH: 'data_a.stores',
  EXTERNAL_TARGETS: {
    CHASE: 'CHASE',
    EXTERNAL_PAYMENT: 'EXTERNAL_PAYMENT'
  },
  DATA_CHANNEL: 'mobile',
  cancelMessage:
    'Important note for those cancelling a Wanna Get Away Fare within 24 hours of booking -- If you are cancelling a portion of your trip, you could get a refund now by calling 1-800-435-9792. If you prefer to handle the transaction online (instead of by phone), you will receive travel funds that can be used towards future travel instead of a refund. If you cancel your entire trip within 24 hours of booking (regardless of fare), you will get a refund whether you cancel by phone or online.',
  apiErrorLogUrl: 'v1/logging/mobile/log',
  apiInfoLogUrl: 'v1/logging/mobile/log',
  ON_FILE: 'On File',
  airportListPhoneInfo: 'tel:1-800-435-9792'
};
