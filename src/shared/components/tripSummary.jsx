// @flow

import React from 'react';
import _ from 'lodash';
import BriefBound from 'src/shared/components/flightSummary/briefBound';
import TitleAndPrice from 'src/shared/components/flightSummary/titleAndPrice';
import NavItemLink from 'src/shared/components/navItemLink';
import i18n from '@swa-ui/locale';
import type { TripSummaryType } from 'src/airBooking/flow-typed/airBooking.types';

type Props = TripSummaryType & {
  onTripAndPriceClick: () => void
};

const TripSummary = (props: Props) => {
  const { bounds, passengerCountDescription, lapChildCountDescription, currency, defaultLapChildCurrency, onTripAndPriceClick } = props;

  return (
    <div className="trip-summary">
      {_.map(bounds, (bound, index: number) => (
        <BriefBound key={index} {...bound} />
      ))}
      <TitleAndPrice message={passengerCountDescription} currency={currency} />
      {defaultLapChildCurrency && <TitleAndPrice message={lapChildCountDescription} currency={defaultLapChildCurrency} />}
      <NavItemLink onClick={onTripAndPriceClick} className="bgwhite">
        {i18n('SHARED__PURCHASE_SUMMARY_FORM__TRIP_AND_PRICE_DETAILS')}
      </NavItemLink>
    </div>
  );
};

export default TripSummary;
