import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { UpgradeFarePage } from 'src/airUpgrade/pages/upgradeFarePage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { promoTop01 } from 'mocks/flexPlacement/airUpgradeLandingPagePlacements';
import { AIR_UPGRADE_FARE_OPTIONS } from 'src/airUpgrade/constants/airUpgradeConstants';

const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});

const props = {
  location: {},
  saveUpgradeTypeFn: () => AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_PLU,
  loadUpgradeFarePagePlacementsFn: () => {},
  upgradeFarePagePlacement: {},
  loadUpgradeIndexFn: () => {}
};

const placementProps = {
  location: {},
  saveUpgradeTypeFn: () => AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_PLU,
  loadUpgradeFarePagePlacementsFn: () => {},
  upgradeFarePagePlacement: {
    promoTop01
  },
  loadUpgradeIndexFn: () => {}
};

const WebViewUpgradeFarePage = withBodyClass(['is-webview', 'upgrade-fare-page'])(UpgradeFarePage);

storiesOf('pages/airUpgrade/UpgradeFarePage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <UpgradeFarePage {...props} />);

storiesOf('pages/airUpgrade/UpgradeFarePage', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => <WebViewUpgradeFarePage {...props} isWebView={true} />);

storiesOf('pages/airUpgrade/UpgradeFarePage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('with placement', () => <UpgradeFarePage {...placementProps} />);

storiesOf('pages/airUpgrade/UpgradeFarePage', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview with placement', () => <WebViewUpgradeFarePage {...placementProps} isWebView={true} />);
