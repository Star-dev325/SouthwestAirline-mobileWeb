import * as analyticsForEarlyBird from 'src/earlyBird/analytics/index';
import EarlyBirdActionTypes from 'src/earlyBird/actions/earlyBirdActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import { generateFlowActionListForAnalytics } from 'src/shared/analytics/helpers/analyticsHelper';

const {
  EARLY_BIRD__FETCH_RESERVATION_SUCCESS,
  EARLY_BIRD__FETCH_PURCHASE_SUCCESS,
  EARLY_BIRD__SAVE_PAYMENT_INFO,
  EARLY_BIRD__SAVE_REVIEW_PAGE_DATA
} = EarlyBirdActionTypes;
const { TRACE_EARLYBIRD_PAYMENT_TYPE } = AnalyticsActionTypes;
const earlyBirdSelectFlightMktgData = 'early bird select flight mktg data';
const earlyBirdConfirmationMktgData = 'early bird confirmation mktg data';
const earlyBirdReviewMktgData = 'early bird review mktg data';

const mockActionData = [
  EARLY_BIRD__FETCH_RESERVATION_SUCCESS,
  EARLY_BIRD__FETCH_PURCHASE_SUCCESS,
  EARLY_BIRD__SAVE_PAYMENT_INFO,
  EARLY_BIRD__SAVE_REVIEW_PAGE_DATA,
  TRACE_EARLYBIRD_PAYMENT_TYPE
];

jest.mock('src/earlyBird/analytics/earlyBirdSelectFlightMktgSelector', () => ({
  earlyBirdSelectFlightMktgSelector: jest.fn(() => earlyBirdSelectFlightMktgData)
}));
jest.mock('src/earlyBird/analytics/earlyBirdConfirmationMktgSelector', () => ({
  earlyBirdConfirmationMktgSelector: jest.fn(() => earlyBirdConfirmationMktgData)
}));
jest.mock('src/earlyBird/analytics/earlyBirdReviewMktgSelector', () => ({
  earlyBirdReviewMktgSelector: jest.fn(() => earlyBirdReviewMktgData)
}));
jest.mock('src/shared/analytics/helpers/analyticsHelper', () => ({
  generateFlowActionListForAnalytics: jest.fn(() => mockActionData)
}));

describe('analyticsForEarlyBird', () => {
  it('should return analytics actions for earlyBird from selectors', () => {
    expect(generateFlowActionListForAnalytics()).toStrictEqual(mockActionData);
  });

  describe('dataLayerSelectorsForEarlyBird', () => {
    it('should return the selectors used for the marketing data layer', () => {
      expect(analyticsForEarlyBird.dataLayerSelectorsForEarlyBird[EARLY_BIRD__FETCH_RESERVATION_SUCCESS]()).toStrictEqual(earlyBirdSelectFlightMktgData);
      expect(analyticsForEarlyBird.dataLayerSelectorsForEarlyBird[EARLY_BIRD__FETCH_PURCHASE_SUCCESS]()).toStrictEqual(earlyBirdConfirmationMktgData);
      expect(analyticsForEarlyBird.dataLayerSelectorsForEarlyBird[EARLY_BIRD__SAVE_REVIEW_PAGE_DATA]()).toStrictEqual(earlyBirdReviewMktgData);
    });
  });
});
