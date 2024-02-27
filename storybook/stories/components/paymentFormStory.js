import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import PaymentForm from 'src/shared/form/components/paymentForm';
import { getPaymentInfoForUseNewCreditCard } from 'test/builders/model/paymentInfoBuilder';
import paymentSavedCreditCards from 'mocks/templates/my-acount/CreditCards/paymentSavedCreditCards';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { NEW_CREDIT_CARD_ID } from 'src/shared/constants/creditCardConstants';

const savedCreditCards = paymentSavedCreditCards.paymentSavedCreditCardsPage;
const noSavedCreditCards = { primaryCard: null, otherCards: [] };
const paymentInfoWithSelectedCreditCard = {
  selectedCardId: '1-ENKS5K'
};
const paymentInfoWithSelectedGhostCard = {
  selectedCardId: 'First Ghost Card',
  selectedGhostCardId: 'First Ghost Card'
};
const paymentInfoWithUseNewCreditCard = getPaymentInfoForUseNewCreditCard();
const savedCreditCardsWithSingleGhostCards = _.merge({}, savedCreditCards, {
  ghostCards: [
    {
      savedCreditCardId: 'First Ghost Card',
      type: 'GHOST_CARD',
      name: 'First Ghost Card',
      isExpired: false
    }
  ]
});
const savedCreditCardsWithMultipleGhostCards = _.merge({}, savedCreditCards, {
  ghostCards: [
    {
      savedCreditCardId: 'First Ghost Card',
      type: 'GHOST_CARD',
      name: 'First Ghost Card',
      isExpired: false
    },
    {
      savedCreditCardId: 'Second Ghost Card',
      type: 'GHOST_CARD',
      name: 'Second Ghost Card',
      isExpired: false
    }
  ]
});
const savedCreditCardsWithExpiredGhostCards = _.merge({}, savedCreditCards, {
  ghostCards: [
    {
      savedCreditCardId: 'First Ghost Card',
      type: 'GHOST_CARD',
      name: 'First Ghost Card',
      isExpired: true
    }
  ]
});
const savedCreditCardsWithMultipleGhostCardsWhileGhostCardRequired = _.merge(
  {},
  savedCreditCardsWithMultipleGhostCards,
  { ghostCardRequired: true }
);
const props = {
  formId: 'payment-form',
  onSubmit: _.noop,
  editMode: false,
  onUpdateGlobalHeader: _.noop,
  savedCreditCards: {},
  enableOperationOnCC: false,
  supportModifyCountryCode: false,
  clickEditButtonFn: _.noop,
  clickCancelButtonFn: _.noop,
  goBack: _.noop,
  hideErrorHeaderMsgFn: _.noop,
  onChange: _.noop,
  clearFormDataByIdFn: _.noop
};

const upliftDisabledPlacement = {
  displayType: 'block-placement',
  linkType: 'linkType',
  promoImageBackground: '/content/mkt/images/landing_pages/__tests__/uplift-unavailable.png',
  target: 'target'
};
const upliftProps = _.merge({}, props, {
  upliftAdditionalMessaging: 'Pay Monthly from $1/mo',
  upliftAdditionalInfoLink: 'Learn More'
});

storiesOf('components/PaymentForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <PaymentForm {...props} savedCreditCards={savedCreditCards} enableOperationOnCC />;
  })
  .add('noSavedCreditCards', () => {
    return (
      <PaymentForm
        {...props}
        savedCreditCards={noSavedCreditCards}
        initialFormData={{
          selectedCardId: NEW_CREDIT_CARD_ID
        }}
      />
    );
  })
  .add('alreadySelectedCreditCard', () => {
    return (
      <PaymentForm
        {...props}
        savedCreditCards={savedCreditCards}
        initialFormData={paymentInfoWithSelectedCreditCard}
        enableOperationOnCC
      />
    );
  })
  .add('applePayAvailable', () => {
    return (
      <PaymentForm
        {...props}
        savedCreditCards={savedCreditCards}
        initialFormData={paymentInfoWithSelectedCreditCard}
        shouldShowApplePay
      />
    );
  })
  .add('upliftAvailable', () => {
    return (
      <PaymentForm
        {...upliftProps}
        savedCreditCards={savedCreditCards}
        initialFormData={paymentInfoWithSelectedCreditCard}
        shouldShowUplift
      />
    );
  })
  .add('upliftDisabled', () => {
    return (
      <PaymentForm
        {...props}
        savedCreditCards={savedCreditCards}
        initialFormData={paymentInfoWithSelectedCreditCard}
        shouldShowUplift
        shouldDisableUplift
        upliftDisabledPlacement={upliftDisabledPlacement}
      />
    );
  })
  .add('useNewCreditCard', () => {
    return (
      <PaymentForm
        {...props}
        savedCreditCards={savedCreditCards}
        initialFormData={paymentInfoWithUseNewCreditCard}
        enableOperationOnCC
      />
    );
  })
  .add('singleCorporateCard', () => {
    return (
      <PaymentForm
        {...props}
        savedCreditCards={savedCreditCardsWithSingleGhostCards}
        initialFormData={paymentInfoWithSelectedGhostCard}
        enableOperationOnCC
      />
    );
  })
  .add('multipleCorporateCard', () => {
    return <PaymentForm {...props} savedCreditCards={savedCreditCardsWithMultipleGhostCards} enableOperationOnCC />;
  })
  .add('multipleCorporateCardWithGhostCardRequired', () => {
    return (
      <PaymentForm
        {...props}
        savedCreditCards={savedCreditCardsWithMultipleGhostCardsWhileGhostCardRequired}
        enableOperationOnCC
      />
    );
  })
  .add('expiredGhostCard', () => {
    return (
      <PaymentForm
        {...props}
        savedCreditCards={savedCreditCardsWithExpiredGhostCards}
        initialFormData={paymentInfoWithSelectedGhostCard}
        enableOperationOnCC
      />
    );
  })
  .add('selectedGhostCardFromMultiple', () => {
    return (
      <PaymentForm
        {...props}
        savedCreditCards={savedCreditCardsWithMultipleGhostCards}
        initialFormData={paymentInfoWithSelectedGhostCard}
        enableOperationOnCC
      />
    );
  })
  .add('withWebview', () => {
    paymentInfoWithUseNewCreditCard.expiration = '';
    return (
      <PaymentForm
        {...props}
        isWebView={true}
        initialFormData={paymentInfoWithUseNewCreditCard}
        savedCreditCards={savedCreditCards}
        enableOperationOnCC
      />
    );
  });
