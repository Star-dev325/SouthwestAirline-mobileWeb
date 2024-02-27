import { storiesOf } from '@storybook/react';
import React from 'react';
import SuccessBanner from 'src/shared/components/successBanner';

storiesOf('components/successBanner', module)
  .add('default', () => {
    return <SuccessBanner message={'The success message'} />;
  })
  .add('no message', () => {
    return <SuccessBanner message={null} />;
  });
