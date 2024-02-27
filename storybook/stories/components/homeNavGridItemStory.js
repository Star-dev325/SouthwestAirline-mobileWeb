import React from 'react';
import { storiesOf } from '@storybook/react';
import HomeNavGridItem from 'src/homeAndNav/components/homeNavGridItem';

storiesOf('components/homeNavGridItem', module).add('default', () => {
  return (
    <div>
      <HomeNavGridItem iconType="airplane-depart" label="BOOK A FLIGHT" />
      <HomeNavGridItem iconType="home-checkin" label="CHECK IN" secondary />
      <HomeNavGridItem iconType="home-special-offers-tag" label="SPECIAL OFFERS" />
      <HomeNavGridItem iconType="home-flight-status" label="FLIGHT STATUS" secondary />
      <HomeNavGridItem iconType="home-rapid-rewards" label="RAPID REWARDS" />
      <HomeNavGridItem iconType="home-manage" label="MANAGE TRIPS" secondary />
    </div>
  );
});
