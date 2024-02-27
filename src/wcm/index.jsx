import React from 'react';
import { Route } from 'react-router';
import {
  TaxesAndFeesOverlay,
  HazardousMaterialsOverlay,
  BaggageRestrictionsOverlay,
  FareRulesOverlay,
  PrivacyPolicyOverlay,
  TermsAndConditionsOverlay,
  FormsOfPaymentOverlay,
  CancellationPolicyOverlay,
  CarriageContractOverlay,
  CheckinAndRefundOverlay,
  CarLimitOfLiabilityOverlay,
  StandbyPoliciesOverlay,
  EarlyBirdIntroductionOverlay,
  FareRulesForFareTypeOverlays,
  SpecialAssistanceOverlay,
  TravelFundsTermsConditionsOverlay
} from 'src/wcm/pages/overlayPages';
import { InTheAirPage, FlyingSouthwestPage, AtTheAirportPage, BoardingThePlanePage } from 'src/wcm/pages/styledPages';
import VendorTermsAndConditionsPage from 'src/carBooking/pages/vendorTermsAndConditionsPage';
import SubscriptionDetailsPage from 'src/shared/pages/subscriptionDetailsPage';
import ContactUs from 'src/wcm/pages/contactUs';
import LearnMoreSwabiz from 'src/wcm/pages/learnMoreSwabiz';
import LearnMoreSwabizNotAssociated from 'src/wcm/pages/learnMoreSwabizNotAssociated';
import AirportInfoPage from 'src/airports/pages/airportInfoPage';
import FareDetailsPage from 'src/wcm/pages/fareDetails';

class Wcm extends React.Component {
  render() {
    return (
      <div className="wcm">
        <Route exact path="/subscription-details" component={SubscriptionDetailsPage} />
        <Route exact path="/hazardous-materials" component={HazardousMaterialsOverlay} />
        <Route exact path="/baggage-restrictions" component={BaggageRestrictionsOverlay} />
        <Route exact path="/taxes-and-fees" component={TaxesAndFeesOverlay} />
        <Route exact path="/fare-rules" component={FareRulesOverlay} />
        <Route
          exact
          path="/fare-rules/:fareType"
          render={(props) => {
            const FareTypeOverlay = FareRulesForFareTypeOverlays(props);

            return <FareTypeOverlay {...props} />;
          }}
        />
        <Route exact path="/privacy-policy" component={PrivacyPolicyOverlay} />
        <Route exact path="/terms-and-conditions" component={TermsAndConditionsOverlay} />
        <Route exact path="/forms-of-payment" component={FormsOfPaymentOverlay} />
        <Route exact path="/cancellation-policy" component={CancellationPolicyOverlay} />
        <Route exact path="/page/contract-of-carriage" component={CarriageContractOverlay} />
        <Route exact path="/page/check-in-refund-information" component={CheckinAndRefundOverlay} />
        <Route exact path="/flying-southwest" component={FlyingSouthwestPage} />
        <Route exact path="/at-the-airport" component={AtTheAirportPage} />
        <Route exact path="/in-the-air" component={InTheAirPage} />
        <Route exact path="/boarding-the-plane" component={BoardingThePlanePage} />
        <Route exact path="/car/limit-of-liability" component={CarLimitOfLiabilityOverlay} />
        <Route exact path="/car/vendor-terms-and-conditions" component={VendorTermsAndConditionsPage} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/airport-info/:code" component={AirportInfoPage} />
        <Route exact path="/fare-details" component={FareDetailsPage} />
        <Route exact path="/early-bird-check-in" component={EarlyBirdIntroductionOverlay} />
        <Route exact path="/standby-policies" component={StandbyPoliciesOverlay} />
        <Route exact path="/swabiz-learn-more" component={LearnMoreSwabiz} />
        <Route exact path="/swabiz-learn-more-not-associated" component={LearnMoreSwabizNotAssociated} />
        <Route exact path="/special-assistance-info" component={SpecialAssistanceOverlay} />
        <Route exact path="/funds-terms-conditions" component={TravelFundsTermsConditionsOverlay} />
      </div>
    );
  }
}

export default Wcm;
