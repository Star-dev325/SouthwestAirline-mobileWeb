import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';

import TravelInformationForm from 'src/viewReservation/components/travelInformationForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

const store = createMockedFormStore();

const props = {
  passengerName: 'Fred Flintstone',
  formId: 'form',
  onSubmit: _.noop
};

storiesOf('components/travelInformationForm', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <TravelInformationForm {...props} />;
  })
  .add('with RR number pre-filled', () => {
    return (
      <TravelInformationForm
        {...props}
        initialFormData={{
          rapidRewardsNumber: '601005646'
        }}
      />
    );
  })
  .add('with RR/KTN/Redress Number all pre-filled', () => {
    return (
      <TravelInformationForm
        {...props}
        initialFormData={{
          rapidRewardsNumber: '601005646',
          knownTravelerNumber: 'T54553',
          redressNumber: '13579'
        }}
      />
    );
  });
