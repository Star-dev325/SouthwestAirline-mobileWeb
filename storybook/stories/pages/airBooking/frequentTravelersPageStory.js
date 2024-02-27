import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';

import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import frequentTravelerList from 'mocks/templates/airReservation/frequentTravelersList';
import { FrequentTravelers } from 'src/airBooking/pages/frequentTravelersPage';

const props = {
  params: {
    paxNumber: '1'
  },
  frequentTravelerList: frequentTravelerList.frequentTravelerResponse,
  selectedFrequentTravelers: [],
  passengerInfos: [
    {
      type: 'adult',
      departureDate: '2018-06-07',
      passengerInfo: {
        firstName: 'Hank',
        lastName: 'Hill',
        gender: 'M',
        dateOfBirth: '2018-06-07'
      }
    },
    {
      type: 'adult',
      departureDate: '2018-06-07',
      passengerInfo: {
        firstName: 'Bobby',
        lastName: 'Hill',
        gender: 'M',
        dateOfBirth: '2018-06-07'
      }
    }
  ],
  goBack: _.noop
};

const store = createMockedFormStore();

storiesOf('pages/airBooking/frequentTravelersPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <FrequentTravelers {...props} />)
  .add('with Frequent Traveler Selected', () => {
    return (
      <FrequentTravelers
        {...props}
        selectedFrequentTravelers={[
          {
            addFrequentTravelerToggle: false,
            frequentTravelerId: 'ACCOUNT',
            paxNumber: 0
          }
        ]}
      />
    );
  });
