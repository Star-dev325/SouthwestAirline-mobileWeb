import _ from 'lodash';
import numeral from 'numeral';

export const getCurrencyFromDollarsToCents = (price) => {
  const dollars = Number(price.value);

  return _.isNaN(dollars) ? price.value : parseFloat((dollars * 100).toFixed(2));
};

export const addCurrency = (...arrayOfCurrencyType) => {
  const prices = _.filter(arrayOfCurrencyType, (price) => !_.isEmpty(price));

  const currencyInfo = _.pick(prices[0], ['currencyCode', 'currencySymbol']);
  const isSameCurrency = _.every(prices, (price) => price.currencyCode === currencyInfo.currencyCode);

  if (!isSameCurrency) return;

  const amount = _.reduce(prices, (total, price) => numeral(_.get(price, 'amount')).add(total).value(), 0);

  return _.merge({}, currencyInfo, {
    amount: numeral(amount).format('0,000.00')
  });
};
