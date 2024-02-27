import _ from 'lodash';
import React from 'react';

import configureMockStore from 'redux-mock-store';
import { FareDetails } from 'src/wcm/pages/fareDetails';
import FareDetailsBuilder from 'test/builders/model/fareDetailsBuilder';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const store = configureMockStore()({});
const webViewStore = configureMockStore()({
  app: {
    webView: {
      isWebView: true
    }
  }
});

const pageProps = {
  location: { pathname: '' },
  goBack: _.noop,
  push: _.noop,
  pageContent: new FareDetailsBuilder().build()
};

const WebViewFareDetails = withBodyClass(['is-webview', 'fare-details-page'])(FareDetails);

storiesOf('pages/shared/fareDetailsPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <FareDetails {...pageProps} />;
  });

storiesOf('pages/shared/fareDetailsPage', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => {
    return <WebViewFareDetails {...pageProps} />;
  });
