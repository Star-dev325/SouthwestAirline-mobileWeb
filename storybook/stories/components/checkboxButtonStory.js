import { storiesOf } from '@storybook/react';
import React from 'react';
import CheckboxButton from 'src/shared/components/checkboxButton';

function log(value) {
  console.log(value); // eslint-disable-line no-console
}

storiesOf('components/checkboxButton', module)
  .add('default', () => {
    return (
      <CheckboxButton onChange={log} defaultChecked={false}>
        CheckboxButton
      </CheckboxButton>
    );
  })
  .add('checked', () => {
    return (
      <CheckboxButton onChange={log} defaultChecked={true}>
        CheckboxButton
      </CheckboxButton>
    );
  })
  .add('disabled', () => {
    return (
      <CheckboxButton onChange={log} defaultChecked={false} disabled={true}>
        CheckboxButton
      </CheckboxButton>
    );
  });
