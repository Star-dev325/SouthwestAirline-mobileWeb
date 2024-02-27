import mockRestClient from 'test/unit/helpers/mockRestClient';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('AirUpgradeApi', () => {
  const mockBody = {
    firstName: 'mockFirstName',
    lastName: 'mockLastName',
    passengerSearchToken: null,
    recordLocator: '4NWG2V'
  };
  const mockHref = 'v1/mobile-air-booking/page/upgrade/4NWG2V';
  const mockMethod = 'POST';
  let AirUpgradeApi;
  let mockEnvironment;
  let mockRemoveInitialForwardSlash;

  beforeEach(() => {
    mockEnvironment = {
      mobile: 'https://the.mobile.com',
      chapiAirBooking: 'https://the.operations.com'
    };
    mockRemoveInitialForwardSlash = sinon.stub();
    AirUpgradeApi = proxyquire('src/shared/api/airUpgradeApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment },
      'src/shared/helpers/urlHelper': {
        removeInitialForwardSlash: mockRemoveInitialForwardSlash.returns('v1/mobile-air-booking/page/upgrade/4NWG2V')
      }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when retrieving a reservation', () => {
    it('should pass correct parameters to API', () => {
      const mockRequestObject = {
        href: mockHref,
        body: mockBody,
        method: mockMethod
      };

      return AirUpgradeApi.retrieveReservation(mockRequestObject).then((request) => {
        const { url, type, body } = request;

        expect(url).to.equal(`${mockEnvironment.chapiAirBooking}/${mockHref}`);
        expect(type).to.equal(mockMethod);
        expect(body).to.deep.equal(mockBody);
        expect(mockRemoveInitialForwardSlash).to.have.been.calledWith(mockHref);
      });
    });

    it('should use default body value', () => {
      const mockRequestObject = {
        href: mockHref,
        method: mockMethod
      };

      return AirUpgradeApi.retrieveReservation(mockRequestObject).then((request) => {
        const { body } = request;

        expect(body).to.deep.equal({});
      });
    });
  });
});
