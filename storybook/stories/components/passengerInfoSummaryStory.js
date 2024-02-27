import React from 'react';
import { storiesOf } from '@storybook/react';
import PassengerInfoSummary from 'src/shared/components/passengerInfoSummary';

const singlePax = {
  passengers: [
    {
      name: 'Amber Awesome',
      rapidRewards: '8349157375'
    }
  ]
};

const multiplePax = {
  passengers: [
    {
      name: 'Amber Awesome'
    },
    {
      name: 'Steve Job'
    }
  ]
};

storiesOf('components/passengerInfoSummary', module)
  .add('single passenger with RR number', () => {
    return <PassengerInfoSummary {...singlePax} onPassengerItemClick={() => {}} />;
  })
  .add('multiple passengers', () => {
    return <PassengerInfoSummary {...multiplePax} onPassengerItemClick={() => {}} />;
  });
