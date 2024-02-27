import mockRestClient from 'test/unit/helpers/mockRestClient';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';

import ChaseApiConstants from 'src/shared/constants/chaseApiConstants';
import TimeoutConstants from 'src/shared/constants/timeoutConstants';

const sinon = sandbox.create();

describe('ChasePrequalApi', () => {
  let ChasePrequalApi;
  let mockEnvironment;

  beforeEach(() => {
    mockEnvironment = {
      apiGatewayChaseApi: 'https://api-chase.swacorp.com'
    };

    ChasePrequalApi = proxyquire('src/shared/api/chasePrequalApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('getChasePrequalOffers', () => {
    it('should call api gateway chase endpoint', async () => {
      const result = await ChasePrequalApi.getChasePrequalOffers('testPageId');

      expect(result).to.deep.equal({
        body: {
          pageId: 'testPageId'
        },
        contentType: 'application/json',
        dataType: 'json',
        timeout: TimeoutConstants.CHASE_PREQUAL_TIMEOUT,
        type: 'POST',
        url: `https://api-chase.swacorp.com/${ChaseApiConstants.API_VERSION}/chase/offers`
      });
    });
  });

  context('confirmCustomerViewedFirmOfferOfCredit', () => {
    it('should call api gateway chase endpoint', async () => {
      const offerIdentifier = '1234567890';
      const additionalParams = {
        swaOffersIdentitySource: 't',
        SPID: 'GKLK',
        CELL: '12345',
        cbid: '200023'
      };

      const result = await ChasePrequalApi.confirmCustomerViewedFirmOfferOfCredit(
        offerIdentifier,
        additionalParams
      );

      expect(result).to.deep.equal({
        body: {
          ...additionalParams,
          offerIdentifier
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'PUT',
        url: `https://api-chase.swacorp.com/${ChaseApiConstants.API_VERSION}/chase/firm-offer-confirmation`
      });
    });
  });
});
