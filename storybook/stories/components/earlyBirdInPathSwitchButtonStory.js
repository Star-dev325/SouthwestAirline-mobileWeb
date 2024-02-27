import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';
import EarlyBirdInPathSwitchButtonField from 'src/shared/form/fields/earlyBirdInPathSwitchButtonField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

const store = createMockedFormStore();
const MockedForm = createMockedForm(store);

const props = {
  name: 'earlyBird',
  unitPrice: {
    amount: '15.00',
    currencyCode: 'USD',
    currencySymbol: '$',
    description: 'per passenger, each way'
  },
  totalPrice: {
    amount: '15.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  }
};

storiesOf('components/EarlyBirdInPathSwitchButtonField', module).add('default', () => {
  return (
    <MockedForm onSubmit={_.noop}>
      <EarlyBirdInPathSwitchButtonField {...props} onClick={_.noop} />
    </MockedForm>
  );
});
