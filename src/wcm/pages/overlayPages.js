import {
  retrieveTaxesAndFees,
  retrieveHazardousMaterials,
  retrieveBaggageRestrictions,
  retrieveFareRules,
  retrievePrivacyPolicy,
  retrieveTermsAndConditions,
  retrieveFormsOfPayment,
  retrieveCancellationPolicy,
  retrieveCarriageContract,
  retrieveCheckinAndRefund,
  retrieveCarLimitOfLiability,
  retrieveStandbyPolicies,
  retrieveEarlyBirdIntroduction,
  retrieveFareRulesForFareType,
  retrieveSpecialAssistance,
  retrieveTravelFundsTermsConditions
} from 'src/wcm/actions/wcmActions';
import wcmOverlay from 'src/wcm/pages/wcmOverlay';

export const TaxesAndFeesOverlay = wcmOverlay(retrieveTaxesAndFees, 'taxesAndFees');

export const HazardousMaterialsOverlay = wcmOverlay(retrieveHazardousMaterials, 'hazardousMaterials');

export const BaggageRestrictionsOverlay = wcmOverlay(retrieveBaggageRestrictions, 'baggageRestrictions');

export const FareRulesOverlay = wcmOverlay(retrieveFareRules, 'fareRules');

export const PrivacyPolicyOverlay = wcmOverlay(retrievePrivacyPolicy, 'privacyPolicy');

export const TermsAndConditionsOverlay = wcmOverlay(retrieveTermsAndConditions, 'termsAndConditions');

export const FormsOfPaymentOverlay = wcmOverlay(retrieveFormsOfPayment, 'formsOfPayment');

export const CancellationPolicyOverlay = wcmOverlay(retrieveCancellationPolicy, 'cancellationPolicy');

export const CarriageContractOverlay = wcmOverlay(retrieveCarriageContract, 'carriageContract');

export const CheckinAndRefundOverlay = wcmOverlay(retrieveCheckinAndRefund, 'checkinAndRefund');

export const CarLimitOfLiabilityOverlay = wcmOverlay(retrieveCarLimitOfLiability, 'carLimitOfLiability');

export const StandbyPoliciesOverlay = wcmOverlay(retrieveStandbyPolicies, 'standbyPolicies');

export const EarlyBirdIntroductionOverlay = wcmOverlay(retrieveEarlyBirdIntroduction, 'earlyBirdIntroduction');

export const SpecialAssistanceOverlay = wcmOverlay(retrieveSpecialAssistance, 'specialAssistance');

export const TravelFundsTermsConditionsOverlay = wcmOverlay(
  retrieveTravelFundsTermsConditions,
  'travelFundsTermsConditions'
);

export const FareRulesForFareTypeOverlays = (props) => {
  const fareType = props.match.params.fareType.split('-').join('_');

  return wcmOverlay(() => retrieveFareRulesForFareType(fareType), 'fareRulesForFareType');
};
