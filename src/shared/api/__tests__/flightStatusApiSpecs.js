import Q from 'q';
import mockRestClient from 'test/unit/helpers/mockRestClient';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('FlightStatusApi', () => {
  let FlightStatusApi;
  let mockEnvironment;
  let ajaxStub;

  beforeEach(() => {
    mockEnvironment = {
      mobile: 'https://the.mobile.com',
      chapiAirOperations: 'https://the.chapi.com'
    };

    FlightStatusApi = proxyquire('src/shared/api/flightStatusApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });

    ajaxStub = sinon.stub(mockRestClient, 'ajax').returns(Q({}));
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when searching for flight status with origination-airport, departure-airport, and departure date', () => {
    it('should pass correct query parameters and url to CHAPI', () => {
      FlightStatusApi.searchForFlights({
        from: 'DAL',
        to: 'HOU',
        date: '2015-02-01'
      });
      expect(ajaxStub.args[0][0]).to.deep.equal({
        url: 'https://the.chapi.com/v1/mobile-air-operations/page/flight-status/schedule',
        type: 'GET',
        query: {
          'origin-airport': 'DAL',
          'destination-airport': 'HOU',
          'departure-date': '2015-02-01'
        },
        dataType: 'json'
      });
    });
  });

  context('when looking up flight details', () => {
    let flightDetailsRequestQuery;

    beforeEach(() => {
      flightDetailsRequestQuery = { foo: 'bar' };
    });

    it('should pass query parameters to the API', () => {
      FlightStatusApi.lookUpFlightDetails({
        query: flightDetailsRequestQuery,
        href: '/v1/mobile-air-operations/page/flight-status/details',
        method: 'GET'
      });
      expect(ajaxStub.args[0][0]).to.deep.equal({
        url: 'https://the.chapi.com/v1/mobile-air-operations/page/flight-status/details',
        query: { foo: 'bar' },
        type: 'GET',
        dataType: 'json'
      });
    });

    it('should fill CHAPI url and type when not giving those fields', () => {
      FlightStatusApi.lookUpFlightDetails({
        query: flightDetailsRequestQuery
      });

      expect(ajaxStub.args[0][0].url).to.equal(
        'https://the.chapi.com/v1/mobile-air-operations/page/flight-status/details'
      );
      expect(ajaxStub.args[0][0].type).to.equal('GET');
    });
  });
});
