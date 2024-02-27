import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from 'src/shared/components/select';

const options = [
  {
    value: '1',
    label: 'val 1'
  },
  {
    value: '2',
    label: 'val 2'
  }
];

function log(value, valueObj) {
  console.log(value, valueObj); // eslint-disable-line no-console
}

storiesOf('components/select', module).add('default', () => {
  return (
    <div>
      <Select options={options} onChange={log} />
    </div>
  );
});
