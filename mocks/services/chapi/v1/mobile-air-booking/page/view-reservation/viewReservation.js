/**
 * @module ViewReservation
 * @desc ViewReservation Mock Data For CHAPI
 * @param {PNR} INTCHC
 * International flight has already checked in
 * @param {PNR} INTEMT
 * INTEMT: International flight hasn't check in, as well, missing passport and emergency contact.
 * @param {PNR} STMXQ6
 * INTEMT: with StandByFlight.
 */
const _ = require('lodash');
const chapiDomesticHasCompanion = require('mocks/templates/airReservation/chapiDomesticHasCompanion');
const viewBoardingPassIssuance = require('mocks/templates/airReservation/viewBoardingPassIssuance');
const viewBoardingPosition = require('mocks/templates/airReservation/viewBoardingPosition');
const dynamicWaiver = require('mocks/templates/airReservation/dynamicWaiver');
const checkIn = require('mocks/templates/airReservation/checkIn');
const withStandByCard = require('mocks/templates/airReservation/withStandByCard');
const multiplePaxsWithSelectee = require('mocks/templates/airReservation/multiplePaxsWithSelectee');
const airReservationInternationalCheckedIn = require('mocks/templates/airReservation/airReservationInternationalCheckedIn');
const unaccompany = require('mocks/templates/airReservation/unaccompany');
const airReservationInternationalMissingPassport = require('mocks/templates/airReservation/airReservationInternationalMissingPassport');
const contactTracing = require('mocks/templates/airReservation/contactTracing');
const filledPassportAndEmergencyContactMethod = require('mocks/templates/airReservation/filledPassportAndEmergencyContact');
const missingPassportAndEmergencyContactMethod = require('mocks/templates/airReservation/missingPassportAndEmergencyContact');
const changeCheckedInPassenger = require('mocks/templates/airReservation/changeCheckedInPassenger');
const changeOneWay = require('mocks/templates/airReservation/changeOneWay');
const changeOneWayDowngradeWithMixRefund = require('mocks/templates/airReservation/changeOneWayDowngradeWithMixRefund');
const changeOneWayFareProtectionWithDollars = require('mocks/templates/airReservation/changeOneWayFareProtectionWithDollars');
const changeRepricedFlights = require('mocks/templates/airReservation/changeRepricedFlights');
const changeRoundTripDowngradeWithDollars = require('mocks/templates/airReservation/changeRoundTripDowngradeWithDollars');
const changeRoundTripDowngradeWithPoints = require('mocks/templates/airReservation/changeRoundTripDowngradeWithPoints');
const changeRoundTripEvenExchangeWithDollars = require('mocks/templates/airReservation/changeRoundTripEvenExchangeWithDollars');
const changeRoundTripUpgradeWithDollars = require('mocks/templates/airReservation/changeRoundTripUpgradeWithDollars');
const changeRoundTripUpgradeWithPoints = require('mocks/templates/airReservation/changeRoundTripUpgradeWithPoints');
const changeUncompanionMinorRoundTripUpgradeWithDollars = require('mocks/templates/airReservation/changeUncompanionMinorRoundTripUpgradeWithDollars');
const dynamicWaiverSinglePaxRoundTrip = require('mocks/templates/airReservation/dynamicWaiverSinglePaxRoundTrip');
const domesticSecureFlightStatusNotClear = require('mocks/templates/airReservation/domesticSecureFlightStatusNotClear');
const normalAirReservation = require('mocks/templates/airReservation/normalAirReservation');
const airCancel = require('mocks/templates/airReservation/airCancel');
const airCancelWithReceipt = require('mocks/templates/airReservation/airCancelWithReceipt');
const domesticCompanionEligible = require('mocks/templates/airReservation/domesticCompanionEligible');
const companionReservation = require('mocks/templates/airReservation/companionReservation');
const addCompanion = require('mocks/templates/reservation/chapi-add-companion/addCompanion');
const changeOneWayForCHAPI = require('mocks/templates/air-change/changeOneWay');
const changeRoundTrip = require('mocks/templates/air-change/changeRoundTrip');
const changeRoundTripOpenJaw = require('mocks/templates/air-change/changeRoundTripOpenJaw');
const changeRoundTripWithUM = require('mocks/templates/air-change/changeRoundTripWithUM');
const viewReservationWithEarlyBird = require('mocks/templates/airReservation/viewReservationWithEarlyBird');
const cancelOneWay = require('mocks/templates/airReservation/cancelOneWay');
const cancelledFlight = require('mocks/templates/airReservation/cancelledFlight');
const viewReservationPPUWKZ = require('mocks/templates/reservation/PPUWKZ/viewReservationPage');
const viewReservationMTCO7D = require('mocks/templates/reservation/MTCO7D/viewReservationPage');
const getTravelInformationPageInternational = require('mocks/templates/reservation/INTEMT/getTravelInformationPageInternational');
const viewReservationSPESHL = require('mocks/templates/reservation/SPESHL/viewReservationPage');
const GDSAOMContactMethod = require('mocks/templates/reservation/GDSAOM/contactMethodDomestic');
const GDSINTContactMethod = require('mocks/templates/reservation/GDSAOM/contactMethodInternational');
const airReaccomOneWay = require('mocks/templates/airReservation/airReaccomOneWay');
const reaccomRoundTrip = require('mocks/templates/air-change/reaccomRoundTripResponse');
const reaccomBlockMultiBounds = require('mocks/templates/air-change/reaccomBlockMultiBoundsResponse.js');
const changeCheckedInRdoEditName = require('mocks/templates/airReservation/changeCheckedInRdoEditName');
const changeRdoEditName = require('mocks/templates/airReservation/changeRdoEditName');
const spaceAvailableNonRevStandby = require('mocks/templates/airReservation/spaceAvailableNonRevStandby');

