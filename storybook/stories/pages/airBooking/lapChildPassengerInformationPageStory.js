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
      isWebView: true,
      isLapChild: true
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
  isInternationalBooking: false,
  push: _.noop,
  checkRapidRewardAndSavePassengerFn: _.noop,
  setExpressCheckoutFromPassengerPageFn: _.noop,
  passengerInfos: [
    {
      type: 'lapChild',
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

storiesOf('pages/airBooking/lapChildPassengerInformation', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <PassengerInformation {...pageProps} />;
  })
  .add('with lapChild below 14 days Error', () => {
    pageProps.passengerInfos[0] = {
      type: 'lapChild',
      departureDate: '2022-05-16',
      passengerInfo: {
        firstName: 'Verylongfirstnamefirstnamefirstnamfirstnam',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '2022-05-09',
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
  .add('with Associated adult required Error', () => {
    pageProps.passengerInfos = [{
      type: 'lapChild',
      departureDate: '2022-06-16',
      passengerInfo: {
        firstName: 'Verylongfirstnamefirstnamefirstnamfirstnam',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '2022-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    },
    {
      type: 'adult',
      departureDate: '2022-06-16',
      passengerInfo: {
        firstName: 'First Adult',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '2017-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    },
  {
      type: 'adult',
      departureDate: '2022-06-16',
      passengerInfo: {
        firstName: 'Second Adult',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '1999-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    }];

    return <PassengerInformation {...pageProps} />;
  })
  .add('Associated adult should be min 12 years old', () => {
    pageProps.passengerInfos = [{
      type: 'lapChild',
      departureDate: '2022-06-16',
      passengerInfo: {
        associatedAdult: 'First Adult Zh$$en',
        firstName: 'Lapchild One',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '2021-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    },{
      type: 'lapChild',
      departureDate: '2022-06-16',
      passengerInfo: {
        firstName: 'Lapchild two',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '2022-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    },
    {
      type: 'adult',
      departureDate: '2022-06-16',
      passengerInfo: {
        firstName: 'First',
        middleName: 'Adult',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '2017-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    },
  {
      type: 'adult',
      departureDate: '2022-06-16',
      passengerInfo: {
        firstName: 'Second Adult',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '1999-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    }];

    return <PassengerInformation {...pageProps} />;
  })
  .add('Associated adult should be assigned to only one lapchild', () => {
    pageProps.passengerInfos = [{
      type: 'lapChild',
      departureDate: '2022-06-16',
      passengerInfo: {
        associatedAdult: 'Second Adult Zh$$en IV',
        firstName: 'Lapchild One',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '2021-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    },{
      type: 'lapChild',
      departureDate: '2022-06-16',
      passengerInfo: {
        associatedAdult: 'Second Adult Zh$$en IV',
        firstName: 'Lapchild two',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '2022-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    },
    {
      type: 'adult',
      departureDate: '2022-06-16',
      passengerInfo: {
        firstName: 'First Adult',
        middleName: '%%',
        lastName: 'Zh$$en',
        gender: 'M',
        dateOfBirth: '2017-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    },
  {
      type: 'adult',
      departureDate: '2022-06-16',
      passengerInfo: {
        firstName: 'Second',
        middleName: 'Adult',
        lastName: 'Zh$$en',
        gender: 'M',
        suffix: 'IV',
        dateOfBirth: '1999-05-09',
        emailReceiptTo: 'aterris@example',
        shareItineraryEmail: 'aterris@example',
        rapidRewardsNumber: 'AAA',
        redressNumber: 'AAA',
        knownTravelerNumber: 'AAA',
        internationalTravelInfo: '',
        contactMethodContent: ''
      }
    }];

    return <PassengerInformation {...pageProps} />;
  });
