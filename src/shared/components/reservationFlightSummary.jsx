// @flow

import _ from 'lodash';
import FlightSummaryCard from 'src/shared/components/flightSummaryCard/flightSummaryCard';
import PassengerPrice from 'src/shared/components/flightSummary/passengerPrice';
import React from 'react';
import type { FlightPricingBound } from 'src/shared/flow-typed/shared.types';

export type Props = {
  bounds: Array<FlightPricingBound>,
  isStandBy?: ?boolean
};

const ReservationFlightSummary = (props: Props) => {
  const { bounds } = props;

  return (
    <div className="reservation-flight-summary">
      {bounds &&
        _.map(bounds, (bound, index: number) => {
          const { fareProductDetails } = bound;
          const { fareRulesUrl, label: fareLabel } = fareProductDetails || {};

          return (
            <FlightSummaryCard key={index} boundDetail={_.omit(bound, 'passengers')}>
              {bound.passengers &&
                _.map(bound.passengers, (passenger, passengerIndex: number) => (
                  <PassengerPrice
                    key={passengerIndex}
                    passengerType={passenger.type}
                    passengerCount={passenger.count}
                    fareLabel={fareLabel}
                    fareRulesUrl={fareRulesUrl}
                  />
                ))}
              {bound.passengerCount && <PassengerPrice passengerCountFullString={bound.passengerCount} />}
            </FlightSummaryCard>
          );
        })}
    </div>
  );
};

export default ReservationFlightSummary;
