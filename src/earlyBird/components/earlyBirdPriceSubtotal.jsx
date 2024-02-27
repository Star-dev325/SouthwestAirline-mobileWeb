// @flow
import React from 'react';
import Currency from 'src/shared/components/currency';

import type { EarlyBirdPriceSubTotalType } from 'src/earlyBird/flow-typed/earlyBird.types';

type Props = {
  subtotal: EarlyBirdPriceSubTotalType
};

const EarlyBirdPriceSubtotal = (props: Props) => {
  const { subtotal } = props;
  const { departureAirportCode, arrivalAirportCode, earlyBirdBoundPrice, flight, selectedPaxCount, totalBoundPrice } =
    subtotal;

  return (
    <div className="early-bird-price-subtotal">
      <div className="early-bird-price-subtotal--flight-info">
        <div className="early-bird-price-subtotal--origin-destination">
          {`${departureAirportCode} - ${arrivalAirportCode}`}
        </div>
        <div className="early-bird-price-subtotal--price-calculator">
          {`${selectedPaxCount} x `}
          <Currency className="formatted-currency" {...earlyBirdBoundPrice} />
        </div>
        <div className="early-bird-price-subtotal--total-price">
          <Currency className="formatted-currency" {...totalBoundPrice} />
        </div>
      </div>
      <div className="early-bird-price-subtotal--flight-number">{`#${flight}`}</div>
    </div>
  );
};

export default EarlyBirdPriceSubtotal;
