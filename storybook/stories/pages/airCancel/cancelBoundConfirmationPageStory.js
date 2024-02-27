import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

import CancelBoundConfirmationPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/cancel/cancelBoundConfirmationPageBuilder';

import { AirCancelBoundConfirmationPage } from 'src/airCancel/pages/airCancelBoundConfirmationPage';

const store = createMockedFormStore();
storiesOf('pages/airCancel/airCancelBoundConfirmationPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('RT Cancel All With Points Send Credit to CC', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .cancelAllRT()
      .withPTSAndCreditOnCard()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('RT Cancel OB With Dollars Send Credit to CC', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder().build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('RT Cancel Non-Rev OB With Dollars Send Credit to CC', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .withNonRev()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('Nonrevenue Guest Passes', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .withNonRev()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('Refunded to Employee`s account', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .withNonRev()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('No Book A flight Button for Non Revenue Pnr', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .withGuestPassesAndAllowBookAnotherFlightFalse()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('RT Cancel All With Dollars Hold Credit', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .cancelAllRT()
      .withHoldFunds()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('RT Cancel All Hold Credit - with view travel funds credit', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .cancelAllRT()
      .withViewTravelFunds()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('RT Cancel OB With Dollars Hold Credit and Message', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .withHoldFunds()
      .withMessages()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('RT Cancel OB With Dollars Hold Credit', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .withHoldFunds()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('RT Cancel IB Multi-PAX With Hold Credit and Check In Button', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .cancelInboundInsteadOfOB()
      .withHoldFunds()
      .withCheckInLink()
      .withMultiPax()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('with long passenger name', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .withLongPassengerName('Longnamefortesting Longlastnametesting')
      .build().cancelBoundConfirmationPage;
    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('funds with no expiration date text', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .cancelAllRT()
      .withNoExpirationDateTextFunds()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  })
  .add('with split pnr record locator label', () => {
    const cancelBoundConfirmationPage = new CancelBoundConfirmationPageBuilder()
      .withSplitPnrConfirmationLabel()
      .build().cancelBoundConfirmationPage;

    return <AirCancelBoundConfirmationPage cancelBoundConfirmationPage={cancelBoundConfirmationPage} />;
  });
