const _ = require('lodash');
const changeReservationForPartialFlow = require('mocks/templates/air-change/changeReservationForPartialFlow');
const changeReservationForOpenJawFlow = require('mocks/templates/air-change/changeReservationForOpenJawFlow');
const changeReservationForRoundTrip = require('mocks/templates/air-change/changeReservationForRoundTripWithUM');
const changeReservationForDynamicWaiver = require('mocks/templates/air-change/changeReservationForDynamicWaiver');
const changeReservationForCancelledFlight = require('mocks/templates/air-change/changeReservationForCancelledFlight');

const changeRoundTripBoundsReferenceToIncludeRecordLocator = (recordLocator) => {
  const bounds = [{ boundReference: `${recordLocator}-1` }, { boundReference: `${recordLocator}-2` }];

  return _.merge({}, changeReservationForRoundTrip, {
    changeFlightPage: { _links: { changeShopping: { body: bounds } } }
  });
};

const responseMapper = {
  CHGONE: changeReservationForPartialFlow,
  OPENJW: changeReservationForOpenJawFlow,
  CHGRTP: _.merge({}, changeReservationForPartialFlow, { changeFlightPage: { selectionMode: 'ALL' } }),
  CHGUNM: changeReservationForRoundTrip,
  CHDWDE: changeReservationForDynamicWaiver,
  U5NLCS: changeReservationForCancelledFlight,
  CHFCHK: changeRoundTripBoundsReferenceToIncludeRecordLocator('CHFCHK'),
  CHFRDU: changeRoundTripBoundsReferenceToIncludeRecordLocator('CHFRDU'),
  CHFRDD: changeRoundTripBoundsReferenceToIncludeRecordLocator('CHFRDD'),
  CHFRDE: changeRoundTripBoundsReferenceToIncludeRecordLocator('CHFRDE'),
  CHFUMN: changeRoundTripBoundsReferenceToIncludeRecordLocator('CHFUMN'),
  CHFRPU: changeRoundTripBoundsReferenceToIncludeRecordLocator('CHFRPU'),
  CHFRPD: changeRoundTripBoundsReferenceToIncludeRecordLocator('CHFRPD'),
  REPRIC: changeRoundTripBoundsReferenceToIncludeRecordLocator('REPRIC'),
  DBDMIX: changeRoundTripBoundsReferenceToIncludeRecordLocator('DBDMIX'),
  PAYPAL: changeRoundTripBoundsReferenceToIncludeRecordLocator('PAYPAL'),
  APLPAY: changeRoundTripBoundsReferenceToIncludeRecordLocator('APLPAY')
};

module.exports = {
  path: '/chapi/v1/mobile-air-booking/page/flights/change/current/:pnr',
  method: 'GET',
  cache: false,
  status: (request, response) => {
    const _res = responseMapper[request.params.pnr] || responseMapper.CHGRTP;

    return response.status(200).send(_res);
  }
};
