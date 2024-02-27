import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { PricingSummaryPage } from 'src/airBooking/pages/pricingSummaryPage';
import byDollar from 'mocks/templates/price/byDollar';
import byPoints from 'mocks/templates/price/byPointsWithReprice';
import SearchForFlightsRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';

const searchRequest = new SearchForFlightsRequestBuilder().build();
const priceTotal = new PriceTotalBuilder().build();
const history = { location: { pathname: 'fake' } };

const props = {
  searchRequest: searchRequest,
  shouldShowChasePlacement: false,
  history,
  loadPricePagePlacementsFn: _.noop,
  gotoFirstPassengerPageFn: _.noop,
  setExpressCheckoutFromPassengerPageFn: _.noop,
  resetAirBookingPurchaseDataFn: _.noop,
  resumeAfterLoginFn: _.noop,
  push: _.noop,
  accountRedeemablePoints: 0,
  accountNumber: '10001',
  checkSessionExpired: _.noop,
  MWEB_ADOBE_TARGET_TIMEOUT_MS: 1000,
  promoBannerConfig: {},
  isEligibleForExpressCheckout: false,
  isWebView: false,
  fetchSavedCreditCardsAndPassengerInfoFn: _.noop,
  isInternationalBooking: false,
  updateFlightSearchRequestAndSyncToFormDataFn: _.noop,
  showDialogFn: _.noop,
  hideDialogFn: _.noop,
  showNativeAppLoginFn: _.noop,
  getProductListFn: _.noop,
  setChaseBannerShownFn: _.noop,
  shouldResumeAppStateFn: _.noop,
  refetchPricingDataFn: _.noop,
  persistAppStateFn: _.noop,
  resumeAppStateFn: _.noop,
  setWebViewDeepLinkContinueFn: _.noop,
  priceTotal,
  earlyBirdSelected: false,
  EARLY_BIRD_AB_TESTING: false,
  handleFirmOfferOfCreditFn: _.noop,
  cleanUpFrequentTravelerSelectedFn: _.noop,
  selectFlightProductWithUpsellFn: () => {}
};
const corporateProps = {
  selectedCompanyName: 'Dunder Mifflin Paper Company'
};
const vacationProps = {
  promoBannerConfig: {
    promoMiddle01: {
      displayType: 'block-placement',
      linkType: 'linkType',
      imageForegroundAltText: 'vacation button',
      promoImageBackground: '/content/mkt/images/landing_pages/__tests__/vacation-button.png',
      target: 'target'
    },
    promoBottom02: {
      displayType: 'block-placement',
      linkType: 'linkType',
      imageForegroundAltText: 'vacation footer',
      promoImageBackground: '/content/mkt/images/landing_pages/__tests__/vacation-legal-footer.png',
      target: 'target'
    }
  }
};
const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});
const messages = [
  {
    key: 'PRICING_EARLY_BIRD_BUNDLED_INSIDE_24_HOURS',
    header: 'EarlyBird Check-in is not available',
    body: 'We can not add this product to a flight that leaves within 24 hours of purchase',
    icon: 'WARNING'
  }
];
const dollarResponseWithMessages = _.merge({}, byDollar, { flightPricingPage: { messages } });
const { upsellDetails } = new PricesBuilder().withUpsellDetails().build().flightPricingPage;
const wgaPlusUpsellDetails =  new PricesBuilder().withWGAPlusUpsellDetails().build().flightPricingPage.upsellDetails;
const dollarResponseWithPPUpsell = {
  ...byDollar,
  flightPricingPage: {
    ...byDollar.flightPricingPage,
    upsellDetails
  }
};
const dollarResponseWithWGAPlusPPUpsell = {
  ...byDollar,
  flightPricingPage: {
    ...byDollar.flightPricingPage,
    upsellDetails: wgaPlusUpsellDetails
  }
};

const { upsellSuccessMessage } = new PricesBuilder().withUpsellSuccessMessage().build().flightPricingPage;
const dollarResponseWithPPUpsellSuccessWidget = {
  ...byDollar,
  flightPricingPage: {
    ...byDollar.flightPricingPage,
    upsellSuccessMessage
  }
};
const WebViewPricingSummaryPage = withBodyClass(['is-webview', 'pricing-summary-page'])(PricingSummaryPage);
const EnhancedPricingSummaryPageClass = withBodyClass(['pricing-summary-page'])(PricingSummaryPage);

storiesOf('pages/airBooking/pricingSummary', module)
  .addDecorator(StoryReduxProvider(store))
  .add('dollar', () => {
    return (
      <PricingSummaryPage
        flightPricingPage={{
          response: byDollar,
          resumeAfterLogin: false
        }}
        isLoggedIn
        {...props}
      />
    );
  })
  .add('points', () => {
    return (
      <PricingSummaryPage
        flightPricingPage={{
          response: byPoints,
          resumeAfterLogin: false
        }}
        isLoggedIn
        {...props}
      />
    );
  })
  .add('corporateBooking', () => {
    return (
      <PricingSummaryPage
        flightPricingPage={{
          response: byDollar,
          resumeAfterLogin: false
        }}
        isLoggedIn
        {..._.merge({}, props, corporateProps)}
      />
    );
  })
  .add('with vacation button and legal footer', () => {
    return (
      <EnhancedPricingSummaryPageClass
        flightPricingPage={{
          response: byDollar,
          resumeAfterLogin: false
        }}
        isLoggedIn
        {..._.merge({}, props, vacationProps)}
      />
    );
  })
  .add('with messages', () => {
    return (
      <EnhancedPricingSummaryPageClass
        flightPricingPage={{
          response: dollarResponseWithMessages,
          resumeAfterLogin: false
        }}
        isLoggedIn
        {...props}
      />
    );
  })
  .add('with PP Upsell', () => (
    <EnhancedPricingSummaryPageClass
      flightPricingPage={{
        response: dollarResponseWithPPUpsell,
        resumeAfterLogin: false
      }}
      isLoggedIn
      {...props}
    />
  ))
  .add('with WGA Plus PP Upsell', () => (
    <EnhancedPricingSummaryPageClass
      flightPricingPage={{
        response: dollarResponseWithWGAPlusPPUpsell,
        resumeAfterLogin: false
      }}
      isLoggedIn
      {...props}
    />
  ))
  .add('with PP Upsell success widget', () => (
    <EnhancedPricingSummaryPageClass
      flightPricingPage={{
        response: dollarResponseWithPPUpsellSuccessWidget,
        resumeAfterLogin: false
      }}
      isLoggedIn
      {...props}
    />
  ));

storiesOf('pages/airBooking/pricingSummary', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => {
    return (
      <WebViewPricingSummaryPage
        flightPricingPage={{
          response: byDollar,
          resumeAfterLogin: false
        }}
        isLoggedIn
        {...props}
      />
    );
  })
  .add('ipad webview with messages', () => {
    return (
      <WebViewPricingSummaryPage
        flightPricingPage={{
          response: dollarResponseWithMessages,
          resumeAfterLogin: false
        }}
        isLoggedIn
        {...props}
      />
    );
  });
