import _ from 'lodash';
import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import ViewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';
import { getKtnRedress } from 'src/shared/analytics/eventStore/ktnRedressSelector';

const { VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS } = ViewReservationActionTypes;

const getFieldFromSaveTravelInformationRequest = (fieldName) => (state) =>
  !_.isEmpty(_.get(state, `app.viewReservation.travelInformationPage.saveTravelInformationRequest.body.${fieldName}`));

const eventStoreSelectors = {
  addedRR: {
    actions: [VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS],
    selector: getFieldFromSaveTravelInformationRequest('accountNumber')
  },
  addedKTN: {
    actions: [VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS],
    selector: getFieldFromSaveTravelInformationRequest('knownTravelerId')
  },
  addedRedress: {
    actions: [VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS],
    selector: getFieldFromSaveTravelInformationRequest('redressNumber')
  },
  addedPassport: {
    actions: [VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS],
    selector: getFieldFromSaveTravelInformationRequest('passportInformation')
  },
  addedEmergencyContact: {
    actions: [VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS],
    selector: getFieldFromSaveTravelInformationRequest('emergencyContact')
  },
  edited: {
    actions: [VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS],
    selector: getKtnRedress
  }
};

export const generateEventStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(eventStoreSelectors, state, actionType);

export const analyticsActionsForEventStore = generateFlowActionListForAnalytics(eventStoreSelectors);
