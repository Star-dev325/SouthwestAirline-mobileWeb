const twoPaxDomesticRoundTripDepartureWithinOneConfirmation = require('mocks/templates/checkIn/chapi2PaxDomesticRoundTripDepartureWithinOneConfirmation');
const domesticRoundTripDepartureWithinOneHourConfirmation = require('mocks/templates/checkIn/chapiDomesticRoundTripDepartureWithinOneConfirmation');
const { CHECKIN_SESSION_TOKEN_EXPIRED } = require('src/checkIn/constants/checkInErrorCode');
const checkinPassengerMISAPI = require('mocks/templates/checkIn/checkinPassenger');
const domesticCheckinSuccess = require('mocks/templates/checkIn/domesticCheckInSuccess');
const domesticMultiPaxCheckinSuccess = require('mocks/templates/checkIn/domesticMultiPaxCheckInSuccess');
const checkInConfirmationWithSpecialAssistance = require('mocks/templates/checkIn/checkInConfirmationWithSpecialAssistance');
const spaceAvailableNonRevStandbySuccess = require('mocks/templates/checkIn/spaceAvailableNonRevStandbySuccess');

/**
 * @module CheckIn
 * @desc mock data for CHAPI checkIn passenger
 * @param {PNR} P3XA5Q
 * checkin session token expired
 * @param {PNR} VEDGD4
 * a domestic round trip for multiple passengers which will departure within one hour
 * @param {PNR} RMXAUA
 * a domestic round trip for multiple passengers for checkin flow for a logged in user
 * @param {PNR} VDWE69
 * a domestic round trip for single passengers which will departure within one hour
 * @param {PNR} MISAPI
 * international trip for multiple passengers which passengers can checkin success
 * @param {PNR} R4ZGJ3
 * domestic trip for single passenger which passengers can checkin success
 * @param {PNR} SPESHL
 * domestic trip for single passenger with special assistance needs which passengers can checkin success
 */

module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in',
  method: 'POST',
  cache: false,
  template(params, query, body) {
    const { recordLocator } = body;

    if (recordLocator === 'VEDGD4') {
      return twoPaxDomesticRoundTripDepartureWithinOneConfirmation;
    }

    if (recordLocator === 'VDWE69') {
      return domesticRoundTripDepartureWithinOneHourConfirmation;
    }

    if (recordLocator === 'MISAPI') {
      return checkinPassengerMISAPI;
    }

    if (recordLocator === 'R4ZGJ3') {
      return domesticCheckinSuccess;
    }

    if (recordLocator === 'RMXAUA') {
      return domesticMultiPaxCheckinSuccess;
    }

    if (recordLocator === 'SPESHL') {
      return checkInConfirmationWithSpecialAssistance;
    }

    if (recordLocator === '2IGGMN') {
      return spaceAvailableNonRevStandbySuccess;
    }
  },
  status(req, res) {
    if (req.body.recordLocator === 'P3XA5Q') {
      return res.status(400).send({ code: CHECKIN_SESSION_TOKEN_EXPIRED, message: 'message', requestId: 'request id' });
    }
  }
};
