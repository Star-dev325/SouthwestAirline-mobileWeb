import proxyquire from 'proxyquire';
import mockRestClient from 'test/unit/helpers/mockRestClient';

describe('AirReaccomApi', () => {
  let mockEnvironment;
  let AirReaccomApi;

  beforeEach(() => {
    mockEnvironment = {
      chapiAirBooking: 'https://mobile.com/'
    };

    AirReaccomApi = proxyquire('src/shared/api/airReaccomApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  context('findFlightReaccomProducts', () => {
    it('should call chapi find enhanced reaccom flights when called with valid link params', async () => {
      const link = {
        href: '/v1/mobile-air-booking/page/flights/reaccom/reservations/current/S8JKW6',
        method: 'GET',
        query: {
          'first-name': 'Tang',
          'last-name': 'Phillips'
        }
      };

      await AirReaccomApi.findFlightReaccomProducts(link).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'https://mobile.com/v1/mobile-air-booking/page/flights/reaccom/reservations/current/S8JKW6'
        );
        expect(optionsSentToAjax.type).to.equal(link.method);
        expect(optionsSentToAjax.query).to.deep.equal(link.query);
      });
    });

    it('should make correct findFlightReaccomProducts call when method is POST', async () => {
      const link = {
        href: '/v1/mobile-air-booking/page/flights/reaccom/reservations/current/ABC123',
        method: 'POST',
        body: {
          passengerSearchToken: 'abc123456',
          firstName: 'Tang',
          lastName: 'Phillips'
        }
      };

      await AirReaccomApi.findFlightReaccomProducts(link).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(
          'https://mobile.com/v1/mobile-air-booking/page/flights/reaccom/reservations/current/ABC123'
        );
        expect(optionsSentToAjax.type).to.equal(link.method);
        expect(optionsSentToAjax.body).to.deep.equal(link.body);
      });
    });
  });

  context('findReaccomFlightShopping', () => {
    const link = {
      href: '/v1/mobile-air-booking/page/flights/reaccom/shopping',
      method: 'POST',
      body: {
        outbound: {
          date: '2019-10-03',
          'origin-airport': 'AUS',
          'destination-airport': 'DAL',
          isChangeBound: true
        },
        inbound: null,
        shareDataToken: 'token'
      }
    };

    it('should call chapi find reaccom flight shopping with valid params', async () => {
      await AirReaccomApi.findReaccomFlightShopping(link)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.equal(
            'https://mobile.com/v1/mobile-air-booking/page/flights/reaccom/shopping'
          );
          expect(optionsSentToAjax.type).to.equal(link.method);
          expect(optionsSentToAjax.body).to.deep.equal(link.body);
        });
    });
  });

  context('reaccomPurchase', () => {
    const link = {
      href: '/v1/mobile-air-booking/page/flights/reaccom/purchase',
      method: 'PUT',
      body: {
        reaccomProductIds: {
          inbound: 'inbound-id',
          outbound: 'outbound-id'
        },
        shareDataToken: 'token'
      }
    };

    it('should call chapi reaccom purchase with valid params', async () => {
      await AirReaccomApi.reaccomPurchase(link)
        .then((optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.equal(
            'https://mobile.com/v1/mobile-air-booking/page/flights/reaccom/purchase'
          );
          expect(optionsSentToAjax.type).to.equal(link.method);
          expect(optionsSentToAjax.body).to.deep.equal(link.body);
        });
    });
  });
});
