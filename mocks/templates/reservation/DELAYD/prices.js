module.exports = {
  recordLocator: 'DELAYD',
  passengers: [
    {
      secureFlightName: {
        firstName: 'RON',
        lastName: 'JANUSZ',
        middleName: '',
        suffix: ''
      },
      birthDate: '1987-02-12',
      gender: 'M',
      accountNumber: '00021141157376',
      redressNumber: '',
      knownTravelerId: '',
      checkinEligibilities: [
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: 'A',
          boardingPosition: '16',
          segmentId: '201609012015-0500,201609012320-0500|MDW-LIT|WN168',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201609041730-0500,201609041840-0500|LIT-STL|WN3076',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201609042015-0500,201609042120-0500|STL-MDW|WN2866',
          _links: {
            checkin: null
          }
        }
      ],
      tier: 'NON_ELITE',
      loyaltyAccountType: 'RAPID_REWARDS_MEMBER',
      earlyBirdEligibilities: [
        {
          earlyBirdProductId: null,
          status: 'TIME_WINDOW_CLOSED',
          priceCents: 0,
          originationDestinationId: '201609012015-0500,201609012320-0500|MDW-LIT|WN168'
        },
        {
          earlyBirdProductId: 'TElUfDIwMTYtMDktMDR8MzA3NnxST058fEpBTlVTWnx8MTUwMA==',
          status: 'ELIGIBLE',
          priceCents: 1500,
          originationDestinationId: '201609041730-0500,201609042120-0500|LIT-STL,STL-MDW|WN3076,WN2866'
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-09-01T20:15:00.000-05:00',
            arrivalDateTime: '2016-09-01T23:20:00.000-05:00',
            originationAirportCode: 'MDW',
            destinationAirportCode: 'LIT',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '168'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '168'
            },
            legs: [
              {
                originationAirportCode: 'MDW',
                destinationAirportCode: 'STL'
              },
              {
                originationAirportCode: 'STL',
                destinationAirportCode: 'LIT'
              }
            ],
            wifiAvailable: true,
            segmentId: '201609012015-0500,201609012320-0500|MDW-LIT|WN168',
            flightStatus: {
              departureActualTime: '21:30:00.000',
              arrivalActualTime: '23:59:00.000',
              arrivalGate: null,
              departureGate: null,
              arrivalStatus: 'Delayed',
              departureStatus: 'Delayed',
              willAdviseArrival: false,
              willAdviseDeparture: false,
              wifiOnBoard: 'false',
              marketingFlightNumber: '168',
              destinationAirportCode: 'LIT',
              originationAirportCode: 'MDW',
              departureDate: '2016-09-01',
              marketingCarrierCode: 'WN',
              operatingCarrierCode: 'WN',
              operatingFlightNumber: '168',
              departureScheduledTime: '20:15:00.000',
              arrivalScheduledTime: '23:20:00.000',
              equipmentType: '73W'
            },
            stopCities: ['STL']
          }
        ],
        durationMinutes: 185,
        originationDestinationId: '201609012015-0500,201609012320-0500|MDW-LIT|WN168',
        checkinDocumentReason: 'withinCheckinTimeWindow',
        checkinDocumentType: 'boardingPass',
        fareType: 'Anytime',
        _links: {
          boardingPass: {
            href: '/v1/mobile/record-locator/DELAYD/mobile-boarding-passes',
            method: 'GET'
          }
        }
      }
    ]
  },
  receiptEmail: 'CHARITH.TANGIRALA@WNCO.COM',
  currencyType: 'Dollars',
  international: false,
  warnings: [],
  unaccompaniedMinor: false,
  _links: {
    retrieveForCancel: {
      href: '/v1/mobile/reservations/record-locator/DELAYD?first-name=r&last-name=janusz&action=CANCEL',
      method: 'GET'
    },
    retrieveForChange: {
      href: '/v1/mobile/reservations/record-locator/DELAYD?first-name=r&last-name=janusz&action=CHANGE',
      method: 'GET'
    },
    retrieveForBuyEarlyBird: {
      href: '/v1/mobile/reservations/record-locator/DELAYD?first-name=r&last-name=janusz&action=EARLYBIRD',
      method: 'GET'
    },
    companionReservations: null
  }
};
