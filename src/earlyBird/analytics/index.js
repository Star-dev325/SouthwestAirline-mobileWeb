import _ from 'lodash';
import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import { getPayment } from 'src/earlyBird/analytics/paymentSelectors';
import { earlyBirdSelectFlightMktgSelector } from 'src/earlyBird/analytics/earlyBirdSelectFlightMktgSelector';
import { earlyBirdConfirmationMktgSelector } from 'src/earlyBird/analytics/earlyBirdConfirmationMktgSelector';
import { earlyBirdReviewMktgSelector } from 'src/earlyBird/analytics/earlyBirdReviewMktgSelector';

import EarlyBirdActionTypes from 'src/earlyBird/actions/earlyBirdActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const {
  EARLY_BIRD__FETCH_RESERVATION_SUCCESS,
  EARLY_BIRD__FETCH_PURCHASE_SUCCESS,
  EARLY_BIRD__SAVE_PAYMENT_INFO,
  EARLY_BIRD__SAVE_REVIEW_PAGE_DATA
} = EarlyBirdActionTypes;

const { TRACE_EARLYBIRD_PAYMENT_TYPE } = AnalyticsActionTypes;

const earlyBirdSelectors = {
  ViewReservation: {
    actions: [EARLY_BIRD__FETCH_RESERVATION_SUCCESS],
    selector: (state) => _.get(state, 'app.earlyBird.detailPage.response.earlyBirdAnalytics')
  },
  Confirmation: {
    actions: [EARLY_BIRD__FETCH_PURCHASE_SUCCESS],
    selector: (state) => _.get(state, 'app.earlyBird.confirmationPage.response.earlyBirdPurchaseAnalytics')
  },
  payment: {
    actions: [EARLY_BIRD__SAVE_PAYMENT_INFO, EARLY_BIRD__SAVE_REVIEW_PAGE_DATA, TRACE_EARLYBIRD_PAYMENT_TYPE],
    selector: getPayment
  }
};

export const generateUpdatedEarlyBirdStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(earlyBirdSelectors, state, actionType);

export const analyticsActionsForEarlyBird = generateFlowActionListForAnalytics(earlyBirdSelectors);

export const dataLayerSelectorsForEarlyBird = {
  [EARLY_BIRD__FETCH_RESERVATION_SUCCESS]: earlyBirdSelectFlightMktgSelector,
  [EARLY_BIRD__FETCH_PURCHASE_SUCCESS]: earlyBirdConfirmationMktgSelector,
  [EARLY_BIRD__SAVE_REVIEW_PAGE_DATA]: earlyBirdReviewMktgSelector
};
