// @flow
import React from 'react';
import _ from 'lodash';
import PassengerCard from 'src/checkIn/components/passengerCard';

import type { ViewBoardingPass } from 'src/shared/flow-typed/shared.types';
import type { CheckinPassengerType } from 'src/checkIn/flow-typed/checkIn.types';

type Props = {
  passengers: Array<CheckinPassengerType>,
  onViewBoardingPassButtonClickCb: (passengerIds: ?ViewBoardingPass) => void,
  UPGRADED_BOARDING: boolean,
  onUpgradedBoardingButtonClick?: (link: Link) => void
};

const SegmentCheckInDocuments = (props: Props) => {
  const { passengers, onViewBoardingPassButtonClickCb, UPGRADED_BOARDING, onUpgradedBoardingButtonClick } = props;

  return (
    <div className="segment-checkin-documents">
      {_.map(passengers, (passenger: CheckinPassengerType, index: number) => (
        <PassengerCard
          key={index}
          passenger={passenger}
          onViewBoardingPassButtonClickCb={onViewBoardingPassButtonClickCb}
          onUpgradedBoardingButtonClick={onUpgradedBoardingButtonClick}
          UPGRADED_BOARDING={UPGRADED_BOARDING}
        />
      ))}
    </div>
  );
};

export default SegmentCheckInDocuments;
