// @flow
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import FlightNumber from 'src/shared/components/flightNumber';
import Icon from 'src/shared/components/icon';
import LabelContainer from 'src/shared/components/labelContainer';
import MultiDayIndicator from 'src/shared/components/multiDayIndicator';
import FlightInfo from 'src/shared/constants/flightInfo';
import { retrieveHourAndMinutesIgnoreTimezone } from 'src/shared/helpers/dateHelper';

import type { FlightInfoType, FlightInfoTitleType } from 'src/checkIn/flow-typed/checkIn.types';

const { GATE, DEPARTURE_TIME } = FlightInfo;

type Props = {
  flightInfo: FlightInfoType,
  title: FlightInfoTitleType
};

const FlightInfoBar = (props: Props) => {
  const { flightInfo, title } = props;
  const { departureTime, flightNumber, gate, isNextDay, isOvernight } = flightInfo;
  const formattedDepartureTime = retrieveHourAndMinutesIgnoreTimezone(departureTime);
  const isChangePlanes = _.isEqual(title, 'CHANGE PLANES');

  return (
    <div className="flight-info-bar">
      <div className="flight-info-bar--title">
        <span className={cx('flight-info-bar--title-text', { yellow: !isChangePlanes })}>{_.toUpper(title)}</span>
        {_.isEqual(title, 'CHANGE PLANES') && (
          <span className="flight-info-bar--title-icon">
            <Icon className="stop-normal" type="airplane-return" />
            <Icon className="stop-highlight" type="airplane-return" />
          </span>
        )}
      </div>
      <div className="flight-info-bar--row">
        <div className="flight-info-bar--col">
          <LabelContainer labelText="FLIGHT">
            <FlightNumber flightNumber={flightNumber} />
          </LabelContainer>
        </div>
        <div className="flight-info-bar--col">
          <LabelContainer labelText={DEPARTURE_TIME}>
            <span className="flight-info-bar--departs-time">{formattedDepartureTime.time}</span>
            <span className="flight-info-bar--departs-period">{formattedDepartureTime.period}</span>
          </LabelContainer>
          <MultiDayIndicator isNextDay={isNextDay} isOvernight={isOvernight} shouldDisplayOrangeOvernight />
        </div>
        {!_.isUndefined(gate) && (
          <div className="flight-info-bar--col">
            <LabelContainer labelText="GATE">
              <div>{gate || GATE.DEFAULT}</div>
            </LabelContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightInfoBar;
