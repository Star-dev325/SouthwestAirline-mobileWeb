import * as FlightInfoTransformer from 'src/carBooking/transformers/flightInfoTransformer';

describe('FlightInfoTransformer', () => {
  let flightInfo;
  let searchRequest;

  context('transformToSearchRequest', () => {
    it('should transform the oneWay flight summary to flight info that car booking needed', () => {
      flightInfo = {
        pickUp: 'AUS',
        pickUpDateTime: '2016-03-29T11:55',
        dropOff: 'AUS',
        dropOffDateTime: '2016-04-01T11:55',
        isRoundTrip: false
      };

      searchRequest = {
        pickUp: 'AUS',
        pickUpTime: '12:00PM',
        pickUpDate: '2016-03-29',
        dropOff: 'AUS',
        dropOffTime: '12:00PM',
        dropOffDate: '2016-04-01'
      };

      expect(FlightInfoTransformer.transformToSearchRequest(flightInfo)).to.deep.equal(searchRequest);
    });

    it('should transform the roundTrip flight summary to flight info that car booking needed', () => {
      flightInfo = {
        pickUp: 'AUS',
        pickUpDateTime: '2016-03-29T11:55',
        dropOff: 'AUS',
        dropOffDateTime: '2016-04-01T14:45',
        isRoundTrip: true
      };

      searchRequest = {
        pickUp: 'AUS',
        pickUpTime: '12:00PM',
        pickUpDate: '2016-03-29',
        dropOff: 'AUS',
        dropOffTime: '2:30PM',
        dropOffDate: '2016-04-01'
      };

      expect(FlightInfoTransformer.transformToSearchRequest(flightInfo)).to.deep.equal(searchRequest);
    });
  });

  context('transformFromQueryToSearchRequest', () => {
    it('should transform a get car link query to a search request', () => {
      const query = {
        'pickup-location': 'DAL',
        'return-location': 'HOU',
        'pickup-datetime': '2019-01-20T10:30',
        'return-datetime': '2019-01-25T22:30'
      };

      expect(FlightInfoTransformer.transformFromQueryToSearchRequest(query)).to.deep.equal({
        pickUp: 'DAL',
        dropOff: 'HOU',
        pickUpDate: '2019-01-20',
        dropOffDate: '2019-01-25',
        pickUpTime: '10:30AM',
        dropOffTime: '10:30PM'
      });
    });
  });

  context('round Date Time', () => {
    it('should ceil pickupDate & dropOff date time in roundTrip', () => {
      flightInfo = {
        pickUp: 'AUS',
        pickUpDateTime: '2016-03-29T23:55',
        dropOff: 'AUS',
        dropOffDateTime: '2016-04-01T23:45',
        isRoundTrip: true
      };

      searchRequest = {
        pickUp: 'AUS',
        pickUpTime: '12:00AM',
        pickUpDate: '2016-03-30',
        dropOff: 'AUS',
        dropOffTime: '11:30PM',
        dropOffDate: '2016-04-01'
      };

      expect(FlightInfoTransformer.transformToSearchRequest(flightInfo)).to.deep.equal(searchRequest);
    });
    it('should ceil pickupDate & dropOff date time in Oneway', () => {
      flightInfo = {
        pickUp: 'AUS',
        pickUpDateTime: '2016-03-29T23:55',
        dropOff: 'AUS',
        dropOffDateTime: '2016-04-01T23:55',
        isRoundTrip: false
      };

      searchRequest = {
        pickUp: 'AUS',
        pickUpTime: '12:00AM',
        pickUpDate: '2016-03-30',
        dropOff: 'AUS',
        dropOffTime: '12:00AM',
        dropOffDate: '2016-04-02'
      };

      expect(FlightInfoTransformer.transformToSearchRequest(flightInfo)).to.deep.equal(searchRequest);
    });
  });
});
