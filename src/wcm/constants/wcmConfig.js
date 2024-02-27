import wcmActionsTypes from 'src/wcm/actions/wcmActionsTypes';

const {
  WCM__FETCH_APPLICATION_PROPERTIES,
  WCM__FETCH_HAZARDOUS_MATERIALS_OVERLAY,
  WCM__FETCH__TAXES_AND_FEES,
  WCM__FETCH__BAGGAGE_RESTRICTIONS,
  WCM__FETCH_FARE_RULES,
  WCM__FETCH_PRIVACY_POLICY,
  WCM__FETCH_TERMS_AND_CONDITIONS,
  WCM__FETCH_FORMS_OF_PAYMENT,
  WCM__FETCH_CANCELLATION_POLICY,
  WCM__FETCH_CARRIAGE_CONTRACT,
  WCM__FETCH_CHECKIN_AND_REFUND,
  WCM__FETCH_CAR_LIMIT_OF_LIABILITY,
  WCM__FETCH_STANDBY_POLICIES,
  WCM__FETCH_EARLYBIRD_INTRODUCTION,
  WCM__FETCH_FARE_RULES_FOR_FARE_TYPE,
  WCM__FETCH_IN_THE_AIR,
  WCM__FETCH_FLYING_SOUTHWEST,
  WCM__FETCH_AT_THE_AIRPORT,
  WCM__FETCH_BOARDING_THE_PLANE,
  WCM__FETCH_ABOUT_RAPID_REWARDS,
  WCM__FETCH_CONTACT_US,
  WCM__FETCH_TIER_BENEFITS,
  WCM__FETCH_EARLYBIRD_BANNER,
  WCM__FETCH_RAPID_REWARDS_PROMOTIONS,
  WCM__FETCH_CAR_VENDOR_IMAGES,
  WCM__FETCH_SPECIAL_ASSISTANCE,
  WCM__FETCH_LEARN_MORE_SWABIZ,
  WCM__FETCH_LEARN_MORE_SWABIZ_NOT_ASSOCIATED,
  WCM__FETCH_TRAVEL_FUNDS_TERMS_CONDITIONS,
  WCM__FETCH_BOOKING_TEASER,
  WCM__FETCH_HOMEPAGE_PROMOTIONS,
  WCM__FETCH_EXCLUSIVE_PROMOTION_INFO,
  WCM__FETCH_RAPID_REWARDS_INFO,
  WCM__FETCH_YOUNG_TRAVELER_PARENT_CONSENT
} = wcmActionsTypes;

