import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import { AirChangeRepricingPage } from 'src/airChange/pages/airChangeRepricingPage';
import ChangePricingPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/change/changePricingPageBuilder';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const props = {
  searchRequest: {
    href: 'http://mobile.com',
    method: 'POST',
    body: {
      outbound: {
        boundReference: 'outbound reference',
        date: '2018-04-14',
        'origin-airport': 'ALB',
        'destination-airport': 'AUS',
        isChangeBound: true,
        isOriginalFlight: true
      },
      inbound: null,
      isSenior: false
    }
  },
  push: _.noop,
  searchForFlightsFn: _.noop
};

const store = createMockedFormStore();

const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});
const WebViewAirChangeRepricePage = withBodyClass(['is-webview', 'pricing-summary-container'])(AirChangeRepricingPage);

storiesOf('pages/airChange/AirChangeRepricingPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('one way', () => {
    const response = new ChangePricingPageBuilder().withUpgrade().withRepricingMessages().build();
    return <AirChangeRepricingPage changePricingPage={response} {...props} />;
  })

  .add('round trip', () => {
    const response = new ChangePricingPageBuilder().withRoundTrip().withRepricingMessages().build();
    return <AirChangeRepricingPage changePricingPage={response} {...props} />;
  })
  .add('with priceMessages', () => {
    const response = new ChangePricingPageBuilder().build();
    const priceMessages = [
      {
        key: 'PRICING_EARLY_BIRD_BUNDLED_INSIDE_36_HOURS',
        header: 'EarlyBird Check-in is not available',
        body: 'We can not add this product to a flight that leaves within 36 hours of purchase',
        icon: 'WARNING',
        textColor: 'DEFAULT',
        backgroundColor: 'DEFAULT'
      }
    ];
    const changePricingPage = _.merge({}, response, { priceMessages });

    return <AirChangeRepricingPage changePricingPage={changePricingPage} {...props} />;
  });

storiesOf('pages/airChange/AirChangeRepricingPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('in a webview', () => {
    const response = new ChangePricingPageBuilder().withRoundTrip().withRepricingMessages().build();
    return <WebViewAirChangeRepricePage changePricingPage={response} isWebView={true} {...props} />;
  });
