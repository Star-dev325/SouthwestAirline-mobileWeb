import { storiesOf } from '@storybook/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { CancelStandbyListConfirmationPage } from 'src/standby/pages/cancelStandbyListConfirmationPage';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import standbyCancelConfirmationBuilder from 'test/builders/apiResponse/standbyCancelConfirmationBuilder';

const CancelStandbyListConfirmation = withBodyClass('cancel-standby-page')(CancelStandbyListConfirmationPage);
const cancelStandbyListingPageResponse = new standbyCancelConfirmationBuilder().build();
const cancelStandbyListingPageWithOutLabelText = new standbyCancelConfirmationBuilder().withOutSameDayUpdateLabelText().build();

const store = configureMockStore()({});

storiesOf('pages/standby/cancelStandbyListConfirmationPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <CancelStandbyListConfirmation cancelStandbyListingPage={cancelStandbyListingPageResponse} />;
  })
  .add('with out same day update label text', () => {
    return <CancelStandbyListConfirmation cancelStandbyListingPage={cancelStandbyListingPageWithOutLabelText} />;
  });
