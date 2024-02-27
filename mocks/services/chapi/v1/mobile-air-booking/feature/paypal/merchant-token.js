import _ from 'lodash';

const returnURLTokenMap = {
  PAYPAL_AIR_BOOKING_TOKEN: 'air/booking',
  PAYPAL_AIR_CHANGE_TOKEN: 'air/change',
  PAYPAL_COMPANION_TOKEN: 'companion',
  PAYPAL_EARLY_BIRD_TOKEN_WITH_PNR_NALVRY: 'earlybird'
};

export default {
  path: '/chapi/v1/mobile-air-booking/feature/paypal/merchant-token',
  method: 'POST',
  cache: false,
  status: (request, response) => {
    const {
      body: {
        redirectURLs: { returnURL }
      }
    } = request;
    const token = _.findKey(returnURLTokenMap, (value) => _.includes(returnURL, value));

    return response.status(200).send({
      merchantToken: {
        token
      }
    });
  }
};
