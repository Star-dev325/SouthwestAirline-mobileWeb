// @flow
import React from 'react';
import _ from 'lodash';
import BoundCheckInCard from 'src/checkIn/components/boundCheckInCard';

import type { CheckinFlightType } from 'src/checkIn/flow-typed/checkIn.types';
import type { PassengerNameRecord, ViewBoardingPass } from 'src/shared/flow-typed/shared.types';
import type { UpgradedBoardingRecordsType } from 'src/upgradedBoarding/flow-typed/upgradedBoarding.types';

type Props = {
  flights: Array<CheckinFlightType> | Array<UpgradedBoardingRecordsType>,
  onViewBoardingPassButtonClickCb: (pnr: PassengerNameRecord, passengerIds: ?ViewBoardingPass) => void,
  UPGRADED_BOARDING: boolean,
  onUpgradedBoardingButtonClick?: (link: Link) => void
};

const ConfirmationDetails = (props: Props) => {
  const { flights, onViewBoardingPassButtonClickCb, UPGRADED_BOARDING, onUpgradedBoardingButtonClick } = props;

  const _onViewBoardingPassButtonClickCb = (passengerIds: ?ViewBoardingPass) => {
    const passenger = _.get(flights, '[0].passengers.[0]');
    const pnr = {
      recordLocator: passenger.confirmationNumber,
      firstName: _.head(passenger.name.split(' ')),
      lastName: _.last(passenger.name.split(' '))
    };

    onViewBoardingPassButtonClickCb(pnr, passengerIds);
  };

  return (
    <div>
      {_.chain(flights)
        .groupBy('boundIndex')
        .reduce((boundCheckInInfos, value, key) => {
          boundCheckInInfos[key] = value;

          return boundCheckInInfos;
        }, [])
        .map((boundCheckInInfo, index) => (
          <BoundCheckInCard
            key={index}
            boundCheckInInfo={boundCheckInInfo}
            isReturning={index > 0}
            onViewBoardingPassButtonClickCb={_onViewBoardingPassButtonClickCb}
            onUpgradedBoardingButtonClick={onUpgradedBoardingButtonClick}
            UPGRADED_BOARDING={UPGRADED_BOARDING}
          />
        ))
        .value()}
    </div>
  );
};

export default ConfirmationDetails;
