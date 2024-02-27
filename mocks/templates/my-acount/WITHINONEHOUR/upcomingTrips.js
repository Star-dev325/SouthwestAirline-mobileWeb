module.exports = {
  totalTrips: 1,
  trips: [
    {
      flights: [
        {
          passengers: [
            {
              firstName: 'RON',
              lastName: 'JANUSZ',
              loyaltyAccountNumber: '00021141157376',
              earlyBirdEligibilities: [
                {
                  earlyBirdProductId: null,
                  status: 'TIME_WINDOW_CLOSED',
                  priceCents: 0,
                  originationDestinationId: '201609071400-0500,201609071505-0500|DAL-HOU|WN31'
                },
                {
                  earlyBirdProductId: 'SE9VfDIwMTYtMDktMDl8NnxST058fEpBTlVTWnx8MTUwMA==',
                  status: 'ELIGIBLE',
                  priceCents: 1500,
                  originationDestinationId: '201609090730-0500,201609090830-0500|HOU-DAL|WN6'
                }
              ],
              checkinEligibilities: [
                {
                  checkinDocumentType: 'securityDocument',
                  checkinDocumentReason: 'withinOneHourBeforeDeparture',
                  boardingGroup: '',
                  boardingPosition: '',
                  segmentId: '201609071400-0500,201609071505-0500|DAL-HOU|WN31',
                  _links: {
                    checkin: {
                      href: '/reservations/record-locator/98RRHL/boarding-passes',
                      method: 'POST'
                    }
                  }
                },
                {
                  checkinDocumentType: 'airportCheckinRequired',
                  checkinDocumentReason: 'beforeCheckinWindowTime',
                  boardingGroup: '',
                  boardingPosition: '',
                  segmentId: '201609090730-0500,201609090830-0500|HOU-DAL|WN6',
                  _links: {
                    checkin: null
                  }
                }
              ]
            }
          ],
          originDestinations: [
            {
              segments: [
                {
                  departureDateTime: '2016-09-07T14:00:00.000-05:00',
                  arrivalDateTime: '2016-09-07T15:05:00.000-05:00',
                  originationAirportCode: 'DAL',
                  destinationAirportCode: 'HOU',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '31'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '31'
                  },
                  legs: [
                    {
                      originationAirportCode: 'DAL',
                      destinationAirportCode: 'HOU'
                    }
                  ],
                  wifiAvailable: false,
                  segmentId: '201609071400-0500,201609071505-0500|DAL-HOU|WN31',
                  flightStatus: {
                    departureActualTime: '14:00:00.000',
                    arrivalActualTime: '15:05:00.000',
                    arrivalGate: '21',
                    departureGate: '17',
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '31',
                    destinationAirportCode: 'HOU',
                    originationAirportCode: 'DAL',
                    departureDate: '2016-09-07',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '31',
                    departureScheduledTime: '14:00:00.000',
                    arrivalScheduledTime: '15:05:00.000',
                    equipmentType: '73C'
                  }
                }
              ],
              durationMinutes: 65,
              checkinDocumentReason: 'withinOneHourBeforeDeparture',
              checkinDocumentType: 'securityDocument',
              fareType: 'Wanna Get Away',
              originDestinationId: '201609071400-0500,201609071505-0500|DAL-HOU|WN31',
              _links: null
            },
            {
              segments: [
                {
                  departureDateTime: '2016-09-09T07:30:00.000-05:00',
                  arrivalDateTime: '2016-09-09T08:30:00.000-05:00',
                  originationAirportCode: 'HOU',
                  destinationAirportCode: 'DAL',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '6'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '6'
                  },
                  legs: [
                    {
                      originationAirportCode: 'HOU',
                      destinationAirportCode: 'DAL'
                    }
                  ],
                  wifiAvailable: false,
                  segmentId: '201609090730-0500,201609090830-0500|HOU-DAL|WN6',
                  flightStatus: {
                    departureActualTime: '07:30:00.000',
                    arrivalActualTime: '08:30:00.000',
                    arrivalGate: null,
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '6',
                    destinationAirportCode: 'DAL',
                    originationAirportCode: 'HOU',
                    departureDate: '2016-09-09',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '6',
                    departureScheduledTime: '07:30:00.000',
                    arrivalScheduledTime: '08:30:00.000',
                    equipmentType: '73W'
                  }
                }
              ],
              durationMinutes: 60,
              checkinDocumentReason: 'beforeCheckinWindowTime',
              checkinDocumentType: 'airportCheckinRequired',
              fareType: 'Wanna Get Away',
              originDestinationId: '201609090730-0500,201609090830-0500|HOU-DAL|WN6',
              _links: null
            }
          ],
          recordLocator: '98RRHL',
          internationalFlight: false,
          _links: {
            bookCompanion: null
          }
        }
      ],
      hotels: [],
      cars: []
    }
  ]
};
