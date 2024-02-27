import { storiesOf } from '@storybook/react';
import React from 'react';
import TripBriefInfo from 'src/shared/components/tripBriefInfo';

const reservation = JSON.parse(
  '{"recordLocator":"DNMFLN","passengerType":"ADULT","passengers":[{"secureFlightName":{"firstName":"Jim","lastName":"Halpert","middleName":"","suffix":null},"birthDate":"1978-10-01","gender":"M","accountNumber":"","redressNumber":"","knownTravelerId":""}]}'
);

const defaultProps = {
  date: 'Mar 23',
  cityName: 'Dallas',
  reservationGroups: [reservation]
};

storiesOf('components/tripBriefInfo', module).add('default', () => {
  return <TripBriefInfo {...defaultProps} />;
});
