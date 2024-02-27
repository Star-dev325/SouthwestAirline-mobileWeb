import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { PassengerInfoEdit } from 'src/airBooking/pages/passengerInfoEdit';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});

const pageProps = {
  params: {
    paxNumber: '0'
  },
  query: {
    paxType: 'adult'
  },
  isInternationalBooking: false,
  push: _.noop,
  checkRapidRewardAndUpdatePassengerFn: _.noop,
  passengerInfos: [
    {
      type: 'adult',
      departureDate: '2018-06-07',
      passengerInfo: {
        firstName: 'Hank',
        lastName: 'Hill',
        gender: 'M',
        dateOfBirth: '2018-06-07'
      }
    },
    {
      type: 'adult',
      departureDate: '2018-06-07',
      passengerInfo: {
        firstName: 'Bobby',
        lastName: 'Hill',
        gender: 'M',
        dateOfBirth: '2018-06-07'
      }
    }
  ],
  onSubmitPassengerForm: _.noop,
  selectedFrequentTravelers: []
};
const WebViewPassengerInfoEdit = withBodyClass(['is-webview', 'passenger-info-edit-page'])(PassengerInfoEdit);

storiesOf('pages/airBooking/passengers/edit', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <PassengerInfoEdit {...pageProps} />;
  })
  .add('with Frequent Traveler Button', () => {
    return <PassengerInfoEdit {...pageProps} isLoggedIn showFrequentTravelerButton />;
  })
  .add('no itinerary email', () => {
    return <PassengerInfoEdit {...pageProps} params={{ paxNumber: '1' }} />;
  })
  .add('international', () => {
    return <PassengerInfoEdit {...pageProps} isInternationalBooking />;
  });

storiesOf('pages/airBooking/passengers/edit', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => {
    return <WebViewPassengerInfoEdit {...pageProps} />;
  });
