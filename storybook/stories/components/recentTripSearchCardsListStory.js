import React from 'react';
import { storiesOf } from '@storybook/react';
import _ from 'lodash';

import RecentTripSearchCardsList from 'src/shared/components/recentTripSearchCardsList';

const props = {
  recentTripSearches: [
    {
      recordLocator: 'ABC123',
      firstName: 'Andy',
      lastName: 'Smith'
    },
    {
      recordLocator: 'DEF456',
      firstName: 'Tom',
      lastName: 'Jones'
    }
  ],
  onCardClick: _.noop
};

storiesOf('components/recentTripSearchCardsList', module).add('default', () => (
  <RecentTripSearchCardsList {...props} />
));
