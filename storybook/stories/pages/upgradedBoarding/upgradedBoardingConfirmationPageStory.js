import { storiesOf } from '@storybook/react';
import React from 'react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { UpgradedBoardingConfirmationPage } from 'src/upgradedBoarding/pages/upgradedBoardingConfirmationPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import upgradedBoardingConfirmationPageBuilder from 'test/builders/model/upgradedBoardingConfirmationPageBuilder';

const defaultProps = {
  exitWebViewFn: () => {},
  push: () => {},
  isWebView: false,
  upgradedBoardingConfirmationPageResponse: new upgradedBoardingConfirmationPageBuilder().build()
};
const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});
const singlePaxSegmentProps = {
  ...defaultProps,
  upgradedBoardingConfirmationPageResponse: new upgradedBoardingConfirmationPageBuilder().withSinglePaxSingleSegment()
};

const EnhancedUpgradedBoardingConfirmationPage = withBodyClass('upgraded-boarding-confirmation-page')(
  UpgradedBoardingConfirmationPage
);
const WebViewUpgradedBoardingConfirmationPage = withBodyClass(['is-webview', 'upgraded-boarding-confirmation-page'])(
  UpgradedBoardingConfirmationPage
);

storiesOf('pages/upgradedBoarding/upgradedBoardingConfirmationPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('multi pax multi segment', () => <EnhancedUpgradedBoardingConfirmationPage {...defaultProps} />);

storiesOf('pages/upgradedBoarding/upgradedBoardingConfirmationPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('single pax single segment', () => <EnhancedUpgradedBoardingConfirmationPage {...singlePaxSegmentProps} />);

storiesOf('pages/upgradedBoarding/upgradedBoardingConfirmationPage', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => <WebViewUpgradedBoardingConfirmationPage {...defaultProps} />);
