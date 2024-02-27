module.exports = {
  recordLocator: 'CHFONE',
  passengers: [
    {
      secureFlightName: {
        firstName: 'AMBER',
        lastName: 'AWESOME',
        middleName: '',
        suffix: ''
      },
      birthDate: '1940-04-28',
      gender: 'F',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      tier: 'NON_ELITE',
      loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
      checkinEligiblities: [{}],
      earlyBirdEligibilities: [
        {
          earlyBirdProductId: 'REFMfDIwMTYtMDItMDF8MzQxfEFNQkVSfHxBV0VTT01FfHwxMjUw',
          status: 'ELIGIBLE',
          priceCents: 1250,
          originationDestinationId: '201602010600-0600,201602010815-0600|DAL-MDW|WN341'
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-05-01T06:00:00.000-06:00',
            arrivalDateTime: '2016-05-01T08:15:00.000-06:00',
            originationAirportCode: 'DAL',
            destinationAirportCode: 'MDW',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '341'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '341'
            },
            legs: [
              {
                originationAirportCode: 'DAL',
                destinationAirportCode: 'MDW'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 135,
        originationDestinationId: '201602010600-0600,201602010815-0600|DAL-MDW|WN341',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Wanna Get Away',
        _links: {
          deleteBoardingPass: null
        }
      }
    ]
  },
  receiptEmail: 'TEST@TEST.COM',
  currencyType: 'Dollars',
  international: false,
  warnings: [],
  unaccompaniedMinor: false,
  _links: {
    retrieveForCancel: {
      href: '/v1/mobile/reservations/record-locator/CHFONE?first-name=a&last-name=awesome&action=CANCEL',
      method: 'GET'
    },
    retrieveForChange: {
      href: '/v1/mobile/reservations/record-locator/CHFONE?first-name=a&last-name=awesome&action=CHANGE',
      method: 'GET'
    },
    retrieveForBuyEarlyBird: {
      href: '/v1/mobile/reservations/record-locator/CHFONE?first-name=a&last-name=awesome&action=EARLYBIRD',
      method: 'GET'
    },
    companionReservations: null
  }
};
