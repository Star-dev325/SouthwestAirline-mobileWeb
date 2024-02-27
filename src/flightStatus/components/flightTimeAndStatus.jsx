// @flow
import cx from 'classnames';
import React from 'react';
import type { Node } from 'react';
import FlightStatusIcon from 'src/flightStatus/components/flightStatusIcon';
import { flightStatusCssClassMapping } from 'src/flightStatus/constants/flightStatusCssClassMapping';
import FlightTime from 'src/shared/components/flightTime';
import MultiDayIndicator from 'src/shared/components/multiDayIndicator';
import FlightStatusIconPosition from 'src/shared/constants/flightStatusIconPosition';

const { UNDER, UPPER } = FlightStatusIconPosition;

type Props = {
  children?: Node,
  flightStatus?: string,
  isNextDay?: boolean,
  isOvernight?: boolean,
  originalTime?: string,
  statusIconPosition: string,
  statusType?: string,
  timeString: string,
};

class FlightTimeAndStatus extends React.Component<Props> {
  _renderFlightStatusIcon(flightStatus?: string, statusType?: string, originalTime?: string) {
    return (
      flightStatus &&
      statusType && (
        <div>
          <FlightStatusIcon status={flightStatus} statusType={statusType} originalTime={originalTime} />
        </div>
      )
    );
  }

  render() {
    const { flightStatus, statusType, statusIconPosition, isNextDay, isOvernight, originalTime, ...others } =
      this.props;

    return (
      <div className={cx('flight-time-status', `flight-time-status--${flightStatusCssClassMapping[flightStatus]}`)}>
        {statusIconPosition === UPPER && flightStatus && this._renderFlightStatusIcon(flightStatus, statusType)}
        <FlightTime {...others}>
          <MultiDayIndicator isNextDay={isNextDay} isOvernight={isOvernight} />
        </FlightTime>
        {statusIconPosition === UNDER &&
          flightStatus &&
          this._renderFlightStatusIcon(flightStatus, statusType, originalTime)}
      </div>
    );
  }
}

export default FlightTimeAndStatus;
