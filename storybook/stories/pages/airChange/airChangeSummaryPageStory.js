import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import { AirChangeSummaryPage } from 'src/airChange/pages/airChangeSummaryPage';
import ChangePricingPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/change/changePricingPageBuilder';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const store = createMockedFormStore();

storiesOf('pages/airChange/AirChangeSummaryPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('withPaxTypeOfPassenger', () => {
    const response = new ChangePricingPageBuilder().withPaxTypePassenger().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: true,
          upGrade: false,
          downGrade: false
        }}
      />
    );
  })
  .add('upgrade', () => {
    const response = new ChangePricingPageBuilder().withUpgrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: true,
          downGrade: false
        }}
      />
    );
  })
  .add('refundable downgrade', () => {
    const response = new ChangePricingPageBuilder().withRefundableDowngrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: false,
          downGrade: true
        }}
      />
    );
  })
  .add('nonrefundable downgrade', () => {
    const response = new ChangePricingPageBuilder().withNonRefundableDowngrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: false,
          downGrade: true
        }}
      />
    );
  })
  .add('mix refund downgrade', () => {
    const response = new ChangePricingPageBuilder().withRefundableAndNonRefundableDowngrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: false,
          downGrade: true
        }}
      />
    );
  })
  .add('even exchange', () => {
    const response = new ChangePricingPageBuilder().withRoundTrip().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: true,
          upGrade: false,
          downGrade: false
        }}
      />
    );
  })
  .add('points downgrade and tax upgrade', () => {
    const response = new ChangePricingPageBuilder().withPointsDowngradeTaxUpgrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: false,
          downGrade: true
        }}
      />
    );
  })
  .add('points downgrade and tax even exchange', () => {
    const response = new ChangePricingPageBuilder().withPointsDowngradeTaxEvenExchange().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: false,
          downGrade: true
        }}
      />
    );
  })
  .add('points downgrade and tax downgrade', () => {
    const response = new ChangePricingPageBuilder().withPointsDowngradeTaxDowngrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: false,
          downGrade: true
        }}
      />
    );
  })
  .add('split pay points downgrade and tax downgrade', () => {
    const response = new ChangePricingPageBuilder().withSplitPayPointsDowngradeTaxDowngrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: false,
          downGrade: true
        }}
      />
    );
  })
  .add('points even exchange and tax upgrade', () => {
    const response = new ChangePricingPageBuilder().withPointsEvenExchangeTaxUpgrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: true,
          upGrade: false,
          downGrade: false
        }}
      />
    );
  })
  .add('points even exchange and tax even exchange', () => {
    const response = new ChangePricingPageBuilder().withPointsEvenExchangeTaxEvenExchange().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: true,
          upGrade: false,
          downGrade: false
        }}
      />
    );
  })
  .add('points even exchange and tax downgrade', () => {
    const response = new ChangePricingPageBuilder().withPointsEvenExchangeTaxDowngrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: true,
          upGrade: false,
          downGrade: false
        }}
      />
    );
  })
  .add('points upgrade and tax upgrade', () => {
    const response = new ChangePricingPageBuilder().withPointsUpgradeTaxUpgrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: true,
          downGrade: false
        }}
      />
    );
  })
  .add('points upgrade and tax even exchange', () => {
    const response = new ChangePricingPageBuilder().withPointsUpgradeTaxEvenExchange().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: true,
          downGrade: false
        }}
      />
    );
  })
  .add('points upgrade and tax downgrade', () => {
    const response = new ChangePricingPageBuilder().withPointsUpgradeTaxDowngrade().build();
    return (
      <AirChangeSummaryPage
        changePricingPage={response}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: true,
          downGrade: false
        }}
      />
    );
  })
  .add('with priceMessages', () => {
    const response = new ChangePricingPageBuilder().build();
    const priceMessages = [
      {
        key: 'PRICING_EARLY_BIRD_BUNDLED_INSIDE_36_HOURS',
        header: 'EarlyBird Check-in is not available',
        body: 'We can not add this product to a flight that leaves within 36 hours of purchase',
        icon: 'WARNING',
        textColor: 'DEFAULT',
        backgroundColor: 'DEFAULT'
      }
    ];
    const changePricingPage = _.merge({}, response, { priceMessages });

    return (
      <AirChangeSummaryPage
        changePricingPage={changePricingPage}
        getAirBookingSeniorVisibilityFn={_.noop}
        changeType={{
          evenExchange: false,
          upGrade: false,
          downGrade: false
        }}
      />
    );
  });
