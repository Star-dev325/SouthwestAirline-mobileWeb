import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from 'src/shared/components/progressBar';

storiesOf('components/progressBar', module).add('default', () => {
  return <ProgressBar now={50} />;
});
