import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import CreditCardFields from 'src/shared/form/fields/creditCardFields';
import PaymentSavedCreditCardBuilder from 'test/builders/model/paymentSavedCreditCardBuilder';

const savedCreditCardPrimary = new PaymentSavedCreditCardBuilder().withSavedCreditCardId('1-ENKS4K').build();
const store = createMockedFormStore();
const MockedForm = createMockedForm(store);

const props = {
  onChange: _.noop,
  onSelectCreditCardCheckBox: _.noop,
  onClickPayPalButton: _.noop,
  savedCreditCards: {},
  editMode: false,
  selectedCreditCardStatuses: [],
  shouldShowChaseInstantCreditCard: true,
  onUseNewCreditCardChange: _.noop,
  names: []
};

const savedCreditCards = {
  primaryCard: savedCreditCardPrimary,
  otherCards: [savedCreditCardPrimary]
};

storiesOf('components/creditCardFields', module)
  .add('showChaseInstantCreditCard', () => {
    return (
      <MockedForm onSubmit={_.noop}>
        <CreditCardFields {...props} />
      </MockedForm>
    );
  })
  .add('savePrimaryCreditCard', () => {
    return (
      <MockedForm onSubmit={_.noop}>
        <CreditCardFields {...props} savedCreditCards={savedCreditCards} />
      </MockedForm>
    );
  });
