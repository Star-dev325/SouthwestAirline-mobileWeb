import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';

import { TripAndPriceDetails } from 'src/airBooking/pages/tripAndPriceDetails';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';

const WebViewTripAndPriceDetails = withBodyClass(['is-webview', 'trip-and-price-details-page'])(TripAndPriceDetails);

const props = {
  flightPricingPage: {
    response: new PricesBuilder().build()
  },
  goBack: _.noop
};

const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});

storiesOf('pages/airBooking/tripAndPriceDetailsPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <TripAndPriceDetails {...props} />);

storiesOf('pages/airBooking/tripAndPriceDetailsPage', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => <WebViewTripAndPriceDetails {...props} />);
