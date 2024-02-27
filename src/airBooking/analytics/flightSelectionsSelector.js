import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getSelectedProducts = (state) => _.get(state, 'app.airBooking.selectedProducts');
const getFlightShoppingPages = (state) => _.get(state, 'app.airBooking.flightShoppingPage.pages');
const getAnalyticsData = (state) =>
  _.get(state, 'app.airBooking.flightPricingPage.response.flightPricingPage._analytics');
const FARE_VALUE_UNAVAILABLE = 'UNAVAILABLE';

const _paxTypeFilter = (paxType, isMetaSenior = false) =>
  // TODO: Dig into this more and see if we can remove senior logic.
  (isMetaSenior ? paxType === 'senior' : paxType !== 'senior');
const _toFlightSectionsForBoundType = ({ productList, selectedProduct, paxType }) => {
  const card = _.get(productList, `cards.${selectedProduct.flightCardIndex}`);
  const fareForPaxType = _.filter(
    card.fares,
    (paxFare) => _paxTypeFilter(paxType, paxFare._meta.isSenior) && _.get(paxFare, 'price.amount') !== null
  );
  const fare = _.chain(fareForPaxType)
    .pickBy((paxCost) => paxCost._meta.productId === selectedProduct.fareProductId)
    .values()
    .head()
    .value();

  return {
    selectedFareProduct: {
      fareProductName: fare ? fare.fareDescription : null
    },
    selectedFlightProduct: {
      departureDateTime: `${productList.header.selectedDate}T${card.departureTime}`,
      fareProducts: _.map(fareForPaxType, (paxFare) => ({
        discountedFareValue: _.get(paxFare, 'discountedPrice.amount') || _.get(paxFare, 'price.amount'),
        fareProductName: paxFare.fareDescription,
        fareValue: _.get(paxFare, 'price.amount', FARE_VALUE_UNAVAILABLE)
      }))
    }
  };
};

export const getFlightSelections = createSelector(
  [getSelectedProducts, getFlightShoppingPages, getAnalyticsData],
  (selectedProducts, pages, analyticsData) => {
    const dataObj = _.mapValues(selectedProducts, (bound, paxType) =>
      _.mapValues(bound, (selectedProduct, boundType) => {
        const productList = _.chain(pages)
          .filter((product) => product.direction === boundType && product.paxType === paxType)
          .head()
          .value();

        return _toFlightSectionsForBoundType({ productList, paxType, selectedProduct });
      })
    );

    return { ...dataObj, ...analyticsData };
  }
);
