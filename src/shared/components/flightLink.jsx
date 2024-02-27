// @flow

import React from 'react';

import Icon from 'src/shared/components/icon';
import LabelContainer from 'src/shared/components/labelContainer';
import { retrieveHourAndMinutesIgnoreTimezone } from 'src/shared/helpers/dateHelper';

type FlightType = {
  arrivalAirportCode: string,
  arrivalTime: string,
  departureAirportCode: string,
  departureTime: string
};

type Props = {
  flight: FlightType
};

const FlightLink = (props: Props) => {
  const { arrivalAirportCode, arrivalTime, departureAirportCode, departureTime } = props.flight;

  const departureDate = retrieveHourAndMinutesIgnoreTimezone(departureTime);
  const arrivalDate = retrieveHourAndMinutesIgnoreTimezone(arrivalTime);

  return (
    <div className="flight-link">
      <div className="flight-link--value">
        <LabelContainer labelText="DEPARTS">
          <div className="airport-code">{departureAirportCode}</div>
          <div className="formatted-time">
            {departureDate.time}
            <span className="formatted-time--period">{departureDate.period}</span>
          </div>
        </LabelContainer>
      </div>
      <div className="flight-link--icon">
        <Icon type="airplane" />
      </div>
      <div className="flight-link--value">
        <LabelContainer labelText="ARRIVES">
          <div className="airport-code">{arrivalAirportCode}</div>
          <div className="formatted-time">
            {arrivalDate.time}
            <span className="formatted-time--period">{arrivalDate.period}</span>
          </div>
        </LabelContainer>
      </div>
    </div>
  );
};

export default FlightLink;
