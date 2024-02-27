import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

import upgradeForOneWaySinglePaxWithDollar from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayUpgrade';
import upgradeForRoundTripSinglePaxWithTravelFunds from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxRoundTripUpgradeWithTravelFunds';
import pointsUpgradeForRoundTripSinglePaxWithTravelFunds from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxRoundTripUpgradeTaxUpgradeWithTravelFunds';
import evenExchangeForOneWaySinglePax from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayEvenExchange';
import mixedReturnDownGrade from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayDowngradeMixRefundable';
import dollarDownGrade from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayDowngradeRefundable';
import pointsEven from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayEvenExchangeTaxEvenExchange';
import { AirChangeReviewPage } from 'src/airChange/pages/airChangeReviewPage';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import ContactMethodInfoBuilder from 'test/builders/model/contactMethodInfoBuilder';
import pointsEvenTaxUpgrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayEvenExchangeTaxUpgrade';
import pointsSinglePaxOneWayEvenExchangeTaxDowngrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayEvenExchangeTaxDowngradeMixRefundable';
import pointsSinglePaxOneWayUpgradeTaxEvenExchange from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayUpgradeTaxEvenExchange';
import pointsSinglePaxOneWayUpgradeTaxUpgrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayUpgradeTaxUpgrade';
import pointsSinglePaxOneWayUpgradeTaxDowngrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayUpgradeTaxDowngradeMixRefundable';
import pointsSinglePaxOneWayDowngradeTaxDowngrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayDowngradeTaxDowngradeMixRefundable';
import pointsSinglePaxOneWayDowngradeTaxEvenExchange from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayDowngradeTaxEvenExchangeRefundable';
import pointsSinglePaxOneWayDowngradeTaxUpgrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayDowngradeTaxUpgradeRefundable';
import dollarSinglePaxRoundTripUpgrade from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxRoundTripUpgrade';

const props = {
  push: _.noop,
  isLoggedIn: false,
  savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(true).build(),
  contactMethodInfo: new ContactMethodInfoBuilder().build(),
  contactMethodContent: 'Email, aterris@example.com',
  changeFlightFn: _.noop,
  getPaymentOptionsFn: _.noop,
  getPassengerInfoFn: _.noop,
  shouldResumeDataFn: _.noop,
  resumeDataFn: _.noop,
  shouldGotoPayPalSignInFn: _.noop,
  gotoPayPalSignInFn: _.noop,
  traceAirChangePaymentTypeFn: _.noop,
  setReLoginCallbackFunctionsFn:_.noop
};
const changePricingPageInUpgradeFlow = upgradeForOneWaySinglePaxWithDollar.changePricingPage;
const changePricingPageWithLongPassengerName = _.cloneDeep(upgradeForOneWaySinglePaxWithDollar.changePricingPage);

changePricingPageInUpgradeFlow._meta.isUpgrade = true;
changePricingPageWithLongPassengerName.passengers[0].displayName = 'Longnamefortesting Longlastnametesting'

const store = configureMockStore()({
  app: {
    wcmContent: {
      applicationProperties: {}
    }
  },
  router: {
    location: {
      search: 'search'
    }
  },
  toggles: {}
});

const reviewMessages  = [{
  body: "Your flight has an overnight connection. During this time, you will not have access to your checked baggage as it will be on it's way to your next destination.",
  header: '',
  icon: 'WARNING',
  key: 'BOOKING_PURCHASE_OVERNIGHT',
  textColor: 'DEFAULT'
}];

