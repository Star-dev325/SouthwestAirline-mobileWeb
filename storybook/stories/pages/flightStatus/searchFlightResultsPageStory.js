import { storiesOf } from '@storybook/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { SearchFlightsResultsPage } from 'src/flightStatus/pages/searchFlightsResultsPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import FlightSchedulesPageBuilder from 'test/builders/apiResponse/flightSchedulesPageBuilder';

const EnhancedSearchFlightsResultsPage = withBodyClass('flight-status-search-result')(SearchFlightsResultsPage);
const EnhancedWebViewSearchFlightsResultsPage = withBodyClass(['flight-status-search-result', 'is-webview'])(
  SearchFlightsResultsPage
);
const store = configureMockStore()({});
const response = new FlightSchedulesPageBuilder().withNumberOfFlight(2).build().flightSchedulesPage;
const overnightResponse = new FlightSchedulesPageBuilder()
  .withNumberOfFlight(2)
  .withOvernight()
  .build().flightSchedulesPage;

const props = {
  flightSchedulesPage: { response },
  fetchFlightStatusFn: () => {},
  lookUpFlightStatusDetailsFn: () => {},
  params: {
    from: 'DAL',
    to: 'MDW',
    date: '2013-11-15'
  }
};

const webViewStore = configureMockStore()({
  app: {
    webView: {
      isWebView: true
    }
  }
});

const propsWithWebView = {
  ...props,
  ...{
    isWebView: true
  }
};

const propsWithOvernight = { ...props, ...{ flightSchedulesPage: { response: overnightResponse } } };

storiesOf('pages/flightStatus/SearchFlightResultsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EnhancedSearchFlightsResultsPage {...props} />;
  })
  .add('overnight', () => {
    return <EnhancedSearchFlightsResultsPage {...propsWithOvernight} />;
  });

storiesOf('pages/flightStatus/SearchFlightResultsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('webview', () => {
    return <EnhancedWebViewSearchFlightsResultsPage {...propsWithWebView} />;
  });
