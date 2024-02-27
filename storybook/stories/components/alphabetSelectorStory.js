import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@storybook/react';
import AlphabetSelector from 'src/shared/components/alphabetSelector';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const WebViewAlphabetSelector = withBodyClass('is-webview')(AlphabetSelector);

const props = {
  shouldShow: true,
  alphabet: [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
  scrollTo: _.noop
};

storiesOf('components/alphabetSelector', module)
  .add('default', () => {
    return <AlphabetSelector {...props} />;
  })
  .add('webview', () => {
    return <WebViewAlphabetSelector {...props} />;
  });
