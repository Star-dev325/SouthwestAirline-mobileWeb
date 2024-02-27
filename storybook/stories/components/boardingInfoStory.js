import React from 'react';

import { storiesOf } from '@storybook/react';
import _ from 'lodash';

import BoardingInfo from 'src/viewReservation/components/boardingInfo';

const boardingInfoProps = {
  date: 'Feb 14',
  destinationDescription: 'Mexico City',
  originAirport: 'Houston (Hobby), TX',
  destinationAirport: 'Mexico City, MEX',
  passengers: [
    {
      name: 'Test Jablonski',
      accountNumber: '601422393',
      passengerReference: '2',
      hasAnyEarlyBird: false,
      hasCompletePassportInfo: false,
      checkInIneligibilityReason: null,
      isCheckedIn: false,
      isCheckInEligible: true,
      isUnaccompaniedMinor: false
    },
    {
      name: 'Pest Tester',
      accountNumber: null,
      passengerReference: '4',
      hasAnyEarlyBird: false,
      hasCompletePassportInfo: true,
      checkInIneligibilityReason: 'MBP_UNAVAILABLE_INTL',
      isCheckedIn: true,
      isCheckInEligible: true,
      isUnaccompaniedMinor: false
    },
    {
      name: 'Vest Tester',
      accountNumber: null,
      passengerReference: '3',
      hasAnyEarlyBird: false,
      hasCompletePassportInfo: false,
      checkInIneligibilityReason: null,
      isCheckedIn: false,
      isCheckInEligible: true,
      isUnaccompaniedMinor: false
    }
  ],
  confirmationNumber: 'VVORRE',
  isInternational: true,
  companion: null,
  checkInIneligibilityReason: 'MBP_UNAVAILABLE_INTL',
  viewBoardingPass: _.noop,
  viewBoardingPositions: {
    href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
    method: 'POST',
    body: { firstName: 'TEST', lastName: 'JABLONSKI', recordLocator: 'VVORRE' }
  },
  checkIn: {
    href: '/v1/mobile-air-operations/page/check-in/VVORRE',
    method: 'GET',
    query: { 'first-name': 'TEST', 'last-name': 'JABLONSKI' }
  },
  shouldShowAddEarlyBirdButton: false,
  shouldShowAddCompanionButton: false,
  isUserLoggedIn: true,
  onPassengerNameClick: _.noop,
  onViewBoardingPositionsButtonClick: _.noop,
  onViewBoardingPassButtonClickCb: _.noop,
  onEarlyBirdButtonClick: _.noop,
  onCancelFlightClick: _.noop,
  onChangeFlightClick: _.noop,
  onAddCompanionButtonClick: _.noop,
  isNonRevPnr: false,
  onCheckInButtonClick: _.noop
};

storiesOf('components/boardingInfo', module).add('default', () => {
  return <BoardingInfo {...boardingInfoProps} />;
});
