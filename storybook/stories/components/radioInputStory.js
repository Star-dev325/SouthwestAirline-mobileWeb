import React from 'react';
import { storiesOf } from '@storybook/react';
import RadioInput from 'src/shared/components/radioInput';

const options = [
  {
    label: 'Male',
    value: 'male'
  },
  {
    label: 'Female',
    value: 'female'
  }
];

storiesOf('components/radioInput', module)
  .add('default', () => {
    return <RadioInput options={options} />;
  })
  .add('backgroundColorSelection', () => {
    return <RadioInput options={options} backgroundColorSelection />;
  });
