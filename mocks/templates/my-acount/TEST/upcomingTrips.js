module.exports = {
  totalTrips: 8,
  trips: [
    {
      tripId: '1c4db047-7eb2-4104-a029-dca309fdec8e',
      tripName: 'triple',
      flights: [
        {
          passengers: [
            {
              firstName: 'KOTHI',
              lastName: 'BAVA',
              loyaltyAccountNumber: '00025886157371',
              earlyBirdEligibilities: [
                {
                  earlyBirdProductId: null,
                  status: 'TIME_WINDOW_CLOSED',
                  priceCents: 0,
                  originationDestinationId: '201605230700-0500,201605230805-0500|DAL-HOU|WN1'
                },
                {
                  earlyBirdProductId: 'SE9VfDIwMTYtMDUtMjV8MTYzNnxLT1RISXx8QkFWQXx8MTUwMA==',
                  status: 'ELIGIBLE',
                  priceCents: 1500,
                  originationDestinationId: '201605250600-0500,201605250700-0500|HOU-DAL|WN1636'
                }
              ],
              checkinEligibilities: [
                {
                  checkinDocumentType: 'airportCheckinRequired',
                  checkinDocumentReason: 'passDepartureTime',
                  boardingGroup: '',
                  boardingPosition: '',
                  segmentId: '201605230700-0500,201605230805-0500|DAL-HOU|WN1',
                  _links: {
                    checkin: null
                  }
                },
                {
                  checkinDocumentType: 'airportCheckinRequired',
                  checkinDocumentReason: 'beforeCheckinWindowTime',
                  boardingGroup: '',
                  boardingPosition: '',
                  segmentId: '201605250600-0500,201605250700-0500|HOU-DAL|WN1636',
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
                  departureDateTime: '2016-05-23T07:00:00.000-05:00',
                  arrivalDateTime: '2016-05-23T08:05:00.000-05:00',
                  originationAirportCode: 'DAL',
                  destinationAirportCode: 'HOU',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1'
                  },
                  legs: [
                    {
                      originationAirportCode: 'DAL',
                      destinationAirportCode: 'HOU'
                    }
                  ],
                  wifiAvailable: false,
                  segmentId: '201605230700-0500,201605230805-0500|DAL-HOU|WN1',
                  flightStatus: {
                    departureActualTime: '07:00:00.000',
                    arrivalActualTime: '08:05:00.000',
                    arrivalGate: null,
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '1',
                    destinationAirportCode: 'HOU',
                    originationAirportCode: 'DAL',
                    departureDate: '2016-05-23',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '1',
                    departureScheduledTime: '07:00:00.000',
                    arrivalScheduledTime: '08:05:00.000',
                    equipmentType: '73W'
                  }
                }
              ],
              durationMinutes: 65,
              checkinDocumentReason: 'passDepartureTime',
              checkinDocumentType: 'airportCheckinRequired',
              fareType: 'Wanna Get Away',
              originDestinationId: '201605230700-0500,201605230805-0500|DAL-HOU|WN1',
              _links: null
            },
            {
              segments: [
                {
                  departureDateTime: '2016-05-25T06:00:00.000-05:00',
                  arrivalDateTime: '2016-05-25T07:00:00.000-05:00',
                  originationAirportCode: 'HOU',
                  destinationAirportCode: 'DAL',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1636'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1636'
                  },
                  legs: [
                    {
                      originationAirportCode: 'HOU',
                      destinationAirportCode: 'DAL'
                    }
                  ],
                  wifiAvailable: false,
                  segmentId: '201605250600-0500,201605250700-0500|HOU-DAL|WN1636',
                  flightStatus: {
                    departureActualTime: '06:00:00.000',
                    arrivalActualTime: '07:00:00.000',
                    arrivalGate: null,
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '1636',
                    destinationAirportCode: 'DAL',
                    originationAirportCode: 'HOU',
                    departureDate: '2016-05-25',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '1636',
                    departureScheduledTime: '06:00:00.000',
                    arrivalScheduledTime: '07:00:00.000',
                    equipmentType: '735'
                  }
                }
              ],
              durationMinutes: 60,
              checkinDocumentReason: 'beforeCheckinWindowTime',
              checkinDocumentType: 'airportCheckinRequired',
              fareType: 'Wanna Get Away',
              originDestinationId: '201605250600-0500,201605250700-0500|HOU-DAL|WN1636',
              _links: null
            }
          ],
          recordLocator: 'R7C3FS',
          internationalFlight: false,
          _links: {
            bookCompanion: null
          }
        }
      ],
      hotels: [],
      cars: [
        {
          confirmationNumber: '1802496835COUNT',
          firstName: 'Kothi',
          lastName: 'Bava',
          pickUpDate: '2016-05-23',
          dropOffDate: '2016-05-25',
          vendor: 'Alamo',
          vehicleType: 'Full-size',
          pickupLocation: 'HOU'
        }
      ]
    },
    {
      tripId: '870722c2-eb26-4eb0-8ffd-44787e60d9fe',
      tripName: '05/23/16 - Baltimore',
      flights: [
        {
          passengers: [
            {
              firstName: 'KOTHI',
              lastName: 'BAVA',
              loyaltyAccountNumber: '00025886157371',
              earlyBirdEligibilities: [
                {
                  earlyBirdProductId: null,
                  status: 'TIME_WINDOW_CLOSED',
                  priceCents: 0,
                  originationDestinationId:
                    '201605231320-0400,201605232250-0400|ATL-MCO,MCO-BWI,BWI-ATL|WN2939,WN504,WN1650'
                }
              ],
              checkinEligibilities: [
                {
                  checkinDocumentType: 'boardingPass',
                  checkinDocumentReason: 'withinCheckinTimeWindow',
                  boardingGroup: 'A',
                  boardingPosition: '16',
                  segmentId: '201605231320-0400,201605231445-0400|ATL-MCO|WN2939',
                  _links: {
                    checkin: null
                  }
                },
                {
                  checkinDocumentType: 'boardingPass',
                  checkinDocumentReason: 'withinCheckinTimeWindow',
                  boardingGroup: 'A',
                  boardingPosition: '16',
                  segmentId: '201605231530-0400,201605231740-0400|MCO-BWI|WN504',
                  _links: {
                    checkin: null
                  }
                },
                {
                  checkinDocumentType: 'securityDocument',
                  checkinDocumentReason: 'reachMaximumBoardingPassAllowed',
                  boardingGroup: '',
                  boardingPosition: '',
                  segmentId: '201605232055-0400,201605232250-0400|BWI-ATL|WN1650',
                  _links: {
                    checkin: {
                      href: '/reservations/record-locator/RYA3FN/boarding-passes',
                      method: 'POST'
                    }
                  }
                }
              ]
            }
          ],
          originDestinations: [
            {
              segments: [
                {
                  departureDateTime: '2016-05-23T13:20:00.000-04:00',
                  arrivalDateTime: '2016-05-23T14:45:00.000-04:00',
                  originationAirportCode: 'ATL',
                  destinationAirportCode: 'MCO',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '2939'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '2939'
                  },
                  legs: [
                    {
                      originationAirportCode: 'ATL',
                      destinationAirportCode: 'MCO'
                    }
                  ],
                  wifiAvailable: true,
                  segmentId: '201605231320-0400,201605231445-0400|ATL-MCO|WN2939',
                  flightStatus: {
                    departureActualTime: '13:20:00.000',
                    arrivalActualTime: '14:45:00.000',
                    arrivalGate: '103',
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '2939',
                    destinationAirportCode: 'MCO',
                    originationAirportCode: 'ATL',
                    departureDate: '2016-05-23',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '2939',
                    departureScheduledTime: '13:20:00.000',
                    arrivalScheduledTime: '14:45:00.000',
                    equipmentType: '73W'
                  }
                },
                {
                  departureDateTime: '2016-05-23T15:30:00.000-04:00',
                  arrivalDateTime: '2016-05-23T17:40:00.000-04:00',
                  originationAirportCode: 'MCO',
                  destinationAirportCode: 'BWI',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '504'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '504'
                  },
                  legs: [
                    {
                      originationAirportCode: 'MCO',
                      destinationAirportCode: 'BWI'
                    }
                  ],
                  wifiAvailable: false,
                  segmentId: '201605231530-0400,201605231740-0400|MCO-BWI|WN504',
                  flightStatus: {
                    departureActualTime: '15:30:00.000',
                    arrivalActualTime: '17:40:00.000',
                    arrivalGate: null,
                    departureGate: '125',
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '504',
                    destinationAirportCode: 'BWI',
                    originationAirportCode: 'MCO',
                    departureDate: '2016-05-23',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '504',
                    departureScheduledTime: '15:30:00.000',
                    arrivalScheduledTime: '17:40:00.000',
                    equipmentType: '73C'
                  }
                },
                {
                  departureDateTime: '2016-05-23T20:55:00.000-04:00',
                  arrivalDateTime: '2016-05-23T22:50:00.000-04:00',
                  originationAirportCode: 'BWI',
                  destinationAirportCode: 'ATL',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1650'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1650'
                  },
                  legs: [
                    {
                      originationAirportCode: 'BWI',
                      destinationAirportCode: 'ATL'
                    }
                  ],
                  wifiAvailable: false,
                  segmentId: '201605232055-0400,201605232250-0400|BWI-ATL|WN1650'
                }
              ],
              durationMinutes: 570,
              checkinDocumentReason: 'withinCheckinTimeWindow',
              checkinDocumentType: 'boardingPass',
              warnings: [
                {
                  code: 503500157,
                  message:
                    'Sorry! Flight Status is currently unavailable. Please try again in a few minutes. for segment index 2',
                  httpStatusCode: 'SERVICE_UNAVAILABLE',
                  requestId: '5Kg7tBwmQD6motTyAhmgZQ-API'
                }
              ],
              fareType: 'Wanna Get Away',
              originDestinationId: '201605231320-0400,201605232250-0400|ATL-MCO,MCO-BWI,BWI-ATL|WN2939,WN504,WN1650',
              _links: {
                boardingPass: {
                  href: '/v1/mobile/record-locator/RYA3FN/mobile-boarding-passes',
                  method: 'GET'
                }
              }
            }
          ],
          recordLocator: 'RYA3FN',
          internationalFlight: false,
          _links: {
            bookCompanion: null
          }
        }
      ],
      hotels: [],
      cars: []
    },
    {
      tripId: '20411cb1-698f-475c-abee-6f9fa7154d94',
      tripName: 'hootteelll',
      flights: [],
      hotels: [],
      cars: [
        {
          confirmationNumber: '1206050791COUNT',
          firstName: 'Kothi',
          lastName: 'Bava',
          pickUpDate: '2016-05-23',
          dropOffDate: '2016-05-25',
          vendor: 'Alamo',
          vehicleType: 'Mid-size SUV',
          pickupLocation: 'DAL'
        }
      ]
    },
    {
      tripId: '216ebdda-15bc-4d00-bd50-346b658d1edc',
      tripName: '05/23/16 - Dallas',
      flights: [],
      hotels: [],
      cars: [
        {
          confirmationNumber: '273189209COUNT',
          firstName: 'Kothi',
          lastName: 'Bava',
          pickUpDate: '2016-05-23',
          dropOffDate: '2016-05-25',
          vendor: 'Alamo',
          vehicleType: 'Mid-size SUV',
          pickupLocation: 'DAL'
        },
        {
          confirmationNumber: '1802496833COUNT',
          firstName: 'Kothi',
          lastName: 'Bava',
          pickUpDate: '2016-05-23',
          dropOffDate: '2016-05-25',
          vendor: 'Alamo',
          vehicleType: 'Mid-size SUV',
          pickupLocation: 'HOU'
        }
      ]
    },
    {
      tripId: '65ddc0e7-fbcd-4da7-8cec-ed2b469477d9',
      tripName: 'Houston travel',
      flights: [],
      hotels: [
        {
          confirmationNumber: 'TESTCNF',
          firstName: 'Kothi',
          lastName: 'Bava',
          checkInDate: '2016-05-23',
          checkOutDate: '2016-05-25',
          hotelName: 'Hyatt Regency Houston/Galleria'
        }
      ],
      cars: []
    },
    {
      flights: [
        {
          passengers: [
            {
              firstName: 'KOTHI',
              lastName: 'BAVA',
              loyaltyAccountNumber: '00025886157371',
              earlyBirdEligibilities: [
                {
                  earlyBirdProductId: null,
                  status: 'TIME_WINDOW_CLOSED',
                  priceCents: 0,
                  originationDestinationId: '201605240700-0500,201605240800-0500|HOU-DAL|WN4'
                },
                {
                  earlyBirdProductId: 'REFMfDIwMTYtMDUtMjd8MXxLT1RISXx8QkFWQXx8MTUwMA==',
                  status: 'ELIGIBLE',
                  priceCents: 1500,
                  originationDestinationId: '201605270700-0500,201605270805-0500|DAL-HOU|WN1'
                }
              ],
              checkinEligibilities: [
                {
                  checkinDocumentType: 'boardingPass',
                  checkinDocumentReason: 'withinCheckinTimeWindow',
                  boardingGroup: '',
                  boardingPosition: '',
                  segmentId: '201605240700-0500,201605240800-0500|HOU-DAL|WN4',
                  _links: {
                    checkin: {
                      href: '/reservations/record-locator/RG73FO/boarding-passes',
                      method: 'POST'
                    }
                  }
                },
                {
                  checkinDocumentType: 'airportCheckinRequired',
                  checkinDocumentReason: 'beforeCheckinWindowTime',
                  boardingGroup: '',
                  boardingPosition: '',
                  segmentId: '201605270700-0500,201605270805-0500|DAL-HOU|WN1',
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
                  departureDateTime: '2016-05-24T07:00:00.000-05:00',
                  arrivalDateTime: '2016-05-24T08:00:00.000-05:00',
                  originationAirportCode: 'HOU',
                  destinationAirportCode: 'DAL',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '4'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '4'
                  },
                  legs: [
                    {
                      originationAirportCode: 'HOU',
                      destinationAirportCode: 'DAL'
                    }
                  ],
                  wifiAvailable: true,
                  segmentId: '201605240700-0500,201605240800-0500|HOU-DAL|WN4',
                  flightStatus: {
                    departureActualTime: '07:00:00.000',
                    arrivalActualTime: '08:00:00.000',
                    arrivalGate: null,
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '4',
                    destinationAirportCode: 'DAL',
                    originationAirportCode: 'HOU',
                    departureDate: '2016-05-24',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '4',
                    departureScheduledTime: '07:00:00.000',
                    arrivalScheduledTime: '08:00:00.000',
                    equipmentType: '73W'
                  }
                }
              ],
              durationMinutes: 60,
              checkinDocumentReason: 'withinCheckinTimeWindow',
              checkinDocumentType: 'boardingPass',
              fareType: 'Wanna Get Away',
              originDestinationId: '201605240700-0500,201605240800-0500|HOU-DAL|WN4',
              _links: {
                checkin: {
                  href: '/reservations/record-locator/RG73FO/boarding-passes',
                  method: 'POST'
                }
              }
            },
            {
              segments: [
                {
                  departureDateTime: '2016-05-27T07:00:00.000-05:00',
                  arrivalDateTime: '2016-05-27T08:05:00.000-05:00',
                  originationAirportCode: 'DAL',
                  destinationAirportCode: 'HOU',
                  operatingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1'
                  },
                  marketingCarrierInfo: {
                    carrierCode: 'WN',
                    flightNumber: '1'
                  },
                  legs: [
                    {
                      originationAirportCode: 'DAL',
                      destinationAirportCode: 'HOU'
                    }
                  ],
                  wifiAvailable: false,
                  segmentId: '201605270700-0500,201605270805-0500|DAL-HOU|WN1',
                  flightStatus: {
                    departureActualTime: '07:00:00.000',
                    arrivalActualTime: '08:05:00.000',
                    arrivalGate: null,
                    departureGate: null,
                    arrivalStatus: 'On Time',
                    departureStatus: 'On Time',
                    willAdviseArrival: false,
                    willAdviseDeparture: false,
                    wifiOnBoard: 'false',
                    marketingFlightNumber: '1',
                    destinationAirportCode: 'HOU',
                    originationAirportCode: 'DAL',
                    departureDate: '2016-05-27',
                    marketingCarrierCode: 'WN',
                    operatingCarrierCode: 'WN',
                    operatingFlightNumber: '1',
                    departureScheduledTime: '07:00:00.000',
                    arrivalScheduledTime: '08:05:00.000',
                    equipmentType: '73W'
                  }
                }
              ],
              durationMinutes: 65,
              checkinDocumentReason: 'beforeCheckinWindowTime',
              checkinDocumentType: 'airportCheckinRequired',
              fareType: 'Anytime',
              originDestinationId: '201605270700-0500,201605270805-0500|DAL-HOU|WN1',
              _links: null
            }
          ],
          recordLocator: 'RG73FO',
          internationalFlight: false,
          _links: {
            bookCompanion: null
          }
        }
      ],
      hotels: [],
      cars: []
    },
    {
      flights: [],
      hotels: [],
      cars: [
        {
          confirmationNumber: '05287231US5',
          firstName: 'Kothi',
          lastName: 'Bava',
          pickUpDate: '2016-05-24',
          dropOffDate: '2016-05-27',
          vendor: 'Avis',
          vehicleType: 'Mid-size',
          pickupLocation: 'ALB'
        }
      ]
    },
    {
      tripId: '5fa8769f-27e2-4671-94b0-dacbf9adcbba',
      tripName: 'Dallas OO',
      flights: [],
      hotels: [
        {
          confirmationNumber: 'TESTCNF',
          firstName: 'Kothi',
          lastName: 'Bava',
          checkInDate: '2016-05-24',
          checkOutDate: '2016-05-26',
          hotelName: 'Country Inn & Suites By Carlson, Dallas-Love Field (Medical Center), TX'
        },
        {
          confirmationNumber: 'TESTCNF',
          firstName: 'test',
          lastName: 'test',
          checkInDate: '2016-05-26',
          checkOutDate: '2016-05-30',
          hotelName: 'La Quinta Inn New Orleans Veterans / Metairie'
        }
      ],
      cars: []
    }
  ]
};
