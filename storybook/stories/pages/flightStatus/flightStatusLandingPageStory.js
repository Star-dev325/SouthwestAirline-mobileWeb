import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { FlightStatusLandingPage } from 'src/flightStatus/pages/flightStatusLandingPage';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const EnhancedPage = withBodyClass('flight-status-search')(FlightStatusLandingPage);
const EnhancedWebViewPage = withBodyClass(['flight-status-search', 'is-webview'])(FlightStatusLandingPage);

const store = {
  app: {
    formData: {},
    flightStatus: {
      selectedRecentSearchRequest: {}
    }
  },
  router: {
    location: {
      pathname: '/flight-status'
    }
  }
};

const props = {
  fetchFlightStatusFn: _.noop,
  fetchFlightDetailsFn: _.noop,
  getRecentSearchesFromLocalStorageFn: _.noop,
  analyticsTrackSubmitFormFn: _.noop,
  push: _.noop,
  loadAirportsFn: _.noop,
  loadRecentlySearchedFn: _.noop,
  location: {
    pathname: '/flight-status',
    search: ''
  },
  match: {
    params: '',
    isExact: false,
    path: '',
    url: ''
  },
  selectedRecentSearchRequest: null,
  toggles: {}
};

const webViewStore = _.merge({}, store, {
  app: {
    webView: {
      isWebView: true
    }
  }
});

const propsWithWebView = _.merge({}, props, {
  isWebView: true
});

storiesOf('pages/flightStatus/FlightStatusLandingPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(configureMockStore()(store)))
  .addDecorator(withFakeClock('2018-03-23'))
  .add('default', () => {
    return <EnhancedPage {...props} />;
  });

storiesOf('pages/flightStatus/FlightStatusLandingPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(configureMockStore()(webViewStore)))
  .addDecorator(withFakeClock('2018-03-23'))
  .add('webview', () => {
    return <EnhancedWebViewPage {...propsWithWebView} />;
  });
