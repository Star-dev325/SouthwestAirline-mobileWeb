// @flow
import React from 'react';
import LegDetail from 'src/flightStatus/components/legDetail';
import type { FlightCard } from 'src/flightStatus/flow-typed/flightStatus.types';

type Props = {
  AIRCRAFT_TYPE_FLIGHTSTATUS?: boolean,
  flightCard: FlightCard
};

class FlightStatusDetailCard extends React.Component<Props> {
  render() {
    const {
      AIRCRAFT_TYPE_FLIGHTSTATUS,
      flightCard: { legs }
    } = this.props;

    return (
      <div className="segment-details">
        {legs.map((leg, index: number) => (
          <LegDetail AIRCRAFT_TYPE_FLIGHTSTATUS={AIRCRAFT_TYPE_FLIGHTSTATUS} key={index} leg={leg} />
        ))}
      </div>
    );
  }
}

export default FlightStatusDetailCard;
