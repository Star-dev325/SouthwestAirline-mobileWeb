import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { AirBookingPassengerPassportPage } from 'src/airBooking/pages/airBookingPassengerPassportPage';
import configureMockStore from 'redux-mock-store';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const store = {
  app: {},
  router: {
    location: {
      pathname: 'path'
    }
  }
};
const webViewStore = _.merge({}, store, {
  app: {
    webView: {
      isWebView: true
    }
  }
});

const defaultProps = {
  savePassportInformationFn: _.noop,
  passengerInfos: [{}],
  params: { paxNumber: '0' },
  goBack: _.noop,
  query: { passengerName: 'FIRST LAST' },
  showDialogFn: _.noop,
  hideDialogFn: _.noop
};

const WebViewAirBookingPassengerPassportPage = withBodyClass(['is-webview', 'air-booking-passenger-passport-page'])(
  AirBookingPassengerPassportPage
);

storiesOf('pages/airBooking/airBookingPassengerPassportPage', module)
  .addDecorator(StoryReduxProvider(configureMockStore()(store)))
  .add('default', () => {
    return <AirBookingPassengerPassportPage {...defaultProps} />;
  });

storiesOf('pages/airBooking/airBookingPassengerPassportPage', module)
  .addDecorator(StoryReduxProvider(configureMockStore()(webViewStore)))
  .add('ipad webview', () => {
    return <WebViewAirBookingPassengerPassportPage {...defaultProps} />;
  });