const passportAndEmergencyContactMapping = {
  INTCHC: filledPassportAndEmergencyContactMethod,
  INTEMT: missingPassportAndEmergencyContactMethod
};
const linkForChangePayPal = {
  href: '/v1/mobile-air-booking/page/flights/change/current/PAYPAL',
  method: 'GET',
  query: { 'first-name': 'Test', 'last-name': 'Wang' }
};

const linkForChangeApplePay = {
  href: '/v1/mobile-air-booking/page/flights/change/current/APLPAY',
  method: 'GET',
  query: { 'first-name': 'Test', 'last-name': 'Wang' }
};

const linkForChangeReprice = {
  href: '/v1/mobile-air-booking/page/flights/change/current/REPRIC',
  method: 'GET',
  query: { 'first-name': 'Kyrr', 'last-name': 'Test' }
};

const reservationMapping = {
  CHREVC: chapiDomesticHasCompanion,
  DOMEST: domesticSecureFlightStatusNotClear,
  VIWAIR: normalAirReservation,
  CANMIX: airCancel,
  EMRCPT: airCancelWithReceipt,
  J5I2M3: viewBoardingPassIssuance,
  J5LOZM: viewBoardingPosition,
  CHFCHK: changeCheckedInPassenger,
  CHFONE: changeOneWay,
  DBDMIX: changeOneWayDowngradeWithMixRefund,
  CHFRDF: changeOneWayFareProtectionWithDollars,
  CHFRPR: changeRepricedFlights,
  CHFRDD: changeRoundTripDowngradeWithDollars,
  CHFRPD: changeRoundTripDowngradeWithPoints,
  CHFRDE: changeRoundTripEvenExchangeWithDollars,
  CHFRDU: changeRoundTripUpgradeWithDollars,
  CHFRPU: changeRoundTripUpgradeWithPoints,
  CHFUMN: changeUncompanionMinorRoundTripUpgradeWithDollars,
  CHDWDE: dynamicWaiverSinglePaxRoundTrip,
  REPRIC: _.merge({}, changeRoundTripEvenExchangeWithDollars, {
    viewReservationViewPage: { _links: { change: linkForChangeReprice } }
  }),
  KGH38R: dynamicWaiver,
  STMXQ6: withStandByCard,
  YJ2222: checkIn,
  LEQ5C5: multiplePaxsWithSelectee,
  YJ3333: unaccompany,
  INTCHC: airReservationInternationalCheckedIn,
  INTEMT: airReservationInternationalMissingPassport,
  QIQNWQ: domesticCompanionEligible,
  RVCOMP: chapiDomesticHasCompanion,
  COMPAN: companionReservation,
  ADDCOM: addCompanion,
  CHGONE: changeOneWayForCHAPI,
  OPENJW: changeRoundTripOpenJaw,
  CHGRTP: changeRoundTrip,
  ADDEBD: viewReservationWithEarlyBird,
  CHGUNM: changeRoundTripWithUM,
  CANONE: cancelOneWay,
  U5NLCS: cancelledFlight,
  PPUWKZ: viewReservationPPUWKZ,
  MTCO7D: viewReservationMTCO7D,
  PAYPAL: _.merge({}, changeRoundTripWithUM, { viewReservationViewPage: { _links: { change: linkForChangePayPal } } }),
  APLPAY: _.merge({}, changeRoundTripUpgradeWithDollars, {
    viewReservationViewPage: { _links: { change: linkForChangeApplePay } }
  }),
  SPESHL: viewReservationSPESHL,
  ERSS1A: airReaccomOneWay,
  REACC2: reaccomRoundTrip,
  REACMB: reaccomBlockMultiBounds,
  KSC7ZD: GDSAOMContactMethod,
  GDSINT: GDSINTContactMethod,
  RDOCHK: changeCheckedInRdoEditName,
  RDO2CH: changeRdoEditName,
  '2IGGMN': spaceAvailableNonRevStandby
};

