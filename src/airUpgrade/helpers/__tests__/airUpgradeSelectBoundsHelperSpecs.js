import {
  flattenUpgradeBounds,
  updateSelectedPricingData,
  addPoints
} from 'src/airUpgrade/helpers/airUpgradeSelectBoundsHelper';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';

describe('airUpgradePurchaseHelper', () => {
  context('flattenUpgradeBounds', () => {
    it('should flatten a viewUpgradeReservationPage object in a CHAPI response to an object containing an array of boundSelectionData objects and an array of pricingData objects', () => {
      const { viewUpgradeReservationPage } = new AirUpgradeViewReservationApiJsonBuilder().apiResponse;
      const expectedResult = {
        boundSelectionDataList: [{
          arrivalAirportCode: 'HOU',
          arrivalTime: '15:40',
          boundType: 'DEPARTING',
          canUpgrade: true,
          departureAirportCode: 'DAL',
          departureDate: '2021-12-29',
          departureDayOfWeek: 'Wednesday',
          departureTime: '09:10',
          isNextDayArrival: false,
          isOvernight: false,
          productId: 'mockId1',
          upgradeMessageBody: 'and earn 6,937 more points',
          upgradeMessageHeader: 'Upgrade all passengers to Business Select®'
        }, {
          arrivalAirportCode: 'DAL',
          arrivalTime: '13:30',
          boundType: 'RETURNING',
          canUpgrade: true,
          departureAirportCode: 'HOU',
          departureDate: '2022-01-05',
          departureDayOfWeek: 'Wednesday',
          departureTime: '09:05',
          isNextDayArrival: false,
          isOvernight: false,
          productId: 'mockId2',
          upgradeMessageBody: 'and earn 6,937 more points',
          upgradeMessageHeader: 'Upgrade all passengers to Business Select®'
        }],
        upgradeablePricingDataList: [{
          arrivalAirportCode: 'HOU',
          boundType: 'DEPARTING',
          canUpgrade: true,
          departureAirportCode: 'DAL',
          flight: '539/1467',
          isSelected: false,
          numberOfPassengers: 2,
          productId: 'mockId1',
          upgradePrice: {
            amount: '30.11',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          upgradeTotalPrice: {
            amount: '60.22',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }, {
          arrivalAirportCode: 'DAL',
          boundType: 'RETURNING',
          canUpgrade: true,
          departureAirportCode: 'HOU',
          flight: '694/696',
          isSelected: false,
          numberOfPassengers: 2,
          productId: 'mockId2',
          upgradePrice: {
            amount: '30.09',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          upgradeTotalPrice: {
            amount: '60.22',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }]
      };
      const result = flattenUpgradeBounds(viewUpgradeReservationPage.upgradeBounds);

      expect(result).to.eql(expectedResult);
    });

    it('should flatten a viewUpgradeReservationPage object in a CHAPI response to an object containing an array of boundSelectionData objects and an array of pricingData objects with overnight indicator', () => {
      const { viewUpgradeReservationPage } = new AirUpgradeViewReservationApiJsonBuilder().withOvernight().apiResponse;
      const expectedResult = [
        {
          arrivalAirportCode: 'HOU',
          arrivalTime: '15:40',
          boundType: 'DEPARTING',
          canUpgrade: true,
          departureAirportCode: 'DAL',
          departureDate: '2021-12-29',
          departureDayOfWeek: 'Wednesday',
          departureTime: '09:10',
          isNextDayArrival: false,
          isOvernight: true,
          productId: 'mockId1',
          upgradeMessageBody: 'and earn 6,937 more points',
          upgradeMessageHeader: 'Upgrade all passengers to Business Select®'
        },
        {
          arrivalAirportCode: 'DAL',
          arrivalTime: '13:30',
          boundType: 'RETURNING',
          canUpgrade: true,
          departureAirportCode: 'HOU',
          departureDate: '2022-01-05',
          departureDayOfWeek: 'Wednesday',
          departureTime: '09:05',
          isNextDayArrival: false,
          isOvernight: false,
          productId: 'mockId2',
          upgradeMessageBody: 'and earn 6,937 more points',
          upgradeMessageHeader: 'Upgrade all passengers to Business Select®'
        }
      ];
      const result = flattenUpgradeBounds(viewUpgradeReservationPage.upgradeBounds);

      expect(result.boundSelectionDataList).to.eql(expectedResult);
    });

    it('should flatten a viewUpgradeReservationPage object in a CHAPI response to an object containing an array of boundSelectionData objects and an array of pricingData objects with next day indicator', () => {
      const { viewUpgradeReservationPage } = new AirUpgradeViewReservationApiJsonBuilder().withNextDay().apiResponse;
      const expectedResult = [
        {
          arrivalAirportCode: 'HOU',
          arrivalTime: '15:40',
          boundType: 'DEPARTING',
          canUpgrade: true,
          departureAirportCode: 'DAL',
          departureDate: '2021-12-29',
          departureDayOfWeek: 'Wednesday',
          departureTime: '09:10',
          isNextDayArrival: true,
          isOvernight: false,
          productId: 'mockId1',
          upgradeMessageBody: 'and earn 6,937 more points',
          upgradeMessageHeader: 'Upgrade all passengers to Business Select®'
        },
        {
          arrivalAirportCode: 'DAL',
          arrivalTime: '13:30',
          boundType: 'RETURNING',
          canUpgrade: true,
          departureAirportCode: 'HOU',
          departureDate: '2022-01-05',
          departureDayOfWeek: 'Wednesday',
          departureTime: '09:05',
          isNextDayArrival: false,
          isOvernight: false,
          productId: 'mockId2',
          upgradeMessageBody: 'and earn 6,937 more points',
          upgradeMessageHeader: 'Upgrade all passengers to Business Select®'
        }
      ];
      const result = flattenUpgradeBounds(viewUpgradeReservationPage.upgradeBounds);

      expect(result.boundSelectionDataList).to.eql(expectedResult);
    });
  });

  context('updateSelectedPricingData', () => {
    it('should update the isSelectedProperty of the pricingData object that matches the productId', () => {
      const selectedIndex = 0;
      const { pricingDataList } = new AirUpgradeViewReservationApiJsonBuilder().build().viewUpgradeReservationPage;
      const pricingData = { ...pricingDataList[selectedIndex] };

      expect(pricingData.isSelected).to.be.false;

      const { productId } = pricingData;
      const result = updateSelectedPricingData(pricingDataList, { productId, isSelected: true })[selectedIndex];

      expect(result.isSelected).to.be.true;
    });
  });

  context('addPoints', () => {
    it('it should produce a result that adds the upgrade total points together', () => {
      const pricingDataList = new AirUpgradeViewReservationApiJsonBuilder()
        .withPointsBooking()
        .build()
        .viewUpgradeReservationPage.pricingDataList.map(({ upgradeTotalPrice }) => ({
          ...upgradeTotalPrice,
          amount: '6,000.00'
        }));

      const result = addPoints(...pricingDataList);
      const expectedResult = {
        amount: '12,000',
        currencyCode: 'PTS',
        currencySymbol: ''
      };

      expect(result).to.eql(expectedResult);
    });

    it('should return a value of 0 if it is passed an empty array or no parameters are passed', () => {
      const result = addPoints(...[]);
      const result2 = addPoints();
      const expectedResult = {
        amount: '0',
        currencyCode: 'PTS',
        currencySymbol: ''
      };

      expect(result).to.eql(expectedResult);
      expect(result2).to.eql(expectedResult);
    });
  });
});
