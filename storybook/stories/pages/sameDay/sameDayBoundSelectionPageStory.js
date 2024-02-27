import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import { SameDayBoundSelectionPage } from 'src/sameDay/pages/sameDayBoundSelectionPage';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';

const { viewReservationViewPage } = new ViewReservationBuilder().withViewForSameDayPage().build();

const store = createMockedFormStore();

storiesOf('pages/sameDay/sameDayBoundSelectionPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('Bound select page', () => {
    return <SameDayBoundSelectionPage {...viewReservationViewPage} />;
  });