let hasCompletePassportInfo = false;
let passportInformation;
let emergencyContact;

module.exports = [
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/:pnr',
    method: 'POST',
    cache: false,
    status: (req, res) => {
      const { pnr } = req.params;
      const responseData = reservationMapping[pnr];
      const passenger = {
        viewReservationViewPage: {
          passengers: [
            {
              hasCompletePassportInfo
            }
          ]
        }
      };

      if (responseData) {
        if (pnr === 'INTEMT' && hasCompletePassportInfo) {
          const realResponse = _.merge({}, responseData, passenger);

          return res.status(200).send(realResponse);
        }

        return res.status(200).send(responseData);
      }

      return res.status(404).send();
    }
  },
  {
    path: '/chapi/v1/mobile-misc/page/view-reservation/passport-emergency-contact/:pnr',
    method: 'GET',
    cache: false,
    status: (req, res) => {
      const { pnr } = req.params;
      const responseData = passportAndEmergencyContactMapping[pnr];

      if (responseData) {
        if (pnr === 'INTEMT') {
          const passportAndEmergencyContactInformationPage = _.merge(
            {},
            responseData.passportAndEmergencyContactInformationPage,
            { passportInformation },
            { emergencyContact }
          );

          return res.status(200).send({ passportAndEmergencyContactInformationPage });
        }

        return res.status(200).send(responseData);
      }

      return res.status(404).send();
    }
  },
  {
    path: '/chapi/v1/mobile-misc/feature/reservation/passport-emergency-contact/:pnr',
    method: 'POST',
    cache: false,
    status: (req, res) => {
      const { body } = req;
      const { pnr } = req.params;
      const lastFourPassportNumber =
        body.passportAndEmergencyContactInformationUpdate.passportInformation.passportNumber;

      passportInformation = _.chain(body.passportAndEmergencyContactInformationUpdate.passportInformation)
        .omit('passportNumber')
        .assign({ lastFourPassportNumber })
        .value();
      ({
        passportAndEmergencyContactInformationUpdate: { emergencyContact }
      } = body);
      hasCompletePassportInfo = true;
      const responseData = passportAndEmergencyContactMapping[pnr];

      if (responseData) {
        return res.status(200);
      }

      return res.status(404);
    }
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/:pnr',
    method: 'GET',
    cache: false,
    status: (req, res) => {
      const { pnr } = req.params;
      const responseData = passportAndEmergencyContactMapping[pnr];

      if (responseData) {
        if (pnr === 'INTEMT') {
          return res
            .status(200)
            .send({ editPNRPassengerPage: getTravelInformationPageInternational.editPNRPassengerPage });
        }

        return res.status(200).send(responseData);
      }

      return res.status(404).send();
    }
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/contact-tracing/:pnr',
    method: 'GET',
    cache: false,
    status: (request, res) => res.status(200).send(contactTracing)
  },
  {
    path: '/chapi/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/:pnr',
    method: 'POST',
    cache: false,
    status: (req, res) => {
      const { body } = req;
      const { pnr } = req.params;
      const lastFourPassportNumber = body.editPNRPassengerUpdate.passportInformation.passportNumber;

      passportInformation = _.chain(body.editPNRPassengerUpdate.passportInformation)
        .omit('passportNumber')
        .assign({ lastFourPassportNumber })
        .value();
      ({
        editPNRPassengerUpdate: { emergencyContact }
      } = body);
      hasCompletePassportInfo = true;
      const responseData = passportAndEmergencyContactMapping[pnr];

      if (responseData) {
        return res.status(200);
      }

      return res.status(404);
    }
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/contact-info/KSC7ZD',
    method: 'GET',
    cache: false,
    status: (req, res) => {
      const responseData = reservationMapping['KSC7ZD'];

      if (responseData) {
        return res.status(200).send(responseData);
      }

      return res.status(404);
    }
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/contact-info/GDSINT',
    method: 'GET',
    cache: false,
    status: (req, res) => {
      const responseData = reservationMapping['GDSINT'];

      if (responseData) {
        return res.status(200).send(responseData);
      }

      return res.status(404);
    }
  },
  {
    path: '/chapi/v1/mobile-air-booking/page/view-reservation/contact-info/KSC7ZD',
    method: 'POST',
    cache: false,
    status: (req, res) => res.status(200)
  }
];