storiesOf('pages/airChange/airChangeReviewPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('dollar upgrade', () => {
    return <AirChangeReviewPage {...props} changePricingPage={upgradeForOneWaySinglePaxWithDollar.changePricingPage} />;
  })
  .add('dollars upgrade with travel funds', () => {
    return (
      <AirChangeReviewPage
        {...props}
        changePricingPage={upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage}
      />
    );
  })
  .add('points upgrade with travel funds', () => {
    return (
      <AirChangeReviewPage
        {...props}
        changePricingPage={pointsUpgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage}
      />
    );
  })
  .add('evenExchange', () => {
    return <AirChangeReviewPage {...props} changePricingPage={evenExchangeForOneWaySinglePax.changePricingPage} />;
  })
  .add('mixed refund', () => {
    return <AirChangeReviewPage {...props} changePricingPage={mixedReturnDownGrade.changePricingPage} />;
  })
  .add('dollar downgrade', () => {
    return <AirChangeReviewPage {...props} changePricingPage={dollarDownGrade.changePricingPage} />;
  })
  .add('points even', () => {
    return <AirChangeReviewPage {...props} changePricingPage={pointsEven.changePricingPage} />;
  })
  .add('points even and tax upgrade', () => {
    return <AirChangeReviewPage {...props} changePricingPage={pointsEvenTaxUpgrade.changePricingPage} />;
  })
  .add('points even and tax downgrade mix refund', () => {
    return (
      <AirChangeReviewPage
        {...props}
        changePricingPage={pointsSinglePaxOneWayEvenExchangeTaxDowngrade.changePricingPage}
      />
    );
  })
  .add('points upgrade and tax downgrade mixed refund', () => {
    return (
      <AirChangeReviewPage {...props} changePricingPage={pointsSinglePaxOneWayUpgradeTaxDowngrade.changePricingPage} />
    );
  })
  .add('points upgrade and tax even exchange', () => {
    return (
      <AirChangeReviewPage
        {...props}
        changePricingPage={pointsSinglePaxOneWayUpgradeTaxEvenExchange.changePricingPage}
      />
    );
  })
  .add('points upgrade and tax upgrade', () => {
    return (
      <AirChangeReviewPage {...props} changePricingPage={pointsSinglePaxOneWayUpgradeTaxUpgrade.changePricingPage} />
    );
  })
  .add('points downgrade and tax mixed refundability downgrade', () => {
    return (
      <AirChangeReviewPage
        {...props}
        changePricingPage={pointsSinglePaxOneWayDowngradeTaxDowngrade.changePricingPage}
      />
    );
  })
  .add('points downgrade and even exchange tax', () => {
    return (
      <AirChangeReviewPage
        {...props}
        changePricingPage={pointsSinglePaxOneWayDowngradeTaxEvenExchange.changePricingPage}
      />
    );
  })
  .add('points downgrade and tax upgrade', () => {
    return (
      <AirChangeReviewPage {...props} changePricingPage={pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage} />
    );
  })
  .add('saved card with verified cvv', () => {
    return <AirChangeReviewPage {...props} changePricingPage={upgradeForOneWaySinglePaxWithDollar.changePricingPage} />;
  })
  .add('saved card without verified cvv', () => {
    const newSavedCreditCards = new PaymentSavedCreditCardsBuilder()
      .withRequireSecurityCode(true)
      .withPrimaryCardNotCvvVerified()
      .build();
    const newProps = _.merge({}, props, {
      savedCreditCards: newSavedCreditCards,
      changePricingPage: dollarSinglePaxRoundTripUpgrade.changePricingPage
    });
    return <AirChangeReviewPage {...newProps} />;
  })
  .add('missing payment info', () => {
    return (
      <AirChangeReviewPage
        {...props}
        changePricingPage={pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage}
        savedCreditCards={{
          primaryCard: null,
          otherCards: []
        }}
      />
    );
  })
  .add('missing contact info', () => {
    return (
      <AirChangeReviewPage
        {...props}
        changePricingPage={pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage}
        contactMethodContent={null}
      />
    );
  })
  .add('upgrade flow', () => {
    return <AirChangeReviewPage {...props} AIR_UPGRADE={true} changePricingPage={changePricingPageInUpgradeFlow} />;
  })
  .add('missing both payment and contact info', () => {
    return (
      <AirChangeReviewPage
        {...props}
        changePricingPage={pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage}
        savedCreditCards={{
          primaryCard: null,
          otherCards: []
        }}
        contactMethodContent={null}
      />
    );
  })
  .add('with long passenger name', () => {
    return <AirChangeReviewPage {...props} changePricingPage={changePricingPageWithLongPassengerName} />;
  })
  .add('with overnight indicator and review message', () => {
    return <AirChangeReviewPage {...props} changePricingPage={{...upgradeForOneWaySinglePaxWithDollar.changePricingPage, 
      bounds: [
        { ...upgradeForOneWaySinglePaxWithDollar.changePricingPage.bounds[0], stops: [{ isOvernight: true }] }
      ], reviewMessages}} />;
  });
