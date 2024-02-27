import { buildUpgradeFareReservationRequest, getPricingChangeRequests } from 'src/airUpgrade/helpers/upgradeFareHelper';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';

describe('upgradeFareHelper', () => {
  describe('buildUpgradeFareReservationRequest', () => {
    it('should return correct link object', () => {
      const pnr = {
        firstName: 'Joe',
        lastName: 'Rogan',
        passengerSearchToken: 'test',
        recordLocator: '4NWG2V',
        nonPremiumSearch: false
      };
      const linkObj = {
        href: `/v1/mobile-air-booking/page/upgrade/4NWG2V`,
        body: {
          firstName: 'Joe',
          lastName: 'Rogan',
          passengerSearchToken: 'test',
          recordLocator: '4NWG2V',
          nonPremiumSearch: false
        },
        method: 'POST'
      };

      expect(buildUpgradeFareReservationRequest(pnr)).to.eql(linkObj);
    });
  });

  describe('getPricingChangeRequests', () => {
    const outboundChangeRequest = {
      productId: null,
      boundReference: 'mock bound reference 1'
    };
    const inboundChangeRequest = {
      productId: null,
      boundReference: 'mock bound reference 2'
    };
    const outboundSelectedProduct = {
      productId: 'mockId1',
      departureAirportCode: 'DAL',
      arrivalAirportCode: 'HOU'
    };
    const inboundSelectedProduct = {
      productId: 'mockId2',
      arrivalAirportCode: 'DAL',
      departureAirportCode: 'HOU'
    };
    const changeRequestsDefault = [outboundChangeRequest, inboundChangeRequest];

    it('should build a pricing request body with 2 change requests and 2 selected products', () => {
      const changePricingLink = { body: { changeRequests: changeRequestsDefault, fundsAppliedToken: '' } };
      const { boundSelectionDataList } = new AirUpgradeViewReservationApiJsonBuilder().build()
        .viewUpgradeReservationPage;
      const pricingDataList = new AirUpgradeViewReservationApiJsonBuilder().withBothBoundsSelected().build()
        .viewUpgradeReservationPage.pricingDataList;

      const expectedResult = {
        changeRequests: [
          {
            ...outboundChangeRequest,
            productId: outboundSelectedProduct.productId,
            arrivalAirportCode: outboundSelectedProduct.arrivalAirportCode,
            departureAirportCode: outboundSelectedProduct.departureAirportCode
          },
          {
            ...inboundChangeRequest,
            productId: inboundSelectedProduct.productId,
            arrivalAirportCode: inboundSelectedProduct.arrivalAirportCode,
            departureAirportCode: inboundSelectedProduct.departureAirportCode
          }
        ],
        fundsAppliedToken: ''
      };
      const result = getPricingChangeRequests(changePricingLink, pricingDataList, boundSelectionDataList);

      expect(result).to.eql(expectedResult);
    });

    it('should build a pricing request body with 2 change requests and 1 selected outbound product', () => {
      const changePricingLink = { body: { changeRequests: changeRequestsDefault, fundsAppliedToken: '' } };
      const { boundSelectionDataList } = new AirUpgradeViewReservationApiJsonBuilder().build()
        .viewUpgradeReservationPage;
      const pricingDataList = new AirUpgradeViewReservationApiJsonBuilder().withFirstBoundSelected().build()
        .viewUpgradeReservationPage.pricingDataList;

      const expectedResult = {
        changeRequests: [
          {
            ...outboundChangeRequest,
            productId: outboundSelectedProduct.productId,
            arrivalAirportCode: outboundSelectedProduct.arrivalAirportCode,
            departureAirportCode: outboundSelectedProduct.departureAirportCode
          },
          inboundChangeRequest
        ],
        fundsAppliedToken: ''
      };
      const result = getPricingChangeRequests(changePricingLink, pricingDataList, boundSelectionDataList);

      expect(result).to.eql(expectedResult);
    });

    it('should build a pricing request body with 2 change requests and 1 selected inbound product', () => {
      const changePricingLink = {
        body: { changeRequests: changeRequestsDefault, fundsAppliedToken: 'mockAppliedFundsToken' }
      };
      const { boundSelectionDataList } = new AirUpgradeViewReservationApiJsonBuilder().build()
        .viewUpgradeReservationPage;
      const pricingDataList = new AirUpgradeViewReservationApiJsonBuilder().withReturningBoundSelected().build()
        .viewUpgradeReservationPage.pricingDataList;

      const expectedResult = {
        changeRequests: [
          outboundChangeRequest,
          {
            ...inboundChangeRequest,
            productId: inboundSelectedProduct.productId,
            arrivalAirportCode: inboundSelectedProduct.arrivalAirportCode,
            departureAirportCode: inboundSelectedProduct.departureAirportCode
          }
        ],
        fundsAppliedToken: 'mockAppliedFundsToken'
      };
      const result = getPricingChangeRequests(changePricingLink, pricingDataList, boundSelectionDataList);

      expect(result).to.eql(expectedResult);
    });
  });
});
