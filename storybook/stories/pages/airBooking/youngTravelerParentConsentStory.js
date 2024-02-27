import { storiesOf } from '@storybook/react';
import React from 'react';
import { defaultYoungTravelerParentConsent } from 'src/wcm/constants/wcmFallbackConstants';
import { YoungTravelerParentConsent } from 'src/wcm/pages/youngTravelerParentConsent';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const defaultProps = {
    goBack: () => {},
    isWebView: false,
    overlay: defaultYoungTravelerParentConsent,
    push: () => {},
    retrieveYoungTravelerParentConsentFn: () => {}
};

storiesOf('pages/airBooking/youngTravelerParentConsent', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <YoungTravelerParentConsent {...defaultProps} />;
  });
