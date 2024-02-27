import React from 'react';
import { storiesOf } from '@storybook/react';

import Container from 'src/shared/components/container';
import RapidRewardsPanelNotEnrolled from 'src/myAccount/components/rapidRewardsPanelNotEnrolled';
import MyTripsPanel from 'src/myAccount/components/myTripsPanel';

function log(type) {
  console.log(type, 'is clicked'); // eslint-disable-line no-console
}

storiesOf('components/rapidRewardsPanelNotEnrolled', module).add('default', () => {
  return (
    <Container autoFill>
      <RapidRewardsPanelNotEnrolled onItemClick={log} />
      <MyTripsPanel numberOfUpcomingTrips={0} />
    </Container>
  );
});
