// @flow
import React from 'react';
import BriefBound from 'src/shared/components/flightSummary/briefBound';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';

import type { BoundSelectionDataType } from 'src/airUpgrade/flow-typed/airUpgrade.types';

type Props = {
  onChange: ({ productId: string, isSelected: boolean }) => void,
  boundData: BoundSelectionDataType
};

const AirUpgradeBound = ({
  boundData: {
    arrivalAirportCode,
    arrivalTime,
    boundType,
    canUpgrade,
    departureAirportCode,
    departureDate,
    departureDayOfWeek,
    departureTime,
    isNextDayArrival,
    isOvernight,
    productId,
    upgradeMessageBody,
    upgradeMessageHeader
  },
  onChange
}: Props) => {
  const _handleCheckboxChange = (isSelected) => {
    onChange({ isSelected, productId });
  };

  const _renderUpgradeOption = () => (
    <div className="air-upgrade-bound--select">
      <FormCheckboxField name={productId} onChange={_handleCheckboxChange} clickableChildren>
        <div className="air-upgrade-bound--select-message-header">{upgradeMessageHeader}</div>
        {upgradeMessageBody && <div className="air-upgrade-bound--select-message-body">{upgradeMessageBody}</div>}
      </FormCheckboxField>
    </div>
  );

  const _renderNonUpgradeOption = () => <div className="air-upgrade-bound--no-upgrade-msg">{upgradeMessageHeader}</div>;

  return (
    <div className="air-upgrade-bound">
      <div className="air-upgrade-bound--type">{boundType}</div>
      <BriefBound
        arrivalAirportCode={arrivalAirportCode}
        arrivalTime={arrivalTime}
        departureAirportCode={departureAirportCode}
        departureDate={departureDate}
        departureDayOfWeek={departureDayOfWeek}
        departureTime={departureTime}
        isNextDayArrival={isNextDayArrival}
        isOvernight={isOvernight}
      />
      {canUpgrade ? _renderUpgradeOption() : _renderNonUpgradeOption()}
    </div>
  );
};

export default AirUpgradeBound;
