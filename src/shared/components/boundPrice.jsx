// @flow
import React from 'react';

import Currency from 'src/shared/components/currency';
import i18n from '@swa-ui/locale';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  flight: string,
  departureAirportCode: string,
  arrivalAirportCode: string,
  price: CurrencyType,
  priceString?: string,
  totalPrice: CurrencyType,
  paxCount: number,
  showPoints?: boolean
};

const BoundPrice = ({
  departureAirportCode,
  arrivalAirportCode,
  price = {},
  totalPrice,
  flight,
  paxCount,
  priceString,
  showPoints
}: Props) => (
  <div className="bound-price">
    <div className="bound-price--airport-section">
      <div className="bound-price--airport-info">
        {departureAirportCode} - {arrivalAirportCode}
      </div>
      <div className="bound-price--flight-number">{flight}</div>
    </div>
    <div className="bound-price--amount-info-section">
      <div className="bound-price--amount-section">
        <div className="bound-price--amount-flex-group">
          <div className="bound-price--amount">{priceString ? priceString : <Currency {...price} />}</div>
          <div className="bound-price--pax-count">
            x{paxCount} {paxCount === 1 ? i18n('AIR_UPGRADE_SINGLE_PAX_TEXT') : i18n('AIR_UPGRADE_MULTI_PAX_TEXT')}
          </div>
        </div>
        <div className="bound-price--total-amount">
          <Currency {...totalPrice} showPts={showPoints} />
        </div>
      </div>
    </div>
  </div>
);

export default BoundPrice;
