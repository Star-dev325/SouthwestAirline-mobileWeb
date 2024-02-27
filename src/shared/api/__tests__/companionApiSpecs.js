import mockRestClient from 'test/unit/helpers/mockRestClient';
import proxyquire from 'proxyquire';

describe('companionApi', () => {
  let mockRoutes;
  let CompanionApi;

  beforeEach(() => {
    mockRoutes = {
      reservations: 'https://the.reservations.com'
    };
    CompanionApi = proxyquire('src/shared/api/companionApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': mockRoutes
    });
  });

  context('getCompanionInformation', () => {
    it('should pass the right format of data to ajax function', () =>
      CompanionApi.getCompanionInformation().then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal('/v1/mobile-misc/page/companion-booking/companion-information');
      }));
  });
});
