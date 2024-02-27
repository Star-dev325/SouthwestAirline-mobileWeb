import { storiesOf } from '@storybook/react';
import React from 'react';

import { RecentSearchesPage } from 'src/airBooking/pages/recentSearchesPage';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const pageProps = {
  onDeleteCurrentSearchFn: () => {},
  transitionToShoppingLandingPageFn: () => {},
  searches: [
    {
      currencyType: 'USD',
      tripType: 'roundTrip',
      isRoundTrip: true,
      numberOfAdults: 1,
      numberOfLapInfants: 0,
      origin: 'ATL',
      destination: 'DAL',
      departureDate: '2018-01-01',
      returnDate: '2018-01-03'
    },
    {
      currencyType: 'PTS',
      tripType: 'oneWay',
      isRoundTrip: false,
      numberOfAdults: 1,
      numberOfLapInfants: 0,
      origin: 'MDW',
      destination: 'AUS',
      departureDate: '2018-01-01'
    }
  ]
};

const lapChildEnabledProps = {
  onDeleteCurrentSearchFn: () => {},
  transitionToShoppingLandingPageFn: () => {},
  isLapChildEnabled: true,
  searches: [
    {
      currencyType: 'USD',
      tripType: 'roundTrip',
      isRoundTrip: true,
      numberOfAdults: 3,
      numberOfLapInfants: 2,
      origin: 'ATL',
      destination: 'DAL',
      departureDate: '2018-01-01',
      returnDate: '2018-01-03'
    },
    {
      currencyType: 'PTS',
      tripType: 'oneWay',
      isRoundTrip: false,
      numberOfAdults: 1,
      numberOfLapInfants: 1,
      origin: 'MDW',
      destination: 'AUS',
      departureDate: '2018-01-01'
    }
  ]
};

const multiSelectGroupEnabledProps = {
  onDeleteCurrentSearchFn: () => {},
  transitionToShoppingLandingPageFn: () => {},
  isMultiSelectGroupEnabled: true,
  isLapChildEnabled: true,
  multiSelectGroup: {
    isSelected: true,
    origin: ['BOS','BDL']
  },
  searches: [
    {
      currencyType: 'USD',
      tripType: 'roundTrip',
      isRoundTrip: true,
      numberOfAdults: 3,
      numberOfLapInfants: 2,
      origin: 'Boston',
      destination: 'DAL',
      departureDate: '2018-01-01',
      returnDate: '2018-01-03'
    }
  ]
};

const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});

const WebViewRecentSearchesPage = withBodyClass(['is-webview', 'recent-searches-page'])(RecentSearchesPage);

storiesOf('pages/airBooking/recentSearchesPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <RecentSearchesPage {...pageProps} />;
  });

storiesOf('pages/airBooking/recentSearchesPage', module)
.addDecorator(StoryReduxProvider(store))
.add('lap child enabled', () => {
  return <RecentSearchesPage {...lapChildEnabledProps} />;
});

storiesOf('pages/airBooking/recentSearchesPage', module)
.addDecorator(StoryReduxProvider(store))
.add('multiSelectGroup', () => {
  return <RecentSearchesPage {...multiSelectGroupEnabledProps} />;
});

storiesOf('pages/airBooking/recentSearchesPage', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => {
    return <WebViewRecentSearchesPage {...pageProps} />;
  });

storiesOf('pages/airBooking/recentSearchesPage', module)
.addDecorator(StoryReduxProvider(webViewStore))
.add('lap child enabled ipad webview', () => {
  return <WebViewRecentSearchesPage {...lapChildEnabledProps} />;
});
