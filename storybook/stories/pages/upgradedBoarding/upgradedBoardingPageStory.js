import { storiesOf } from '@storybook/react';
import React from 'react';
import { noop } from 'lodash';

import { UpgradedBoardingPage } from 'src/upgradedBoarding/pages/upgradedBoardingPage';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const props = {
  upgradedBoardingPagePlacements: {
    promoTop01: {
      displayType: 'block-placement',
      linkType: 'linkType',
      promoImageBackground: '/content/mkt/images/landing_pages/__tests__/upgraded-boarding-index-content-ad.png',
      target: 'target'
    },
    contentModule1: {
      displayType: 'block-placement',
      linkType: 'linkType',
      promoImageBackground: '/content/mkt/images/landing_pages/__tests__/upgraded-boarding-benefits-first.png',
      target: 'target'
    },
    promoBottom01: {
      displayType: 'block-placement',
      linkType: 'linkType',
      promoImageBackground: '/content/mkt/images/landing_pages/__tests__/upgraded-boarding-benefits-second.png',
      target: 'target'
    }
  },
  loadUpgradedBoardingPagePlacementsFn: noop
};
const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});

const WebViewUpgradedBoardingPage = withBodyClass(['is-webview', 'upgraded-boarding-page'])(UpgradedBoardingPage);

storiesOf('pages/upgradedBoarding/upgradedBoardingPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <UpgradedBoardingPage {...props} />);

storiesOf('pages/upgradedBoarding/upgradedBoardingPage', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => <WebViewUpgradedBoardingPage {...props} isWebView={true} />);
