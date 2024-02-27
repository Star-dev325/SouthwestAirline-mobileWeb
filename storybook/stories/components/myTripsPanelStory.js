import React from 'react';
import { storiesOf } from '@storybook/react';
import MyTripsPanel from 'src/myAccount/components/myTripsPanel';

storiesOf('components/myTripsPanel', module).add('default', () => {
  return (
    <div>
      <MyTripsPanel
        numberOfUpcomingTrips={0}
        onClickUpcomingTripCount={() => {}}
        onClickNextTrip={() => {}}
        nextTrip={null}
      />

      <p />
      <div>
        <MyTripsPanel
          numberOfUpcomingTrips={13}
          onClickUpcomingTripCount={() => {}}
          onClickNextTrip={() => {}}
          nextTrip={{ date: 'Mar 22 - Apr 2', title: 'Chicago' }}
        />
      </div>
    </div>
  );
});
