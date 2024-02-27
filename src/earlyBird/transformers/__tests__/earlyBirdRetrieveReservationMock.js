export default {
  inValidReservation: {
    readyState: 4,
    responseJSON: {
      code: 404599104,
      message: "Hmm, we can't find this reservation. Please double-check your information",
      httpStatusCode: 'NOT_FOUND',
      requestId: 'WtVKmGWoQPGdoEr2_xqgQw-API'
    },
    status: 404,
    statusText: 'Not Found'
  },
  inValidReservationWithoutMessage: {
    readyState: 4,
    responseJSON: {
      code: 404599104,
      message: '',
      httpStatusCode: 'NOT_FOUND',
      requestId: 'WtVKmGWoQPGdoEr2_xqgQw-API'
    },
    status: 404,
    statusText: 'Not Found'
  },
  flightInProgress: {
    readyState: 4,
    responseJSON: {
      code: 400599140,
      message: 'Sorry, this flight is in progress.',
      httpStatusCode: 'BAD_REQUEST',
      requestId: 'WtVKmGWoQPGdoEr2_xqgQw-API'
    },
    status: 404,
    statusText: 'Not Found'
  },
  flightInProgressWithoutMessage: {
    readyState: 4,
    responseJSON: {
      code: 400599140,
      message: '',
      httpStatusCode: 'BAD_REQUEST',
      requestId: 'WtVKmGWoQPGdoEr2_xqgQw-API'
    },
    status: 404,
    statusText: 'Not Found'
  },
  flightInPast: {
    readyState: 4,
    responseJSON: {
      code: 400500107,
      message: 'Flight is in the past',
      httpStatusCode: 'BAD_REQUEST',
      requestId: 'WtVKmGWoQPGdoEr2_xqgQw-API'
    },
    status: 404,
    statusText: 'Not Found'
  },
  flightInPastWithoutMessage: {
    readyState: 4,
    responseJSON: {
      code: 400500107,
      message: '',
      httpStatusCode: 'BAD_REQUEST',
      requestId: 'WtVKmGWoQPGdoEr2_xqgQw-API'
    },
    status: 404,
    statusText: 'Not Found'
  },
  flightIsInternational: {
    readyState: 4,
    responseJSON: {
      code: 400500276,
      message:
        "We're Sorry... You can only add EarlyBird Check-In® to an existing international flight itinerary online at Southwest.com. Please visit our full site to add EarlyBird Check-In® to your international itinerary.",
      httpStatusCode: 'BAD_REQUEST',
      requestId: 'YzmRYm-tSeGCOJ2dnFDTlQ-API'
    },
    status: 404,
    statusText: 'Not Found'
  },
  flightIsInternationalWithoutMessage: {
    readyState: 4,
    responseJSON: {
      code: 400500276,
      message: '',
      httpStatusCode: 'BAD_REQUEST',
      requestId: 'YzmRYm-tSeGCOJ2dnFDTlQ-API'
    },
    status: 404,
    statusText: 'Not Found'
  },
  flightWithoutEarlyBirdEligibilities: {
    recordLocator: 'HK5L3G',
    passengers: [
      {
        secureFlightName: {},
        birthDate: '2014-01-01',
        gender: 'M',
        accountNumber: '',
        redressNumber: '',
        knownTravelerId: '',
        tier: 'NON_ELITE',
        loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
        earlyBirdEligibilities: [
          {
            earlyBirdProductId: null,
            status: 'BUSINESS_SELECT',
            priceCents: 0,
            originationDestinationId: '201512300550-0600,201512300650-0600|AUS-DAL|WN147'
          }
        ]
      }
    ],
    itinerary: {
      originationDestinations: [
        {
          segments: [],
          durationMinutes: 60,
          originationDestinationId: '201512300550-0600,201512300650-0600|AUS-DAL|WN147',
          checkinDocumentReason: null,
          checkinDocumentType: null,
          fareType: 'Business Select',
          _links: {
            deleteBoardingPass: null
          }
        }
      ]
    },
    receiptEmail: 'A@BC.COM',
    currencyType: 'Dollars',
    international: false,
    warnings: [],
    unaccompaniedMinor: false
  },
  flightWithAllEarlyBirdEligibilitiesAlreadyPurchased: {
    recordLocator: 'HK5L3G',
    passengers: [
      {
        secureFlightName: {},
        birthDate: '2014-01-01',
        gender: 'M',
        accountNumber: '',
        redressNumber: '',
        knownTravelerId: '',
        tier: 'NON_ELITE',
        loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
        earlyBirdEligibilities: [
          {
            earlyBirdProductId: null,
            status: 'PURCHASED',
            priceCents: 0,
            originationDestinationId: '201512300550-0600,201512300650-0600|AUS-DAL|WN147'
          }
        ]
      }
    ],
    itinerary: {
      originationDestinations: [
        {
          segments: [],
          durationMinutes: 60,
          originationDestinationId: '201512300550-0600,201512300650-0600|AUS-DAL|WN147',
          checkinDocumentReason: null,
          checkinDocumentType: null,
          fareType: 'Business Select',
          _links: {
            deleteBoardingPass: null
          }
        }
      ]
    },
    receiptEmail: 'A@BC.COM',
    currencyType: 'Dollars',
    international: false,
    warnings: [],
    unaccompaniedMinor: false
  },
  flightWithSomeEarlyBirdEligibilitiesAlreadyPurchased: {
    recordLocator: 'HK5L3G',
    passengers: [
      {
        secureFlightName: {},
        birthDate: '2014-01-01',
        gender: 'M',
        accountNumber: '',
        redressNumber: '',
        knownTravelerId: '',
        tier: 'NON_ELITE',
        loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
        earlyBirdEligibilities: [
          {
            earlyBirdProductId: null,
            status: 'PURCHASED',
            priceCents: 0,
            originationDestinationId: '201512300550-0600,201512300650-0600|AUS-DAL|WN147'
          }
        ]
      },
      {
        secureFlightName: {},
        birthDate: '2014-01-01',
        gender: 'M',
        accountNumber: '',
        redressNumber: '',
        knownTravelerId: '',
        tier: 'NON_ELITE',
        loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
        earlyBirdEligibilities: [
          {
            earlyBirdProductId: null,
            status: 'ELIGIBLE',
            priceCents: 0,
            originationDestinationId: '201512300550-0600,201512300650-0600|AUS-DAL|WN147'
          }
        ]
      }
    ],
    itinerary: {
      originationDestinations: [
        {
          segments: [],
          durationMinutes: 60,
          originationDestinationId: '201512300550-0600,201512300650-0600|AUS-DAL|WN147',
          checkinDocumentReason: null,
          checkinDocumentType: null,
          fareType: 'Business Select',
          _links: {
            deleteBoardingPass: null
          }
        }
      ]
    },
    receiptEmail: 'A@BC.COM',
    currencyType: 'Dollars',
    international: false,
    warnings: [],
    unaccompaniedMinor: false
  },
  flightWithEarlyBirdEligibilities: {
    recordLocator: 'HK5L3G',
    passengers: [
      {
        secureFlightName: {},
        birthDate: '2014-01-01',
        gender: 'M',
        accountNumber: '',
        redressNumber: '',
        knownTravelerId: '',
        tier: 'NON_ELITE',
        loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
        earlyBirdEligibilities: [
          {
            earlyBirdProductId: null,
            status: 'ELIGIBLE',
            priceCents: 0,
            originationDestinationId: '201512300550-0600,201512300650-0600|AUS-DAL|WN147'
          }
        ]
      }
    ],
    itinerary: {
      originationDestinations: [
        {
          segments: [],
          durationMinutes: 60,
          originationDestinationId: '201512300550-0600,201512300650-0600|AUS-DAL|WN147',
          checkinDocumentReason: null,
          checkinDocumentType: null,
          fareType: 'Business Select',
          _links: {
            deleteBoardingPass: null
          }
        }
      ]
    },
    receiptEmail: 'A@BC.COM',
    currencyType: 'Dollars',
    international: false,
    warnings: [],
    unaccompaniedMinor: false
  }
};
