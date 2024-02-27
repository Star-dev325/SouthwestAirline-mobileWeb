// @flow
import React from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import Currency from 'src/shared/components/currency';
import BriefBound from 'src/shared/components/flightSummary/briefBound';
import type { EarlyBirdBoundType } from 'src/earlyBird/flow-typed/earlyBird.types';

const EarlyBirdPurchaseReviewTripDetail = (props: EarlyBirdBoundType) => {
  const { departureDate, earlyBirdBoundPrice, passengers, ...flightInfo } = props;

  return (
    <div className="early-bird-review--trip-card-detail">
      <BriefBound
        {...flightInfo}
        departureDayOfWeek={dayjs(departureDate).format('dddd')}
        departureDate={departureDate}
      />
      {_.map(passengers, (passenger, key: number) => (
        <div key={key} className="early-bird-review--trip-passenger">
          <span className="early-bird-review--trip-passenger-name">{passenger.name}</span>
          <Currency {...earlyBirdBoundPrice} className="flex3 align-right bold xlarge" />
        </div>
      ))}
    </div>
  );
};

export default EarlyBirdPurchaseReviewTripDetail;
