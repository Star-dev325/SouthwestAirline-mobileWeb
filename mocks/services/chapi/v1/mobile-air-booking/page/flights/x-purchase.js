const _ = require('lodash');
const purchaseByDollars = require('mocks/templates/purchase/purchaseByDollars');
const purchaseByDollarsWithSpecialAssistance = require('mocks/templates/purchase/purchaseByDollarsWithSpecialAssistance');
const ebFailedWhenPurchaseWithEBinPath = require('mocks/templates/purchase/earlybirdFailedWhenPurchaseWithEBinPath');
const purchaseByTravelFunds = require('mocks/templates/purchase/purchaseByTravelFunds');
const applePayWithEBandTravelFunds = require('mocks/templates/purchase/applePayWithEBandTravelFunds');

const productIDResponse = {
  oneWay_BOI2BOSPass1_USD: require('mocks/templates/purchase/boi2bosPass1_oneWay'),
  oneWay_BOI2BOSPass8_USD: require('mocks/templates/purchase/boi2bosPass8_oneWay'),
  roundTrip_DAL2HOUPass1_USD: require('mocks/templates/purchase/dal2houPass1_roundTrip'),
  roundTrip_DAL2HOUPass8_USD: require('mocks/templates/purchase/dal2houPass8_roundTrip'),
  oneWay_DAL2HOUPass1_PTS: require('mocks/templates/purchase/dal2houPointsPass1_oneWay'),
  roundTrip_DAL2HOUPass1_PTS: require('mocks/templates/purchase/dal2houPointsPass1_roundTrip')
};

const withPaypalCardType = {
  flightConfirmationPage: {
    billingInfo: {
      cardType: 'PAYPAL'
    }
  }
};

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/x-purchase',
  method: 'POST',
  cache: false,
  render: (req, res) => {
    const {
      body: { payment, earlyBird, travelFundsAddress }
    } = req;

    const isPayPal = !_.isEmpty(_.get(payment, 'paypal'));
    const isSpecialAssistance = !_.isEmpty(req.body.reservationGroups[0].passengers[0].nonChargeableAncillaryProducts);
    const isTravelFundsTotalPayment = !_.isEmpty(travelFundsAddress);
    const isApplePay = _.isEqual(_.get(payment, 'newCreditCard.digitalPaymentType'), 'APPLE_PAY');
    const travelFundsUsed = !!_.get(payment, 'fundToken');
    const responseOverride = productIDResponse[req.body.reservationGroups[0].productIds[0]];
    let response;

    if (isApplePay) {
      if (!_.isEmpty(earlyBird) && travelFundsUsed) {
        response = applePayWithEBandTravelFunds;
      } else {
        response = purchaseByDollars;
        response = _.omit(response, ['flightConfirmationPage.billingInfo.lastFourDigits']);
        _.set(response, 'flightConfirmationPage.billingInfo.cardType', 'APPLE_PAY');
      }
    } else if (!_.isEmpty(earlyBird)) {
      response = ebFailedWhenPurchaseWithEBinPath;
    } else if (isSpecialAssistance) {
      response = purchaseByDollarsWithSpecialAssistance;
    } else if (isTravelFundsTotalPayment) {
      response = purchaseByTravelFunds;
    } else if (responseOverride) {
      return res.json(responseOverride);
    } else {
      response = purchaseByDollars;
    }

    return res.json(isPayPal ? _.merge({}, response, withPaypalCardType) : response);
  }
};
