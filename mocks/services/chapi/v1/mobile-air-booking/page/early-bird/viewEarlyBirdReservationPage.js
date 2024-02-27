const _ = require('lodash');
const viewEarlyBirdReservationWithMultiplePaxAndRoundTrip = require('mocks/templates/earlyBird/viewEarlyBirdReservationWithMultiplePaxAndRoundTrip');
const viewEarlyBirdWithoutEmail = require('mocks/templates/earlyBird/viewEarlyBirdWithoutEmail');
const viewEarlyBirdReservationWithSinglePaxAndInternationalTrip = require('mocks/templates/earlyBird/priceForInternationalSinglePax');
const viewEarlyBirdReservationWithOpenJawTrip = require('mocks/templates/earlyBird/priceForOpenJawTrip');
const earlyBirdPurchaseForOneWaySinglePax = require('mocks/templates/earlyBird/earlyBirdPurchaseForOneWaySinglePax');
const earlyBirdPurchaseNewEmailEntered = require('mocks/templates/earlyBird/earlyBirdPurchaseNewEmailEntered');
const earlyBirdPurchaseForInternationalSinglePax = require('mocks/templates/earlyBird/earlyBirdPurchaseForInternationalSinglePax');
const earlyBirdPurchaseForOpenJawTrip = require('mocks/templates/earlyBird/earlyBirdPurchaseForOpenJawTrip');

const earlyBirdPriceMapping = {
  REQEML: viewEarlyBirdWithoutEmail,
  NALVRY: viewEarlyBirdReservationWithMultiplePaxAndRoundTrip,
  KTZM9Q: viewEarlyBirdReservationWithSinglePaxAndInternationalTrip,
  KUO3NN: viewEarlyBirdReservationWithOpenJawTrip
};
const earlyBirdPurchaseMapping = {
  REQEML: earlyBirdPurchaseNewEmailEntered,
  NALVRY: earlyBirdPurchaseForOneWaySinglePax,
  KTZM9Q: earlyBirdPurchaseForInternationalSinglePax,
  KUO3NN: earlyBirdPurchaseForOpenJawTrip
};

const withPaypalCardType = {
  earlyBirdConfirmationPage: {
    billingInfo: {
      cardType: 'PAYPAL'
    }
  }
};

const withApplePayCardType = {
  earlyBirdConfirmationPage: {
    billingInfo: {
      cardType: 'APPLE_PAY'
    }
  }
};

module.exports = [
  {
    path: '/chapi/v1/mobile-air-booking/page/early-bird/:pnr',
    method: 'GET',
    cache: false,
    status: (request, response) => {
      const { pnr } = request.params;
      const responseData = earlyBirdPriceMapping[pnr];

      return response.status(200).send(responseData);
    }
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/early-bird/:pnr',
    method: 'POST',
    cache: false,
    status: (request, response) => {
      const {
        params: { pnr },
        body: { payment }
      } = request;
      const responseData = earlyBirdPurchaseMapping[pnr];
      const isPayPal = !_.isEmpty(_.get(payment, 'paypal'));
      const isApplePay = _.get(payment, 'newCreditCard.digitalPaymentType') === 'APPLE_PAY';

      if (isPayPal) {
        return response.status(200).send(_.merge({}, responseData, withPaypalCardType));
      } else if (isApplePay) {
        const applePayResponse = _.merge({}, responseData, withApplePayCardType);

        return response
          .status(200)
          .send(_.omit(applePayResponse, 'earlyBirdConfirmationPage.billingInfo.lastFourDigits'));
      }

      return response.status(200).send(responseData);
    }
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/x-early-bird/:pnr',
    method: 'POST',
    cache: false,
    status: (request, response) => {
      const {
        params: { pnr },
        body: { payment }
      } = request;
      const responseData = earlyBirdPurchaseMapping[pnr];
      const isPayPal = !_.isEmpty(_.get(payment, 'paypal'));
      const isApplePay = _.get(payment, 'newCreditCard.digitalPaymentType') === 'APPLE_PAY';

      if (isPayPal) {
        return response.status(200).send(_.merge({}, responseData, withPaypalCardType));
      } else if (isApplePay) {
        const applePayResponse = _.merge({}, responseData, withApplePayCardType);

        return response
          .status(200)
          .send(_.omit(applePayResponse, 'earlyBirdConfirmationPage.billingInfo.lastFourDigits'));
      }

      return response.status(200).send(responseData);
    }
  }
];
