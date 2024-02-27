module.exports = {
  recordLocator: 'CHFRDU',
  owningReservationSystem: 'SAAS',
  passengers: [
    {
      secureFlightName: {
        firstName: 'AMBER',
        lastName: 'AWESOME',
        middleName: '',
        suffix: ''
      },
      birthDate: '1991-04-28',
      gender: 'F',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      tier: 'NON_ELITE',
      earlyBirdEligibilities: [
        {
          earlyBirdProductId: 'REFMfDIwMTYtMDItMTd8MjU5MXxBTUJFUnx8QVdFU09NRXx8MTI1MA==',
          status: 'ELIGIBLE',
          priceCents: 1250,
          originationDestinationId: '201602170750-0600,201602171005-0600|DAL-MDW|WN2591'
        },
        {
          earlyBirdProductId: 'TURXfDIwMTYtMDItMjB8NjM2fEFNQkVSfHxBV0VTT01FfHwxMjUw',
          status: 'ELIGIBLE',
          priceCents: 1250,
          originationDestinationId: '201602201620-0600,201602201840-0600|MDW-DAL|WN636'
        }
      ],
      loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER'
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-05-30T20:25:00.000-07:00',
            arrivalDateTime: '2016-05-30T21:25:00.000-07:00',
            originationAirportCode: 'LAS',
            destinationAirportCode: 'LAX',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2717'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2717'
            },
            legs: [
              {
                originationAirportCode: 'LAS',
                destinationAirportCode: 'LAX'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 60,
        originationDestinationId: '201605302025-0700,201605302125-0700|LAS-LAX|WN2717',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Anytime',
        _links: {
          deleteBoardingPass: null
        }
      },
      {
        segments: [
          {
            departureDateTime: '2016-05-31T12:20:00.000-07:00',
            arrivalDateTime: '2016-05-31T13:25:00.000-07:00',
            originationAirportCode: 'LAX',
            destinationAirportCode: 'LAS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2989'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2989'
            },
            legs: [
              {
                originationAirportCode: 'LAX',
                destinationAirportCode: 'LAS'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 65,
        originationDestinationId: '201605311220-0700,201605311325-0700|LAX-LAS|WN2989',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Anytime',
        _links: {
          deleteBoardingPass: null
        }
      }
    ]
  },
  currencyType: 'Dollars',
  receiptEmail: 'TEST@TEST.COM',
  international: false,
  unaccompaniedMinor: false
};
