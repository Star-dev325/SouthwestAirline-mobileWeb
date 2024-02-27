import { storiesOf } from '@storybook/react';
import React from 'react';
import { PurchaseConfirmationPage } from 'src/airBooking/pages/purchaseConfirmationPage';
import FlightsPurchasePageBuilder from 'test/builders/apiResponse/flightsPurchasePageBuilder';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import SplitPayPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/splitPay/applyRapidRewardsPageResponseBuilder';
import MockPromoBuilder from 'test/builders/model/mockPromoBuilder';
import _ from 'lodash';

const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});
const corporateProps = {
  selectedCompanyName: 'Dunder Mifflin Paper Company',
  removeSelectedCompanyFn: _.noop
};

const clearFormProps = {
  clearFormDataByIdFn: _.noop,
  cleanUpFrequentTravelerSelectedFn: _.noop
};
const corporateWithIrnProps = {
  selectedIrn: 'DSrt1234985674567545678767'
};
const WebViewPurchaseConfirmationPage = withBodyClass(['is-webview', 'purchase-confirmation-page'])(
  PurchaseConfirmationPage
);

storiesOf('pages/airBooking/purchaseConfirmation', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    const response = new FlightsPurchasePageBuilder().withCOS().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('chase auto provisioning successful', () => {
    const response = new FlightsPurchasePageBuilder().withChaseAutoProvisioningCard().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('chase auto provisioning with email', () => {
    const response = new FlightsPurchasePageBuilder()
      .withChaseAutoProvisioningEmailProvision()
      .build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('paypal', () => {
    const response = new FlightsPurchasePageBuilder().withPayPal().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('apple pay', () => {
    const response = new FlightsPurchasePageBuilder().withApplePay().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('with travel funds', () => {
    const response = new FlightsPurchasePageBuilder().withFundsApplied().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('funds with no expiration date text', () => {
    const response = new FlightsPurchasePageBuilder()
      .withNoExpirationDateTextFundsApplied()
      .build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('with early bird', () => {
    const response = new FlightsPurchasePageBuilder().withEarlyBirdPNR().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('with warning icon', () => {
    const response = new FlightsPurchasePageBuilder().withWarningIcon().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('with early bird and COS', () => {
    const response = new FlightsPurchasePageBuilder().withCOS().withEarlyBirdPNR().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('with null bounds', () => {
    const response = new FlightsPurchasePageBuilder().withCOS().build().flightConfirmationPage;
    const dates = {
      first: null,
      second: null
    };
    return (
      <PurchaseConfirmationPage
        {...response}
        bounds={null}
        destination={null}
        dates={dates}
        destinationDescription={null}
        {...clearFormProps}
      />
    );
  })
  .add('Single Pax no Passport', () => {
    const response = new FlightsPurchasePageBuilder().withPassportRequiredMessage().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('Multi Pax no Passport', () => {
    const response = new FlightsPurchasePageBuilder().withPassportRequiredMessage().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('corporateBooking', () => {
    const response = new FlightsPurchasePageBuilder().withCOS().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...corporateProps} {...clearFormProps} />;
  })
  .add('corporateBooking with irn', () => {
    const response = new FlightsPurchasePageBuilder().withCOS().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...corporateWithIrnProps} {...clearFormProps} />;
  })
  .add('with lap child in booking', () => {
    const response = new FlightsPurchasePageBuilder().withLapChildInBooking().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('with long destination name', () => {
    const response = new FlightsPurchasePageBuilder().withLongDestinationName().build().flightConfirmationPage;
    return <PurchaseConfirmationPage {...response} {...clearFormProps} />;
  })
  .add('with promo bottom placements', () => {
    const response = new FlightsPurchasePageBuilder().withLongDestinationName().build().flightConfirmationPage;
    return (
      <PurchaseConfirmationPage
        {...response}
        {...clearFormProps}
        confirmationPagePlacements={{
          promoBottom01: new MockPromoBuilder().withPromoTextContent('promoBottom01').build(),
          promoBottom02: new MockPromoBuilder().withPromoTextContent('promoBottom02').build(),
          promoBottom03: new MockPromoBuilder().withPromoTextContent('promoBottom03').build(),
          promoBottom04: new MockPromoBuilder().withPromoTextContent('promoBottom04').build()
        }}
      />
    );
  })
  .add('with split payment', () => {
    const response = new FlightsPurchasePageBuilder().withSplitPaymentFundsApplied().build().flightConfirmationPage;
    return (
      <PurchaseConfirmationPage
        {...response }
        {...clearFormProps}
      />
    );
  })
  .add('with young traveler section', () => {
    const response = new FlightsPurchasePageBuilder().withYoungTravelerParentGuardianPnr().build().flightConfirmationPage;
    return (
      <PurchaseConfirmationPage
        {...response }
        {...clearFormProps}
      />
    );
  });

storiesOf('pages/airBooking/purchaseConfirmation', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => {
    const response = new FlightsPurchasePageBuilder().withCOS().build().flightConfirmationPage;
    return <WebViewPurchaseConfirmationPage {...response} {...clearFormProps} />;
  });
