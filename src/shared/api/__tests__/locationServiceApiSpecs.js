import mockRestClient from 'test/unit/helpers/mockRestClient';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('LocationServiceApi', () => {
  let LocationServiceApi;
  let mockEnvironment;

  beforeEach(() => {
    mockEnvironment = {
      chapiMisc: 'https://api-mobile-misc.mobile.com'
    };
    LocationServiceApi = proxyquire('src/shared/api/locationServiceApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should use the lat/long when retrieving geo position', async () => {
    const { url, type, query, dataType } = await LocationServiceApi.fetchNearestAirportWithCoordinates(100, 200);

    expect(url).to.equal('https://api-mobile-misc.mobile.com/v1/mobile-misc/feature/nearest-airport');
    expect(type).to.equal('GET');
    expect(dataType).to.equal('json');
    expect(query).to.deep.equal({
      longitude: 100,
      latitude: 200
    });
  });
});
