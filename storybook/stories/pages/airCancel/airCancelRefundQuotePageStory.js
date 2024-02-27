import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

import CancelRefundQuotePageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/cancel/cancelRefundQuotePageBuilder';

import { AirCancelRefundQuotePage } from 'src/airCancel/pages/airCancelRefundQuotePage';

const store = createMockedFormStore();

storiesOf('pages/airCancel/airCancelRefundQuotePage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('Dollars Refundable', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder()
      .withOnlyRefundableFunds()
      .build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('Dollars Non-Refundable', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder()
      .withOnlyNonRefundableFunds()
      .build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('Dollars Both', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder().build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('Dollars Both With Email', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder().withEmailRequired().build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('Points', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder().withPoints().build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('Points With Email', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder()
      .withPoints()
      .withEmailRequired()
      .build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('$0 Non-Rev', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder().withNonRev().build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('$25 Non-Rev', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder().withNonRev('25.00').build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('Nonrevenue Guest Pass(es)', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder().withNonRev().build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('$0 Regular', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder()
      .withOnlyRefundableFunds('0.00')
      .build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('with long passenger name', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder()
      .withLongPassengerName('Longnamefortesting Longlastnametesting')
      .build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('with long cancel message', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder()
      .withOnlyRefundableFunds()
      .setLongCancelMessage()
      .build().cancelRefundQuotePage;
    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  })
  .add('with split pnr record locator label', () => {
    const cancelRefundQuotePage = new CancelRefundQuotePageBuilder()
      .withSplitPnrConfirmationLabel()
      .build().cancelRefundQuotePage;

    return <AirCancelRefundQuotePage cancelRefundQuotePage={cancelRefundQuotePage} />;
  });
