import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { PassengerInformation } from 'src/airBooking/pages/passengerInformation';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});
const defaultFlightProducts = new PricesBuilder().build().flightPricingPage;

const pageProps = {
  flightPricingResponse: {
    flightPricingPage: defaultFlightProducts,
    prefill: {
      chaseCardHolder: {
        accountNumber: '',
        firstName: 'firstName',
        lastName: 'lastName',
        middleName: 'middleName'
      }
    }
  },
  params: {
    paxNumber: '0'
  },
  isInternationalBooking: true,
  push: _.noop,
  checkRapidRewardAndSavePassengerFn: _.noop,
  setExpressCheckoutFromPassengerPageFn: _.noop,
  passengerInfos: [
    {
      type: 'adult',
      departureDate: '2018-06-07'
    }
  ],
  isLoggedIn: false,
  submitPassengerFormFn: _.noop,
  searchRequest: {
    tripType: 'oneWay',
    isRoundTrip: false,
    currencyType: 'USD'
  },
  generatePassengerPageInfoFn: _.noop,
  selectedFrequentTravelers: []
};
const corporateProps = {
  selectedCompanyName: 'Dunder Mifflin Paper Company'
};
const WebViewPassengerInformation = withBodyClass(['is-webview', 'passenger-information-page'])(PassengerInformation);

storiesOf('pages/airBooking/passengerInformation', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <PassengerInformation {...pageProps} />;
  })
  .add('withError', () => {
    pageProps.passengerInfos[0] = {
      type: 'adult',
      departureDate: '2018-06-07',
      passengerInfo: {
        firstName: 'Verylongfirstnamefirstnamefirstnamfirstnam',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '2000-04-01',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    };

    return <PassengerInformation {...pageProps} />;
  })
  .add('with Frequent Traveler Button', () => {
    return <PassengerInformation {...pageProps} isLoggedIn showFrequentTravelerButton />;
  })
  .add('corporateBooking', () => {
    return <PassengerInformation {...pageProps} {...corporateProps} />;
  })
  .add('adult with lap child', () => {
    const lapChild = {
      type: 'lapChild',
      departureDate: '2018-06-07'
    };
    pageProps.passengerInfos.push(lapChild);

    return <PassengerInformation {...pageProps} />;
  })

storiesOf('pages/airBooking/passengerInformation', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => {
    return <WebViewPassengerInformation {...pageProps} />;
  });
