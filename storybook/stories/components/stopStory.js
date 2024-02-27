import React from 'react';
import { storiesOf } from '@storybook/react';
import Stop from 'src/shared/components/flightSummaryCard/stop';

const noPlaneChange = {
  departureStatus: null,
  departureStatusType: null,
  arrivalStatus: null,
  arrivalStatusType: null,
  airport: {
    name: 'Baltimore/Washington',
    state: 'MD',
    code: 'BWI',
    country: null
  },
  arrivalTime: '11:05',
  departureTime: '11:55',
  changePlanes: false
};

const hasPlaneChange = {
  departureStatus: 'ON TIME',
  departureStatusType: 'POSITIVE',
  arrivalStatus: 'ON TIME',
  arrivalStatusType: 'POSITIVE',
  airport: {
    name: 'Houston (Hobby)',
    state: 'TX',
    code: 'HOU',
    country: null
  },
  arrivalTime: '07:35',
  departureTime: '09:00',
  changePlanes: true
};

storiesOf('components/stop', module).add('default', () => {
  return (
    <div className="itinerary-vertical" style={{ margin: '40px 0' }}>
      <Stop stopsTotalNumber={2} stopNumber={1} stop={noPlaneChange} />
      <Stop stopsTotalNumber={2} stopNumber={2} stop={hasPlaneChange} />
    </div>
  );
});
