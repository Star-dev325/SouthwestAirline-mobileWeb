import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { UpgradeFareSelectBoundsPage } from 'src/airUpgrade/pages/upgradeFareSelectBoundsPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { promoTop01 } from 'mocks/flexPlacement/airUpgradeLandingPagePlacements';
import { AIR_UPGRADE_FARE_OPTIONS } from 'src/airUpgrade/constants/airUpgradeConstants';

const defaultProps = new AirUpgradeViewReservationApiJsonBuilder().build().viewUpgradeReservationPage;
const promoCodeProps = new AirUpgradeViewReservationApiJsonBuilder()
  .withPromoCodeMessage()
  .build().viewUpgradeReservationPage;
const oneIneligibleBoundProps = new AirUpgradeViewReservationApiJsonBuilder()
  .withOneBoundIneligibleForUpgrade()
  .build().viewUpgradeReservationPage;
const bothIneligibleBoundsProps = new AirUpgradeViewReservationApiJsonBuilder()
  .withAllBoundsIneligibleForUpgrade()
  .build().viewUpgradeReservationPage;
const pointsBookingSelectedBounds = new AirUpgradeViewReservationApiJsonBuilder()
  .withPointsBooking()
  .withBothBoundsSelected()
  .build().viewUpgradeReservationPage;
const withOvernightIndicator = new AirUpgradeViewReservationApiJsonBuilder().withOvernight().build().viewUpgradeReservationPage;
const withNextDayIndicator = new AirUpgradeViewReservationApiJsonBuilder().withNextDay().build().viewUpgradeReservationPage;

const reduxStore = createMockedFormStore({
  app: {
    formData: { 'AIR_UPGRADE_SELECT_BOUNDS_FORM.data': { mockId1: true, mockId2: true } }
  }
});
const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});
const saveUpgradeTypeFn = () => AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS;
const placementProps = {
  location: {},
  upgradeFarePagePlacement: {
    promoTop01
  },
  saveUpgradeTypeFn
};
const WebViewUpgradeFareSelectBoundsPage = withBodyClass(['is-webview', 'air-upgrade-select-bounds'])(
  UpgradeFareSelectBoundsPage
);

storiesOf('pages/airUpgrade/AirUpgradeSelectBoundsPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return (
      <UpgradeFareSelectBoundsPage
        viewUpgradeReservationPage={{ ...defaultProps }}
        saveUpgradeTypeFn={saveUpgradeTypeFn}
      />
    );
  });

storiesOf('pages/airUpgrade/AirUpgradeSelectBoundsPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('with promo code', () => {
    return (
      <UpgradeFareSelectBoundsPage
        viewUpgradeReservationPage={{ ...promoCodeProps }}
        saveUpgradeTypeFn={saveUpgradeTypeFn}
      />
    );
  });

storiesOf('pages/airUpgrade/AirUpgradeSelectBoundsPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('with one bound ineligible', () => {
    return (
      <UpgradeFareSelectBoundsPage
        viewUpgradeReservationPage={{ ...oneIneligibleBoundProps }}
        saveUpgradeTypeFn={saveUpgradeTypeFn}
      />
    );
  });

storiesOf('pages/airUpgrade/AirUpgradeSelectBoundsPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('with no bounds ineligible', () => {
    return (
      <UpgradeFareSelectBoundsPage
        viewUpgradeReservationPage={{ ...bothIneligibleBoundsProps }}
        saveUpgradeTypeFn={saveUpgradeTypeFn}
      />
    );
  });

storiesOf('pages/airUpgrade/AirUpgradeSelectBoundsPage', module)
  .addDecorator(StoryReduxProvider(reduxStore))
  .add('with points booking bounds selected', () => {
    return (
      <UpgradeFareSelectBoundsPage
        viewUpgradeReservationPage={{ ...pointsBookingSelectedBounds }}
        changeSelectedBoundFn={_.noop}
        saveUpgradeTypeFn={saveUpgradeTypeFn}
      />
    );
  });

storiesOf('pages/airUpgrade/AirUpgradeSelectBoundsPage', module)
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => (
    <WebViewUpgradeFareSelectBoundsPage
      viewUpgradeReservationPage={{ ...promoCodeProps }}
      saveUpgradeTypeFn={saveUpgradeTypeFn}
      isWebView={true}
    />
  ));

storiesOf('pages/airUpgrade/AirUpgradeSelectBoundsPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('with placement', () => (
    <UpgradeFareSelectBoundsPage viewUpgradeReservationPage={{ ...defaultProps }} {...placementProps} />
  ))
  .add('with overnight indicator', () => (
    <UpgradeFareSelectBoundsPage viewUpgradeReservationPage={{ ...withOvernightIndicator }} {...placementProps} />
  ))
  .add('with next day indicator', () => (
    <UpgradeFareSelectBoundsPage viewUpgradeReservationPage={{ ...withNextDayIndicator }} {...placementProps} />
  ));
