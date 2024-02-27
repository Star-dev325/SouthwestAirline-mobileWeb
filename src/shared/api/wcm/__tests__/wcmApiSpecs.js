import proxyquire from 'proxyquire';
import mockRestClient from 'test/unit/helpers/mockRestClient';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('WcmApi', () => {
  let WcmApi;

  beforeEach(() => {
    WcmApi = proxyquire('src/shared/api/wcm/wcmApi', {
      'src/shared/api/restClient': mockRestClient
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('#getJsonFile', () => {
    it('should send the correct request', () =>
      WcmApi.getJsonFile('some/example/path.json').then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal('/some/example/path.json');
        expect(optionsSentToAjax.type).to.equal('GET');
        expect(optionsSentToAjax.dataType).to.equal('json');
      }));
  });

  context('retrieveApplicationProperties', () => {
    it('should request the correct url', async () => {
      const ajaxOptions = await WcmApi.retrieveApplicationProperties();

      expect(ajaxOptions.url).to.equal('/content/app/properties/applicationProperties.json');
    });
  });
});
