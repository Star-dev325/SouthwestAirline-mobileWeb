const _ = require('lodash');
const confirmationUpgrade = require('mocks/templates/air-change/confirmation/confirmationDollarUpgrade');
const applePayUpgrade = require('mocks/templates/air-change/changeReservationWithApplePay');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/change',
  method: 'PUT',
  cache: false,
  status: (request, response) => {
    const {
      body: { payment }
    } = request;
    const isApplePay = _.isEqual(_.get(payment, 'newCreditCard.digitalPaymentType'), 'APPLE_PAY');

    if (isApplePay) {
      return response.status(200).send(applePayUpgrade);
    }

    return response.status(200).send(confirmationUpgrade);
  }
};
