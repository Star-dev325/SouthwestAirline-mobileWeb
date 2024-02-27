import { storiesOf } from '@storybook/react';
import React from 'react';
import { getPaymentOptions } from 'src/airChange/actions/airChangeActions';
import { SameDayPriceDifferencePage } from 'src/sameDay/pages/sameDayPriceDifferencePage';
import { isWebView } from 'src/shared/actions/webViewActions';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { noop } from 'src/shared/helpers/jsUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import SameDayPricingBuilder from 'test/builders/apiResponse/sameDayPricingBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';

const { sameDayPricingPage } = new SameDayPricingBuilder().build();
const { sameDayPricingPage: sameDayPricingPageWithEmail } = new SameDayPricingBuilder().withEmailRecipient().build();
const { sameDayPricingPage: sameDayPricingPageWithMultidayIndicators } = new SameDayPricingBuilder().withMultidayIndicators().build();
const { sameDayPricingPage: sameDayPricingPageWithInvalidEmail } = new SameDayPricingBuilder().withInvalidEmailRecipient().build();
const { sameDayPricingPage: sameDayPricingPageWithoutEmailField } = new SameDayPricingBuilder().withoutEmailField().build();
const { sameDayPricingPage: sameDayPricingPageWithPaymentMethod } = new SameDayPricingBuilder().withAmountDue().build();
const { sameDayPricingPage: sameDayPricingPageWithPointsDowngradeScenario } = new SameDayPricingBuilder().withPtsDowngradeScenario().build();
const { sameDayPricingPage: sameDayPricingPageWithPointsDowngradeAndTaxAmountDueScenario } = new SameDayPricingBuilder().withPtsDowngradeCreditFareAndAmountDueTaxScenario().build();
const { sameDayPricingPage: sameDayPricingPageWithPointsEvenExchangeScenario } = new SameDayPricingBuilder().withPtsEvenExchangeScenario().build();
const { sameDayPricingPage: sameDayPricingPageWithPointsEvenExchangeTaxCreditScenario } = new SameDayPricingBuilder().withPtsEvenExchangeAndTaxCreditScenario().build();
const { sameDayPricingPage: sameDayPricingPageWithPointsUpgradeScenario } = new SameDayPricingBuilder().withPtsUpgradeScenario().build();
const { sameDayPricingPage: sameDayPricingPageWithPointsUpgradeAndTaxCreditDueScenario } = new SameDayPricingBuilder().withPtsUpgradeAmountDueFareAndCreditTaxScenario().build();
const { sameDayPricingPage: sameDayPricingPageWithRefundScenario } = new SameDayPricingBuilder().withRefundScenario().build();
const EnhancedSameDayPriceDifferencePage = withBodyClass('same-day-pricing-difference-page')(SameDayPriceDifferencePage);
const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();

