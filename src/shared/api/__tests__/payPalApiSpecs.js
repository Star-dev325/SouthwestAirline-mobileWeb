import proxyquire from 'proxyquire';
import mockRestClient from 'test/unit/helpers/mockRestClient';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('PayPalApi', () => {
  let PayPalApi;
  let mockEnvironment;
  const generatedRequest = {
    url: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/feature/paypal/merchant-token',
    type: 'POST',
    body: {
      totalFare: { value: '100.25', currencyCode: 'USD' },
      redirectURLs: {
        cancelURL: 'https://mobile.southwest.com/cancel',
        returnURL: 'https://mobile.southwest.com/return'
      }
    },
    contentType: 'application/json',
    dataType: 'json'
  };

  beforeEach(() => {
    mockEnvironment = {
      chapiAirBooking: 'http://mobile-air-booking.chapi.com'
    };

    sinon.stub(mockRestClient, 'ajax');
    PayPalApi = proxyquire('src/shared/api/payPalApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('createPayPalToken', () => {
    let request;

    beforeEach(() => {
      request = {
        totalFare: {
          value: '100.25',
          currencyCode: 'USD'
        },
        redirectURLs: {
          cancelURL: 'https://mobile.southwest.com/cancel',
          returnURL: 'https://mobile.southwest.com/return'
        }
      };
    });

    it('should call CHAPI paypal merchant token', () => {
      PayPalApi.createPayPalToken(request, false);
      expect(mockRestClient.ajax).to.have.been.calledWith(generatedRequest, false);
    });

    it('should pass is logged in when call CHAPI paypal merchant token with logged in', () => {
      PayPalApi.createPayPalToken(request, true);
      expect(mockRestClient.ajax).to.have.been.calledWith(generatedRequest, true);
    });
  });
});
