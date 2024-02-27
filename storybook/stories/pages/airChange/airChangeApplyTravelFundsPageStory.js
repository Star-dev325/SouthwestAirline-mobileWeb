import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import configureMockStore from 'redux-mock-store';
import { AirChangeApplyTravelFundsPage } from 'src/airChange/pages/airChangeApplyTravelFundsPage';
import ChangeApplyTravelFundsPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/change/changeApplyTravelFundsPageBuilder';

const store = configureMockStore()({
  app: {},
  router: {
    location: {
      search: 'search'
    }
  },
  toggles: {}
});

const applyTravelFundsPageResponse = new ChangeApplyTravelFundsPageBuilder().build();

const props = {
  applyTravelFundsPageResponse: applyTravelFundsPageResponse,
  currentlySelectedTab: 'travel-funds',
  fundsAppliedToken: '123456',
  itineraryPricingToken: '98765',
  isLoggedIn: false,
  balanceRemaining: _.get(applyTravelFundsPageResponse, 'balanceRemaining', null),
  calculateFundsFn: _.noop,
  removeFundFn: _.noop,
  refreshFundsFn: _.noop,
  resetCalculateFlowDataFn: _.noop,
  updateSelectedApplyTabFn: _.noop,
  clearAllApplyFormsFn: _.noop,
  showDialogFn: _.noop,
  hideDialogFn: _.noop,
  saveLastSearchedFundFn: _.noop,
  goToPricingFn: _.noop,
  setReLoginCallbackFunctionsFn: _.noop
};

storiesOf('pages/airChange/airChangeApplyTravelFundsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return (
      <AirChangeApplyTravelFundsPage
        {...props}
        applyTravelFundsPageResponse={new ChangeApplyTravelFundsPageBuilder().build()}
      />
    );
  })
  .add('noTFApplied', () => {
    return (
      <AirChangeApplyTravelFundsPage
        {...props}
        fundsAppliedToken={''}
        applyTravelFundsPageResponse={new ChangeApplyTravelFundsPageBuilder().withNoTFApplied().build()}
      />
    );
  })
  .add('dollarsUpgrade', () => {
    return (
      <AirChangeApplyTravelFundsPage
        {...props}
        applyTravelFundsPageResponse={new ChangeApplyTravelFundsPageBuilder().build()}
      />
    );
  })
  .add('funds with no expiration date text', () => {
    return (
      <AirChangeApplyTravelFundsPage
        {...props}
        applyTravelFundsPageResponse={new ChangeApplyTravelFundsPageBuilder().withNoExpirationDateTextFundsApplied().build()}
      />
    );
  })
  .add('pointsUpgradeDollarsUpgrade', () => {
    return (
      <AirChangeApplyTravelFundsPage
        {...props}
        applyTravelFundsPageResponse={new ChangeApplyTravelFundsPageBuilder().withPointsUpgrade().build()}
      />
    );
  })
  .add('pointsDowngradeDollarsUpgrade', () => {
    return (
      <AirChangeApplyTravelFundsPage
        {...props}
        applyTravelFundsPageResponse={new ChangeApplyTravelFundsPageBuilder().withPointsDowngrade().build()}
      />
    );
  });
