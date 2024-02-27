import mockRestClient from 'test/unit/helpers/mockRestClient';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('UpgradedBoardingApi', () => {
  let mockEnvironment;
  let UpgradedBoardingApi;

  beforeEach(() => {
    mockEnvironment = {
      mobile: 'https://the.mobile.com',
      chapiAirOperations: 'https://the.operations.com'
    };
    UpgradedBoardingApi = proxyquire('src/shared/api/upgradedBoardingApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when retrieving a reservation', () => {
    it('should pass correct parameters to API', async () => {
      const linkObj = {
        body: { passengerSearchToken: 'testToken' },
        href: '/v1/mobile-air-operations/page/upgraded-boarding/4TY8HO',
        labelText: 'Mock labelText',
        method: 'POST'
      };

      const { type, url, body } = await UpgradedBoardingApi.retrieveReservation(linkObj);

      expect(url).to.equal(
        `${mockEnvironment.chapiAirOperations}/v1/mobile-air-operations/page/upgraded-boarding/4TY8HO`
      );
      expect(type).to.equal('POST');
      expect(body).to.deep.equal({ passengerSearchToken: 'testToken' });
    });
  });

  context('when cancelling a reservation', () => {
    it('should pass correct parameters to API', async () => {
      const requestBody = {
        passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0ghh',
        productReferenceToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0'
      };
      const requestObject = {
        href: '/v1/mobile-air-operations/feature/upgraded-boarding/3NSCML',
        method: 'PUT',
        body: requestBody
      };

      const { type, url, body } = await UpgradedBoardingApi.cancelReservation(requestObject);

      expect(url).to.equal(
        `${mockEnvironment.chapiAirOperations}/v1/mobile-air-operations/feature/upgraded-boarding/3NSCML`
      );
      expect(type).to.equal('PUT');
      expect(body).to.deep.equal(requestBody);
    });
  });

  context('when purchasing an upgraded boarding', () => {
    it('should pass correct parameters to API  when user is not loggedIn', async () => {
      const linkObj = {
        href: '/v1/mobile-air-operations/page/upgraded-boarding/A12345/confirmation',
        xhref: '/v1/mobile-air-operations/page/upgraded-boarding/A12345/x-confirmation',
        method: 'POST',
        body: { passengerSearchToken: 'testToken' }
      };

      const { type, url, body } = await UpgradedBoardingApi.purchaseUpgradedBoarding(linkObj, false);

      expect(url).to.equal(
        `${mockEnvironment.chapiAirOperations}/v1/mobile-air-operations/page/upgraded-boarding/A12345/confirmation`
      );
      expect(type).to.equal('POST');
      expect(body).to.deep.equal({ passengerSearchToken: 'testToken' });
    });

    it('should pass correct parameters to API when user loggedIn', async () => {
      const linkObj = {
        href: '/v1/mobile-air-operations/page/upgraded-boarding/A12345/confirmation',
        xhref: '/v1/mobile-air-operations/page/upgraded-boarding/A12345/x-confirmation',
        method: 'POST',
        body: { passengerSearchToken: 'testToken' }
      };

      const { type, url, body } = await UpgradedBoardingApi.purchaseUpgradedBoarding(linkObj, true);

      expect(url).to.equal(
        `${mockEnvironment.chapiAirOperations}/v1/mobile-air-operations/page/upgraded-boarding/A12345/x-confirmation`
      );
      expect(type).to.equal('POST');
      expect(body).to.deep.equal({ passengerSearchToken: 'testToken' });
    });
  });
});
