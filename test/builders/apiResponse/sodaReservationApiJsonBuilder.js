const _ = require('lodash');
const dayjs = require('dayjs');

class SodaReservationApiJsonBuilder {
  constructor() {
    this.currencyType = 'Dollars';
    this.international = false;
    this.itinerary = {};
    this.passengers = [];
    this.receiptEmail = 'SDF@SFESF.COM';
    this.recordLocator = 'SODATA';
    this.unaccompaniedMinor = false;
    this.warnings = [];
  }

  withOneWayBound(soda) {
    const itinerary = {
      originationDestinations: [
        {
          segments: [
            {
              departureDateTime: dayjs().add(1, 'day').format(),
              arrivalDateTime: '2016-04-26T16:45:00.000-05:00',
              originationAirportCode: 'BOS',
              destinationAirportCode: 'AUS',
              operatingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '283'
              },
              marketingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '283'
              },
              legs: [
                {
                  originationAirportCode: 'BOS',
                  destinationAirportCode: 'AUS'
                }
              ],
              wifiAvailable: null
            }
          ],
          durationMinutes: 265,
          originationDestinationId: '201604261320-0400,201604261645-0500|BOS-AUS|WN283',
          checkinDocumentReason: null,
          checkinDocumentType: null,
          fareType: 'Anytime',
          _links: {
            deleteBoardingPass: null
          }
        }
      ]
    };

    if (soda) {
      _.merge(itinerary.originationDestinations[0], { soda });
    }

    this.itinerary = itinerary;

    return this;
  }

  withRoundTripBounds(sodaArray) {
    const itinerary = {
      originationDestinations: [
        {
          segments: [
            {
              departureDateTime: dayjs().add(1, 'day').format(),
              arrivalDateTime: '2016-04-26T16:45:00.000-05:00',
              originationAirportCode: 'BOS',
              destinationAirportCode: 'AUS',
              operatingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '283'
              },
              marketingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '283'
              },
              legs: [
                {
                  originationAirportCode: 'BOS',
                  destinationAirportCode: 'AUS'
                }
              ],
              wifiAvailable: null
            }
          ],
          durationMinutes: 265,
          originationDestinationId: '201604261320-0400,201604261645-0500|BOS-AUS|WN283',
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
              departureDateTime: dayjs().add(1, 'day').format(),
              arrivalDateTime: '2016-04-27T17:25:00.000-05:00',
              originationAirportCode: 'AUS',
              destinationAirportCode: 'HOU',
              operatingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '2424'
              },
              marketingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '2424'
              },
              legs: [
                {
                  originationAirportCode: 'AUS',
                  destinationAirportCode: 'HOU'
                }
              ],
              wifiAvailable: null
            },
            {
              departureDateTime: dayjs().add(1, 'day').format(),
              arrivalDateTime: '2016-04-27T23:20:00.000-04:00',
              originationAirportCode: 'HOU',
              destinationAirportCode: 'BOS',
              operatingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '1551'
              },
              marketingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '1551'
              },
              legs: [
                {
                  originationAirportCode: 'HOU',
                  destinationAirportCode: 'BOS'
                }
              ],
              wifiAvailable: null
            }
          ],
          durationMinutes: 350,
          originationDestinationId: '201604271630-0500,201604272320-0400|AUS-HOU,HOU-BOS|WN2424,WN1551',
          checkinDocumentReason: null,
          checkinDocumentType: null,
          fareType: 'Wanna Get Away',
          _links: {
            deleteBoardingPass: null
          }
        }
      ]
    };

    _.range(2)
      .filter(index => !_.isEmpty(_.get(sodaArray, index)))
      .forEach(index => {
        _.merge(itinerary.originationDestinations[index], { soda: sodaArray[index] });
      });

    this.itinerary = itinerary;

    return this;
  }

  build() {
    return {
      currencyType: this.currencyType,
      international: this.international,
      itinerary: !_.isEmpty(this.itinerary) ? this.itinerary : defaultItinerary,
      passengers: !_.isEmpty(this.passengers) ? this.passengers : defaultPassengers,
      receiptEmail: this.receiptEmail,
      recordLocator: this.recordLocator,
      unaccompaniedMinor: this.unaccompaniedMinor,
      warnings: this.warnings
    };
  }
}

const defaultItinerary = {
  originationDestinations: [
    {
      segments: [
        {
          departureDateTime: '2016-04-26T13:20:00.000-04:00',
          arrivalDateTime: '2016-04-26T16:45:00.000-05:00',
          originationAirportCode: 'BOS',
          destinationAirportCode: 'AUS',
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '283'
          },
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '283'
          },
          legs: [
            {
              originationAirportCode: 'BOS',
              destinationAirportCode: 'AUS'
            }
          ],
          wifiAvailable: null
        }
      ],
      durationMinutes: 265,
      originationDestinationId: '201604261320-0400,201604261645-0500|BOS-AUS|WN283',
      checkinDocumentReason: null,
      checkinDocumentType: null,
      fareType: 'Anytime',
      soda: {
        sodaAffected: true,
        eligibleStartDate: '2016-04-26',
        eligibleEndDate: '2016-05-10',
        alternateOriginationAirportCodes: [
          'PVD',
          'MHT'
        ],
        alternateDestinationAirportCodes: []
      },
      _links: {
        deleteBoardingPass: null
      }
    },
    {
      segments: [
        {
          departureDateTime: '2016-04-27T16:30:00.000-05:00',
          arrivalDateTime: '2016-04-27T17:25:00.000-05:00',
          originationAirportCode: 'AUS',
          destinationAirportCode: 'HOU',
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2424'
          },
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '2424'
          },
          legs: [
            {
              originationAirportCode: 'AUS',
              destinationAirportCode: 'HOU'
            }
          ],
          wifiAvailable: null
        },
        {
          departureDateTime: '2016-04-27T18:35:00.000-05:00',
          arrivalDateTime: '2016-04-27T23:20:00.000-04:00',
          originationAirportCode: 'HOU',
          destinationAirportCode: 'BOS',
          operatingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1551'
          },
          marketingCarrierInfo: {
            carrierCode: 'WN',
            flightNumber: '1551'
          },
          legs: [
            {
              originationAirportCode: 'HOU',
              destinationAirportCode: 'BOS'
            }
          ],
          wifiAvailable: null
        }
      ],
      durationMinutes: 350,
      originationDestinationId: '201604271630-0500,201604272320-0400|AUS-HOU,HOU-BOS|WN2424,WN1551',
      checkinDocumentReason: null,
      checkinDocumentType: null,
      fareType: 'Wanna Get Away',
      soda: {
        sodaAffected: true,
        eligibleStartDate: '2016-04-26',
        eligibleEndDate: '2016-11-04',
        alternateOriginationAirportCodes: [],
        alternateDestinationAirportCodes: [
          'PVD',
          'MHT'
        ]
      },
      _links: {
        deleteBoardingPass: null
      }
    }
  ]
};

const defaultPassengers = [
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
    loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER'
  }
];

module.exports = SodaReservationApiJsonBuilder;
