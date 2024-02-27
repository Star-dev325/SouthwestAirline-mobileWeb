/* eslint-disable indent */
const _ = require('lodash');

const byDollar = require('mocks/templates/price/byDollar');
const pointsReprice = require('mocks/templates/price/byPointsWithReprice');
const byChase = require('mocks/templates/price/byChase');
const byDollarForDomestic = require('mocks/templates/price/byDollarForDomestic');

const productIDResponse = {
  oneWay_BOI2BOSPass1_USD: require('mocks/templates/price/boi2bosPass1_oneWay'),
  oneWay_BOI2BOSPass8_USD: require('mocks/templates/price/boi2bosPass8_oneWay'),
  roundTrip_DAL2HOUPass1_USD: require('mocks/templates/price/dal2houPass1_roundTrip'),
  roundTrip_DAL2HOUPass8_USD: require('mocks/templates/price/dal2houPass8_roundTrip'),
  oneWay_DAL2HOUPass1_PTS: require('mocks/templates/price/dal2houPointsPass1_oneWay'),
  roundTrip_DAL2HOUPass1_PTS: require('mocks/templates/price/dal2houPointsPass1_roundTrip')
};

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/prices',
  method: 'POST',
  cache: false,
  render: (req, res) => {
    const productIds = _.get(req, 'body.adultPassengers.productIds');
    const [firstProductId] = productIds;
    const responseOverride = productIDResponse[firstProductId];

    if (req.body.chaseSessionId) {
      return res.json(byChase);
    } else if (responseOverride) {
      return res.json(responseOverride);
    }

    return req.body.currency === 'PTS'
      ? res.json(pointsReprice)
      : _.includes(productIds, 'DOMESTIC_PRODUCT')
      ? res.json(byDollarForDomestic)
      : res.json(byDollar);
  }
};
