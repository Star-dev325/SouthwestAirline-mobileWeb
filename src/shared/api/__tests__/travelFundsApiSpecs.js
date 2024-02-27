import proxyquire from 'proxyquire';
import mockRestClient from 'test/unit/helpers/mockRestClient';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('TravelFundsApi', () => {
  let TravelFundsApi;
  let mockEnvironment;

  beforeEach(() => {
    mockEnvironment = {
      chapiAirBooking: 'http://mobile-air-booking.chapi.com'
    };

    sinon.stub(mockRestClient, 'ajax').resolves({});
    TravelFundsApi = proxyquire('src/shared/api/travelFundsApi', {
      'src/shared/api/restClient': mockRestClient,
      'src/shared/api/apiRoutes': { default: mockEnvironment }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('unused travel funds', () => {
    it('should call retrieveTravelFunds api', async () => {
      const unusedFundsRequest = {
        href: 'v1/mobile-air-booking/page/view-fund',
        method: 'GET'
      };
      const result = await TravelFundsApi.retrieveTravelFunds(unusedFundsRequest, true);

      expect(mockRestClient.ajax).to.have.been.calledWith(
        {
          url: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/view-fund',
          type: 'GET',
          contentType: 'application/json',
          dataType: 'json',
          body: undefined
        },
        true
      );
      expect(result).to.deep.equal({});
    });
  });

  context('lookup travel funds', () => {
    const travelFundsGeneratedRequest = {
      url: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/view-fund/TRAVEL_FUNDS',
      type: 'POST',
      body: {
        travelFundIdentifier: 'ABC123',
        firstName: 'Firstname',
        lastName: 'Lastname'
      },
      contentType: 'application/json',
      dataType: 'json'
    };

    const travelFundsRequest = {
      href: '/v1/mobile-air-booking/page/view-fund/TRAVEL_FUNDS',
      method: 'POST',
      body: {
        travelFundIdentifier: 'ABC123',
        firstName: 'Firstname',
        lastName: 'Lastname'
      }
    };

    const luvVoucherGeneratedRequest = {
      url: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/view-fund/LUV_VOUCHER',
      type: 'POST',
      body: {
        travelFundIdentifier: '1234567890123456',
        securityCode: '1234'
      },
      contentType: 'application/json',
      dataType: 'json'
    };

    const luvVoucherRequest = {
      href: '/v1/mobile-air-booking/page/view-fund/LUV_VOUCHER',
      method: 'POST',
      body: {
        travelFundIdentifier: '1234567890123456',
        securityCode: '1234'
      }
    };

    const giftCardGeneratedRequest = {
      url: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/view-fund/GIFT_CARD',
      type: 'POST',
      body: {
        travelFundIdentifier: '1234567890123456',
        securityCode: '1234'
      },
      contentType: 'application/json',
      dataType: 'json'
    };

    const giftCardRequest = {
      href: '/v1/mobile-air-booking/page/view-fund/GIFT_CARD',
      method: 'POST',
      body: {
        travelFundIdentifier: '1234567890123456',
        securityCode: '1234'
      }
    };

    const validateTransferRequest = {
      body: {
        fundSearchToken: 'fundToken'
      },
      labelText: 'labelText',
      href: '/v1/mobile-air-booking/page/validate-transfer',
      method: 'PUT'
    };

    const validateTransferGeneratedRequest = {
      url: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/validate-transfer',
      type: 'PUT',
      body: {
        fundSearchToken: 'fundToken'
      },
      contentType: 'application/json',
      dataType: 'json'
    };

    const transferTravelFundsRequest = {
      body: {
        fundSearchToken: 'fundToken',
        recipientFirstName: 'Chandler',
        recipientLastName: 'Bing',
        recipientAccountNumber: '601940404',
        recipientEmailAddress: 'chandler@bing.com',
        personalMessage: 'personal message',
        receiptEmailAddress: 'e@a.com',
        transferAmount: {
          currencySymbol: '$',
          currencyType: 'USD',
          amount: '10.00'
        }
      },
      labelText: 'labelText',
      href: '/v1/mobile-air-booking/page/transfer-fund',
      method: 'POST'
    };

    const transferTravelFundsGeneratedRequest = {
      url: 'http://mobile-air-booking.chapi.com/v1/mobile-air-booking/page/transfer-fund',
      type: 'POST',
      body: {
        fundSearchToken: 'fundToken',
        recipientFirstName: 'Chandler',
        recipientLastName: 'Bing',
        recipientAccountNumber: '601940404',
        recipientEmailAddress: 'chandler@bing.com',
        personalMessage: 'personal message',
        receiptEmailAddress: 'e@a.com',
        transferAmount: {
          currencySymbol: '$',
          currencyType: 'USD',
          amount: '10.00'
        }
      },
      contentType: 'application/json',
      dataType: 'json'
    };

    it('should call travel funds API for RTF', async () => {
      const result = await TravelFundsApi.retrieveTravelFunds(travelFundsRequest);

      expect(mockRestClient.ajax).to.have.been.calledWith(travelFundsGeneratedRequest, false);
      expect(result).to.deep.equal({});
    });

    it('should call travel funds API for LUV Voucher', async () => {
      const result = await TravelFundsApi.retrieveTravelFunds(luvVoucherRequest);

      expect(mockRestClient.ajax).to.have.been.calledWith(luvVoucherGeneratedRequest, false);
      expect(result).to.deep.equal({});
    });

    it('should call travel funds API for Gift Card', async () => {
      const result = await TravelFundsApi.retrieveTravelFunds(giftCardRequest);

      expect(mockRestClient.ajax).to.have.been.calledWith(giftCardGeneratedRequest, false);
      expect(result).to.deep.equal({});
    });

    it('should call travel funds API for validate transfer', async () => {
      const result = await TravelFundsApi.retrieveTravelFunds(validateTransferRequest, true);

      expect(mockRestClient.ajax).to.have.been.calledWith(validateTransferGeneratedRequest, true);
      expect(result).to.deep.equal({});
    });

    it('should call travel funds API for transfer travel funds', async () => {
      const result = await TravelFundsApi.retrieveTravelFunds(transferTravelFundsRequest, true);

      expect(mockRestClient.ajax).to.have.been.calledWith(transferTravelFundsGeneratedRequest, true);
      expect(result).to.deep.equal({});
    });
  });
});
