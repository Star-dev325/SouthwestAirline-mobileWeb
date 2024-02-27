import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { UpgradedBoardingPaymentPage } from 'src/upgradedBoarding/pages/upgradedBoardingPaymentPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const props = {
  isLoggedIn: false,
  paymentInfo: {},
  savedCreditCards: {
    primaryCard: null,
    otherCards: []
  },
  userAddressInfo: null,
  shouldShowApplePay: false,
  updateFormDataValueFn: _.noop,
  onClickContinueButton: _.noop
};
const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});

const WebViewUpgradedBoardingPaymentPage = withBodyClass(['is-webview', 'payment-edit-page'])(
  UpgradedBoardingPaymentPage
);

storiesOf('pages/upgradedBoarding/upgradedBoardingPaymentPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <UpgradedBoardingPaymentPage {...props} />)
  .add('with Apple Pay', () => <UpgradedBoardingPaymentPage {...props} shouldShowApplePay={true} />)

storiesOf('pages/upgradedBoarding/upgradedBoardingPaymentPage', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => <WebViewUpgradedBoardingPaymentPage {...props} />);
