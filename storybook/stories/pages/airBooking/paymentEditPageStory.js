import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { PaymentEdit } from 'src/airBooking/pages/paymentEdit';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const store = {
  router: {
    location: {
      search: 'search'
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

const defaultPageProps = {
  onMakePrimaryCreditCard: _.noop,
  onUpdateCreditCard: _.noop,
  onDeleteCreditCards: _.noop,
  onClickContinueButton: _.noop,
  fetchSavedCreditCards: _.noop,
  onClickPayPalButton: _.noop,
  continueAsGuestActionFn: _.noop,
  shouldShowChaseInstantCreditCard: false,
  goBack: _.noop,
  push: _.noop
};

const multipleCCProps = _.merge(
  {},
  {
    savedCreditCards: new PaymentSavedCreditCardsBuilder().build(),
    editMode: false,
    isLoggedIn: true
  },
  defaultPageProps
);

const editModeProps = _.merge(
  {},
  {
    editMode: true,
    isLoggedIn: true,
    shouldShowApplePay: true,
    savedCreditCards: new PaymentSavedCreditCardsBuilder().build()
  },
  defaultPageProps
);

const noSavedCCProps = _.merge(
  {},
  {
    editMode: false,
    isLoggedIn: true,
    savedCreditCards: {}
  },
  defaultPageProps
);

const guestUserProps = _.merge(
  {},
  {
    isLoggedIn: false,
    editMode: false,
    savedCreditCards: {},
    paymentInfo: {}
  },
  defaultPageProps
);

const applePayAvailableProps = _.merge(
  {},
  {
    editMode: false,
    isLoggedIn: true,
    savedCreditCards: new PaymentSavedCreditCardsBuilder().build(),
    shouldShowApplePay: true
  },
  defaultPageProps
);

const upliftAvailableProps = _.merge(
  {},
  {
    editMode: false,
    isLoggedIn: true,
    savedCreditCards: new PaymentSavedCreditCardsBuilder().build(),
    shouldShowUplift: true,
    upliftAdditionalMessaging: 'Pay Monthly from $1/mo'
  },
  defaultPageProps
);

const upliftDisabledPlacement = {
  displayType: 'block-placement',
  linkType: 'linkType',
  promoImageBackground: '/content/mkt/images/landing_pages/__tests__/uplift-unavailable.png',
  target: 'target'
};
const upliftAvailableDisabledProps = _.merge(
  {},
  {
    editMode: false,
    isLoggedIn: true,
    savedCreditCards: new PaymentSavedCreditCardsBuilder().build(),
    shouldShowUplift: true,
    shouldDisableUplift: true,
    upliftDisabledPlacement
  },
  defaultPageProps
);

const WebViewPaymentEdit = withBodyClass(['is-webview', 'payment-edit-page'])(PaymentEdit);

storiesOf('pages/airBooking/paymentEditPage', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore(store)))
  .add('multipleSavedCreditCards', () => {
    return <PaymentEdit {...multipleCCProps} />;
  })
  .add('noSavedCreditCards', () => {
    return <PaymentEdit {...noSavedCCProps} />;
  })
  .add('loggedInEditMode', () => {
    return <PaymentEdit {...editModeProps} />;
  })
  .add('guestUser', () => {
    return <PaymentEdit {...guestUserProps} />;
  })
  .add('applePayAvailable', () => {
    return <PaymentEdit {...applePayAvailableProps} />;
  })
  .add('upliftAvailable', () => {
    return <PaymentEdit {...upliftAvailableProps} />;
  })
  .add('upliftDisabled', () => {
    return <PaymentEdit {...upliftAvailableDisabledProps} />;
  });

storiesOf('pages/airBooking/paymentEditPage', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore(webViewStore)))
  .add('ipad webview', () => {
    return <WebViewPaymentEdit {...multipleCCProps} isWebView={true} paymentInfo={{}} />;
  });
