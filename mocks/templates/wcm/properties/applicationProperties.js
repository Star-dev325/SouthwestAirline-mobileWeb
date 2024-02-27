module.exports = ({ mockServerDomain, payPalMockServerPort, applePayMockServerPort }) => ({
  applicationProperties: {
    iosUpgradeURL: 'https://itunes.apple.com/us/app/southwest-airlines/id344542975?mt=8',
    androidUpgradeURL: 'https://play.google.com/store/apps/details?id=com.southwestairlines.mobile',
    forceMinimumSupportedVersion: {
      iOS: '4.4.0',
      Android: '4.5.1',
      upgradeText: "We've retired this version to the hangar. Update your app to continue.",
      iosUpgradeText:
        "We've retired this version to the hangar. Please update your app by visiting the app store or by visiting southwest.com/ios",
      androidUpgradeText:
        "We've retired this version to the hangar. Please update your app by visiting the google play store or by visiting southwest.com/android"
    },
    suggestMinimumSupportedVersion: {
      iOS: '4.4.0',
      Android: '4.4.0',
      upgradeNoticeFreqDays: 5,
      iosUpgradeText:
        "Don't get left behind! Update to the latest version of the app to enjoy new updates and features.",
      androidUpgradeText:
        "Don't get left behind! Update to the latest version of the app to enjoy new updates and features."
    }
  },
  hazmatDisclaimer: {
    hazmatText:
      'Federal law forbids the carriage of hazardous materials such as aerosols, fireworks, lithium batteries and flammable liquids aboard the aircraft in your checked or carryon baggage. E-cigarettes are not permitted in checked baggage and must be transported in carryon baggage only.',
    hazmatCheckInDisclaimer:
      "By tapping 'Check in' you acknowledge that you understand the hazardous materials restrictions and penalties.",
    hazmatPurchaseDisclaimer: "By tapping 'Purchase', you accept the below conditions",
    hazmatChangeDisclaimer: "By tapping 'Make these changes', you accept the below conditions"
  },
  awardFeeSecurityDisclaimer: {
    feeDisclaimerText:
      'Award travel is subject to payment of the government-imposed September 11th Security fee, up to $5.60 one-way, $11.20 roundtrip.'
  },
  copyright: {
    copyrightText: '©2017 Southwest Airlines Co.',
    copyrightDisclaimer: 'All Rights Reserved.'
  },
  earlyBird: {
    aListPreferred:
      '*A-list passengers will be automatically checked in before our EarlyBird Check-In® Customers at no additional cost.',
    businessSelect: '*Business Select Customers will be automatically checked in to get a better boarding position.',
    timeToFlight: '*Flights booked within 36 hours of scheduled departure time are not eligible'
  },
  coppa: {
    acknowledge: {
      rulesAcknowledge:
        'I acknowledge I have read and accept the <a href="https://www.southwest.com/html/customer-service/faqs.html?topic=rapid_rewards_program_terms_and_conditions">Rules and Regulations.</a> ',
      minorAcknowledge:
        'I acknowledge that this enrollment is for a Customer who is under 13 years old. I also acknowledge that I am the parent or legal guardian of this child and consent to their participation in the Rapid Rewards® program and / or to receive promotional e - mails.'
    },
    rrEnrollment: {
      ageRestrictionMessage:
        'I acknowledge that this enrollment is for a Customer who is under 13 years old. I also acknowledge that I am the parent or legal guardian of this child and consent to their participation in the Rapid Rewards® program and / or to receive promotional e - mails.',
      minAgeThreshold: 13
    }
  },
  soda: {
    sodaTitle: 'You may change your travel date/time at no additional cost',
    sodaText:
      'Circumstances beyond our control (weather, etc.) are creating disruptions to our scheduled service and a flights(s) on which you are currently booked may be adversely affected. To minimize your inconvenience, we are offering the one time opportunity to change your flight date(s) and/or time(s) at no additional cost in accordance with our established reaccommodation practices.'
  },
  clickNSaveSignUp: {
    iframeURL:
      'https://luv.southwest.com/pub/sf/ResponseForm?_ri_=X0Gzc2X%3DYQpglLjHJlTQGgFAzdADME0N4kd08Ptvkhn7PEjlccoJhVXMtX%3DYQpglLjHJlTQGoTkOzeXIiwJEvJS93zbuzd9cKhzc7zetJwq9&_ei_=EjZP8Xa6bNrfKahbbdpijfU'
  },
  CORPORATE_INFO_TIMEOUT_MIN: '30',
  HOT_STATE_TIMEOUT_MIN: '30',
  NATIVE_SESSION_TIME_OUT_MIN: '10080',
  HOTEL_MAX_DAYS_OUT: '330',
  CAR_BOOKING_MAX_DAYS_OUT: '330',
  EBE_RAPID_REWARDS_STATUS_MEMBER: 'A List Member',
  EBE_BUSINESS_SELECT: 'Business Select Customer',
  EBE_TIME_WINDOW_CLOSED: 'Outside the Time Window',
  EBE_STANDBY: 'Standby Customer',
  EBE_NON_REV: 'Non Rev Customer',
  EBE_ALREADY_PURCHASED: 'Already purchased',
  EBE_NOT_CONFIRMED_STATUS: 'Not Confirmed Status',
  EBE_UNACCOMPANIED_MINOR: 'Unaccompanied Minor',
  EBE_OTHER: 'Other',
  EBE_PNR_NOT_MARKETED_BY_WN: 'Not marketed by southwest',
  EBE_NOT_OPERATED_BY_WN: 'Not operated by southwest',
  EBE_UNKNOWN: 'Unknown',
  ENTERTAINMENT_PORTAL_URL: 'https://getconnected.southwestwifi.com/images/s-w-logo.png',
  PENDING_TIER_STATUS_STATE: false,
  PENDING_TIER_STATUS_TEXT:
    'Your tier status is pending due to an end of year processing. This does not affect your status, only the information displayed.',
  400618201: 'ERR_USERNAME_PASSWORD_INCORRECT',
  400618205: 'ERR_USERNAME_PASSWORD_INCORRECT',
  400518024: 'ERR_USERNAME_PASSWORD_INCORRECT',
  400518148: 'ERR_ACCOUNT_NUMBER_LONG',
  400618202: 'ERR_MAXIMUM_TRIES',
  400518329: 'ERR_PASSWORD_NOT_SET',
  400518002: 'ERR_ACCOUNT_DISABLED',
  401615399: 'ERR_SESSION_TIMEOUT',
  applePayErrorCodes: {
    "400310564": "ERR_GENDER_IS_MISSING",
    "400310588": "ERR_INVALID_STATE_CODE",
    "400310631": "ERR_INVALID_KTN_FORMAT ",
    "400310654": "ERR_BOUND_REFERENCE_TIMEOUT_IN_CHANGEFLOW_TRYING_TO_CONFIRM",
    "400310709": "ERR_ALL_PASSENGERS_ARE_CONSIDERED_YT",
    "400310710": "ERR_ALL_PASSENGERS_ARE_CONSIDERED_UM",
    "400310764": "ERR_ALL_PASSENGERS_ARE_UNDER_5YEARS_OLD",
    "400310793": "ERR_INVALID_CONTACT_PHONENUMBER_IS_PROVIDED",
    "400310830": "ERR_PAYMENT_SOLUTION_ERRORS"
  },
  HOTEL_BOOKING_MWEB_URL:
    'https://www.southwesthotels.com/index.html?label=SWA-MOBILE-MENUBOOK-MWEB&ref=MWEB&clk=MOBILEMENU',
  HOTEL_LOOKUP_MWEB_URL:
    'https://secure.southwesthotels.com/mybooking.html?label=SWA-MOBILE-MENUMNG-MWEB&ref=MWEB&clk=MOBILEMENU',
  HOTEL_BOOKING_ANDROID_URL:
    'https://www.southwesthotels.com/index.html?label=SWA-MOBILE-MENUBOOK-APPANDROID&ref=MOBLIEAND&clk=MOBILEMENU',
  HOTEL_LOOKUP_ANDROID_URL:
    'https://secure.southwesthotels.com/mybooking.html?label=SWA-MOBILE-MENUMNG-APPANDROID&ref=MOBLIEAND&clk=MOBILEMENU',
  HOTEL_BOOKING_IOS_URL:
    'https://www.southwesthotels.com/index.html?label=SWA-MOBILE-MENUBOOK-APPIOS&ref=MOBILEIOS&clk=MOBILEMENU',
  HOTEL_LOOKUP_IOS_URL:
    'https://secure.southwesthotels.com/mybooking.en-us.html?label=SWA-MOBILE-MENUMANAGE-APPIOS&ref=MOBILEIOS&clk=MOBILEMENU',
  GNAV_ARBAG_CHECKER: false,
  PAYPAL_URL: `http://${mockServerDomain}:${payPalMockServerPort}/webscr?cmd=_express-checkout&useraction=commit`,
  MWEB_ADOBE_TARGET_TIMEOUT_MS: 5000,
  paymentOptionOrdering: {
    android: ['PAYPAL', 'APPLE_PAY', 'GOOGLE_PAY', 'SAVED_CREDIT_CARD', 'CHASE_INSTANT_RR_VISA'],
    ios: ['PAYPAL', 'APPLE_PAY', 'GOOGLE_PAY', 'SAVED_CREDIT_CARD', 'CHASE_INSTANT_RR_VISA'],
    mweb: ['PAYPAL', 'APPLE_PAY', 'GOOGLE_PAY', 'SAVED_CREDIT_CARD', 'CHASE_INSTANT_RR_VISA']
  },
  ceptorConfig: {
    ceptorConfigParams: {
      uatpHostUrl: `http://${mockServerDomain}:${applePayMockServerPort}/ceptorJS`,
      uatpAirlineIdentifier: 'WN'
    },
    requestedAFPParams: {
      language: 'us',
      currency: 'USD',
      paymentMethodConfigParams: [
        {
          paymentMethod: 'ApplePay',
          provider: 'CPD',
          config: {
            clientId: 10083,
            hostUrl: 'https://uatp.uat-01.cellpointmobile.net',
            countryId: 200,
            accountId: 100830,
            transactionTypeId: 30,
            applePayCardTypeId: 15,
            platform: 'HTML5/1.00',
            version: '1.00'
          }
        }
      ]
    }
  }
});
