import { transformToFlightSearchRequest } from 'src/flightStatus/transformers/flightStatusTransformer';

describe('FlightStatusTransformer', () => {
  context('transformToFlightSearchRequest', () => {
    it('should transform to RecentSearchRequestType when all parameters are specified', () => {
      expect(transformToFlightSearchRequest('DAL', 'HOU', '2018-03-23', '1234')).to.be.deep.equal({
        from: 'DAL',
        to: 'HOU',
        date: '2018-03-23',
        flightNumber: '1234'
      });
    });

    it('should transform to RecentSearchRequestType when flightNumber is not specified', () => {
      expect(transformToFlightSearchRequest('DAL', 'HOU', '2018-03-23')).to.be.deep.equal({
        from: 'DAL',
        to: 'HOU',
        date: '2018-03-23',
        flightNumber: undefined
      });
    });
  });
});
