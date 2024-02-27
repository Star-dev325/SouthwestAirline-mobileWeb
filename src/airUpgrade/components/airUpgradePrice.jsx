// @flow
import React from 'react';
import BoundPrice from 'src/shared/components/boundPrice';
import { getZeroValueByCurrencyCode } from 'src/shared/helpers/travelFundsHelper';

import type { PricingDataType } from 'src/airUpgrade/flow-typed/airUpgrade.types';

type Props = {
  pricingData: PricingDataType
};

const AirUpgradePrice = ({
  pricingData: {
    flight,
    upgradePrice,
    numberOfPassengers,
    departureAirportCode,
    arrivalAirportCode,
    isSelected,
    upgradeTotalPrice
  }
}: Props) => {
  const unselectedTotalPrice = {
    ...upgradeTotalPrice,
    amount: getZeroValueByCurrencyCode(upgradeTotalPrice)
  };
  const displayedTotalPrice = isSelected ? upgradeTotalPrice : unselectedTotalPrice;

  return (
    <BoundPrice
      departureAirportCode={departureAirportCode}
      arrivalAirportCode={arrivalAirportCode}
      price={upgradePrice}
      totalPrice={displayedTotalPrice}
      flight={flight}
      paxCount={numberOfPassengers}
      showPoints
    />
  );
};

export default AirUpgradePrice;
