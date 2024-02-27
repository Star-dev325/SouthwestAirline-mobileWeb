import { storiesOf } from '@storybook/react';
import React from 'react';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import PassengerAmountField from 'src/shared/form/fields/passengerAmountField';

const store = createMockedFormStore();
const MockedForm = createMockedForm(store);

storiesOf('components/passengerAmountField', module).add('default', () => (
  <MockedForm>
    <PassengerAmountField name="passenger-amount-field" paxType="Adult" onChange={() => { }} />
  </MockedForm>
))
  .add('withLapChild', () => (
    <MockedForm>
      <PassengerAmountField name="passenger-amount-field" paxType="Adult" onChange={() => { }} isLapChildEnabled={true} onSelectPassengerClicked={() => { }} />
    </MockedForm>
  ));