import { storiesOf } from '@storybook/react';
import React from 'react';
import BoundCheckInCard from 'src/checkIn/components/boundCheckInCard';

const segmentDocuments = {
  flightNumber: '181',
  hasWifi: true,
  travelTime: '0h 55m',
  gate: '---',
  isReturning: false,
  passengers: [
    {
      name: 'Tang Zhen',
      confirmationNumber: 'T4N5GH',
      position: '19',
      boardingGroup: 'A',
      hasPrecheck: false,
      mobileBoardingPassEligible: false,
      mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE'
    },
    {
      name: 'Siyang Li',
      confirmationNumber: 'T4N5GH',
      position: '20',
      boardingGroup: 'A',
      hasPrecheck: false,
      mobileBoardingPassEligible: false,
      mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE'
    }
  ]
};

storiesOf('components/boundCheckInCard', module).add('default', () => {
  return (
    <div>
      <BoundCheckInCard boundCheckInInfo={[segmentDocuments]} />
      <BoundCheckInCard boundCheckInInfo={[segmentDocuments, segmentDocuments]} />
    </div>
  );
});
