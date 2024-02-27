// @flow
import React from 'react';
import cx from 'classnames';
import { retrieveHourAndMinutesIgnoreTimezone } from 'src/shared/helpers/dateHelper';

import type { Node } from 'react';

type Props = {
  timeString: string,
  children?: Node,
  className?: string
};

const FlightTime = (props: Props) => {
  const formattedTime = retrieveHourAndMinutesIgnoreTimezone(props.timeString);

  return (
    <div className={cx(props.className, 'flight-time')}>
      <div className="flight-time--time">
        <span>{formattedTime.time}</span>
        <span className="time-period">{formattedTime.period}</span>
      </div>
      {props.children}
    </div>
  );
};

export default FlightTime;
