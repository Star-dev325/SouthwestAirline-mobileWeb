import { storiesOf } from '@storybook/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { FlightDetailsPage } from 'src/flightStatus/pages/flightDetailsPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import FlightStatusDetailsBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/flight-status/flightStatusDetailsBuilder';

const EnhancedFlightDetailsPage = withBodyClass('flight-details-bg')(FlightDetailsPage);
const EnhancedWebViewFlightDetailsPage = withBodyClass(['flight-details-bg', 'is-webview'])(FlightDetailsPage);
const response = new FlightStatusDetailsBuilder().build().flightStatusDetailsPage;
const responseWithConnection = new FlightStatusDetailsBuilder().withConnectingFlight().build().flightStatusDetailsPage;
const responseWithOvernight = new FlightStatusDetailsBuilder().withOvernight().build().flightStatusDetailsPage;
const store = configureMockStore()({});
const defaultProps = {
  flightStatusDetailsPage: { response },
  fetchFlightDetailsFn: _.noop,
  shareFlightStatusDetailsFn: _.noop,
  isWebView: false,
  shareFlightStatus: false,
  query: {
    from: 'HOU',
    to: 'ATL',
    date: '2017-04-09',
    flightNumber: '205'
  }
};

const propsWithConnection = {
  ...defaultProps,
  ...{
    flightStatusDetailsPage: {
      response: responseWithConnection
    },
    query: {
      from: 'HOU',
      to: 'ATL',
      date: '2017-04-09',
      flightNumber: '101',
      connectingAirportCode: 'MSY',
      secondFlightNumber: '205'
    }
  }
};

const propsWithWebView = {
  ...defaultProps,
  ...{
    isWebView: true,
    shareFlightStatus: true
  }
};

const webViewStore = configureMockStore()({
  app: {
    webView: {
      isWebView: true
    }
  }
});

const propsWithOvernight = {
  ...defaultProps,
  ...{
    flightStatusDetailsPage: {
      response: responseWithOvernight
    },
    query: {
      connectingAirportCode: 'MSY',
      date: '2017-04-09',
      flightKeys: '2023-05-16%3ASFODEN3717%7C2023-05-17%3ADENLGA528',
      flightNumber: '101',
      from: 'HOU',
      secondFlightNumber: '205',
      to: 'ATL'
    }
  }
};

storiesOf('pages/flightStatus/FlightDetailsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EnhancedFlightDetailsPage {...defaultProps} />;
  })
  .add('with Connection', () => {
    return <EnhancedFlightDetailsPage {...propsWithConnection} />;
  })
  .add('with Overnight', () => {
    return <EnhancedFlightDetailsPage {...propsWithOvernight} />;
  });

storiesOf('pages/flightStatus/FlightDetailsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('webview', () => {
    return <EnhancedWebViewFlightDetailsPage {...propsWithWebView} />;
  });
