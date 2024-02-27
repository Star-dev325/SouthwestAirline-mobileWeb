function CompanionFlightSummariesBuilder() {
  this.getOutbound = function() {
    return {
      priceInfo: { adultPriceInfo: { fareType: 'Wanna get way', passengerType: 'adult', passengerCount: 1 } },
      flightSummaryDetails: {
        flightInfo: {
          segments: [{
            wifiAvailable: null,
            arrivalDateTime: '2016-03-29T06:45:00.000-05:00',
            departureDateTime: '2016-03-29T05:30:00.000-04:00',
            flightNumber: '4401'
          }, {
            wifiAvailable: null,
            arrivalDateTime: '2016-03-29T08:55:00.000-05:00',
            departureDateTime: '2016-03-29T08:00:00.000-05:00',
            flightNumber: '372'
          }], durationMinutes: 265
        },
        itineraryInfo: {
          departureDetail: {
            dateTime: '2016-03-29T05:30:00.000-04:00',
            flightStatus: 'On Time',
            airportCode: 'ATL',
            airportName: 'Atlanta',
            cityState: 'GA'
          },
          arrivalDetail: {
            dateTime: '2016-03-29T08:55:00.000-05:00',
            flightStatus: 'On Time',
            airportCode: 'AUS',
            airportName: 'Austin',
            cityState: 'TX',
            arrivesNextDay: false
          },
          stops: [{
            layoverTimes: {
              startTime: '2016-03-29T06:45:00.000-05:00',
              departureFlightStatus: 'On Time',
              endTime: '2016-03-29T08:00:00.000-05:00',
              arrivalFlightStatus: 'On Time'
            },
            airport: {
              code: 'DAL',
              airportName: 'Dallas (Love Field)',
              displayName: 'Dallas (Love Field)',
              cityName: 'Dallas',
              shortDisplayName: 'Dallas',
              cityState: 'TX',
              marketingCarriers: ['WN'],
              countryCode: 'US',
              latitude: '32.8471',
              longitude: '-96.8518',
              airportSearchName: 'DFW, Ft. Worth, Fort Worth, Texas'
            }
          }]
        },
        departureDateTime: '2016-03-29T05:30:00.000-04:00',
        isReturning: false,
        isCancelled: false
      }
    };
  };
  this.getInbound = function() {
    return {
      priceInfo: { adultPriceInfo: { fareType: 'Wanna get way', passengerType: 'adult', passengerCount: 1 } },
      flightSummaryDetails: {
        flightInfo: {
          segments: [{
            wifiAvailable: null,
            arrivalDateTime: '2016-04-09T09:10:00.000-05:00',
            departureDateTime: '2016-04-09T08:20:00.000-05:00',
            flightNumber: '3184'
          }, {
            wifiAvailable: null,
            arrivalDateTime: '2016-04-09T13:00:00.000-04:00',
            departureDateTime: '2016-04-09T10:10:00.000-05:00',
            flightNumber: '4555'
          }], durationMinutes: 220
        },
        itineraryInfo: {
          departureDetail: {
            dateTime: '2016-04-09T08:20:00.000-05:00',
            airportCode: 'AUS',
            airportName: 'Austin',
            cityState: 'TX'
          },
          arrivalDetail: {
            dateTime: '2016-04-09T13:00:00.000-04:00',
            airportCode: 'ATL',
            airportName: 'Atlanta',
            cityState: 'GA',
            arrivesNextDay: false
          },
          stops: [{
            layoverTimes: {
              startTime: '2016-04-09T09:10:00.000-05:00',
              endTime: '2016-04-09T10:10:00.000-05:00'
            },
            airport: {
              code: 'HOU',
              airportName: 'Houston (Hobby)',
              displayName: 'Houston (Hobby)',
              cityName: 'Houston',
              shortDisplayName: 'Houston',
              cityState: 'TX',
              marketingCarriers: ['WN'],
              countryCode: 'US',
              latitude: '29.6454',
              longitude: '-95.2789',
              airportSearchName: 'Texas, HUO, IAH, George Bush International, Galveston, H-Town, Huoston'
            }
          }]
        },
        departureDateTime: '2016-04-09T08:20:00.000-05:00',
        isReturning: true,
        isCancelled: false
      }
    };
  };
  this.forRoundTrip = function() {
    return [this.getOutbound(), this.getInbound()];
  };
  this.forOneWay = function() {
    return [this.getOutbound()];
  };
}

module.exports = CompanionFlightSummariesBuilder;
