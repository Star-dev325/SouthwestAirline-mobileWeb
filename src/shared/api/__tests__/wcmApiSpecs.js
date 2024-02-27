import proxyquire from 'proxyquire';
import mockRestClient from 'test/unit/helpers/mockRestClient';

describe('WCM API', () => {
  let WcmApi;

  beforeEach(() => {
    WcmApi = proxyquire('src/shared/api/wcmApi', {
      'src/shared/api/restClient': mockRestClient
    });
  });

  context('getJsonFile', () => {
    it('should pass correct options when getting json file', () => {
      const expectQueryUrl = '/content/app/properties/applicationProperties.json';

      return WcmApi.getJsonFile('content/app/properties/applicationProperties.json').then((optionsSentToAjax) => {
        expect(optionsSentToAjax).to.deep.equal({
          url: expectQueryUrl,
          dataType: 'json',
          type: 'GET'
        });
      });
    });
  });
});
