import proxyquire from 'proxyquire';
import mockRestClient from 'test/unit/helpers/mockRestClient';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('SalesforceApi', () => {
  let SalesforceApi;
  let mockEnvironment;

  beforeEach(() => {
    mockEnvironment = {
      securityApi: 'https://api-security.swacorp.com'
    };

    sinon.stub(mockRestClient, 'ajax');

    SalesforceApi = proxyquire('src/shared/api/salesforceApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('getSalesforceGuid', () => {
    it('should call api gateway security endpoint for salesforce', () => {
      SalesforceApi.getSalesforceGuid();

      expect(mockRestClient.ajax).to.have.been.calledWith(
        {
          url: 'https://api-security.swacorp.com/v3/security/salesforce',
          contentType: 'application/json',
          dataType: 'json',
          type: 'POST'
        },
        true
      );
    });
  });
});
