import { storiesOf } from '@storybook/react';
import { paymentBanner } from 'mocks/flexPlacement/splitPayPagePlacements';
import React from 'react';
import { AirBookingApplyRapidRewardsPage } from 'src/airBooking/pages/airBookingApplyRapidRewardsPage';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import SplitPayPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/splitPay/applyRapidRewardsPageResponseBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const store = createMockedFormStore();

const defaultSplitPayPage = new SplitPayPageBuilder().build().splitPayPage;

const pageProps = {
  accountRedeemablePoints: 0,
  getSplitPayOptionsListFn: () => {},
  isWebView: false,
  loadSplitPayPagePlacementsFn: () => {},
  splitPayPagePlacements: {},
  splitPayPage: defaultSplitPayPage,
  totalPointsApplied: {}
};

const withNewOfferPlacement = {
  ...pageProps,
  loadSplitPayPagePlacementsFn: () => {},
  splitPayPagePlacements: {
    paymentBanner
  }
};

const withSplitPayMessageProps = {
  ...pageProps,
  splitPayMessage: new SplitPayPageBuilder().withSplitPayMessage().build().splitPayMessage,
  splitPayPage: {}
};

const withFundBreakdownAndPriceTotalSectionProps = {
  ...pageProps,
  loadSplitPayPagePlacementsFn: () => {},
  splitPayPagePlacements: {
    paymentBanner
  },
  applySplitPayPageCalcFundsResponse: new SplitPayPageBuilder()
    .withAppliedFunds()
    .withTotalPointsApplied()
    .withSelectedSplitPayFund()
    .build(),
  splitPayPageResponse: new SplitPayPageBuilder().withAppliedFunds().build()
};

storiesOf('pages/airBooking/applyRapidRewardsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <AirBookingApplyRapidRewardsPage {...pageProps} />;
  })
  .add('with new offer placement', () => {
    return <AirBookingApplyRapidRewardsPage {...withNewOfferPlacement} />;
  })
  .add('with not enough points message', () => {
    return <AirBookingApplyRapidRewardsPage {...withSplitPayMessageProps} />;
  })
  .add('with applied funds and updated totals section', () => {
    return <AirBookingApplyRapidRewardsPage {...withFundBreakdownAndPriceTotalSectionProps} />;
  });
