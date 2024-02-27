module.exports = {
  recordLocator: 'CHFRPR',
  passengers: [
    {
      secureFlightName: {
        firstName: 'XN',
        lastName: 'LIU',
        middleName: '',
        suffix: ''
      },
      birthDate: '1948-01-03',
      gender: 'M',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      tier: 'NON_ELITE',
      loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
      checkinEligibilities: [{}, {}],
      earlyBirdEligibilities: [
        {
          earlyBirdProductId: 'TEFTfDIwMTYtMDUtMjZ8MzkwMHxYTnx8TElVfHwxNTAw',
          status: 'ELIGIBLE',
          priceCents: 1500,
          originationDestinationId: '201605260530-0700,201605260635-0700|LAS-LAX|WN3900'
        },
        {
          earlyBirdProductId: 'TEFYfDIwMTYtMDUtMjd8MzcwNHxYTnx8TElVfHwxNTAw',
          status: 'ELIGIBLE',
          priceCents: 1500,
          originationDestinationId: '201605270720-0700,201605270825-0700|LAX-LAS|WN3704'
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-05-26T05:30:00.000-07:00',
            arrivalDateTime: '2016-05-26T06:35:00.000-07:00',
            originationAirportCode: 'LAS',
            destinationAirportCode: 'LAX',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3900'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3900'
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
        durationMinutes: 65,
        originationDestinationId: '201605260530-0700,201605260635-0700|LAS-LAX|WN3900',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Wanna Get Away',
        _links: {
          deleteBoardingPass: null
        }
      },
      {
        segments: [
          {
            departureDateTime: '2016-05-27T07:20:00.000-07:00',
            arrivalDateTime: '2016-05-27T08:25:00.000-07:00',
            originationAirportCode: 'LAX',
            destinationAirportCode: 'LAS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3704'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3704'
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
        originationDestinationId: '201605270720-0700,201605270825-0700|LAX-LAS|WN3704',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Anytime',
        _links: {
          deleteBoardingPass: null
        }
      }
    ]
  },
  receiptEmail: 'SDF@SFESF.COM',
  currencyType: 'Dollars',
  international: false,
  warnings: [],
  unaccompaniedMinor: false,
  _links: {
    retrieveForCancel: {
      href: '/v1/mobile/reservations/record-locator/CHFRPR?first-name=x&last-name=liu&action=CANCEL',
      method: 'GET'
    },
    retrieveForChange: {
      href: '/v1/mobile/reservations/record-locator/CHFRPR?first-name=x&last-name=liu&action=CHANGE',
      method: 'GET'
    },
    retrieveForBuyEarlyBird: {
      href: '/v1/mobile/reservations/record-locator/CHFRPR?first-name=x&last-name=liu&action=EARLYBIRD',
      method: 'GET'
    },
    companionReservations: null
  }
};
