// @flow
import cx from 'classnames';
import React from 'react';
import FlightTime from 'src/shared/components/flightTime';
import Icon from 'src/shared/components/icon';
import LabelContainer from 'src/shared/components/labelContainer';
import MultiDayIndicator from 'src/shared/components/multiDayIndicator';

type Props = {
  arrivalTime: string,
  departureTime: string,
  hideIsNextDay?: boolean,
  isNextDay?: boolean,
  isOvernight?: boolean,
  isStretched?: boolean
};

const FlightTimes = (props: Props) => {
  const { arrivalTime, departureTime, hideIsNextDay, isNextDay, isOvernight, isStretched = false } = props;
  const classNames = cx({
    'flight-times': true,
    'flight-times_stretched': isStretched
  });

  return (
    <div className={classNames}>
      <div className="flight-times--col flight-times--col-label">
        <LabelContainer labelText="Departs">
          <FlightTime timeString={departureTime} />
        </LabelContainer>
      </div>
      <div className="flight-times--col flight-times-icon">
        <Icon type="airplane" />
      </div>
      <div className="flight-times--col flight-times--col-label">
        <LabelContainer labelText="Arrives">
          <FlightTime timeString={arrivalTime}>
            {((!hideIsNextDay && isNextDay) || isOvernight) && (
              <div className="pt1">
                <MultiDayIndicator
                  hideIsNextDay={hideIsNextDay}
                  isNextDay={isNextDay}
                  isOvernight={isOvernight}
                  shouldDisplaySmallerSize
                />
              </div>
            )}
          </FlightTime>
        </LabelContainer>
      </div>
    </div>
  );
};

export default FlightTimes;
