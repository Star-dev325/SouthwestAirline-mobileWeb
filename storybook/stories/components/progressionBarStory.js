import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressionBar from 'src/shared/components/progressionBar';

storiesOf('components/progressionBar', module).add('default', () => {
  return (
    <div>
      <ProgressionBar step={2} title="Personal Info" />
      <ProgressionBar step={2} title="Price" currentIconType="airplane" />
    </div>
  );
});
