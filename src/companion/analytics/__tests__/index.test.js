import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import CompanionActionTypes from 'src/companion/actions/companionActionTypes';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import { generateFlowActionListForAnalytics } from 'src/shared/analytics/helpers/analyticsHelper';
import * as CompanionAnalytics from 'src/companion/analytics/index';

const { CREDIT_CARD__SET_SAVED_CREDIT_CARDS } = CreditCardActionTypes;
const {
  COMPANION__FETCH_PRICING_PAGE_SUCCESS,
  COMPANION__FETCH_CONFIRMATION_PAGE,
  COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS,
  COMPANION__SAVE_PAYMENT_INFO,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
  COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS
} = CompanionActionTypes;
const { SWITCH_EARLYBIRD_IN_PATH_BUTTON } = AnalyticsActionTypes;
const mockActionData = [
  CREDIT_CARD__SET_SAVED_CREDIT_CARDS,
  COMPANION__FETCH_PRICING_PAGE_SUCCESS,
  COMPANION__FETCH_CONFIRMATION_PAGE,
  COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS,
  COMPANION__SAVE_PAYMENT_INFO,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
  COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS,
  SWITCH_EARLYBIRD_IN_PATH_BUTTON
];
const companionPricingPageData = 'companion pricing data';
const companionPaymentData = 'companion payment data';
const companionReviewdata = 'companion review data';
const companionConfirmationData = 'companion confirmation data';
const companionPricingPageMktgData = 'companion pricing mktg data';
const companionConfirmationPageMktgData = 'companion confirmation mktg data';

jest.mock('src/companion/analytics/pricingSelector', () => ({
  getPricing: jest.fn(() => companionPricingPageData)
}));
jest.mock('src/companion/analytics/paymentSelector', () => ({
  getPayment: jest.fn(() => companionPaymentData)
}));
jest.mock('src/companion/analytics/reviewSelector', () => ({
  getReview: jest.fn(() => companionReviewdata)
}));
jest.mock('src/companion/analytics/confirmationSelector', () => ({
  getConfirmation: jest.fn(() => companionConfirmationData)
}));
jest.mock('src/companion/analytics/companionPricingPageMktgSelector', () => ({
  companionPricingPageMktgSelector: jest.fn(() => companionPricingPageMktgData)
}));
jest.mock('src/companion/analytics/companionConfirmationPageMktgSelector', () => ({
  companionConfirmationPageMktgSelector: jest.fn(() => companionConfirmationPageMktgData)
}));
jest.mock('src/shared/analytics/helpers/analyticsHelper', () => ({
  generateFlowActionListForAnalytics: jest.fn(() => mockActionData),
  generateUpdatedFlowStoreForAnalytics: jest.fn((selectors, state, actionType) => {
    switch (actionType) {
      case 'COMPANION__FETCH_PRICING_PAGE_SUCCESS': {
        return {
          pricing: 'companion pricing data'
        };
      }
      case 'COMPANION__SAVE_PAYMENT_INFO': {
        return {
          payment: 'companion payment data',
          review: 'companion review data'
        };
      }
      case 'COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS': {
        return {
          confirmation: 'companion confirmation data'
        };
      }
      case 'NOT_LISTENING_ACTION': {
        return {};
      }
    }
  })
}));

describe('index', () => {
  describe('analyticsActionsForCompanionBooking', () => {
    it('should return analytics actions for companionBooking from selectors', () => {
      expect(generateFlowActionListForAnalytics()).toStrictEqual(mockActionData);
    });
  });

  describe('generateCompanionBookingStore', () => {
    it('should generate fields that listen to COMPANION__FETCH_PRICING_PAGE_SUCCESS action', () => {
      const triggeredActionType = COMPANION__FETCH_PRICING_PAGE_SUCCESS;

      const updatedData = CompanionAnalytics.generateUpdatedCompanionBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        pricing: 'companion pricing data'
      });
    });

    it('should generate fields that listen to COMPANION__SAVE_PAYMENT_INFO action', () => {
      const triggeredActionType = COMPANION__SAVE_PAYMENT_INFO;

      const updatedData = CompanionAnalytics.generateUpdatedCompanionBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        payment: 'companion payment data',
        review: 'companion review data'
      });
    });

    it('should generate fields that listen to COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS action', () => {
      const triggeredActionType = COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS;

      const updatedData = CompanionAnalytics.generateUpdatedCompanionBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({
        confirmation: 'companion confirmation data'
      });
    });

    it('should not generate any field when no selector listen to triggered action', () => {
      const triggeredActionType = 'NOT_LISTENING_ACTION';

      const updatedData = CompanionAnalytics.generateUpdatedCompanionBookingStore('state', triggeredActionType);

      expect(updatedData).toStrictEqual({});
    });
  });

  describe('dataLayerSelectorsForCompanionPage', () => {
    it('should return the selectors used for the marketing data layer', () => {
      expect(CompanionAnalytics.dataLayerSelectorsForCompanionPage[COMPANION__FETCH_PRICING_PAGE_SUCCESS]()).toStrictEqual(companionPricingPageMktgData);
      expect(CompanionAnalytics.dataLayerSelectorsForCompanionPage[COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS]()).toStrictEqual(companionConfirmationPageMktgData);
      expect(CompanionAnalytics.dataLayerSelectorsForCompanionPage[COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS]()).toStrictEqual(companionPricingPageMktgData);
    });
  });
});
