import CheckInActionTypes from 'src/checkIn/actions/checkInActionTypes';
import _ from 'lodash';
import { getMissingPassportOrEmergencyContact } from 'src/checkIn/helpers/updateAPIsHelper';
import { combineReducers } from 'redux';

import { transformReservationDetailsResponseToBoardingPassInfoForSharing } from 'src/checkIn/transformers/checkInActionsTransformer';

import UpdateAPIsTransformers from 'src/checkIn/transformers/updateAPIsTransformer';

import MissingApisCategoryType from 'src/checkIn/constants/missingApisCategoryType';

import CheckInAPISConstants from 'src/checkIn/constants/checkInAPISConstants';

const { DESTINATION_FORM_NAME, PERMANENTRESIDENTCARD_FORM_NAME, VISA_FORM_NAME } = CheckInAPISConstants;
const { DESTINATION, PERMANENT_RESIDENT_CARD, VISA } = MissingApisCategoryType;

export const travelDocuments = (state = [], action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_SUCCESS: {
      const toUpdateDocuments = _.cloneDeep(state);
      const missingDocuments = _.get(
        action.response,
        'travelDocumentsNeeded._links.travelDocuments.meta.missingDocuments'
      );
      const destinationConfig = _.get(
        action.response,
        'travelDocumentsNeeded._links.travelDocuments.meta.destinationConfig'
      );
      const travelDocumentIndex = parseInt(action.paxNumber) - 1;

      toUpdateDocuments[travelDocumentIndex].missingDocuments = _.union(
        getMissingPassportOrEmergencyContact(state[travelDocumentIndex].missingDocuments),
        missingDocuments
      );
      toUpdateDocuments[travelDocumentIndex].destinationConfig = destinationConfig;
      toUpdateDocuments[travelDocumentIndex].passportPageFormData = _.merge(
        {},
        state[travelDocumentIndex].passportPageFormData,
        action.formData
      );

      return toUpdateDocuments;
    }
    case CheckInActionTypes.CHECK_IN__CLEAN_APIS_DATA: {
      const toUpdateDocuments = _.cloneDeep(state);
      const paxIndex = parseInt(action.paxNumber) - 1;
      const missingDocuments = _.get(toUpdateDocuments, [paxIndex, 'missingDocuments']);

      const travelDocToFormName = {
        [VISA]: VISA_FORM_NAME,
        [PERMANENT_RESIDENT_CARD]: PERMANENTRESIDENTCARD_FORM_NAME,
        [DESTINATION]: DESTINATION_FORM_NAME
      };

      _.difference([VISA, PERMANENT_RESIDENT_CARD, DESTINATION], missingDocuments).forEach((missingDoc) => {
        const formName = travelDocToFormName[missingDoc];
        const { additionalPassportPageFormData } = toUpdateDocuments[paxIndex];

        if (additionalPassportPageFormData) {
          delete additionalPassportPageFormData[formName];
        }
      });

      return toUpdateDocuments;
    }
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS:
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS: {
      const { response } = action;

      const linksOfResponse = _.get(response, 'checkInViewReservationPage._links');
      const transformedTravelDocuments = UpdateAPIsTransformers.transformLinksToTravelDocuments(linksOfResponse);
      const travellersFormData = UpdateAPIsTransformers.transformPrefillAPISDataToCheckInAPISFormData(
        response.prefillPassengerAPISDocuments
      );

      _.forEach(transformedTravelDocuments, (travelDocument) =>
        Object.assign(travelDocument, travellersFormData[travelDocument.requestData.body.travelerIdentifier])
      );

      return transformedTravelDocuments;
    }
    case CheckInActionTypes.CHECK_IN__UPDATE_APIS_DATA: {
      const toUpdateState = _.cloneDeep(state);
      const { formData, nodeName, paxNumber } = action;

      if (nodeName === 'destination') {
        const { contactPhone1Number, contactPhone1CountryCode, contactPhone2Number, contactPhone2CountryCode } =
          formData;

        if (contactPhone1Number && !contactPhone1CountryCode) {
          formData['contactPhone1CountryCode'] = '1';
        }

        if (contactPhone2Number && !contactPhone2CountryCode) {
          formData['contactPhone2CountryCode'] = '1';
        }
      }

      if (formData.contactTracingSaveForAllPassengers) {
        return toUpdateState.map((travelDocument) =>
          _.set(travelDocument, `additionalPassportPageFormData.${nodeName}`, formData)
        );
      } else {
        return _.set(
          toUpdateState,
          `${Number.parseInt(paxNumber) - 1}.additionalPassportPageFormData.${nodeName}`,
          formData
        );
      }
    }
    default: {
      return state;
    }
  }
};

const pnr = (state = null, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS: {
      return action.pnr;
    }
    default: {
      return state;
    }
  }
};

const recordLocator = (state = null, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS:
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS: {
      return _.get(action, 'response.checkInViewReservationPage.pnr.confirmationNumber');
    }
    default: {
      return state;
    }
  }
};

const passengers = (state = [], action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS:
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS: {
      return _.get(action, 'response.checkInViewReservationPage.pnr.passengers');
    }
    default: {
      return state;
    }
  }
};

const boardingPassInfoForSharing = (state = null, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS:
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS: {
      return transformReservationDetailsResponseToBoardingPassInfoForSharing(action.response);
    }
    default: {
      return state;
    }
  }
};

const reservationDetailLinks = (state = null, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS:
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS: {
      return _.get(action, 'response.checkInViewReservationPage._links', {});
    }
    default: {
      return state;
    }
  }
};

export const checkInSessionToken = (state = null, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_SUCCESS:
    case CheckInActionTypes.CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS_SUCCESS:
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS:
    case CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS: {
      return _.get(action, 'response.checkInSessionToken');
    }
    case CheckInActionTypes.CHECK_IN__CLEAR_CHECK_IN_SESSION_TOKEN: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export const saveEmergencyContactForAll = (state = null, action = {}) => {
  switch (action.type) {
    case CheckInActionTypes.CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL: {
      const {
        formData: {
          doNotWishToProvideAnEmergencyContact,
          emergencyContactName,
          emergencyContactCountryCode,
          emergencyContactPhoneNumber,
          emergencyContactSaveForAllPassengers
        }
      } = action;

      const shouldUseForAll =
        !_.toBoolean(doNotWishToProvideAnEmergencyContact) && _.toBoolean(emergencyContactSaveForAllPassengers);
      const emergencyContactInfo = shouldUseForAll
        ? {
          emergencyContactName,
          emergencyContactCountryCode,
          emergencyContactPhoneNumber
        }
        : {};

      return _.merge({}, { shouldUseForAll }, emergencyContactInfo);
    }
    default: {
      return state;
    }
  }
};

const checkInFlowDataReducer = combineReducers({
  pnr,
  recordLocator,
  passengers,
  boardingPassInfoForSharing,
  travelDocuments,
  checkInSessionToken,
  reservationDetailLinks,
  saveEmergencyContactForAll
});

export default checkInFlowDataReducer;