const requiredProps = { shouldResumeDataFn: () => {} }
const applePayCardProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isChangeFlow: true,
  paymentInfo: {selectedCardId: 'APPLE_PAY_CARD_ID'},
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPaymentMethod,
  savedCreditCards: savedCreditCards
};
const defaultProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage,
  savedCreditCards: savedCreditCards,
};
const defaultState = {
  app: {
    errorHeader: {
      errorMessage: null,
      hasError: false
    },
  },
  router: {
    location: {
      search: 'search'
    }
  }
};
const errorProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithEmail,
  savedCreditCards: savedCreditCards,
};
const invalidProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithInvalidEmail,
  savedCreditCards: savedCreditCards,
};
const paymentMethodCvvMissingProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isChangeFlow: true,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPaymentMethod,
  savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(true).withPrimaryCardNotCvvVerified().build()
};
const paymentMethodMissingProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isChangeFlow: true,
  paymentInfo: {},
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPaymentMethod,
  savedCreditCards: {
    otherCards: null,
    primaryCard: null,
    requireSecurityCode: true
  }
};
const paymentMethodProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isChangeFlow: true,
  paymentInfo: {selectedCardId: '1-ENKS5K'},
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPaymentMethod,
  savedCreditCards: savedCreditCards
};
const payPalCardProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isChangeFlow: true,
  paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID'},
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPaymentMethod,
  savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build()
};
const pointsDowngradeScenarioProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isShowPoints: true,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPointsDowngradeScenario,
  savedCreditCards: savedCreditCards,
};
const pointsDowngradeAndTaxAmountDueScenarioProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isShowPoints: true,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPointsDowngradeAndTaxAmountDueScenario,
  savedCreditCards: savedCreditCards,
};
const pointsEvenExchangeScenarioProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isShowPoints: true,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPointsEvenExchangeScenario,
  savedCreditCards: savedCreditCards,
};
const pointsEvenExchangeTaxCreditScenarioProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isShowPoints: true,
  retrieveSameDayPurchaseConfirmationInformationFn: _.noop,
  sameDayPricingPage: sameDayPricingPageWithPointsEvenExchangeTaxCreditScenario,
  savedCreditCards: savedCreditCards,
};
const pointsUpgradeScenarioProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isShowPoints: true,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPointsUpgradeScenario,
  savedCreditCards: savedCreditCards,
};
const pointsUpgradeAndTaxCreditDueScenarioProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isShowPoints: true,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPointsUpgradeAndTaxCreditDueScenario,
  savedCreditCards: savedCreditCards,
};
const upliftCardProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isChangeFlow: true,
  paymentInfo: {selectedCardId: 'UPLIFT_CARD_ID'},
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithPaymentMethod,
  savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build(), 
  upliftAdditionalMessaging: 'Pay Monthly from $1/mo'
};
const refundScenarioProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithRefundScenario,
  savedCreditCards: savedCreditCards,
};
const withMultidayIndicatorsProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithMultidayIndicators,
  savedCreditCards: savedCreditCards,
};
const webViewProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  isWebView: true,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage,
  savedCreditCards: savedCreditCards,
};
const withoutEmailFieldProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  retrieveSameDayPurchaseConfirmationInformationFn: noop,
  sameDayPricingPage: sameDayPricingPageWithoutEmailField,
  savedCreditCards: savedCreditCards,
};
const store = configureMockStore()(defaultState);

storiesOf('pages/sameDay/SameDayPriceDifferencePage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <EnhancedSameDayPriceDifferencePage {...defaultProps} />)
  .add('apple pay selected', () => <EnhancedSameDayPriceDifferencePage {...applePayCardProps} />)
  .add('PayPal selected', () => <EnhancedSameDayPriceDifferencePage {...payPalCardProps} />)
  .add('uplift selected', () => <EnhancedSameDayPriceDifferencePage {...upliftCardProps} />)
  .add('with cvv missing for the selected card', () => <EnhancedSameDayPriceDifferencePage {...paymentMethodCvvMissingProps}/>)
  .add('with email recipient', () => <EnhancedSameDayPriceDifferencePage {...errorProps} />)
  .add('with invalid email recipient', () => <EnhancedSameDayPriceDifferencePage {...invalidProps} />)
  .add('with payment method missing', () => <EnhancedSameDayPriceDifferencePage {...paymentMethodMissingProps} />)
  .add('with multiday indicators on', () => <EnhancedSameDayPriceDifferencePage {...withMultidayIndicatorsProps}/>)
  .add('with payment method', () => <EnhancedSameDayPriceDifferencePage {...paymentMethodProps} />)
  .add('with points downgrade and tax dollar amount due scenario', () => <EnhancedSameDayPriceDifferencePage {...pointsDowngradeAndTaxAmountDueScenarioProps} />)
  .add('with points downgrade scenario', () => <EnhancedSameDayPriceDifferencePage {...pointsDowngradeScenarioProps} />)
  .add('with points even exchange and tax refund scenario', () => <EnhancedSameDayPriceDifferencePage {...pointsEvenExchangeTaxCreditScenarioProps} />)
  .add('with points even exchange scenario', () => <EnhancedSameDayPriceDifferencePage {...pointsEvenExchangeScenarioProps} />)
  .add('with points upgrade and tax dollar credit due scenario', () => <EnhancedSameDayPriceDifferencePage {...pointsUpgradeAndTaxCreditDueScenarioProps} />)
  .add('with points upgrade scenario', () => <EnhancedSameDayPriceDifferencePage {...pointsUpgradeScenarioProps} />)
  .add('with refund scenario', () => <EnhancedSameDayPriceDifferencePage {...refundScenarioProps} />)
  .add('with webView on', () => <EnhancedSameDayPriceDifferencePage {...webViewProps} />)
  .add('without email field', () => <EnhancedSameDayPriceDifferencePage {...withoutEmailFieldProps} />);