export default {
  applicationProperties: {
    wcmPath: 'content/app/properties/applicationProperties.json',
    actionType: WCM__FETCH_APPLICATION_PROPERTIES,
    closeWindow: false
  },
  hazardousMaterials: {
    wcmPath: 'content/generated/data/overlays/hazardous_materials.json',
    actionType: WCM__FETCH_HAZARDOUS_MATERIALS_OVERLAY,
    closeWindow: true
  },
  taxesAndFees: {
    wcmPath: 'content/generated/data/overlays/government_taxes_fees.json',
    actionType: WCM__FETCH__TAXES_AND_FEES,
    closeWindow: true
  },
  baggageRestrictions: {
    wcmPath: 'content/generated/data/overlays/baggage_restrictions.json',
    actionType: WCM__FETCH__BAGGAGE_RESTRICTIONS,
    closeWindow: true
  },
  fareRules: {
    wcmPath: 'content/generated/data/overlays/fare_rules.json',
    actionType: WCM__FETCH_FARE_RULES,
    closeWindow: true
  },
  privacyPolicy: {
    wcmPath: 'content/generated/data/overlays/privacy_policy.json',
    actionType: WCM__FETCH_PRIVACY_POLICY,
    closeWindow: true
  },
  termsAndConditions: {
    wcmPath: 'content/generated/data/overlays/terms_and_conditions.json',
    actionType: WCM__FETCH_TERMS_AND_CONDITIONS,
    closeWindow: true
  },
  formsOfPayment: {
    wcmPath: 'content/generated/data/overlays/forms_of_payment.json',
    actionType: WCM__FETCH_FORMS_OF_PAYMENT,
    closeWindow: true
  },
  cancellationPolicy: {
    wcmPath: 'content/generated/data/overlays/cancellation_policy.json',
    actionType: WCM__FETCH_CANCELLATION_POLICY,
    closeWindow: true
  },
  learnMoreSwabiz: {
    wcmPath: 'content/generated/data/overlays/swabiz_learn_more.json',
    actionType: WCM__FETCH_LEARN_MORE_SWABIZ,
    closeWindow: true
  },
  learnMoreSwabizNotAssociated: {
    wcmPath: 'content/generated/data/overlays/swabiz_learn_more_no_assoc.json',
    actionType: WCM__FETCH_LEARN_MORE_SWABIZ_NOT_ASSOCIATED,
    closeWindow: true
  },
  carriageContract: {
    wcmPath: 'content/generated/data/overlays/conditions_of_contract.json',
    actionType: WCM__FETCH_CARRIAGE_CONTRACT,
    closeWindow: true
  },
  checkinAndRefund: {
    wcmPath: 'content/generated/data/overlays/check_in_refund.json',
    actionType: WCM__FETCH_CHECKIN_AND_REFUND,
    closeWindow: true
  },
  carLimitOfLiability: {
    wcmPath: 'content/generated/data/overlays/car_limit_of_liability.json',
    actionType: WCM__FETCH_CAR_LIMIT_OF_LIABILITY,
    closeWindow: true
  },
  standbyPolicies: {
    wcmPath: 'content/generated/data/overlays/standby_policies.json',
    actionType: WCM__FETCH_STANDBY_POLICIES,
    closeWindow: true
  },
  earlyBirdIntroduction: {
    wcmPath: 'content/generated/data/overlays/eb_introduction.json',
    actionType: WCM__FETCH_EARLYBIRD_INTRODUCTION,
    closeWindow: true
  },
  fareRulesForFareType: {
    wcmPath: 'content/generated/data/overlays/',
    actionType: WCM__FETCH_FARE_RULES_FOR_FARE_TYPE,
    closeWindow: true
  },
  specialAssistance: {
    wcmPath: 'content/generated/data/overlays/special_assistance.json',
    actionType: WCM__FETCH_SPECIAL_ASSISTANCE,
    closeWindow: false
  },
  travelFundsTermsConditions: {
    wcmPath: 'content/generated/data/overlays/travel_funds_terms_conditions.json',
    actionType: WCM__FETCH_TRAVEL_FUNDS_TERMS_CONDITIONS,
    closeWindow: false
  },
  inTheAir: {
    wcmPath: 'content/generated/data/information/inTheAir.json',
    actionType: WCM__FETCH_IN_THE_AIR,
    closeWindow: false
  },
  flyingSouthwest: {
    wcmPath: 'content/generated/data/information/travelExperience.json',
    actionType: WCM__FETCH_FLYING_SOUTHWEST,
    closeWindow: true
  },
  atTheAirport: {
    wcmPath: 'content/generated/data/information/atTheAirport.json',
    actionType: WCM__FETCH_AT_THE_AIRPORT,
    closeWindow: false
  },
  boardingThePlane: {
    wcmPath: 'content/generated/data/information/boardingThePlane.json',
    actionType: WCM__FETCH_BOARDING_THE_PLANE,
    closeWindow: false
  },
  aboutRapidRewards: {
    wcmPath: 'content/generated/data/information/aboutRR.json',
    actionType: WCM__FETCH_ABOUT_RAPID_REWARDS,
    closeWindow: false
  },
  contactUs: {
    wcmPath: 'content/generated/data/contact/contactUs.json',
    actionType: WCM__FETCH_CONTACT_US,
    closeWindow: true
  },
  tierBenefits: {
    wcmPath: 'content/generated/data/feature_tables/tierStatus.json',
    actionType: WCM__FETCH_TIER_BENEFITS,
    closeWindow: false
  },
  earlyBirdBanner: {
    wcmPath: 'content/generated/data/product_features/earlybird_product_features.json',
    actionType: WCM__FETCH_EARLYBIRD_BANNER,
    closeWindow: false,
    shouldShowAlert: false
  },
  rapidRewardsPromotions: {
    actionType: WCM__FETCH_RAPID_REWARDS_PROMOTIONS,
    closeWindow: false,
    shouldShowAlert: false,
    isSpinnerNeeded: false
  },
  carVendorImages: {
    wcmPath: 'content/generated/data/car_vendors_common.json',
    actionType: WCM__FETCH_CAR_VENDOR_IMAGES,
    closeWindow: false
  },
  bookingTeaser: {
    wcmPath: 'content/generated/data/product_features/air_cross_sell_product_features.json',
    actionType: WCM__FETCH_BOOKING_TEASER,
    closeWindow: false
  },
  homepagePromotions: {
    wcmPath: 'content/generated/data/promotion_banners/homepage_promotions_mobile.json',
    actionType: WCM__FETCH_HOMEPAGE_PROMOTIONS,
    closeWindow: false
  },
  exclusivePromotionInfo: {
    wcmPath: 'content/generated/data/loyalty/promotions/loyalty_promotions_mobile.json',
    actionType: WCM__FETCH_EXCLUSIVE_PROMOTION_INFO,
    closeWindow: false,
    shouldShowAlert: false
  },
  rapidRewardsInfo: {
    wcmPath: 'content/generated/data/product_features/rapid_rewards_product_features.json',
    actionType: WCM__FETCH_RAPID_REWARDS_INFO,
    closeWindow: false,
    shouldShowAlert: false
  },
  youngTravelerParentConsent: {
    actionType: WCM__FETCH_YOUNG_TRAVELER_PARENT_CONSENT,
    closeWindow: true,
    wcmPath: 'content/generated/data/overlays/young_traveler_parent_consent.json'
  }
};
