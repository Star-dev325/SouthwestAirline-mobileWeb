import { storiesOf } from '@storybook/react';
import React from 'react';
import ButtonWithPlusIconAndText from 'src/shared/components/buttonWithPlusIconAndText';

function log(value) {
  console.log(value); // eslint-disable-line no-console
}

storiesOf('components/buttonWithPlusIconAndText', module).add('default', () => {
  return (
    <div>
      <ButtonWithPlusIconAndText
        onClick={() => {
          log('Button clicked');
        }}
      >
        Button Text
      </ButtonWithPlusIconAndText>
    </div>
  );
});
