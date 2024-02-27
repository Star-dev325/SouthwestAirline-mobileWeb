// @flow
import React from 'react';
import BoundPrice from 'src/shared/components/boundPrice';

import type { UpgradedBoardingSegment } from 'src/upgradedBoarding/flow-typed/upgradedBoarding.types';

type Props = {
  bound: UpgradedBoardingSegment,
  paxCount: number
};

const UpgradedBoardingBound = (props: Props) => {
  const {
    bound: { flight, departureAirportCode, arrivalAirportCode, upgradedBoardingPrice },
    paxCount
  } = props;
  const { currencySymbol, amount } = upgradedBoardingPrice || {};
  const formattedAmountTotal = (parseFloat(amount) * paxCount).toFixed(2);
  const priceString = currencySymbol ? `${currencySymbol}${amount}` : amount;

  return (
    <BoundPrice
      price={upgradedBoardingPrice}
      priceString={priceString}
      flight={flight}
      departureAirportCode={departureAirportCode}
      arrivalAirportCode={arrivalAirportCode}
      totalPrice={{
        ...upgradedBoardingPrice,
        amount: formattedAmountTotal
      }}
      paxCount={paxCount}
    />
  );
};

export default UpgradedBoardingBound;
