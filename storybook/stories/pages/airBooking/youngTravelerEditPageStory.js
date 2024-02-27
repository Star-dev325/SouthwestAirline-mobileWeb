import { storiesOf } from '@storybook/react';
import React from 'react';
import { YoungTravelerEditPage } from 'src/airBooking/pages/youngTravelerEditPage';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { getParentOrGuardianFormData, getPassengerValidationDetails } from 'test/builders/model/youngTravelerPageBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const defaultProps = {
  youngTravelerPageInfo: getPassengerValidationDetails().passengerValidationDetails.youngTraveler.youngTravelerPageInfo
};
const stateWithParentOrGuardianFormData = {
  app: {
    formData: {
      AIR_BOOKING_PARENT_OR_GUARDIAN_FORM: {
        data: getParentOrGuardianFormData()
      }
    }
  }
};

storiesOf('pages/airBooking/youngTravelerEditPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore(stateWithParentOrGuardianFormData)))
  .add('default', () => {
    return <YoungTravelerEditPage {...defaultProps} />;
  });
