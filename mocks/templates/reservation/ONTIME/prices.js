module.exports = {
  recordLocator: 'ONTIME',
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
          segmentId: '201609011725-0500,201609012000-0500|MDW-HOU|WN3038',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: 'A',
          boardingPosition: '16',
          segmentId: '201609012150-0500,201609012240-0500|HOU-CRP|WN2130',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201609031025-0500,201609031115-0500|CRP-HOU|WN2190',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201609031340-0500,201609031610-0500|HOU-MDW|WN3494',
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
          originationDestinationId: '201609011725-0500,201609012240-0500|MDW-HOU,HOU-CRP|WN3038,WN2130'
        },
        {
          earlyBirdProductId: 'Q1JQfDIwMTYtMDktMDN8MjE5MHxST058fEpBTlVTWnx8MTUwMA==',
          status: 'ELIGIBLE',
          priceCents: 1500,
          originationDestinationId: '201609031025-0500,201609031610-0500|CRP-HOU,HOU-MDW|WN2190,WN3494'
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-09-01T17:25:00.000-05:00',
            arrivalDateTime: '2016-09-01T20:00:00.000-05:00',
            originationAirportCode: 'MDW',
            destinationAirportCode: 'HOU',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3038'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3038'
            },
            legs: [
              {
                originationAirportCode: 'MDW',
                destinationAirportCode: 'HOU'
              }
            ],
            wifiAvailable: true,
            segmentId: '201609011725-0500,201609012000-0500|MDW-HOU|WN3038',
            flightStatus: {
              departureActualTime: '17:25:00.000',
              arrivalActualTime: '20:00:00.000',
              arrivalGate: null,
              departureGate: null,
              arrivalStatus: 'On Time',
              departureStatus: 'On Time',
              willAdviseArrival: false,
              willAdviseDeparture: false,
              wifiOnBoard: 'false',
              marketingFlightNumber: '3038',
              destinationAirportCode: 'HOU',
              originationAirportCode: 'MDW',
              departureDate: '2016-09-01',
              marketingCarrierCode: 'WN',
              operatingCarrierCode: 'WN',
              operatingFlightNumber: '3038',
              departureScheduledTime: '17:25:00.000',
              arrivalScheduledTime: '20:00:00.000',
              equipmentType: '73H'
            }
          }
        ],
        durationMinutes: 315,
        originationDestinationId: '201609011725-0500,201609012240-0500|MDW-HOU,HOU-CRP|WN3038,WN2130',
        checkinDocumentReason: 'withinCheckinTimeWindow',
        checkinDocumentType: 'boardingPass',
        fareType: 'Anytime',
        _links: {
          boardingPass: {
            href: '/v1/mobile/record-locator/ONTIME/mobile-boarding-passes',
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
      href: '/v1/mobile/reservations/record-locator/ONTIME?first-name=RON&last-name=JANUSZ&action=CANCEL',
      method: 'GET'
    },
    retrieveForChange: {
      href: '/v1/mobile/reservations/record-locator/ONTIME?first-name=RON&last-name=JANUSZ&action=CHANGE',
      method: 'GET'
    },
    retrieveForBuyEarlyBird: {
      href: '/v1/mobile/reservations/record-locator/ONTIME?first-name=RON&last-name=JANUSZ&action=EARLYBIRD',
      method: 'GET'
    },
    companionReservations: null
  }
};
