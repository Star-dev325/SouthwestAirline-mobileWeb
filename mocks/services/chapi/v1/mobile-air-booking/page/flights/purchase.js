const _ = require('lodash');
const purchaseByDollars = require('mocks/templates/purchase/purchaseByDollars');
const purchaseByDollarsWithSpecialAssistance = require('mocks/templates/purchase/purchaseByDollarsWithSpecialAssistance.js');
const earlybirdFailedWhenAnonymousPurchaseWithEBinPath = require('mocks/templates/purchase/earlybirdFailedWhenAnonymousPurchaseWithEBinPath');
const earlybirdSuccessWhenAnonymousPurchaseWithEBinPath = require('mocks/templates/purchase/earlybirdSuccessWhenAnonymousPurchaseWithEBinPath');
const mixedPurchasePaymentWithTravelFunds = require('mocks/templates/purchase/mixedPurchasePaymentWithTravelFunds');

const productIDResponse = {
  oneWay_BOI2BOSPass1_USD: require('mocks/templates/purchase/boi2bosPass1_oneWay'),
  oneWay_BOI2BOSPass8_USD: require('mocks/templates/purchase/boi2bosPass8_oneWay'),
  roundTrip_DAL2HOUPass1_USD: require('mocks/templates/purchase/dal2houPass1_roundTrip'),
  roundTrip_DAL2HOUPass8_USD: require('mocks/templates/purchase/dal2houPass8_roundTrip'),
  oneWay_DAL2HOUPass1_PTS: require('mocks/templates/purchase/dal2houPointsPass1_oneWay'),
  roundTrip_DAL2HOUPass1_PTS: require('mocks/templates/purchase/dal2houPointsPass1_roundTrip')
};

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/purchase',
  method: 'POST',
  cache: false,
  render: (req, res) => {
    const {
      body: { payment, earlyBird, travelFundsAddress }
    } = req;
    const isApplePay = _.isEqual(_.get(payment, 'newCreditCard.digitalPaymentType'), 'APPLE_PAY');
    const responseOverride = productIDResponse[req.body.reservationGroups[0].productIds[0]];

    if (!_.isEmpty(earlyBird)) {
      const passengerFirstName = req.body.reservationGroups.passengers.name.firstName;

      if (passengerFirstName === 'FailEB') {
        return res.json(earlybirdFailedWhenAnonymousPurchaseWithEBinPath);
      }

      return res.json(earlybirdSuccessWhenAnonymousPurchaseWithEBinPath);
    } else if (!_.isEmpty(req.body.reservationGroups[0].passengers[0].nonChargeableAncillaryProducts)) {
      return res.json(purchaseByDollarsWithSpecialAssistance);
    } else if (!_.isEmpty(_.get(payment, 'fundToken')) && !_.isEmpty(travelFundsAddress)) {
      return res.json(mixedPurchasePaymentWithTravelFunds);
    } else if (isApplePay) {
      let applePayResponse = purchaseByDollars;

      applePayResponse = _.omit(applePayResponse, ['flightConfirmationPage.billingInfo.lastFourDigits']);
      _.set(applePayResponse, 'flightConfirmationPage.billingInfo.cardType', 'APPLE_PAY');

      return res.json(applePayResponse);
    } else if (responseOverride) {
      return res.json(responseOverride);
    }

    return res.json(purchaseByDollars);
  }
};
