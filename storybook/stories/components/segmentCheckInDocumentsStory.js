import { storiesOf } from '@storybook/react';
import React from 'react';
import SegmentCheckInDocuments from 'src/checkIn/components/segmentCheckInDocuments';

const passengers = [
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
    isInfant: true,
    mobileBoardingPassEligible: false,
    mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE'
  }
];

storiesOf('components/segmentCheckInDocuments', module).add('default', () => {
  return <SegmentCheckInDocuments passengers={passengers} onViewBoardingPassButtonClickCb={() => null} />;
});
