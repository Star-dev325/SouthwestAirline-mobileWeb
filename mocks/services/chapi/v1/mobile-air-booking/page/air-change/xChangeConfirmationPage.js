const _ = require('lodash');
const confirmationUpgrade = require('mocks/templates/air-change/confirmation/confirmationDollarUpgrade');
const confirmationDollarUpgradeForPayPal = require('mocks/templates/air-change/confirmation/confirmationDollarUpgradeForPayPal');
const dollarSinglePaxOneWayDowngradeMixRefundable = require('mocks/templates/air-change/confirmation/dollarSinglePaxOneWayDowngradeMixRefundable');
const dollarSinglePaxRoundTripUpgrade = require('mocks/templates/air-change/confirmation/dollarSinglePaxRoundTripUpgrade');
const dollarSinglePaxRoundTripDowngrade = require('mocks/templates/air-change/confirmation/dollarSinglePaxRoundTripDowngrade');
const dollarSinglePaxRoundTripEvenExchange = require('mocks/templates/air-change/confirmation/dollarSinglePaxRoundTripEvenExchange');
const dollarUMRoundTripUpgrade = require('mocks/templates/air-change/confirmation/dollarUMRoundTripUpgrade');
const pointsUpgradeMoneyEven = require('mocks/templates/air-change/confirmation/pointsUpgradeMoneyEven');
const pointsDowngradeMoneyEven = require('mocks/templates/air-change/confirmation/pointsDowngradeMoneyEven');
const dynamicWaiverBothBoundsAffectedEven = require('mocks/templates/air-change/confirmation/dynamicWaiverBothBoundsAffectedEven');
const applePayUpgradeWithTravelFunds = require('mocks/templates/air-change/changeReservationWithApplePayAndTravelFunds');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/x-change',
  method: 'PUT',
  cache: false,
  status: (request, response) => {
    const {
      body: {
        payment,
        contactInformation: { email }
      }
    } = request;
    const isPayPal = !_.isEmpty(_.get(payment, 'paypal'));
    const isApplePay = _.isEqual(_.get(payment, 'newCreditCard.digitalPaymentType'), 'APPLE_PAY');

    if (isPayPal) {
      return response.status(200).send(confirmationDollarUpgradeForPayPal);
    }

    if (isApplePay) {
      return response.status(200).send(applePayUpgradeWithTravelFunds);
    }

    if (_.startsWith(email, 'DBDMIX')) {
      return response.status(200).send(dollarSinglePaxOneWayDowngradeMixRefundable);
    }

    if (_.startsWith(email, 'CHFRDU')) {
      return response.status(200).send(dollarSinglePaxRoundTripUpgrade);
    }

    if (_.startsWith(email, 'CHFRDD')) {
      return response.status(200).send(dollarSinglePaxRoundTripDowngrade);
    }

    if (_.startsWith(email, 'CHFRDE')) {
      return response.status(200).send(dollarSinglePaxRoundTripEvenExchange);
    }

    if (_.startsWith(email, 'CHFUMN')) {
      return response.status(200).send(dollarUMRoundTripUpgrade);
    }

    if (_.startsWith(email, 'CHFRPU')) {
      return response.status(200).send(pointsUpgradeMoneyEven);
    }

    if (_.startsWith(email, 'CHFRPD')) {
      return response.status(200).send(pointsDowngradeMoneyEven);
    }

    if (_.startsWith(email, 'CHDWDE')) {
      return response.status(200).send(dynamicWaiverBothBoundsAffectedEven);
    }

    return response.status(200).send(confirmationUpgrade);
  }
};
