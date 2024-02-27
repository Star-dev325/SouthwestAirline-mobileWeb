import _ from 'lodash';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import * as contactMethodPageHelper from 'src/shared/helpers/contactMethodPageHelper';
import { toDynamicPlacement } from 'src/wcm/transformers/wcmTransformer';
import { defaultSearchRequest } from 'src/airBooking/helpers/shoppingLandingPageHelper';
import { getUpdatedSelectedFlightDetails } from 'src/shared/helpers/flightSegmentHelper';

export { default as passengerInfos } from 'src/airBooking/reducers/passengerInfosReducer';

export const searchRequest = (state = defaultSearchRequest, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_SEARCH_REQUEST: {
      return _.cloneDeep(action.searchRequest);
    }
    case AirBookingActionTypes.AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA: {
      return action.airBookingDataToResume.searchRequest;
    }
    case AirBookingActionTypes.AIR_BOOKING__RESET_FLIGHT_SEARCH_REQUEST: {
      return defaultSearchRequest;
    }
    case AirBookingActionTypes.AIR_BOOKING__UPDATE_FLIGHT_INITIAL_SEARCH: {
      return { ...state, isInitialSearch: action.isInitialSearch };
    }
    default: {
      return state;
    }
  }
};

export const selectedFlight = (state = {}, action = '') => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SAVE_SELECTED_FLIGHT: {
      return getUpdatedSelectedFlightDetails(action.selectedFlight, state);
    }
    default: {
      return state;
    }
  }
};

export const selectedProducts = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SAVE_SELECTED_PRODUCTS: {
      return _.cloneDeep(action.selectedProducts);
    }
    case AirBookingActionTypes.AIR_BOOKING__RESET_SELECTED_PRODUCTS: {
      return {};
    }
    case AirBookingActionTypes.AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA: {
      return action.airBookingDataToResume.selectedProducts;
    }
    default: {
      return state;
    }
  }
};

export const paymentInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SAVE_PAYMENT_INFO: {
      return _.cloneDeep(action.paymentInfo);
    }
    case CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS:
    case AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS:
    case AirBookingActionTypes.AIR_BOOKING__RESET_PAYMENT_INFO: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const chaseBannerConfig = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS: {
      const response = _.get(action, 'response', null);
      const isEligibleForDisplayingChaseBanner =
        (response?.isEligibleForDisplayingChaseBanner && response?.results?.fullChaseAd) ?? false;

      return isEligibleForDisplayingChaseBanner ? toDynamicPlacement(response, 'fullChaseAd') : {};
    }
    default: {
      return state;
    }
  }
};

export const pricingPromoBannerConfig = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS: {
      const response = _.get(action, 'response', null);

      const promoTop01 = toDynamicPlacement(response, 'promoTop01');
      const promoMiddle01 = toDynamicPlacement(response, 'promoMiddle01');
      const promoBottom01 = toDynamicPlacement(response, 'promoBottom01');
      const promoBottom02 = toDynamicPlacement(response, 'promoBottom02');

      return { promoTop01, promoMiddle01, promoBottom01, promoBottom02 };
    }
    default: {
      return state;
    }
  }
};

export const pricePagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS: {
      const earlyBirdUpsell = toDynamicPlacement(action.response, 'earlyBirdUpsell');

      return { earlyBirdUpsell };
    }
    default: {
      return state;
    }
  }
};

export const purchasePagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS: {
      const bottomPromo1 = toDynamicPlacement(action.response, 'bottomPromo1');
      const earlyBirdUpsell = toDynamicPlacement(action.response, 'earlyBirdUpsell');
      const upliftMessage = toDynamicPlacement(action.response, 'upliftMessage');

      return { bottomPromo1, earlyBirdUpsell, upliftMessage };
    }
    default:
      return state;
  }
};

export const updateSavedCreditCardPage = (state = null, action = {}) => {
  switch (action.type) {
    case CreditCardActionTypes.CREDIT_CARD__FETCH_CREDIT_CARD_BY_ID_SUCCESS: {
      return action.updateSavedCreditCardPage;
    }
    default: {
      return state;
    }
  }
};

export const isInternationalBooking = (state = false, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SET_INTERNATIONAL_BOOKING_FLAG: {
      return contactMethodPageHelper.isInternationalBookingHelper(action);
    }
    default:
      return state;
  }
};

