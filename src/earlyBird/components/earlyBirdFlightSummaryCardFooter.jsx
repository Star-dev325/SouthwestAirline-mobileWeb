// @flow
import _ from 'lodash';
import React from 'react';
import Currency from 'src/shared/components/currency';

import i18n from '@swa-ui/locale';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  passengers: Array<{ name: string }>,
  earlyBirdBoundPrice: CurrencyType,
  earlyBirdSubTotalPrice: CurrencyType
};

const EarlyBirdFlightSummaryCardFooter = (props: Props) => {
  const { passengers, earlyBirdBoundPrice, earlyBirdSubTotalPrice } = props;

  return (
    <div className="early-bird-flight-summary-footer">
      {_.map(passengers, (passenger, index: number) => (
        <div className="early-bird-flight-summary-footer--passenger-info" key={index}>
          <span className="early-bird-flight-summary-footer--passenger-name">{passenger.name}</span>
          <Currency className="early-bird-flight-summary-footer--passenger-currency" {...earlyBirdBoundPrice} />
        </div>
      ))}
      <div className="early-bird-flight-summary-footer--subtotal">
        <span className="early-bird-flight-summary-footer--subtotal-title">{i18n('EARLY_BIRD_SUBTOTAL')}</span>
        <Currency className="early-bird-flight-summary-footer--subtotal-currency" {...earlyBirdSubTotalPrice} />
      </div>
    </div>
  );
};

export default EarlyBirdFlightSummaryCardFooter;
