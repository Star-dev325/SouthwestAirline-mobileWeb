import React from 'react';
import { storiesOf } from '@storybook/react';
import _ from 'lodash';

import RecentTripSearchCard from 'src/shared/components/recentTripSearchCard';

storiesOf('components/recentTripSearchCard', module).add('default', () => (
  <RecentTripSearchCard firstName="Bear" lastName="Claw" recordLocator="MF6GH3" onClick={_.noop} />
));
