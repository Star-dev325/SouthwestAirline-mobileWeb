import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { ShoppingLandingPage } from 'src/airBooking/pages/shoppingLandingPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import configureMockStore from 'redux-mock-store';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import footer from 'mocks/templates/content-delivery/footer';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';

const EnhancedShoppingLandingPage = withBodyClass('booking-flight')(ShoppingLandingPage);
const WebViewShoppingLandingPage = withBodyClass(['is-webview', 'booking-flight'])(ShoppingLandingPage);

const footerLinkRows = footer.results.footer.content.placement.linkRows;

const pageProps = {
  MWEB_HOMEPAGE_REDESIGN: false,
  analyticsTrackViewTabFn: _.noop,
  corporateInfo: null,
  fetchLocalSearchRequestsFn: _.noop,
  footerLinkRows,
  getLowFareCalendarFn: _.noop,
  getUserInfoFn: _.noop,
  isLoggedIn: false,
  loadAirportsFn: _.noop,
  loadRecentlySearchedFn: _.noop,
  passengerCountValue: {
    adultCount: 1,
    lapChildCount: 0,
    valueUpdated: false
  },
  refreshCorporateInfoFn: _.noop,
  resetAirBookingFlowDataFn: _.noop,
  resetSavedCreditCardsFn: _.noop,
  savePassengerCountFn: _.noop,
  saveSearchRequestFn: _.noop,
  searchForFlightsFn: _.noop,
  searchRequest: {
    currencyType: 'USD',
    departureDate: '2018-01-01',
    isRoundTrip: true,
    numberOfAdults: 1,
    returnDate: '2018-01-03',
    tripType: 'roundTrip'
  },
  toggles: {},
  updateFormFieldDataValueFn: _.noop,
  updateSelectedAirportInfoFn: _.noop
};

const corporateInfo = {
  activeCompanyIdAssociations: [{ companyId: '99587574', companyName: 'Dunder Mifflin Paper Company' }],
  selectedCompany: { companyId: '99587574', companyName: 'Dunder Mifflin Paper Company' }
};

const store = {
  router: {
    location: {
      search: 'search',
      pathname: '/air/booking'
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

const storeWithSelectedCompany = configureMockStore()({
  app: {
    account: {
      corporateInfo: {
        selectedCompany: {
          companyName: 'Dunder Mifflin Paper Company'
        }
      }
    }
  },
  router: {
    location: {
      search: 'search'
    }
  }
});

const storeWithMultiSelectGroup = configureMockStore()({
  app: {
    formData: {
      AIR_BOOKING_SHOPPING_SEARCH_FORM: {
        url: '/air/booking/shopping?_modal=to',
        data: {
          origin: 'Boston',
          destination: 'MDW'
        }
      }
    }
  },
  router: {
    location: {
      search: 'search'
    }
  }
});

const enabledCorporateBookingProps = {
  isLoggedIn: true,
  corporateInfo,
  corporateBookingSwitchInfo: {
    label: 'Book with a SWABIZ account',
    learnMoreUrl: 'corporate/url',
    nonCorporateLearnMoreUrl: 'non/corporate/url'
  }
};

storiesOf('pages/airBooking/shoppingLandingPage', module)
  .addDecorator(withFakeClock('2020-03-01'))
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore(store)))
  .add('default', () => <EnhancedShoppingLandingPage {...pageProps} />)
  .add('homepage redesign', () => (
    <EnhancedShoppingLandingPage {..._.merge({}, pageProps, { MWEB_HOMEPAGE_REDESIGN: true })} />
  ))
  .add('corporateBooking', () => (
    <EnhancedShoppingLandingPage {..._.merge({}, pageProps, enabledCorporateBookingProps)} />
  ))
  .add('lapChildBooking', () => (
    <EnhancedShoppingLandingPage
      {..._.merge({}, pageProps, {
        isLapChildEnabled: true
      })}
    />
  ));

storiesOf('pages/airBooking/shoppingLandingPage', module)
  .addDecorator(withFakeClock('2020-03-01'))
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore(webViewStore)))
  .add('ipad webview', () => <WebViewShoppingLandingPage {...pageProps} />);

storiesOf('pages/airBooking/shoppingLandingPage', module)
  .addDecorator(withFakeClock('2020-03-01'))
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(storeWithSelectedCompany))
  .add('corporateBookingCompanySelected', () => (
    <EnhancedShoppingLandingPage {..._.merge({}, pageProps, enabledCorporateBookingProps)} />
  ));

storiesOf('pages/airBooking/shoppingLandingPage', module)
  .addDecorator(withFakeClock('2020-03-01'))
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(storeWithMultiSelectGroup))
  .add('multiSelectGroup', () => (
    <EnhancedShoppingLandingPage
      {..._.merge({}, pageProps, {
        allAirports: [
          ...getMultiSelectGroup()['Boston Area Airports'],
          ...getMultiSelectGroup()['Chicago Area Airports']
        ],
        multiSelectGroup: { origin: ['BOS', 'BDL', 'MHT', 'PVD'] }
      })}
    />
  ))
  .add('multiSelectGroup with long airport name', () => (
    <EnhancedShoppingLandingPage
      {..._.merge({}, pageProps, {
        allAirports: [
          ...getMultiSelectGroup()['Chicago Area Airports'],
          ...getMultiSelectGroup()['Washington, D.C. Area Airports']
        ],
        multiSelectGroup: { origin: ['BWI', 'DCA', 'IAD'] }
      })}
    />
  ));
