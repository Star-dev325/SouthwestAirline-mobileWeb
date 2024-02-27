// @flow
import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { isMissingAdditionalInfo } from 'src/checkIn/helpers/updateAPIsHelper';
import MissingApisCategoryType from 'src/checkIn/constants/missingApisCategoryType';

const { EMERGENCY_CONTACT, NATIONALITY } = MissingApisCategoryType;

const getTravelDocuments = (state) => _.get(state, 'app.checkIn.checkInFlowData.travelDocuments');
const getPassengers = (state: *) => _.get(state, 'app.checkIn.checkInFlowData.passengers');
const getPaxNumber = (state: *, props: *) => _.get(props, 'params.paxNumber', '0');
const getSaveEmergencyContactForAll = (state) => _.get(state, 'app.checkIn.checkInFlowData.saveEmergencyContactForAll');

export const shouldShowSkipButton = createSelector([getPassengers], (passengers) => passengers.length > 1);

export const isLastPage = createSelector([getTravelDocuments, getPaxNumber], (travelDocuments, paxNumber) => {
  const paxIndex = +paxNumber - 1;
  const travelDocument = _.get(travelDocuments, `${paxIndex}`);
  const missingDocuments = _.get(travelDocument, 'missingDocuments');
  const isLastPAX = +paxNumber === travelDocuments.length;

  return isLastPAX && !isMissingAdditionalInfo(missingDocuments);
});

export const getPassportPageFormData = createSelector(
  [getTravelDocuments, getPaxNumber, getSaveEmergencyContactForAll],
  (travelDocuments, paxNumber, saveEmergencyContactForAll) => {
    const passportPageFormData = _.get(travelDocuments, `${+paxNumber - 1}.passportPageFormData`);

    if (_.get(saveEmergencyContactForAll, 'shouldUseForAll')) {
      const emergencyContactMethod = _.omit(saveEmergencyContactForAll, 'shouldUseForAll');

      return { ...passportPageFormData, ...emergencyContactMethod };
    }

    return passportPageFormData;
  }
);

export const getShouldShowSaveEmergencyContactForAll = createSelector(
  [getTravelDocuments, getPaxNumber],
  (travelDocuments, paxNumber) => {
    const paxIndex = parseInt(paxNumber) - 1;

    const containMissingEmergencyContact = (travelDocument) => {
      const { missingDocuments } = travelDocument;
      const missingEmergencyContactOrNationality = _.intersection(missingDocuments, [EMERGENCY_CONTACT, NATIONALITY]);

      return !_.isEmpty(missingEmergencyContactOrNationality);
    };

    const moreThanOneMissingEmergencyContact = _.filter(travelDocuments, containMissingEmergencyContact).length > 1;
    const isFirstMissingEmergencyContactPAX = _.findIndex(travelDocuments, containMissingEmergencyContact) === paxIndex;

    return moreThanOneMissingEmergencyContact && isFirstMissingEmergencyContactPAX;
  }
);
