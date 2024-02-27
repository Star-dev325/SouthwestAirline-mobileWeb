// @flow
import _ from 'lodash';
import mktgDataConstants from 'src/shared/constants/mktgDataConstants';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { getGlobalMktgData } from 'src/shared/analytics/selectors/getGlobalMktgData';
import { toNumberStringWithoutCommas } from 'src/shared/helpers/currencyValueHelper';
import type { FlightProductCard, ProductDefinition } from 'src/shared/flow-typed/shared.types';
import type { MKTGFareType } from 'src/shared/flow-typed/mktg.types';

const {
  NOT_AVAILABLE,
  NOT_SELECTED,
  DIRECT_FLIGHT,
  POINTS_BOOKING,
  CURRENCY_BOOKING,
  CONNECTING_FLIGHT,
  NONSTOP_FLIGHT
} = mktgDataConstants;

export const parseFareValue = (fare: MKTGFareType, fareValue: (fare: MKTGFareType) => string) =>
  (typeof fare === 'string' && fare) || (fare.reasonIfUnavailable && NOT_AVAILABLE) || fareValue(fare);

export const getFarePrice = (fare: MKTGFareType) => {
  const pricePath = fare.discountedPrice ? 'discountedPrice.amount' : 'price.amount';
  const farePrice = _.get(fare, pricePath, NOT_AVAILABLE);

  return (
    (farePrice === NOT_AVAILABLE && farePrice) ||
    (parseInt(farePrice, 10) === 0 && 'zero') ||
    toNumberStringWithoutCommas(farePrice)
  );
};

export const getFarePriceDifference = ({ priceDifference: { amount = NOT_AVAILABLE, sign = '' } = {} }: MKTGFareType) =>
  (amount === NOT_AVAILABLE && amount) ||
  (parseInt(amount) === 0 && 'zero') ||
  (sign === '-' && `${sign}${toNumberStringWithoutCommas(amount)}`) ||
  toNumberStringWithoutCommas(amount);

export const getSortedFareProducts = (products: Array<ProductDefinition>): Array<ProductDefinition> =>
  [...products].sort((product1, product2) => (product2.rowOrder > product1.rowOrder ? 1 : -1));

export const getSortedFares = (fares: Array<MKTGFareType>, products: Array<ProductDefinition>): Array<MKTGFareType> =>
  products.map(
    ({ productId }) =>
      fares.find((fare) => typeof fare !== 'string' && fare._meta.fareProductId === productId) || NOT_AVAILABLE
  );

export const getFareData = (
  propPrefix: string,
  fares: Array<MKTGFareType>,
  products: Array<ProductDefinition>,
  bookingType: string,
  fareValue: (MKTGFareType) => string = getFarePrice
) =>
  products.reduce((fareData, product, index) => {
    const fare = fares.find(
      (fareItem) => typeof fareItem !== 'string' && fareItem._meta.fareProductId === product.productId
    );
    const {
      [`${propPrefix}_viewfaretypes`]: fareTypes,
      [`${propPrefix}_viewfareproductids`]: fareIds,
      [`${propPrefix}_viewfarecurrency`]: fareCurrencyList,
      [`${propPrefix}_viewfarepoints`]: farePointsList
    } = fareData;
    const fareValueResult =
      (fare && parseFareValue(fare, fareValue)) ||
      (fares.every((fareItem) => fareItem === NOT_SELECTED) && NOT_SELECTED) ||
      NOT_AVAILABLE;
    const fareCurrency = bookingType === CURRENCY_BOOKING ? fareValueResult : NOT_SELECTED;
    const farePoints = bookingType === POINTS_BOOKING ? fareValueResult : NOT_SELECTED;
    const { id: fareType = NOT_AVAILABLE, productId: fareProductId = NOT_AVAILABLE } = product;
    const dataIndex = index + 1;

    return {
      ...fareData,
      [`${propPrefix}_viewfaretypes`]: fareTypes ? `${fareTypes}|${fareType}` : fareType,
      [`${propPrefix}_viewfareproductids`]: fareIds ? `${fareIds}|${fareProductId}` : fareProductId,
      [`${propPrefix}_viewfarecurrency`]: fareCurrencyList ? `${fareCurrencyList}|${fareCurrency}` : fareCurrency,
      [`${propPrefix}_viewfarepoints`]: farePointsList ? `${farePointsList}|${farePoints}` : farePoints,
      [`${propPrefix}_viewfareproductid${dataIndex}`]: fareType,
      [`${propPrefix}_viewfaretype${dataIndex}`]: fareType,
      [`${propPrefix}_viewfarecurrency${dataIndex}`]: fareCurrency,
      [`${propPrefix}_viewfarepoints${dataIndex}`]: farePoints
    };
  }, {});

export const getFareDifferencesData = (propPrefix1: string, propPrefix2: string, fareDifferences: Array<string>) =>
  fareDifferences.reduce(
    (result, difference, index) => ({
      ...result,
      [`${propPrefix1}_viewfarediff${propPrefix2}${index + 1}`]: difference
    }),
    {}
  );

export const getStopData = (propPrefix: string, flight: FlightProductCard) => {
  const numberOfStops = _.get(flight, '_meta.numberOfStops', NOT_SELECTED);
  const hasStop = parseInt(numberOfStops) > 0;
  const hasPlaneChange = !!flight.stopCity;

  const stopType = hasPlaneChange ? CONNECTING_FLIGHT : hasStop ? DIRECT_FLIGHT : NONSTOP_FLIGHT;

  return {
    [`${propPrefix}_stops`]: numberOfStops,
    [`${propPrefix}_stoptype`]: numberOfStops === NOT_SELECTED ? NOT_SELECTED : stopType
  };
};

export const getMktgDataForPage = (path: string, defaultValue: *) => (state: *) => _.get(state, path, defaultValue || {});

export const createMktgDataSelector = (path: string, defaultValue: *) => createSelector(
  [getGlobalMktgData, getMktgDataForPage(path, defaultValue)],
  (globalMktgData, pageMktgData) => ({ ...globalMktgData, ...pageMktgData })
);
