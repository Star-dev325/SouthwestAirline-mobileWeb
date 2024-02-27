module.exports = {
  totalTrips: 1,
  trips: [
    {
      tripId: 'b6add6e9-76c5-4653-a6fc-0bffe845b2cb',
      tripName: 'Rons 3 Flights in a trip',
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
                  originationDestinationId: '201608030530-0500,201608030945-0700|MDW-LAS,LAS-SAN|WN1162,WN1973'
                },
                {
                  earlyBirdProductId: 'U0FOfDIwMTYtMDgtMDR8MzU5MXxST058fEpBTlVTWnxJSXwxNTAw',
                  status: 'ELIGIBLE',
                  priceCents: 1500,
                  originationDestinationId: '201608040725-0700,201608041320-0500|SAN-MDW|WN3591'
                }
              ],
              checkinEligibilities: [
                {
                  checkinDocumentType: 'boardingPass',
                  checkinDocumentReason: 'withinCheckinTimeWindow',
                  boardingGroup: 'A',
                  boardingPosition: '16',
                  segmentId: '201608030530-0500,201608030715-0700|MDW-LAS|WN1162',
                  _links: {
                    checkin: null
                  }
                },
                {
                  checkinDocumentType: 'boardingPass',
                  checkinDocumentReason: 'withinCheckinTimeWindow',
                  boardingGroup: 'A',
                  boardingPosition: '16',
                  segmentId: '201608030840-0700,201608030945-0700|LAS-SAN|WN1973',
                  _links: {
                    checkin: null
                  }
                },
                {
                  checkinDocumentType: 'airportCheckinRequired',
                  checkinDocumentReason: 'beforeCheckinWindowTime',
                  boardingGroup: '',
                  boardingPosition: '',
                  segmentId: '201608040725-0700,201608041320-0500|SAN-MDW|WN3591',
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
                  departureDateTime: '2016-08-03T05:30:00.000-05:00',
                  arrivalDateTime: '2016-08-03T07:15:00.000-07:00',
                  originationAirportCode: 'MDW',
                  destinationAirportCode: 'LAS',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1162'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1162'
                  },
                  legs: [
                    {
                      originationAirportCode: 'MDW',
                      destinationAirportCode: 'LAS'
                    }
                  ],
                  wifiAvailable: true,
                  segmentId: '201608030530-0500,201608030715-0700|MDW-LAS|WN1162',
                  flightStatus: {
                    departureActualTime: '05:30:00.000',
                    arrivalActualTime: '07:15:00.000',
                    arrivalGate: null,
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '1162',
                    destinationAirportCode: 'LAS',
                    originationAirportCode: 'MDW',
                    departureDate: '2016-08-03',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '1162',
                    departureScheduledTime: '05:30:00.000',
                    arrivalScheduledTime: '07:15:00.000',
                    equipmentType: '73W'
                  }
                },
                {
                  departureDateTime: '2016-08-03T08:40:00.000-07:00',
                  arrivalDateTime: '2016-08-03T09:45:00.000-07:00',
                  originationAirportCode: 'LAS',
                  destinationAirportCode: 'SAN',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1973'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1973'
                  },
                  legs: [
                    {
                      originationAirportCode: 'LAS',
                      destinationAirportCode: 'SAN'
                    }
                  ],
                  wifiAvailable: true,
                  segmentId: '201608030840-0700,201608030945-0700|LAS-SAN|WN1973',
                  flightStatus: {
                    departureActualTime: '08:40:00.000',
                    arrivalActualTime: '09:45:00.000',
                    arrivalGate: null,
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '1973',
                    destinationAirportCode: 'SAN',
                    originationAirportCode: 'LAS',
                    departureDate: '2016-08-03',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '1973',
                    departureScheduledTime: '08:40:00.000',
                    arrivalScheduledTime: '09:45:00.000',
                    equipmentType: '73W'
                  }
                }
              ],
              durationMinutes: 375,
              checkinDocumentReason: 'withinCheckinTimeWindow',
              checkinDocumentType: 'boardingPass',
              fareType: 'Anytime',
              originDestinationId: '201608030530-0500,201608030945-0700|MDW-LAS,LAS-SAN|WN1162,WN1973',
              _links: {
                boardingPass: {
                  href: '/v1/mobile/record-locator/9Q7BA9/mobile-boarding-passes',
                  method: 'GET'
                }
              }
            },
            {
              segments: [
                {
                  departureDateTime: '2016-08-04T07:25:00.000-07:00',
                  arrivalDateTime: '2016-08-04T13:20:00.000-05:00',
                  originationAirportCode: 'SAN',
                  destinationAirportCode: 'MDW',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '3591'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '3591'
                  },
                  legs: [
                    {
                      originationAirportCode: 'SAN',
                      destinationAirportCode: 'MDW'
                    }
                  ],
                  wifiAvailable: true,
                  segmentId: '201608040725-0700,201608041320-0500|SAN-MDW|WN3591',
                  flightStatus: {
                    departureActualTime: '07:25:00.000',
                    arrivalActualTime: '13:20:00.000',
                    arrivalGate: null,
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '3591',
                    destinationAirportCode: 'MDW',
                    originationAirportCode: 'SAN',
                    departureDate: '2016-08-04',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '3591',
                    departureScheduledTime: '07:25:00.000',
                    arrivalScheduledTime: '13:20:00.000',
                    equipmentType: '73H'
                  }
                }
              ],
              durationMinutes: 235,
              checkinDocumentReason: 'beforeCheckinWindowTime',
              checkinDocumentType: 'airportCheckinRequired',
              fareType: 'Anytime',
              originDestinationId: '201608040725-0700,201608041320-0500|SAN-MDW|WN3591',
              _links: null
            }
          ],
          recordLocator: '9Q7BA9',
          internationalFlight: false,
          _links: {
            bookCompanion: null
          }
        },
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
                  originationDestinationId: '201608030845-0500,201608031315-0700|MDW-SAN|WN872'
                },
                {
                  earlyBirdProductId: 'U0FOfDIwMTYtMDgtMDR8MTUzOXxST058fEpBTlVTWnxJSXwxNTAw',
                  status: 'ELIGIBLE',
                  priceCents: 1500,
                  originationDestinationId: '201608041220-0700,201608041810-0500|SAN-MDW|WN1539'
                }
              ],
              checkinEligibilities: [
                {
                  checkinDocumentType: 'boardingPass',
                  checkinDocumentReason: 'withinCheckinTimeWindow',
                  boardingGroup: '',
                  boardingPosition: '',
                  segmentId: '201608030845-0500,201608031315-0700|MDW-SAN|WN872',
                  _links: {
                    checkin: {
                      href: '/reservations/record-locator/9F7BAR/boarding-passes',
                      method: 'POST'
                    }
                  }
                },
                {
                  checkinDocumentType: 'airportCheckinRequired',
                  checkinDocumentReason: 'beforeCheckinWindowTime',
                  boardingGroup: '',
                  boardingPosition: '',
                  segmentId: '201608041220-0700,201608041810-0500|SAN-MDW|WN1539',
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
                  departureDateTime: '2016-08-03T08:45:00.000-05:00',
                  arrivalDateTime: '2016-08-03T13:15:00.000-07:00',
                  originationAirportCode: 'MDW',
                  destinationAirportCode: 'SAN',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '872'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '872'
                  },
                  legs: [
                    {
                      originationAirportCode: 'MDW',
                      destinationAirportCode: 'SMF'
                    },
                    {
                      originationAirportCode: 'SMF',
                      destinationAirportCode: 'SAN'
                    }
                  ],
                  wifiAvailable: true,
                  segmentId: '201608030845-0500,201608031315-0700|MDW-SAN|WN872',
                  flightStatus: {
                    departureActualTime: '08:45:00.000',
                    arrivalActualTime: '13:15:00.000',
                    arrivalGate: null,
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '872',
                    destinationAirportCode: 'SAN',
                    originationAirportCode: 'MDW',
                    departureDate: '2016-08-03',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '872',
                    departureScheduledTime: '08:45:00.000',
                    arrivalScheduledTime: '13:15:00.000',
                    equipmentType: '73R'
                  }
                }
              ],
              durationMinutes: 390,
              checkinDocumentReason: 'withinCheckinTimeWindow',
              checkinDocumentType: 'boardingPass',
              fareType: 'Anytime',
              originDestinationId: '201608030845-0500,201608031315-0700|MDW-SAN|WN872',
              _links: {
                checkin: {
                  href: '/reservations/record-locator/9F7BAR/boarding-passes',
                  method: 'POST'
                }
              }
            },
            {
              segments: [
                {
                  departureDateTime: '2016-08-04T07:25:00.000-07:00',
                  arrivalDateTime: '2016-08-04T13:20:00.000-05:00',
                  originationAirportCode: 'SAN',
                  destinationAirportCode: 'MDW',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '3591'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '3591'
                  },
                  legs: [
                    {
                      originationAirportCode: 'SAN',
                      destinationAirportCode: 'MDW'
                    }
                  ],
                  wifiAvailable: true,
                  segmentId: '201608040725-0700,201608041320-0500|SAN-MDW|WN3591',
                  flightStatus: {
                    departureActualTime: '07:25:00.000',
                    arrivalActualTime: '13:20:00.000',
                    arrivalGate: null,
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '3591',
                    destinationAirportCode: 'MDW',
                    originationAirportCode: 'SAN',
                    departureDate: '2016-08-04',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '3591',
                    departureScheduledTime: '07:25:00.000',
                    arrivalScheduledTime: '13:20:00.000',
                    equipmentType: '73H'
                  }
                }
              ],
              durationMinutes: 235,
              checkinDocumentReason: 'beforeCheckinWindowTime',
              checkinDocumentType: 'airportCheckinRequired',
              fareType: 'Anytime',
              originDestinationId: '201608040725-0700,201608041320-0500|SAN-MDW|WN3591',
              _links: null
            }
          ],
          recordLocator: '9F7BAR',
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
