import { storiesOf } from '@storybook/react';
import React from 'react';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import EarlyBirdPassengerCheckbox from 'src/shared/form/fields/earlyBirdPassengerCheckbox';

const passenger = {
  name: 'Iverson Li',
  accountNumber: '601534942',
  canPurchaseEarlyBird: true
};

const store = createMockedFormStore();
const MockedForm = createMockedForm(store);

storiesOf('components/earlyBirdPassengerCheckbox', module)
  .add('default', () => {
    passenger.canPurchaseEarlyBird = true;
    return (
      <MockedForm formData={{ ebPaxCheckBox: false }}>
        <EarlyBirdPassengerCheckbox
          fieldName={'ebPaxCheckBox'}
          passenger={passenger}
          onClickIneligibleLabel={() => {}}
          onChangeEBCheckbox={() => {}}
        />
      </MockedForm>
    );
  })
  .add('cant purchase earlyBird', () => {
    passenger.canPurchaseEarlyBird = false;
    passenger.decisionDescription = 'A-List';
    return (
      <MockedForm formData={{ ebPaxCheckBox: false }}>
        <EarlyBirdPassengerCheckbox
          fieldName={'ebPaxCheckBox'}
          passenger={passenger}
          onClickIneligibleLabel={() => {}}
          onChangeEBCheckbox={() => {}}
        />
      </MockedForm>
    );
  });
