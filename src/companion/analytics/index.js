import {
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';
import { getPricing } from 'src/companion/analytics/pricingSelector';
import { getPayment } from 'src/companion/analytics/paymentSelector';
import { getReview } from 'src/companion/analytics/reviewSelector';
import { getConfirmation } from 'src/companion/analytics/confirmationSelector';
import { companionPricingPageMktgSelector } from 'src/companion/analytics/companionPricingPageMktgSelector';
import { companionConfirmationPageMktgSelector } from 'src/companion/analytics/companionConfirmationPageMktgSelector';

import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import CompanionActionTypes from 'src/companion/actions/companionActionTypes';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';

const { CREDIT_CARD__SET_SAVED_CREDIT_CARDS } = CreditCardActionTypes;
const { SWITCH_EARLYBIRD_IN_PATH_BUTTON } = AnalyticsActionTypes;

const {
  COMPANION__FETCH_PRICING_PAGE_SUCCESS,
  COMPANION__FETCH_CONFIRMATION_PAGE,
  COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS,
  COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS,
  COMPANION__SAVE_PAYMENT_INFO,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED
} = CompanionActionTypes;

const companionSelectors = {
  pricing: {
    actions: [COMPANION__FETCH_PRICING_PAGE_SUCCESS],
    selector: getPricing
  },
  payment: {
    actions: [COMPANION__SAVE_PAYMENT_INFO, CREDIT_CARD__SET_SAVED_CREDIT_CARDS],
    selector: getPayment
  },
  review: {
    actions: [
      COMPANION__SAVE_PAYMENT_INFO,
      COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS,
      COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
      COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
      SWITCH_EARLYBIRD_IN_PATH_BUTTON,
      COMPANION__FETCH_CONFIRMATION_PAGE
    ],
    selector: getReview
  },
  confirmation: {
    actions: [COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS],
    selector: getConfirmation
  }
};

export const generateUpdatedCompanionBookingStore = (state, actionType) =>
  generateUpdatedFlowStoreForAnalytics(companionSelectors, state, actionType);

export const analyticsActionsForCompanionBooking = generateFlowActionListForAnalytics(companionSelectors);

export const dataLayerSelectorsForCompanionPage = {
  [COMPANION__FETCH_PRICING_PAGE_SUCCESS]: companionPricingPageMktgSelector,
  [COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS]: companionConfirmationPageMktgSelector,
  [COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS]: companionPricingPageMktgSelector
};
