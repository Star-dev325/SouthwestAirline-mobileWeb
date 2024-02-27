// @flow

import React from 'react';
import Icon from 'src/shared/components/icon';
import cx from 'classnames';
import dayjs from 'dayjs';
import LabelContainer from 'src/shared/components/labelContainer';

type LowFareDateProps = {
  flightDate: ?string,
  isInbound?: boolean,
  onClickCalendarIconFn: () => void
};
const LowFareDate = ({ flightDate, isInbound, onClickCalendarIconFn }: LowFareDateProps) => {
  const iconClass = cx({
    'low-fare--col-icon': !isInbound,
    'low-fare--col-icon-return': isInbound
  });

  return (
    <div className="low-fare-date">
      <div className="selected-date">
        <div className={`flight-logo-wrapper svg-wrapper ${iconClass}`}>
          <Icon className="full-width-svg" type={isInbound ? 'airplane-return' : 'airplane-depart'} />
        </div>
        <div className="flight-label-wrapper">
          <LabelContainer labelText={isInbound ? 'Return ' : 'Depart '}>
            {dayjs(flightDate).format('ddd, ll')}
          </LabelContainer>
        </div>
      </div>
      <div className="calendar-select">
        <Icon className="full-width-svg" type="calender" onClick={() => onClickCalendarIconFn()} />
      </div>
    </div>
  );
};

export default LowFareDate;