export const accountInfo = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS: {
      return _.cloneDeep(_.get(action.passengerDetailsPageResponse, 'passengerDetailsPage'));
    }
    case AirBookingActionTypes.AIR_BOOKING__CLEAR_ACCOUNT_INFO: {
      return {};
    }
    default:
      return state;
  }
};

export const corporateBookingSwitchInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__UPDATE_CORPORATE_BOOKING_SWITCH_INFO: {
      return _.cloneDeep(action.corporateBookingSwitchInfo);
    }
    default:
      return state;
  }
};

export const earlyBirdSelected = (state = false, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED: {
      return _.cloneDeep(action.earlyBirdSelected);
    }
    default:
      return state;
  }
};

export const earlyBirdEligibility = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY: {
      return _.cloneDeep(action.earlyBirdEligibility);
    }
    default:
      return state;
  }
};

export const earlyBirdPricingToken = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_PRICING_TOKEN: {
      return action.earlyBirdPricingToken;
    }
    default:
      return state;
  }
};

export const earlyBirdPricingDifference = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_PRICING_DIFFERENCE: {
      return action.earlyBirdPricingDifference;
    }
    default:
      return state;
  }
};

export const selectedIrn = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__UPDATE_SELECTED_IRN: {
      return _.cloneDeep(action.selectedIrn);
    }
    case AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO: {
      const passengerDetailsPage = _.cloneDeep(action.passengerDetailsPage);
      const preselectedInternalReferenceNumber = _.get(
        passengerDetailsPage,
        'irnInfo.preselectedInternalReferenceNumber.name'
      );

      return preselectedInternalReferenceNumber
        ? { name: preselectedInternalReferenceNumber, manuallyEntered: false }
        : state;
    }
    default:
      return state;
  }
};

export const irnInfo = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO: {
      const { passengerDetailsPage } = action;

      return passengerDetailsPage && passengerDetailsPage.irnInfo ? { ...passengerDetailsPage.irnInfo } : state;
    }
    default:
      return state;
  }
};

export const contactMethodInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__UPDATE_CONTACT_METHOD:
      return action.info;
    case AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO: {
      const { passengerDetailsPage, isInternationalBooking: internationalBooking } = action;

      return contactMethodPageHelper.prefillPassengerInfoHelper(passengerDetailsPage, internationalBooking);
    }
    case AirBookingActionTypes.AIR_BOOKING__RESET_CONTACT_METHOD: {
      return {};
    }
    default:
      return state;
  }
};

export const contactTravelInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__UPDATE_CONTACT_TRAVEL_INFO_METHOD:
      return contactMethodPageHelper.convertContactTravelMangerInfo(action.info);
    default:
      return state;
  }
};

export const isPaymentOptionsAndPassengerInfoFetched = (state = false, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS:
      return true;
    case AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_FAILED:
      return false;
    default:
      return state;
  }
};

export const isEligibleForExpressCheckout = (state = true, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SET_ELIGIBLE_EXPRESS_CHECKOUT:
      return action.isEligibleForExpressCheckout;
    default:
      return state;
  }
};

export const isExpressCheckout = (state = false, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SET_IS_EXPRESS_CHECKOUT:
      return action.isExpressCheckout;
    default:
      return state;
  }
};

export const chaseSessionId = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SAVE_CHASE_SESSION_ID:
      return action.chaseSessionId;
    default:
      return state;
  }
};

export const isExpressCheckoutFromPassengerPage = (state = false, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SET_EXPRESS_CHECKOUT_FROM_PASSENGER_PAGE:
      return action.isExpressCheckoutFromPassengerPage;
    default:
      return state;
  }
};

export const confirmationPagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS: {
      const response = _.get(action, 'response', null);
      const bottomPromo1 = toDynamicPlacement(response, 'bottomPromo1');
      const promoTop01 = toDynamicPlacement(response, 'promoTop01');
      const promoBottom01 = toDynamicPlacement(response, 'promoBottom01');
      const promoBottom02 = toDynamicPlacement(response, 'promoBottom02');
      const promoBottom03 = toDynamicPlacement(response, 'promoBottom03');
      const promoBottom04 = toDynamicPlacement(response, 'promoBottom04');

      return { bottomPromo1, promoTop01, promoBottom01, promoBottom02, promoBottom03, promoBottom04 };
    }
    default:
      return state;
  }
};

