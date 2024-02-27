const dayjs = require('dayjs');
const _ = require('lodash');

const changeShoppingPageForOneWayWithOutbound = require('mocks/templates/air-change/changeShoppingPageForOneWayWithOutbound');
const changeShoppingPageForOneWayWithInbound = require('mocks/templates/air-change/changeShoppingPageForOneWayWithInbound');
const changeShoppingPageForRoundTrip = require('mocks/templates/air-change/changeShoppingPageForRoundTrip');
const changeShoppingPageForDynamicWaiver = require('mocks/templates/air-change/changeShoppingPageForDynamicWaiver');

const isWithinDynamicWaiverRange = (request) => {
  const {
    body: { inbound, outbound }
  } = request;
  const {
    date: inboundDate,
    'destination-airport': inboundDestinationAirport,
    'origin-airport': inboundOriginAirport
  } = inbound;
  const {
    date: outboundDate,
    'destination-airport': outboundDestinationAirport,
    'origin-airport': outboundOriginAirport
  } = outbound;

  const isInboundDateInRange = dayjs(inboundDate).isBetween('2018-08-08', '2018-10-22', 'day', '[]');
  const isOutboundDateInRange = dayjs(outboundDate).isBetween('2018-08-08', '2018-10-25', 'day', '[]');

  const isInboundCityInRange =
    ['DAL'].includes(inboundOriginAirport) && ['MDW', 'IND'].includes(inboundDestinationAirport);
  const isOutboundCityInRange =
    ['MDW', 'IND'].includes(outboundOriginAirport) && ['DAL'].includes(outboundDestinationAirport);

  return isInboundDateInRange && isInboundCityInRange && isOutboundDateInRange && isOutboundCityInRange;
};

const changeShoppingPage = {
  changeShoppingPage: {
    _links: {
      fareDetails: {
        href: '/fare-details',
        labelText: 'Fare Details'
      },
      changePricingPage: {
        body: { boundReference: ['PAYPAL-1', 'PAYPAL-2'] },
        href: '/v1/mobile-air-booking/page/flights/change/pricing-breakdown',
        method: 'POST'
      }
    }
  }
};

const changeShoppingPageApplePay = {
  changeShoppingPage: {
    _links: {
      fareDetails: {
        href: '/fare-details',
        labelText: 'Fare Details'
      },
      changePricingPage: {
        body: { boundReference: ['APLPAY-1', 'APLPAY-2'] },
        href: '/v1/mobile-air-booking/page/flights/change/pricing-breakdown',
        method: 'POST'
      }
    }
  }
};

const checkedInNotice = {
  changeShoppingPage: {
    checkedInNotice: {
      message:
        'We will delete your existing boarding passes but preserve your Boarding Position for any unchanged flights.',
      title: 'You must check in again for all of your flights.'
    },
    _meta: { purchaseWithPoints: false, hasSenior: false, isPromoCodeApplied: false, isCheckedIn: true }
  }
};

function replaceRoundTripBoundsWithPnr(pnr) {
  const newPage = _.merge({}, changeShoppingPageForRoundTrip, changeShoppingPage);

  _.set(newPage, 'changeShoppingPage._links.changePricingPage.body.boundReference', [`${pnr}-1`, `${pnr}-2`]);

  return newPage;
}

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/change/shopping',
  method: 'POST',
  cache: false,
  status: (request, response) => {
    const {
      body: { inbound, outbound }
    } = request;

    if (_.get(outbound, 'boundReference') === 'PAYPAL-1') {
      const changeShoppingPageForPayPal = _.merge({}, changeShoppingPageForRoundTrip, changeShoppingPage);

      return response.status(200).send(changeShoppingPageForPayPal);
    }

    if (_.get(outbound, 'boundReference') === 'APLPAY-1') {
      const changeShoppingPageForApplePay = _.merge({}, changeShoppingPageForRoundTrip, changeShoppingPageApplePay);

      return response.status(200).send(changeShoppingPageForApplePay);
    }

    if (_.get(outbound, 'boundReference') === 'DBDMIX-1') {
      const forDollarSinglePaxOneWayDowngradeMixRefundable = _.merge(
        {},
        changeShoppingPageForRoundTrip,
        changeShoppingPage
      );

      _.set(
        forDollarSinglePaxOneWayDowngradeMixRefundable,
        'changeShoppingPage._links.changePricingPage.body.boundReference',
        ['DBDMIX-1', 'DBDMIX-2']
      );

      return response.status(200).send(forDollarSinglePaxOneWayDowngradeMixRefundable);
    }

    if (_.get(outbound, 'boundReference') === 'CHFCHK-1') {
      const changeShoppingPageResponseForCheckedInPax = _.merge({}, changeShoppingPageForRoundTrip, checkedInNotice);

      return response.status(200).send(changeShoppingPageResponseForCheckedInPax);
    }

    if (_.get(outbound, 'boundReference') === 'CHFRDU-1') {
      const newPage = replaceRoundTripBoundsWithPnr('CHFRDU');

      return response.status(200).send(newPage);
    }

    if (_.get(outbound, 'boundReference') === 'CHFRDD-1') {
      const newPage = replaceRoundTripBoundsWithPnr('CHFRDD');

      return response.status(200).send(newPage);
    }

    if (_.get(outbound, 'boundReference') === 'CHFRDE-1') {
      const newPage = replaceRoundTripBoundsWithPnr('CHFRDE');

      return response.status(200).send(newPage);
    }

    if (_.get(outbound, 'boundReference') === 'CHFUMN-1') {
      const newPage = replaceRoundTripBoundsWithPnr('CHFUMN');

      return response.status(200).send(newPage);
    }

    if (_.get(outbound, 'boundReference') === 'CHFRPU-1') {
      const newPage = replaceRoundTripBoundsWithPnr('CHFRPU');

      return response.status(200).send(newPage);
    }

    if (_.get(outbound, 'boundReference') === 'CHFRPD-1') {
      const newPage = replaceRoundTripBoundsWithPnr('CHFRPD');

      return response.status(200).send(newPage);
    }

    if (_.get(outbound, 'boundReference') === 'CHDWDE-1') {
      const newPage = replaceRoundTripBoundsWithPnr('CHDWDE');

      return response.status(200).send(newPage);
    }

    if (_.get(outbound, 'boundReference') === 'REPRIC-1') {
      const newPage = replaceRoundTripBoundsWithPnr('REPRIC');

      return response.status(200).send(newPage);
    }

    if (inbound && outbound) {
      if (isWithinDynamicWaiverRange(request)) {
        return response.status(200).send(changeShoppingPageForDynamicWaiver);
      }

      return response.status(200).send(changeShoppingPageForRoundTrip);
    } else if (outbound) {
      return response.status(200).send(changeShoppingPageForOneWayWithOutbound);
    } else if (inbound) {
      return response.status(200).send(changeShoppingPageForOneWayWithInbound);
    }
  }
};
