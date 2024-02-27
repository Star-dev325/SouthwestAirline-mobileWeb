import { storiesOf } from '@storybook/react';
import React from 'react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import AirChangeReviewForm from 'src/airChange/components/airChangeReviewForm';
import { AIR_CHANGE_REVIEW_FORM } from 'src/shared/constants/formIds';

import upgradeForRoundTripSinglePaxWithTravelFunds from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxRoundTripUpgradeWithTravelFunds';
import mixedReturnDownGrade from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayDowngradeMixRefundable';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';

const savedCreditCards = new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(true).build();
const defaultProps = {
  changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
  formId: AIR_CHANGE_REVIEW_FORM,
  savedCreditCards,
  paymentInfo: {
    selectedCardId: '1-ENKS4K',
    cardNumber: '4012999999999999'
  },
  isEvenExchange: false,
  clickContactMethodFn: () => {},
  onSubmit: () => {},
  onPaymentEditClick: () => {}
};

const store = createMockedFormStore();

storiesOf('components/airChangeReviewForm', module)
  .addDecorator(StoryReduxProvider(store))
  .add('upgrade with travel funds', () => {
    return <AirChangeReviewForm {...defaultProps} />;
  })
  .add('mixedReturnDownGrade', () => {
    return <AirChangeReviewForm {...defaultProps} changePricingPage={mixedReturnDownGrade.changePricingPage} />;
  })
  .add('saved card without verified cvv', () => {
    const newSavedCreditCards = new PaymentSavedCreditCardsBuilder()
      .withRequireSecurityCode(true)
      .withPrimaryCardNotCvvVerified()
      .build();
    const props = _.merge({}, defaultProps, { savedCreditCards: newSavedCreditCards });
    return <AirChangeReviewForm {...props} />;
  })
  .add('saved card with verified cvv', () => {
    return <AirChangeReviewForm {...defaultProps} />;
  })
  .add('with upgrade benefits', () => {
    return <AirChangeReviewForm {...defaultProps} AIR_UPGRADE={true} />;
  });
