import { storiesOf } from '@storybook/react';
import React from 'react';
import { getPaymentOptions } from 'src/airChange/actions/airChangeActions';
import { SameDayRefundMethodPage } from 'src/sameDay/pages/sameDayRefundMethodPage';
import { hideGlobalHeader, resetGlobalHeader } from 'src/shared/actions/globalHeaderActions';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import SameDayRefundMethodBuilder from 'test/builders/apiResponse/sameDayRefundMethodBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const { sameDayRefundMethod } = new SameDayRefundMethodBuilder().build();
const { sameDayRefundMethod: sameDayRefundMethodShowRefundPageFlag } = new SameDayRefundMethodBuilder().withShowRefundPage().build();
const { sameDayRefundMethod: sameDayRefundMethodPageWithPaymentMethod } = new SameDayRefundMethodBuilder().withAmountDue().build();
const { sameDayRefundMethod: withDollarAmountDueAndNoTaxResponse } = new SameDayRefundMethodBuilder().withDollarAmountDueFareAndNoAmountDueTax().build();
const { sameDayRefundMethod: withEvenExchangePointsAndAmountDueTaxResponse } = new SameDayRefundMethodBuilder().withPointsEvenExchangeAndAmountDueTax().build();
const { sameDayRefundMethod: withEvenExchangePointsAndTaxCreditResponse } = new SameDayRefundMethodBuilder().withPointsEvenExchangeAndTaxCredit().build();
const { sameDayRefundMethod: withPointsAmountDueAndCreditDueTaxResponse } = new SameDayRefundMethodBuilder().withPointsAmountDueAndCreditDueTax().build();
const { sameDayRefundMethod: withPointsAmountDueAndAmountDueTaxResponse } = new SameDayRefundMethodBuilder().withPointsAmountDueAndAmountDueTax().build();
const { sameDayRefundMethod: withPointsCreditDueAndAmountDueTaxResponse } = new SameDayRefundMethodBuilder().withPointsCreditDueAndAmountDueTax().build();
const { sameDayRefundMethod: withPointsCreditDueAndCreditDueTaxResponse } = new SameDayRefundMethodBuilder().withPointsCreditDueAndCreditDueTax().build();
const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
const EnhanceSameDayRefundMethodPage = _.flowRight(withBodyClass('same-day-refund-method-page'))(
  SameDayRefundMethodPage
);

const requiredProps = { shouldResumeDataFn: () => {} };

const defaultProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  hideGlobalHeaderFn: hideGlobalHeader,
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: sameDayRefundMethod,
  savedCreditCards
};
const hybridView = {
  ...requiredProps,
  hideGlobalHeaderFn: hideGlobalHeader,
  isWebView: true,
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: sameDayRefundMethodShowRefundPageFlag
};
const paymentMethodCvvMissingProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  hideGlobalHeaderFn: hideGlobalHeader,
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: sameDayRefundMethodPageWithPaymentMethod,
  savedCreditCards: new PaymentSavedCreditCardsBuilder()
    .withRequireSecurityCode(true)
    .withPrimaryCardNotCvvVerified()
    .build()
};
const paymentMethodMissingProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  hideGlobalHeaderFn: hideGlobalHeader,
  paymentInfo: {},
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: sameDayRefundMethodPageWithPaymentMethod,
  savedCreditCards: {
    otherCards: null,
    primaryCard: null,
    requireSecurityCode: true
  }
};
const paymentMethodProps = {
  ...requiredProps,
  getPaymentOptionsFn: getPaymentOptions,
  hideGlobalHeaderFn: hideGlobalHeader,
  paymentInfo: { selectedCardId: '1-ENKS5K' },
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: sameDayRefundMethodPageWithPaymentMethod,
  savedCreditCards
};
const sameDayRefundFlag = {
  ...requiredProps,
  hideGlobalHeaderFn: hideGlobalHeader,
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: sameDayRefundMethod
};
const withDollarAmountDueAndNoTax = {
  ...requiredProps,
  hideGlobalHeaderFn: hideGlobalHeader,
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: withDollarAmountDueAndNoTaxResponse,
  savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(true).withPrimaryCardNotCvvVerified().build()
};
const withEvenExchangePointsAndAmountDueTax = {
  hideGlobalHeaderFn: hideGlobalHeader,
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: withEvenExchangePointsAndAmountDueTaxResponse,
  savedCreditCards
};
const withEvenExchangePointsAndTaxCredit = {
  ...requiredProps,
  hideGlobalHeaderFn: hideGlobalHeader,
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: withEvenExchangePointsAndTaxCreditResponse
};
const withPointsAmountDueAndAmountDueTax = {
  ...requiredProps,
  hideGlobalHeaderFn: hideGlobalHeader,
  paymentInfo: {},
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: withPointsAmountDueAndAmountDueTaxResponse,
  savedCreditCards: {
    otherCards: null,
    primaryCard: null,
    requireSecurityCode: true
  }
};
const withPointsAmountDueAndCreditDueTax = {
  ...requiredProps,
  hideGlobalHeaderFn: hideGlobalHeader,
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: withPointsAmountDueAndCreditDueTaxResponse
};
const withPointsCreditDueAndAmountDueTax = {
  ...requiredProps,
  hideGlobalHeaderFn: hideGlobalHeader,
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: withPointsCreditDueAndAmountDueTaxResponse,
  savedCreditCards: new PaymentSavedCreditCardsBuilder()
    .withRequireSecurityCode(true)
    .withPrimaryCardNotCvvVerified()
    .build()
};
const withPointsCreditDueAndCreditDueTax = {
  ...requiredProps,
  hideGlobalHeaderFn: hideGlobalHeader,
  resetGlobalHeaderFn: resetGlobalHeader,
  sameDayRefundPage: withPointsCreditDueAndCreditDueTaxResponse
};
const store = createMockedFormStore();

storiesOf('pages/sameDay/SameDayRefundMethod', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <EnhanceSameDayRefundMethodPage {...defaultProps} />)
  .add('hide global header', () => <EnhanceSameDayRefundMethodPage {...sameDayRefundFlag} />)
  .add('hybrid view', () => <EnhanceSameDayRefundMethodPage {...hybridView} />)
  .add('with dollar fare due and no tax', () => <EnhanceSameDayRefundMethodPage {...withDollarAmountDueAndNoTax} />)
  .add('with even exchange points and tax amount due', () => <EnhanceSameDayRefundMethodPage {...withEvenExchangePointsAndAmountDueTax} />)
  .add('with even exchange points and tax credit', () => <EnhanceSameDayRefundMethodPage {...withEvenExchangePointsAndTaxCredit} />)
  .add('with points fare due and tax amount due', () => <EnhanceSameDayRefundMethodPage {...withPointsAmountDueAndAmountDueTax} />)
  .add('with points fare due and tax credit', () => <EnhanceSameDayRefundMethodPage {...withPointsAmountDueAndCreditDueTax} />)
  .add('with points fare credit due and tax amount due', () => <EnhanceSameDayRefundMethodPage {...withPointsCreditDueAndAmountDueTax} />)
  .add('with points fare credit due and tax credit', () => <EnhanceSameDayRefundMethodPage {...withPointsCreditDueAndCreditDueTax} />)
  .add('with cvv missing for the selected card', () => <EnhanceSameDayRefundMethodPage {...paymentMethodCvvMissingProps}/>)
  .add('with payment method missing', () => <EnhanceSameDayRefundMethodPage {...paymentMethodMissingProps} />)
  .add('with payment method', () => <EnhanceSameDayRefundMethodPage {...paymentMethodProps} />);
