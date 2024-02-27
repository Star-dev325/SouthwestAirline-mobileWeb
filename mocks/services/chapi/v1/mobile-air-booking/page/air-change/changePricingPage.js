const _ = require('lodash');
const evenExchangeForOneWaySinglePax = require('mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayEvenExchange');
const dollarSinglePaxOneWayDowngradeMixRefundable = require('mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayDowngradeMixRefundable');
const dollarSinglePaxRoundTripUpgradeWithTravelFunds = require('mocks/templates/air-change/price-breakdown/dollarSinglePaxRoundTripUpgradeWithTravelFunds');
const dollarSinglePaxRoundTripUpgrade = require('mocks/templates/air-change/price-breakdown/dollarSinglePaxRoundTripUpgrade');
const dollarSinglePaxRoundTripDowngrade = require('mocks/templates/air-change/price-breakdown/dollarSinglePaxRoundTripDowngrade');
const dollarSinglePaxRoundTripEvenExchange = require('mocks/templates/air-change/price-breakdown/dollarSinglePaxRoundTripEvenExchange');
const dollarUMRoundTripUpgrade = require('mocks/templates/air-change/price-breakdown/dollarUMRoundTripUpgrade');
const pointsSinglePaxRoundTripUpgradeTaxEvenExchange = require('mocks/templates/air-change/price-breakdown/pointsSinglePaxRoundTripUpgradeTaxEvenExchange');
const pointsSinglePaxRoundTripDowngradeTaxEvenExchange = require('mocks/templates/air-change/price-breakdown/pointsSinglePaxRoundTripDowngradeTaxEvenExchange');
const dynamicWaiverBothBoundsAffectedEven = require('mocks/templates/air-change/price-breakdown/dynamicWaiverBothBoundsAffectedEven');
const dollarSinglePaxOneWayUpgradeWithReprice = require('mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayUpgradeWithReprice');
const dollarUpgradeWithAppliedTravelFunds = require('mocks/templates/air-change/price-breakdown/dollarUpgradeWithAppliedTravelFunds');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/change/pricing-breakdown',
  method: 'POST',
  cache: false,
  status: (request, response) => {
    const {
      body: { changeRequests }
    } = request;
    const boundReference = _.get(changeRequests, '0.boundReference');

    if (boundReference === 'PAYPAL-1') {
      return response.status(200).send(dollarSinglePaxRoundTripUpgradeWithTravelFunds);
    }

    if (boundReference === 'APLPAY-1') {
      if (_.get(request, 'body.fundsAppliedToken')) {
        return response.status(200).send(dollarUpgradeWithAppliedTravelFunds);
      }

      return response.status(200).send(dollarSinglePaxRoundTripUpgrade);
    }

    if (boundReference === 'DBDMIX-1') {
      return response.status(200).send(dollarSinglePaxOneWayDowngradeMixRefundable);
    }

    if (boundReference === 'CHFRDU-1') {
      return response.status(200).send(dollarSinglePaxRoundTripUpgrade);
    }

    if (boundReference === 'CHFRDD-1') {
      return response.status(200).send(dollarSinglePaxRoundTripDowngrade);
    }

    if (boundReference === 'CHFRDE-1') {
      return response.status(200).send(dollarSinglePaxRoundTripEvenExchange);
    }

    if (boundReference === 'CHFUMN-1') {
      return response.status(200).send(dollarUMRoundTripUpgrade);
    }

    if (boundReference === 'CHFRPU-1') {
      return response.status(200).send(pointsSinglePaxRoundTripUpgradeTaxEvenExchange);
    }

    if (boundReference === 'CHFRPD-1') {
      return response.status(200).send(pointsSinglePaxRoundTripDowngradeTaxEvenExchange);
    }

    if (boundReference === 'CHDWDE-1') {
      return response.status(200).send(dynamicWaiverBothBoundsAffectedEven);
    }

    if (boundReference === 'REPRIC-1') {
      return response.status(200).send(dollarSinglePaxOneWayUpgradeWithReprice);
    }

    return response.status(200).send(evenExchangeForOneWaySinglePax);
  }
};
