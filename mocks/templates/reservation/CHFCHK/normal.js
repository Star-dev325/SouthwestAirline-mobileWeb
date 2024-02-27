module.exports = {
  recordLocator: 'CHFCHK',
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
      checkinEligibilities: [
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: 'A',
          boardingPosition: '19',
          segmentId: '201605170530-0700,201605170635-0700|LAS-LAX|WN3900',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201605200720-0700,201605200825-0700|LAX-LAS|WN3704',
          _links: {
            checkin: null
          }
        }
      ],
      tier: 'NON_ELITE',
      loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
      earlyBirdEligibilities: [
        {
          earlyBirdProductId: null,
          status: 'TIME_WINDOW_CLOSED',
          priceCents: 0,
          originationDestinationId: '201605170530-0700,201605170635-0700|LAS-LAX|WN3900'
        },
        {
          earlyBirdProductId: 'TEFYfDIwMTYtMDUtMjB8MzcwNHxYTnx8TElVfHwxNTAw',
          status: 'ELIGIBLE',
          priceCents: 1500,
          originationDestinationId: '201605200720-0700,201605200825-0700|LAX-LAS|WN3704'
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-05-17T05:30:00.000-07:00',
            arrivalDateTime: '2016-05-17T06:35:00.000-07:00',
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
            wifiAvailable: true,
            segmentId: '201605170530-0700,201605170635-0700|LAS-LAX|WN3900',
            flightStatus: {
              departureActualTime: '05:30:00.000',
              arrivalActualTime: '06:35:00.000',
              arrivalGate: null,
              departureGate: null,
              arrivalStatus: 'On Time',
              departureStatus: 'On Time',
              willAdviseArrival: false,
              willAdviseDeparture: false,
              wifiOnBoard: 'false',
              marketingFlightNumber: '3900',
              destinationAirportCode: 'LAX',
              originationAirportCode: 'LAS',
              departureDate: '2016-05-17',
              marketingCarrierCode: 'WN',
              operatingCarrierCode: 'WN',
              operatingFlightNumber: '3900',
              departureScheduledTime: '05:30:00.000',
              arrivalScheduledTime: '06:35:00.000',
              equipmentType: '73W'
            }
          }
        ],
        durationMinutes: 65,
        originationDestinationId: '201605170530-0700,201605170635-0700|LAS-LAX|WN3900',
        checkinDocumentReason: 'withinCheckinTimeWindow',
        checkinDocumentType: 'boardingPass',
        fareType: 'Wanna Get Away',
        _links: {
          boardingPass: {
            href: '/v1/mobile/record-locator/CHFCHK/mobile-boarding-passes',
            method: 'GET'
          }
        }
      },
      {
        segments: [
          {
            departureDateTime: '2016-05-20T07:20:00.000-07:00',
            arrivalDateTime: '2016-05-20T08:25:00.000-07:00',
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
            wifiAvailable: false,
            segmentId: '201605200720-0700,201605200825-0700|LAX-LAS|WN3704'
          }
        ],
        durationMinutes: 65,
        originationDestinationId: '201605200720-0700,201605200825-0700|LAX-LAS|WN3704',
        checkinDocumentReason: 'beforeCheckinWindowTime',
        checkinDocumentType: 'airportCheckinRequired',
        fareType: 'Wanna Get Away',
        _links: null
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
      href: '/v1/mobile/reservations/record-locator/CHFCHK?first-name=x&last-name=liu&action=CANCEL',
      method: 'GET'
    },
    retrieveForChange: {
      href: '/v1/mobile/reservations/record-locator/CHFCHK?first-name=x&last-name=liu&action=CHANGE',
      method: 'GET'
    },
    retrieveForBuyEarlyBird: {
      href: '/v1/mobile/reservations/record-locator/CHFCHK?first-name=x&last-name=liu&action=EARLYBIRD',
      method: 'GET'
    },
    companionReservations: null
  }
};
