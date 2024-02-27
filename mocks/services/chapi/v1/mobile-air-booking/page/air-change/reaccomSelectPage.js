const _ = require('lodash');
const reaccomRoundTrip = require('mocks/templates/air-change/reaccomSelectBoundsPageResponse');

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/reaccom/reservations/current/:pnr',
  method: 'GET',
  cache: false,
  status: (request, response) => {
    const { pnr } = request.params;

    if (pnr === 'REACMB') {
      const blockMultiBoundsSelection = _.set(
        _.cloneDeep(reaccomRoundTrip),
        'reaccomFlightPage._meta.isBlockMultiBoundSelection',
        true
      );

      return response.status(200).send(blockMultiBoundsSelection);
    }

    return response.status(200).send(reaccomRoundTrip);
  }
};