export const flightSelectPagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SELECT_PAGE_PLACEMENTS_SUCCESS: {
      const response = _.get(action, 'response', null);
      const bottomPromo1 = toDynamicPlacement(response, 'promoBottom01');
      const promoTop01 = toDynamicPlacement(response, 'promoTop01');

      return { bottomPromo1, promoTop01 };
    }
    default:
      return state;
  }
};

export const flightSelectFarePagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SELECT_FARE_PAGE_PLACEMENTS_SUCCESS: {
      const response = _.get(action, 'response', null);
      const bottomPromo1 = toDynamicPlacement(response, 'promoBottom01');
      const promoTop01 = toDynamicPlacement(response, 'promoTop01');

      return { bottomPromo1, promoTop01 };
    }
    default:
      return state;
  }
};

export const selectedFrequentTravelers = (state = [], action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__UPDATE_FREQUENT_TRAVELER_PAX_ID: {
      const { frequentTravelerId, paxNumber, addFrequentTravelerToggle, frequentTravelerToken } = action;
      const newState = _.cloneDeep(state);
      const frequentTravelerIndex = newState.findIndex((frequentTraveler) => frequentTraveler.paxNumber === paxNumber);

      if (frequentTravelerIndex === -1) {
        return [...newState, { frequentTravelerId, paxNumber, addFrequentTravelerToggle, frequentTravelerToken }];
      } else {
        return newState.map((frequentTraveler) =>
          (frequentTraveler.paxNumber === paxNumber
            ? { ...frequentTraveler, frequentTravelerId, addFrequentTravelerToggle, frequentTravelerToken }
            : frequentTraveler)
        );
      }
    }
    case AirBookingActionTypes.AIR_BOOKING__REMOVE_SELECTED_FREQUENT_TRAVELER_PAX_ID: {
      const { paxNumber } = action;
      const newState = _.cloneDeep(state);
      const frequentTravelerIndex = newState.findIndex((frequentTraveler) => frequentTraveler.paxNumber === paxNumber);

      newState.splice(frequentTravelerIndex, 1);

      return newState;
    }
    case AirBookingActionTypes.AIR_BOOKING__CLEAR_SELECTED_FREQUENT_TRAVELERS:
      return [];
    default:
      return state;
  }
};

export const isSplitPayVisible = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SET_IS_SPLIT_PAY_VISIBLE:
      return action.isSplitPayVisible;
    default:
      return state;
  }
};

export const isUpliftVisible = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SET_IS_UPLIFT_VISIBLE:
      return action.isUpliftVisible;
    default:
      return state;
  }
};

export const splitPayPagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_SPLIT_PAY_PAGE_PLACEMENTS_SUCCESS: {
      const paymentBanner = toDynamicPlacement(action.response, 'paymentBanner');

      return { paymentBanner };
    }
    default: {
      return state;
    }
  }
};

export const airBookingIndexPagePlacements = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_INDEX_PAGE_PlACEMENT_SUCCESS: {
      const promoFareBanner = toDynamicPlacement(action.response, 'promoFareBanner');
      const childrenBanner = toDynamicPlacement(action.response, 'childrenBanner');

      return { promoFareBanner, childrenBanner };
    }
    default:
      return state;
  }
};

export const splitPay = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_SPLIT_PAY_OPTIONS_LIST_SUCCESS: {
      return action.response;
    }
    case AirBookingActionTypes.AIR_BOOKING__CLEAR_SPLIT_PAY_OPTIONS_LIST:
      return null;
    case SharedActionTypes.SHARED__CALC_FUNDS_SUCCESS:
      return { ...state, ...action.response };
    default:
      return state;
  }
};

export const splitPayTermsAndConditions = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SAVE_SPLIT_PAY_TERMS_AND_CONDITIONS:
      return action?.termsAndConditions ?? '';
    case AirBookingActionTypes.AIR_BOOKING__RESET_SPLIT_PAY_TERMS_AND_CONDITIONS:
      return null;
    default:
      return state;
  }
};

export const resumeSplitPayAfterLogin = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SPLIT_PAY_RESUME_AFTER_LOGIN:
      return action.shouldResume;
    default:
      return state;
  }
};

export const savePassengerCount = (state = { adultCount: 1, lapChildCount: 0, valueUpdated: false }, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SAVE_PASSENGER_COUNT:
      return action.passengerCount;
    default:
      return state;
  }
};

export const passengerValidationDetails = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PASSENGER_VALIDATIONS_SUCCESS:
      return action.response.passengerValidationDetails;
    default:
      return state;
  }
};
