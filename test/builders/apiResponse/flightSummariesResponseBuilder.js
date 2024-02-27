export default function flightSummariesResponseBuilder() {
  this.departureFlightSummary = {
    priceInfo: {
      adultPriceInfo: {
        fareType: 'Anytime',
        passengerType: 'adult',
        passengerCount: 1
      },
      seniorPriceInfo: {
        fareType: null,
        passengerType: 'senior',
        passengerCount: 0
      }
    },
    flightSummaryDetails: {
      flightInfo: {
        durationMinutes: 400,
        segments: [
          {
            flightNumber: '992',
            wifiAvailable: true
          },
          {
            flightNumber: '573',
            wifiAvailable: true
          }
        ]
      },
      itineraryInfo: {
        departureDetail: {
          dateTime: '2016-03-29T06:15',
          airportCode: 'CAK',
          airportName: 'Akron-Canton',
          cityState: 'OH'
        },
        arrivalDetail: {
          dateTime: '2016-03-29T11:55',
          arrivesNextDay: false,
          airportCode: 'AUS',
          airportName: 'Austin',
          cityState: 'TX'
        },
        stops: [
          {
            airport: {
              code: 'TPA',
              airportName: 'Tampa',
              displayName: 'Tampa',
              cityName: 'Tampa',
              shortDisplayName: 'Tampa',
              cityState: 'FL',
              marketingCarriers: [
                'WN'
              ],
              countryCode: 'US',
              latitude: '27.9755',
              longitude: '-82.5332',
              airportSearchName: 'Florida, Orlando, Bay, Bush Gardens, Busch Gardens'
            },
            layoverTimes: {
              startTime: '2016-03-29T08:35',
              endTime: '2016-03-29T10:10'
            }
          }
        ]
      },
      departureDateTime: '2016-03-29T06:15',
      isReturning: false,
      isCancelled: false
    }
  };

  this.returningFlightSummary = {
    priceInfo: {
      adultPriceInfo: {
        fareType: 'Business Select',
        passengerType: 'adult',
        passengerCount: 1
      },
      seniorPriceInfo: {
        fareType: null,
        passengerType: 'senior',
        passengerCount: 0
      }
    },
    flightSummaryDetails: {
      flightInfo: {
        durationMinutes: 445,
        segments: [
          {
            flightNumber: '1477',
            wifiAvailable: true
          },
          {
            flightNumber: '2616',
            wifiAvailable: true
          }
        ]
      },
      itineraryInfo: {
        departureDetail: {
          dateTime: '2016-04-01T14:45',
          airportCode: 'AUS',
          airportName: 'Austin',
          cityState: 'TX'
        },
        arrivalDetail: {
          dateTime: '2016-04-01T23:10',
          arrivesNextDay: false,
          airportCode: 'CAK',
          airportName: 'Akron-Canton',
          cityState: 'OH'
        },
        stops: [
          {
            airport: {
              code: 'TPA',
              airportName: 'Tampa',
              displayName: 'Tampa',
              cityName: 'Tampa',
              shortDisplayName: 'Tampa',
              cityState: 'FL',
              marketingCarriers: [
                'WN'
              ],
              countryCode: 'US',
              latitude: '27.9755',
              longitude: '-82.5332',
              airportSearchName: 'Florida, Orlando, Bay, Bush Gardens, Busch Gardens'
            },
            layoverTimes: {
              startTime: '2016-04-01T17:55',
              endTime: '2016-04-01T20:55'
            }
          }
        ]
      },
      departureDateTime: '2016-04-01T14:45',
      isReturning: true,
      isCancelled: false
    }
  };

  this.roundTrip = function() {
    this.flightSummaries = [this.departureFlightSummary, this.returningFlightSummary];

    return this;
  };

  this.oneWay = function() {
    this.flightSummaries = [this.departureFlightSummary];

    return this;
  };

  this.build = function() {
    return this.flightSummaries;
  };
}