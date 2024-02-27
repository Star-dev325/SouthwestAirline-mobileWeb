import React from 'react';
import { storiesOf } from '@storybook/react';
import DatePicker from 'src/shared/components/datePicker';

storiesOf('components/datePicker', module).add('default', () => {
  return (
    <div style={{ padding: '1rem' }}>
      Min: default, Max: 2016/08/30, all fields.
      <DatePicker
        max={new Date('2016/08/30')}
        value={null}
        onChange={(value) => {
          console.log('value: ', new Date(value)); // eslint-disable-line no-console
          this.setState({ value });
        }}
      />
      Min: 2016/01, Max: 2017/05, fields: ['month', 'year'].
      <DatePicker
        fields={['month', 'year']}
        value={null}
        min={new Date('2016/01')}
        max={new Date('2017/05')}
        onChange={(value) => {
          console.log('value2: ', new Date(value)); // eslint-disable-line no-console
          this.setState({ value2: value });
        }}
      />
      Default options, no value update.
      <DatePicker
        onChange={(value) => {
          console.log(value); // eslint-disable-line no-console
        }}
      />
    </div>
  );
});
