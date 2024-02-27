// @flow
import React from 'react';
import _ from 'lodash';
import SegmentCheckInDocuments from 'src/checkIn/components/segmentCheckInDocuments';
import FlightInfoBar from 'src/shared/components/flightInfoBar';
import FlightInfo from 'src/shared/constants/flightInfo';

import type { ViewBoardingPass } from 'src/shared/flow-typed/shared.types';
import type { CheckinFlightType } from 'src/checkIn/flow-typed/checkIn.types';

const { RETURNING, DEPARTING, CHANGE_PLANES } = FlightInfo;

type Props = {
  boundCheckInInfo: Array<CheckinFlightType>,
  onViewBoardingPassButtonClickCb: (passengerIds: ?ViewBoardingPass) => void,
  isReturning: boolean,
  UPGRADED_BOARDING: boolean,
  onUpgradedBoardingButtonClick?: (link: Link) => void
};

const BoundCheckInCard = (props: Props) => {
  const {
    boundCheckInInfo,
    isReturning,
    onViewBoardingPassButtonClickCb,
    UPGRADED_BOARDING,
    onUpgradedBoardingButtonClick
  } = props;
  const flightInfoTitle = isReturning ? RETURNING : DEPARTING;

  return (
    <div className="bound-check-in-card">
      {_.map(boundCheckInInfo, (flightInfo, index: number) => {
        const { passengers } = flightInfo;
        const title = _.isEqual(index, 0) ? flightInfoTitle : CHANGE_PLANES;

        return (
          <div key={index}>
            <FlightInfoBar flightInfo={flightInfo} title={title} />
            <SegmentCheckInDocuments
              passengers={passengers}
              onViewBoardingPassButtonClickCb={onViewBoardingPassButtonClickCb}
              onUpgradedBoardingButtonClick={onUpgradedBoardingButtonClick}
              UPGRADED_BOARDING={UPGRADED_BOARDING}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BoundCheckInCard;
