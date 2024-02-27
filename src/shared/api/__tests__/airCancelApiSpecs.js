import proxyquire from 'proxyquire';
import mockRestClient from 'test/unit/helpers/mockRestClient';
import { splitPnrLinkObjWithSelectedIdsAndEmailForAirCancel } from 'test/builders/model/selectPassengersPageBuilder';

describe('Air Cancel API', () => {
  const mockEnvironment = { chapiAirBooking: 'https://the.mobile.com' };
  let AirCancelApi;

  beforeEach(() => {
    AirCancelApi = proxyquire('src/shared/api/airCancelApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  context('CHAPI retrieveReservationForCancel', () => {
    it('should pass correct query parameters to API', () => {
      const cancelLink = {
        href: '/v1/mobile-air-booking/page/cancel-reservation/KFM5QV',
        method: 'GET',
        query: {
          'first-name': 'AMBER',
          'last-name': 'AWESOME'
        }
      };

      const expectQueryUrl = 'https://the.mobile.com/v1/mobile-air-booking/page/cancel-reservation/KFM5QV';

      return AirCancelApi.retrieveReservationForCancel(cancelLink, true).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(expectQueryUrl);
        expect(optionsSentToAjax.type).to.equal('GET');
        expect(optionsSentToAjax.query).to.deep.equal({
          'first-name': 'AMBER',
          'last-name': 'AWESOME'
        });
      });
    });
  });

  context('CHAPI retrieveRefundQuoteAndConfirmationForCancelBound', () => {
    it('should pass correct query parameters to API', () => {
      const cancelBoundQuoteRequest = {
        href: '/v1/mobile-air-booking/page/flights/cancel/refund-quote/TTIIZ9',
        method: 'POST',
        body: {
          passengerSearchToken: 'pToken',
          cancelToken: 'cToken',
          productIds: ['id1', 'id2', 'id3']
        }
      };

      const expectQueryUrl = 'https://the.mobile.com/v1/mobile-air-booking/page/flights/cancel/refund-quote/TTIIZ9';

      return AirCancelApi.retrieveRefundQuoteAndConfirmationForCancelBound(cancelBoundQuoteRequest, true).then(
        (optionsSentToAjax) => {
          expect(optionsSentToAjax.url).to.equal(expectQueryUrl);
          expect(optionsSentToAjax.type).to.equal('POST');
          expect(optionsSentToAjax.body).to.deep.equal({
            passengerSearchToken: 'pToken',
            cancelToken: 'cToken',
            productIds: ['id1', 'id2', 'id3']
          });
        }
      );
    });
  });

  context('CHAPI cancelReservation', () => {
    it('should pass correct query parameters to API', () => {
      const cancelLink = {
        href: '/v1/mobile-air-booking/page/cancel-reservation/BAT789',
        method: 'DELETE',
        query: {
          firstName: 'AMBER',
          lastName: 'AWESOME',
          refundRequested: true,
          boardingPassExists: false,
          receiptEmail: 'a@abc.com',
          isInternational: false
        }
      };

      const expectQueryUrl = 'https://the.mobile.com/v1/mobile-air-booking/page/cancel-reservation/BAT789';

      return AirCancelApi.cancelReservation(cancelLink, true).then((optionsSentToAjax) => {
        expect(optionsSentToAjax.url).to.equal(expectQueryUrl);
        expect(optionsSentToAjax.type).to.equal('DELETE');
        expect(optionsSentToAjax.query).to.deep.equal({
          firstName: 'AMBER',
          lastName: 'AWESOME',
          refundRequested: true,
          boardingPassExists: false,
          receiptEmail: 'a@abc.com',
          isInternational: false
        });
      });
    });
  });

  describe('retrieveSplitPnrReservation', () => {
    it('should pass correct parameters to API', async () => {
      const parameters = await AirCancelApi.retrieveSplitPnrReservation(
        splitPnrLinkObjWithSelectedIdsAndEmailForAirCancel
      );

      expect(parameters).to.eql({
        body: {
          passengerSearchToken: 'testToken',
          passengerIds: ['id1'],
          receiptEmail: 'test@test.com'
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'PUT',
        url: 'https://the.mobile.com/v1/mobile-air-booking/page/flights/cancel-bound/split-pnr/PPUWKZ'
      });
    });
  });
});
