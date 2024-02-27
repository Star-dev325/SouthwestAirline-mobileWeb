import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { ViewReservationPage } from 'src/viewReservation/pages/viewReservationPage';
import StoryRouter from 'storybook-router';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const store = createMockedFormStore();
const defaultProps = {
  clearFormDataByIdFn: () => {},
  analyticsTrackViewTabFn: () => {},
  retrieveCarReservationAndTransitionToCarDetailPageFn: () => {}
};
const EnhancedViewReservationPage = withBodyClass('view-reservation-page')(ViewReservationPage);

storiesOf('pages/viewReservation/viewReservationPage', module)
  .addDecorator(StoryReduxProvider(store))
  .addDecorator(StoryRouter())
  .add('default', () => {
    return (
      <EnhancedViewReservationPage {...defaultProps} lastBookableDate="2019-01-01" isLoggedIn={false} query={{}} />
    );
  })
  .add('loggedIn', () => {
    return <EnhancedViewReservationPage {...defaultProps} lastBookableDate="2019-01-01" isLoggedIn={true} query={{}} />;
  })
  .add('car', () => {
    return (
      <EnhancedViewReservationPage
        {...defaultProps}
        lastBookableDate="2019-01-01"
        isLoggedIn={false}
        query={{ tab: 'CAR' }}
      />
    );
  });
