import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from 'src/shared/components/spinner';

const props = {
  showSpinner: true,
  isWebView: false,
  appReady: false,
  spinnerMessage: 'Hang tight, we are processing your change.'
};

storiesOf('components/spinner', module).add('default', () => {
  return <Spinner {...props} />;
});
