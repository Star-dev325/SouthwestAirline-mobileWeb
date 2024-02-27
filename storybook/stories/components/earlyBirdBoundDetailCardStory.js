import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import EarlyBirdBoundDetailCard from 'src/earlyBird/components/earlyBirdBoundDetailCard';

const passengers = [
  {
    name: 'Fred Flintstone',
    canPurchaseEarlyBird: true,
    accountNumber: '601534942'
  },
  {
    name: 'Barney Rubble',
    canPurchaseEarlyBird: false,
    accountNumber: '601005646'
  }
];

const boundDetail = {
  boundType: 'DEPARTING',
  boundBrief: {
    departureAirportCode: 'DAL',
    departureDate: '2018-05-19',
    departureDayOfWeek: 'Saturday',
    departureTime: '06:20',
    arrivalAirportCode: 'MSP',
    arrivalTime: '11:25'
  },
  passengers
};

const store = createMockedFormStore();
const MockedForm = createMockedForm(store, {});

storiesOf('components/earlyBirdBoundDetailCard', module).add('default', () => {
  return (
    <MockedForm onSubmit={() => {}}>
      <EarlyBirdBoundDetailCard
        boundDetail={boundDetail}
        onClickIneligibleLabel={_.noop}
        onChangeEBCheckbox={_.noop}
        boundOrder="bound_0"
      />
    </MockedForm>
  );
});
