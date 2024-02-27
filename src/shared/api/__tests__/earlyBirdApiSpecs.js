import mockRestClient from 'test/unit/helpers/mockRestClient';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('EarlyBirdApi', () => {
  let EarlyBirdApi;
  let mockEnvironment;

  beforeEach(() => {
    mockEnvironment = {
      mobile: 'https://the.mobile.com',
      chapiAirBooking: 'https://the.airbooking.com'
    };

    EarlyBirdApi = proxyquire('src/shared/api/earlyBirdApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when retrieving a reservation', () => {
    it('should use the mobile url with record locator appended', async () => {
      const link = {
        href: '/v1/mobile-air-booking/page/early-bird/NAAHHN',
        method: 'GET',
        query: {
          ['first-name']: 'Mike',
          ['last-name']: 'Tangrila'
        }
      };

      const { type, url, query } = await EarlyBirdApi.retrieveReservation(link, true);

      expect(url).to.equal(`${mockEnvironment.chapiAirBooking}/v1/mobile-air-booking/page/early-bird/NAAHHN`);
      expect(type).to.equal('GET');
      expect(query).to.deep.equal({ 'first-name': 'Mike', 'last-name': 'Tangrila' });
    });

    it('should make correct retrieve reservation call when method is POST', async () => {
      const link = {
        href: '/v1/mobile-air-booking/page/view-early-bird/ABC123',
        method: 'POST',
        body: {
          passengerSearchToken: 'abc123456'
        }
      };

      const { type, url, body } = await EarlyBirdApi.retrieveReservation(link, true);

      expect(url).to.equal(`${mockEnvironment.chapiAirBooking}/v1/mobile-air-booking/page/view-early-bird/ABC123`);
      expect(type).to.equal('POST');
      expect(body).to.deep.equal({ passengerSearchToken: 'abc123456' });
    });
  });

  context('when purchase for earlyBird', () => {
    let purchaseRequestLink;

    beforeEach(() => {
      purchaseRequestLink = {
        body: {
          payment: {
            moneyTotalFare: 'moneyTotalFare',
            newCreditCard: 'newCreditCard',
            savedCreditCard: undefined
          },
          firstName: 'c',
          productIds: ['productId1', 'productId2'],
          lastName: 'chen',
          receiptEmail: 'ATERRIS@EXAMPLE.COM',
          recordLocator: 'PL4ND6'
        },
        href: '/v1/mobile-air-booking/page/early-bird/PL4ND6',
        xhref: '/v1/mobile-air-booking/page/x-early-bird/PL4ND6',
        method: 'POST'
      };
    });

    it('should call the protected url and pass the request body if user logged in', async () => {
      const ajaxStub = sinon.stub(mockRestClient, 'ajax');

      await EarlyBirdApi.purchase(purchaseRequestLink, true);

      expect(ajaxStub).to.have.been.calledWith(
        {
          contentType: 'application/json',
          dataType: 'json',
          type: 'POST',
          body: purchaseRequestLink.body,
          url: `${mockEnvironment.chapiAirBooking}/v1/mobile-air-booking/page/x-early-bird/PL4ND6`
        },
        true
      );
    });

    it('should call the unprotected url and pass the request body if user not logged in', async () => {
      const ajaxStub = sinon.stub(mockRestClient, 'ajax');

      await EarlyBirdApi.purchase(purchaseRequestLink, false);

      expect(ajaxStub).to.have.been.calledWith(
        {
          contentType: 'application/json',
          dataType: 'json',
          type: 'POST',
          body: purchaseRequestLink.body,
          url: `${mockEnvironment.chapiAirBooking}/v1/mobile-air-booking/page/early-bird/PL4ND6`
        },
        false
      );
    });
  });
});
