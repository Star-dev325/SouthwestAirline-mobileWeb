import _ from 'lodash';

import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import {
  createMktgDataSelector,
  getFareData,
  getFareDifferencesData,
  getFarePrice,
  getSortedFareProducts,
  getStopData,
  getFarePriceDifference,
  parseFareValue
} from 'src/shared/analytics/helpers/mktgHelper';
import mktgDataConstants from 'src/shared/constants/mktgDataConstants';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('mktgHelper', () => {
  const {
    NOT_AVAILABLE,
    NOT_SELECTED,
    DIRECT_FLIGHT,
    CONNECTING_FLIGHT,
    NONSTOP_FLIGHT,
    CURRENCY_BOOKING,
    POINTS_BOOKING
  } = mktgDataConstants;
  const priceMap = {
    BUS: '400',
    ANY: '300',
    PLU: '200',
    WGA: '100'
  };
  const getMockProducts = () =>
    new ProductsBuilder().withProductDefinitions().build().flightShoppingPage.productDefinitions.products;

  const getMockFares = (fares, isChangeFlow = false) =>
    fares.map((fareProductId) => ({
      _meta: { fareProductId },
      ...(isChangeFlow
        ? { priceDifference: { amount: priceMap[fareProductId], sign: '-' } }
        : { price: { amount: priceMap[fareProductId] } })
    }));
  const products = getMockProducts();
  const productIds = [...products.map(({ productId }) => productId)];
  const unselectedFares = productIds.map(() => NOT_SELECTED);

  describe('createMktgDataSelector', () => {
    it('should be an HOF that returns a method that returns the state value at the specified path', () => {
      const mockMktgData = { ...globalMktgState, data: 'mock mktg data' };
      const path = 'mock.path.to.mktg_data';
      const defaultValue = { data: 'mock default value' };
      const state = _.set({}, path, mockMktgData);
      const getMarketingData = createMktgDataSelector(path, defaultValue);
      const result = getMarketingData(state);

      expect(result).toStrictEqual(mockMktgData);
    });

    it('should be an HOF that returns a method that returns a default value if the state value at the specified path does not exist', () => {
      const state = {};
      const path = 'mock.path.to.mktg_data';
      const defaultValue = { ...globalMktgState, data: 'mock default value' };
      const mktgDataSelector = createMktgDataSelector(path, defaultValue);
      const result = mktgDataSelector(state);

      expect(result).toStrictEqual(defaultValue);
    });
  });

  describe('parseFareValue', () => {
    let mockFareValue;

    beforeEach(() => {
      mockFareValue = jest.fn();
    });

    it('should "pass through" string values...i.e. if it is passed a string representing an unavailable fare ("zero") or an unselected fare ("none"), it should return the string unchanged', () => {
      const fare = NOT_AVAILABLE;
      const fare2 = NOT_SELECTED;

      expect(parseFareValue(fare, mockFareValue)).toStrictEqual(NOT_AVAILABLE);
      expect(parseFareValue(fare2, mockFareValue)).toStrictEqual(NOT_SELECTED);
      expect(mockFareValue).not.toHaveBeenCalled();
    });

    it('should return "zero" for fares that are unavailable regardless of the property being parsed', () => {
      const mockFare = _.merge({}, getMockFares(productIds)[0]);

      _.set(mockFare, 'reasonIfUnavailable', 'Unavailable');

      expect(parseFareValue(mockFare, mockFareValue)).toStrictEqual(NOT_AVAILABLE);
      expect(mockFareValue).not.toHaveBeenCalled();
    });

    it('should call the fareValue method provided if the fare is available', () => {
      const mockFare = _.merge({}, getMockFares(productIds)[0]);

      parseFareValue(mockFare, mockFareValue);

      expect(mockFareValue).toHaveBeenCalledWith(mockFare);
    });
  });

  describe('getFarePrice', () => {
    it('should return the of the value of the property discountedPrice.amount of a fare object if it is available', () => {
      const discountedAmount = 'mock discounted amount';
      const amount = 'mock amount';
      const fare = { discountedPrice: { amount: discountedAmount }, price: { amount } };

      expect(getFarePrice(fare)).toStrictEqual(discountedAmount);
    });

    it('should return the of the value of the property price.amount of a fare object if discountedPrice.amount property is not available', () => {
      const amount = 'mock amount';
      const fare = _.set({}, 'price.amount', amount);

      expect(getFarePrice(fare)).toStrictEqual(amount);
    });

    it('should return the value of "unavailable" if neither the price.amount or discountedPrice.amount properties exist on a fare object', () => {
      expect(getFarePrice({})).toStrictEqual('unavailable');
    });

    it('should return a value of "zero" if the price.amount equals 0', () => {
      const amount = 0;
      const fare = { price: { amount } };

      expect(getFarePrice(fare)).toStrictEqual('zero');
    });

    it('should return a value of "zero" if the discounted.amount equals 0', () => {
      const amount = 0;
      const incorrectAmount = 10;
      const fare = { discountedPrice: { amount }, price: { amount: incorrectAmount } };

      expect(getFarePrice(fare)).toStrictEqual('zero');
    });

    it('should return a value of without comma', () => {
      const amount = '12,000';
      const fare = { price: { amount } };

      expect(getFarePrice(fare)).toStrictEqual('12000');
    });
  });

  describe('getFarePriceDifference', () => {
    it('should return the of the priceDifference.amount of a fare object', () => {
      const amount = '200';
      const sign = '+';
      const fare = { priceDifference: { amount, sign } };

      expect(getFarePriceDifference(fare)).toStrictEqual(amount);
    });

    it('should include the negative sign in the return the of the priceDifference.amount if the sign property is negative', () => {
      const amount = '200';
      const sign = '-';
      const fare = { priceDifference: { amount, sign } };

      expect(getFarePriceDifference(fare)).toStrictEqual(`${sign}${amount}`);
    });

    it('should return the value of "unavailable" if the expected property does not exist', () => {
      expect(getFarePriceDifference({})).toStrictEqual(NOT_AVAILABLE);
    });

    it('should return a value of "zero" if the priceDifference.amount equals 0', () => {
      const amount = 0;
      const fare = { priceDifference: { amount } };

      expect(getFarePriceDifference(fare)).toStrictEqual('zero');
    });

    it('should call toNumberStringWihtoutCommas to remove a comma', () => {
      const amount = '12,000';
      const sign = '+';
      const fare = { priceDifference: { amount, sign } };

      expect(getFarePriceDifference(fare)).toStrictEqual('12000');
    });
  });

  describe('getSortedFareProducts', () => {
    const product1 = { productId: 'PROD1', rowOrder: 1 };
    const product2 = { productId: 'PROD2', rowOrder: 2 };
    const product3 = { productId: 'PROD3', rowOrder: 3 };
    const sortedProducts = [product3, product2, product1];

    it('should sort fareProducts by rowIndex from greatest to least', () => {
      const expectedResult = sortedProducts;
      const result1 = getSortedFareProducts([product1, product2, product3]);
      const result2 = getSortedFareProducts([product1, product3, product2]);
      const result3 = getSortedFareProducts([product3, product1, product2]);

      expect(result1).toStrictEqual(expectedResult);
      expect(result2).toStrictEqual(expectedResult);
      expect(result3).toStrictEqual(expectedResult);
    });
  });

  describe('getFareData', () => {
    const sortedFareProducts = getSortedFareProducts(products);

    it('should use the first argument as the starting name of each propety in the returned marketing object', () => {
      const propPrefix = 'mock_prop_prefix';
      const data = getFareData(propPrefix, unselectedFares, sortedFareProducts, CURRENCY_BOOKING);

      expect(Object.keys(data).every((key) => key.includes(propPrefix))).toBeTruthy();
    });

    it('it should convert an array of string values representing an array of unselected fares to a marketing object representing unselected fares', () => {
      const propPrefix = 'mock_prop_prefix';
      const result = getFareData(propPrefix, unselectedFares, products, CURRENCY_BOOKING);
      const expectedResult = {
        mock_prop_prefix_viewfaretypes: 'WGA|ANY|BUS',
        mock_prop_prefix_viewfareproductids: 'WGA|ANY|BUS',
        mock_prop_prefix_viewfarecurrency: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        mock_prop_prefix_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        mock_prop_prefix_viewfareproductid1: 'WGA',
        mock_prop_prefix_viewfaretype1: 'WGA',
        mock_prop_prefix_viewfarecurrency1: NOT_SELECTED,
        mock_prop_prefix_viewfarepoints1: NOT_SELECTED,
        mock_prop_prefix_viewfareproductid2: 'ANY',
        mock_prop_prefix_viewfaretype2: 'ANY',
        mock_prop_prefix_viewfarecurrency2: NOT_SELECTED,
        mock_prop_prefix_viewfarepoints2: NOT_SELECTED,
        mock_prop_prefix_viewfareproductid3: 'BUS',
        mock_prop_prefix_viewfaretype3: 'BUS',
        mock_prop_prefix_viewfarecurrency3: NOT_SELECTED,
        mock_prop_prefix_viewfarepoints3: NOT_SELECTED
      };

      expect(result).toStrictEqual(expectedResult);
    });

    it('should have the expected result format for the sendToDataLayer call when passed an array of fares', () => {
      const propPrefix = 'mock_prop_prefix';
      const CHAPIResponse = getMockFares(productIds);
      const result = getFareData(propPrefix, CHAPIResponse, sortedFareProducts, CURRENCY_BOOKING);
      const expectedResult = {
        mock_prop_prefix_viewfaretypes: 'BUS|ANY|WGA',
        mock_prop_prefix_viewfareproductids: 'BUS|ANY|WGA',
        mock_prop_prefix_viewfarecurrency: `${priceMap['BUS']}|${priceMap['ANY']}|${priceMap['WGA']}`,
        mock_prop_prefix_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        mock_prop_prefix_viewfareproductid1: 'BUS',
        mock_prop_prefix_viewfaretype1: 'BUS',
        mock_prop_prefix_viewfarecurrency1: priceMap['BUS'],
        mock_prop_prefix_viewfarepoints1: NOT_SELECTED,
        mock_prop_prefix_viewfareproductid2: 'ANY',
        mock_prop_prefix_viewfaretype2: 'ANY',
        mock_prop_prefix_viewfarecurrency2: priceMap['ANY'],
        mock_prop_prefix_viewfarepoints2: NOT_SELECTED,
        mock_prop_prefix_viewfareproductid3: 'WGA',
        mock_prop_prefix_viewfaretype3: 'WGA',
        mock_prop_prefix_viewfarecurrency3: priceMap['WGA'],
        mock_prop_prefix_viewfarepoints3: NOT_SELECTED
      };

      expect(result).toStrictEqual(expectedResult);
    });

    it('it should use getFarePriceDifference to parse out the amount if it is provided', () => {
      const propPrefix = 'mock_prop_prefix';
      const CHAPIResponse = getMockFares(productIds, true);
      const result = getFareData(
        propPrefix,
        CHAPIResponse,
        sortedFareProducts,
        CURRENCY_BOOKING,
        getFarePriceDifference
      );
      const expectedResult = {
        mock_prop_prefix_viewfaretypes: 'BUS|ANY|WGA',
        mock_prop_prefix_viewfareproductids: 'BUS|ANY|WGA',
        mock_prop_prefix_viewfarecurrency: `${-priceMap['BUS']}|${-priceMap['ANY']}|${-priceMap['WGA']}`,
        mock_prop_prefix_viewfarepoints: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        mock_prop_prefix_viewfareproductid1: 'BUS',
        mock_prop_prefix_viewfaretype1: 'BUS',
        mock_prop_prefix_viewfarecurrency1: `-${priceMap['BUS']}`,
        mock_prop_prefix_viewfarepoints1: NOT_SELECTED,
        mock_prop_prefix_viewfareproductid2: 'ANY',
        mock_prop_prefix_viewfaretype2: 'ANY',
        mock_prop_prefix_viewfarecurrency2: `-${priceMap['ANY']}`,
        mock_prop_prefix_viewfarepoints2: NOT_SELECTED,
        mock_prop_prefix_viewfareproductid3: 'WGA',
        mock_prop_prefix_viewfaretype3: 'WGA',
        mock_prop_prefix_viewfarecurrency3: `-${priceMap['WGA']}`,
        mock_prop_prefix_viewfarepoints3: NOT_SELECTED
      };

      expect(result).toStrictEqual(expectedResult);
    });

    it('should have the expected result format for the sendToDataLayer call including a value of "zero" for a fare type that is missing', () => {
      const propPrefix = 'mock_prop_prefix';
      const CHAPIResponse = getMockFares([...productIds]).map((fare) => {
        if (fare._meta.fareProductId === 'WGA') {
          _.set(fare, 'reasonIfUnavailable', 'not available');
        }

        return fare;
      });
      const result = getFareData(propPrefix, CHAPIResponse, sortedFareProducts, POINTS_BOOKING);
      const expectedResult = {
        mock_prop_prefix_viewfaretypes: 'BUS|ANY|WGA',
        mock_prop_prefix_viewfareproductids: 'BUS|ANY|WGA',
        mock_prop_prefix_viewfarecurrency: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        mock_prop_prefix_viewfarepoints: `${priceMap['BUS']}|${priceMap['ANY']}|${NOT_AVAILABLE}`,
        mock_prop_prefix_viewfareproductid1: 'BUS',
        mock_prop_prefix_viewfaretype1: 'BUS',
        mock_prop_prefix_viewfarecurrency1: NOT_SELECTED,
        mock_prop_prefix_viewfarepoints1: priceMap['BUS'],
        mock_prop_prefix_viewfareproductid2: 'ANY',
        mock_prop_prefix_viewfaretype2: 'ANY',
        mock_prop_prefix_viewfarecurrency2: NOT_SELECTED,
        mock_prop_prefix_viewfarepoints2: priceMap['ANY'],
        mock_prop_prefix_viewfareproductid3: 'WGA',
        mock_prop_prefix_viewfaretype3: 'WGA',
        mock_prop_prefix_viewfarecurrency3: NOT_SELECTED,
        mock_prop_prefix_viewfarepoints3: NOT_AVAILABLE
      };

      expect(result).toStrictEqual(expectedResult);
    });

    it('should have the expected result format for the sendToDataLayer call including a value of NOT_AVAILABLE for a productID that is not available', () => {
      const propPrefix = 'mock_prop_prefix';
      const productIdsMock = ['BUS', 'WGA'];

      const CHAPIResponse = getMockFares([...productIdsMock]).map((fare) => {
        if (fare._meta.fareProductId === 'WGA') {
          _.set(fare, 'reasonIfUnavailable', 'not available');
        }

        return fare;
      });
      const result = getFareData(propPrefix, CHAPIResponse, sortedFareProducts, POINTS_BOOKING);
      const expectedResult = {
        mock_prop_prefix_viewfaretypes: 'BUS|ANY|WGA',
        mock_prop_prefix_viewfareproductids: 'BUS|ANY|WGA',
        mock_prop_prefix_viewfarecurrency: `${NOT_SELECTED}|${NOT_SELECTED}|${NOT_SELECTED}`,
        mock_prop_prefix_viewfarepoints: `${priceMap['BUS']}|${NOT_AVAILABLE}|${NOT_AVAILABLE}`,
        mock_prop_prefix_viewfareproductid1: 'BUS',
        mock_prop_prefix_viewfaretype1: 'BUS',
        mock_prop_prefix_viewfarecurrency1: NOT_SELECTED,
        mock_prop_prefix_viewfarepoints1: priceMap['BUS'],
        mock_prop_prefix_viewfareproductid2: 'ANY',
        mock_prop_prefix_viewfaretype2: 'ANY',
        mock_prop_prefix_viewfarecurrency2: NOT_SELECTED,
        mock_prop_prefix_viewfarepoints2: NOT_AVAILABLE,
        mock_prop_prefix_viewfareproductid3: 'WGA',
        mock_prop_prefix_viewfaretype3: 'WGA',
        mock_prop_prefix_viewfarecurrency3: NOT_SELECTED,
        mock_prop_prefix_viewfarepoints3: NOT_AVAILABLE
      };

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('getFareDifferencesData', () => {
    const mockFareDifferences = ['+30', '+227', '-22', '0', '+279', 'invalid'];
    const mockPointDifferences = ['+3000', '+2287', '-2882', '0', '+2789', 'invalid'];
    const propPrefix1 = 'mock_prop_prefix';

    it('should use propPrefix1 and propPrefix2 to create property names', () => {
      const propPrefix2 = 'currency';
      const data = getFareDifferencesData(propPrefix1, propPrefix2, mockFareDifferences);

      expect(
        Object.keys(data).every((key, index) => key === `${propPrefix1}_viewfarediff${propPrefix2}${index + 1}`)
      ).toBeTruthy();
    });

    it('should format an array of fare differences for a currency booking to a marketing object representing those differences', () => {
      const propPrefix2 = 'currency';
      const result = getFareDifferencesData(propPrefix1, propPrefix2, mockFareDifferences);
      const expectedResult = {
        mock_prop_prefix_viewfarediffcurrency1: mockFareDifferences[0],
        mock_prop_prefix_viewfarediffcurrency2: mockFareDifferences[1],
        mock_prop_prefix_viewfarediffcurrency3: mockFareDifferences[2],
        mock_prop_prefix_viewfarediffcurrency4: mockFareDifferences[3],
        mock_prop_prefix_viewfarediffcurrency5: mockFareDifferences[4],
        mock_prop_prefix_viewfarediffcurrency6: mockFareDifferences[5]
      };

      expect(result).toStrictEqual(expectedResult);
    });

    it('should format an array of fare differences for a points booking to a marketing object representing those differences', () => {
      const propPrefix2 = 'points';
      const result = getFareDifferencesData(propPrefix1, propPrefix2, mockPointDifferences);
      const expectedResult = {
        mock_prop_prefix_viewfarediffpoints1: mockPointDifferences[0],
        mock_prop_prefix_viewfarediffpoints2: mockPointDifferences[1],
        mock_prop_prefix_viewfarediffpoints3: mockPointDifferences[2],
        mock_prop_prefix_viewfarediffpoints4: mockPointDifferences[3],
        mock_prop_prefix_viewfarediffpoints5: mockPointDifferences[4],
        mock_prop_prefix_viewfarediffpoints6: mockPointDifferences[5]
      };

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('getStpData', () => {
    it('should return an object with properties set to "none" for a flight that does not have a _.meta.numberOfFlights property', () => {
      const propPrefix = 'mock_prop_prefix';
      const flight = {};
      const result = getStopData(propPrefix, flight);
      const expectedResult = {
        mock_prop_prefix_stops: NOT_SELECTED,
        mock_prop_prefix_stoptype: NOT_SELECTED
      };

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an object conataining the numberOfStops and a stopType of "Direct" if the number of stops is greater than 0 and the stopCity is null', () => {
      const propPrefix = 'mock_prop_prefix';
      const flight = { _meta: { numberOfStops: 1 }, stopCity: null };
      const result = getStopData(propPrefix, flight);
      const expectedResult = {
        mock_prop_prefix_stops: 1,
        mock_prop_prefix_stoptype: DIRECT_FLIGHT
      };

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an object conataining the numberOfStops and a stopType of "Connecting" if the number of stops is greater than 0 and the stopCity is truthy', () => {
      const propPrefix = 'mock_prop_prefix';
      const flight = { _meta: { numberOfStops: 1 }, stopCity: 'DEN' };
      const result = getStopData(propPrefix, flight);
      const expectedResult = {
        mock_prop_prefix_stops: 1,
        mock_prop_prefix_stoptype: CONNECTING_FLIGHT
      };

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an object conataining the numberOfStops and a stopType of "Direct" if the number of stops is 0', () => {
      const propPrefix = 'mock_prop_prefix';
      const flight = _.set({}, '_meta.numberOfStops', 0);
      const result = getStopData(propPrefix, flight);
      const expectedResult = {
        mock_prop_prefix_stops: 0,
        mock_prop_prefix_stoptype: NONSTOP_FLIGHT
      };

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
