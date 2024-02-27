import _ from 'lodash';
import MissingApisCategoryType from 'src/checkIn/constants/missingApisCategoryType';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

const { DESTINATION, EMERGENCY_CONTACT, NATIONALITY, PASSPORT, PERMANENT_RESIDENT_CARD, VISA } =
  MissingApisCategoryType;

export const isMissingPassportOrEmergencyContact = (missingDocuments) =>
  !_.isEmpty(getMissingPassportOrEmergencyContact(missingDocuments));

export const isMissingAdditionalInfo = (missingDocuments) =>
  !_.isEmpty(_.intersection(missingDocuments, [VISA, PERMANENT_RESIDENT_CARD, DESTINATION]));

export const getMissingPassportOrEmergencyContact = (missingDocuments) =>
  _.intersection(missingDocuments, [NATIONALITY, EMERGENCY_CONTACT, PASSPORT]);

export const getNextTravelPassengerTransitionInfo = (travelDocuments, currentPaxNumber) => {
  const nextPaxNumber = parseInt(currentPaxNumber) + 1; // TODO: when we work on back refresh story, we only need to change this logic.

  if (nextPaxNumber > _.get(travelDocuments, 'length', 0)) {
    return { nextPagePath: getNormalizedRoute({ routeName: 'checkInConfirmation' }) };
  }

  const missingDocumentsOfNextPax = _.get(travelDocuments, `${nextPaxNumber - 1}.missingDocuments`);

  if (isMissingPassportOrEmergencyContact(missingDocumentsOfNextPax)) {
    return { nextPaxNumber: nextPaxNumber.toString(), nextPagePath: getNormalizedRoute({ routeName: 'checkInPassportInformation' }) };
  }

  if (isMissingAdditionalInfo(missingDocumentsOfNextPax)) {
    return { nextPaxNumber: nextPaxNumber.toString(), nextPagePath: getNormalizedRoute({ routeName: 'checkInAdditionalPassportInformation' }) };
  }

  return { nextPagePath: getNormalizedRoute({ routeName: 'checkInConfirmation' }) };
};
