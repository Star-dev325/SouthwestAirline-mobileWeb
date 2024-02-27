import { storiesOf } from '@storybook/react';
import React from 'react';
import CountdownTimer from 'src/shared/components/countdownTimer';

const infoText =
  'remaining to secure your A1-A15 spot.*';

storiesOf('components/countdownTimer', module).add('default', () => {
  return (
    <div>
      <CountdownTimer time={300} text={infoText} />
    </div>
  );
});
