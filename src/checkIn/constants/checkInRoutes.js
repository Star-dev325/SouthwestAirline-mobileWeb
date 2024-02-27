import { airUpgradeOldRoutes, airUpgradeRoutes } from 'src/airUpgrade/constants/airUpgradeRoutes';
import { upgradedBoardingOldRoutes, upgradedBoardingRoutes } from 'src/upgradedBoarding/constants/upgradedBoardingRoutes';

export const checkInRoutes = {
  airUpgradeSelectBound: airUpgradeRoutes['airUpgradeSelectBound'],
  checkInAdditionalPassportInformation: '/air/check-in/:paxNumber/additional-required-info.html',
  checkInAdditionalPassportInformationDestination: '/air/check-in/:paxNumber/additional-required-info/destination.html',
  checkInAdditionalPassportInformationGreenCard: '/air/check-in/:paxNumber/additional-required-info/green-card.html',
  checkInAdditionalPassportInformationVisa: '/air/check-in/:paxNumber/additional-required-info/visa.html',
  checkInBoardingPass: '/air/check-in/documents.html',
  checkInBoardingPosition: '/air/check-in/boarding-positions.html',
  checkInChooseBoardingPass: '/air/check-in/choose-boarding-passes.html',
  checkInConfirmation: '/air/check-in/confirmation.html',
  checkInContactMethod: '/air/check-in/confirmation/:pnr/contact-method',
  checkInIndex: '/air/check-in/',
  checkInPassportInformation: '/air/check-in/:paxNumber/required-info.html',
  hazmatDeclaration: '/air/check-in/hazmat-declaration.html',
  upgradedBoardingPurchase: upgradedBoardingRoutes['upgradedBoardingPurchase']
};

export const checkInOldRoutes = {
  airUpgradeSelectBound: airUpgradeOldRoutes['airUpgradeSelectBound'],
  checkInAdditionalPassportInformation: '/check-in/:paxNumber/additional-passport-info',
  checkInAdditionalPassportInformationDestination: '/check-in/:paxNumber/additional-passport-info/destination',
  checkInAdditionalPassportInformationGreenCard: '/check-in/:paxNumber/additional-passport-info/green-card',
  checkInAdditionalPassportInformationVisa: '/check-in/:paxNumber/additional-passport-info/visa',
  checkInBoardingPass: '/check-in/boarding-pass',
  checkInBoardingPosition: '/check-in/boarding-positions',
  checkInChooseBoardingPass: '/check-in/choose-boarding-passes',
  checkInConfirmation: '/check-in/confirmation',
  checkInContactMethod: '/check-in/confirmation/:pnr/contact-method',
  checkInIndex: '/check-in',
  checkInPassportInformation: '/check-in/:paxNumber/passportPage',
  hazmatDeclaration: '/check-in/hazmat-declaration',
  upgradedBoardingPurchase: upgradedBoardingOldRoutes['upgradedBoardingPurchase']
};
