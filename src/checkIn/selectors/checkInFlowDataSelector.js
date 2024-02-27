// @flow
import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { getNextTravelPassengerTransitionInfo } from 'src/checkIn/helpers/updateAPIsHelper';
import type {
  PrefillPassengerAPISDocumentType,
  TravelDocumentsRequestLink
} from 'src/checkIn/flow-typed/checkIn.types';

const getTravelDocuments = (state) => _.get(state, 'app.checkIn.checkInFlowData.travelDocuments');
const getPaxNumber = (state: *, props: *) => _.get(props, 'params.paxNumber', '0');
const getPrefillPassengerAPISDocuments = (state) => _.get(state, 'app.checkIn.prefillPassengerAPISDocuments');

export const getNextPageOptions = createSelector([getTravelDocuments, getPaxNumber], (travelDocuments, paxNumber) =>
  getNextTravelPassengerTransitionInfo(travelDocuments, paxNumber)
);

export const getTravelDocumentSelectorCreator = (fieldName: string) =>
  createSelector([getTravelDocuments, getPaxNumber], (travelDocuments, paxNumber) =>
    _.get(travelDocuments, `${+paxNumber - 1}.${fieldName}`)
  );

const getPrefillPassengerAPISDocumentsSelectorCreator = (fieldName: string) =>
  createSelector([getPrefillPassengerAPISDocuments, getRequestData], (prefillPassengerAPISDocuments: Array<PrefillPassengerAPISDocumentType>, requestData: ?TravelDocumentsRequestLink) => {
    for (const traveler of prefillPassengerAPISDocuments) {
      if (traveler.travelerIdentifier === requestData?.body?.travelerIdentifier) {
        return traveler[fieldName];
      }
    }
  });

export const getPassengerName = getTravelDocumentSelectorCreator('travelerName');

export const getRequestData = getTravelDocumentSelectorCreator('requestData');

export const getSuppressEmergencyContact = getPrefillPassengerAPISDocumentsSelectorCreator('suppressEmergencyContact');
