// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';
import FlightTimeAndStatus from 'src/flightStatus/components/flightTimeAndStatus';
import FlightStatusIconPosition from 'src/shared/constants/flightStatusIconPosition';

import type { Leg } from 'src/flightStatus/flow-typed/flightStatus.types';

const { UPPER } = FlightStatusIconPosition;

type Props = {
  leg: Leg
};

class LegStatus extends React.Component<Props> {
  operationalStatus = () => {
    const {
      leg: { departure, arrival }
    } = this.props;

    return (
      <div ref="operationalStatus" className="segment-status">
        <div className="segment-status-col departure-status">
          <FlightTimeAndStatus
            flightStatus={departure.status}
            isOvernight={departure.isOvernight}
            statusIconPosition={UPPER}
            statusType={departure.statusType}
            timeString={departure.actualTime}
          />
        </div>
        <div className="segment-status-col airplane-wrapper">
          <Icon type="airplane" />
        </div>
        <div className="segment-status-col">
          <FlightTimeAndStatus
            flightStatus={arrival.status}
            isNextDay={arrival.isNextDay && !departure.isOvernight}
            statusIconPosition={UPPER}
            statusType={arrival.statusType}
            timeString={arrival.actualTime}
          />
        </div>
      </div>
    );
  };

  cancelledStatus = () => (
    <div ref="cancelledStatus">
      <div className="cancel-row">
        <div className="cancel cancel-col">
          <Icon type="remove" />
          <span className="cancel-text">CANCELLED</span>
        </div>

        <div className="cancel-col dash" />
      </div>
    </div>
  );

  render() {
    const { leg: { departure: { status } } = {} } = this.props;

    if (status === 'CANCELLED') {
      return this.cancelledStatus();
    } else {
      return this.operationalStatus();
    }
  }
}

export default LegStatus;
