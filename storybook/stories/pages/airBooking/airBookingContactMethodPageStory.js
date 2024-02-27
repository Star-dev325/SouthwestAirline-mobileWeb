import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { AirBookingContactMethodPage } from 'src/airBooking/pages/airBookingContactMethodPage';
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
  contactMethodInfo: {
    contactMethod: 'EMAIL'
  },
  formId: 'FORM_ID',
  goBack: _.noop,
  isAirBooking: true,
  isAlreadyHasContactMethod: false,
  isInternationalBooking: false,
  isLoggedIn: true,
  updateContactMethodFn: _.noop
};

const WebViewAirBookingContactMethodPage = withBodyClass(['is-webview', 'air-booking-contact-method-page'])(
  AirBookingContactMethodPage
);

storiesOf('pages/airBooking/airBookingContactMethodPage', module)
  .addDecorator(StoryReduxProvider(configureMockStore()(store)))
  .add('default', () => {
    return <AirBookingContactMethodPage {...defaultProps} />;
  });

storiesOf('pages/airBooking/airBookingContactMethodPage', module)
  .addDecorator(StoryReduxProvider(configureMockStore()(webViewStore)))
  .add('ipad webview', () => {
    return <WebViewAirBookingContactMethodPage {...defaultProps} />;
  });
