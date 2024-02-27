import proxyquire from 'proxyquire';

describe('standby api', () => {
  let mockEnvironment;
  let StandbyApi;
  let mockRestClient;

  beforeEach(() => {
    mockEnvironment = {
      chapiAirOperations: 'https://the.mobile.com'
    };
    mockRestClient = require('test/unit/helpers/mockRestClient');

    StandbyApi = proxyquire('src/shared/api/standbyApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  it('should call standby api with parameters', (done) => {
    const queryParameters = {
      'first-name': 'Shak',
      'last-name': 'Bhamani',
      'record-locator': 'STYAPI'
    };

    StandbyApi.fetchStandbyList(queryParameters)
      .then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.deep.equal(
          `${mockEnvironment.chapiAirOperations}/v1/mobile-air-operations/page/standby`
        );
        expect(optionsSentToAjax.query).to.deep.equal({
          'first-name': 'Shak',
          'last-name': 'Bhamani',
          'record-locator': 'STYAPI'
        });
        done();
      });
  });

  it('should call enhanced standby api with parameters', (done) => {
    const mockToken = 'token';
    const mockLink = {
      body: {
        standbyToken: mockToken
      },
      href: '/v1/mobile-air-operations/page/standby/DMPCSP'
    };

    StandbyApi.fetchEnhancedStandbyList(mockLink).then((optionsSentToAjax) => {
      expect(optionsSentToAjax.url).to.deep.equal(
        `${mockEnvironment.chapiAirOperations}/v1/mobile-air-operations/page/standby/DMPCSP`
      );
      expect(optionsSentToAjax.body).to.deep.equal({
        standbyToken: mockToken
      });
      done();
    });
  });
});
