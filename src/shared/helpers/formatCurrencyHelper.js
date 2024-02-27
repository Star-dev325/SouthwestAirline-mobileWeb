import numeral from 'numeral';

export const formatCurrency = (fareValue, isDollars) => numeral(+fareValue).format(isDollars ? '0,0.00' : '0,0');

export const formatCurrencyRounded = (fareValue) => numeral(Math.ceil(+fareValue)).format('0,0');
