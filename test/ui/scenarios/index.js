const pagesScenarios = require('./sharedPages');
const componentsScenarios = require('./sharedComponents');
const airBookingScenarios = require('./airBooking');
const airChangeScenarios = require('./airChange');
const airCancelScenarios = require('./airCancel');
const carBookingScenarios = require('./carBooking');
const flightStatusScenarios = require('./flightStatus');
const carCancelScenarios = require('./carCancel');
const companionScenarios = require('./companion');
const earlyBirdScenarios = require('./earlyBird');
const viewReservationScenarios = require('./viewReservation');
const checkInScenarios = require('./checkIn');
const enrollScenarios = require('./enroll');
const travelAdvisoryScenarios = require('./travelAdvisory');
const travelFundsScenarios = require('./travelFunds');
const standby = require('./standby');
const homeAndNav = require('./homeAndNav');
const myAccount = require('./myAccount');
const externalPayment = require('./externalPayment');
const contactTracing = require('./contactTracing');
const upgradedBoarding = require('./upgradedBoarding');
const rapidRewardsScenarios = require('./rapidRewards');
const airUpgrade = require('./airUpgrade');
const sameDay = require('./sameDay');

module.exports = [
  ...pagesScenarios,
  ...componentsScenarios,
  ...airBookingScenarios,
  ...airChangeScenarios,
  ...airCancelScenarios,
  ...carBookingScenarios,
  ...flightStatusScenarios,
  ...carCancelScenarios,
  ...companionScenarios,
  ...contactTracing,
  ...earlyBirdScenarios,
  ...viewReservationScenarios,
  ...checkInScenarios,
  ...enrollScenarios,
  ...travelAdvisoryScenarios,
  ...travelFundsScenarios,
  ...standby,
  ...homeAndNav,
  ...myAccount,
  ...externalPayment,
  ...upgradedBoarding,
  ...rapidRewardsScenarios,
  ...airUpgrade,
  ...sameDay
];
