// @flow
import React from 'react';
import _ from 'lodash';
import LabelContainer from 'src/shared/components/labelContainer';
import FlightNumberList from 'src/shared/components/flightNumberList';
import FlightInfoConstants from 'src/shared/constants/flightInfo';
import Icon from 'src/shared/components/icon';

import type { FlightInfoType } from 'src/checkIn/flow-typed/checkIn.types';

const { GATE, TOTAL_TRAVEL_TIME, TRAVEL_TIME } = FlightInfoConstants;

type Props = {
  flights: Array<FlightInfoType>,
  travelTime: string,
  isTotalTravelDuration?: boolean,
  gate?: string,
  AIRCRAFT_TYPE_VIEWRES?: boolean
};

const FlightInfo = (props: Props) => {
  const { flights, travelTime, isTotalTravelDuration, gate, AIRCRAFT_TYPE_VIEWRES } = props;

  return (
    <div>
      {AIRCRAFT_TYPE_VIEWRES && (
        <div className="flight-info-block">
          <div className="flight-info-col">
            <LabelContainer labelText="FLIGHT">
              <FlightNumberList AIRCRAFT_TYPE_VIEWRES={AIRCRAFT_TYPE_VIEWRES} flights={flights} />
            </LabelContainer>
          </div>
          <div className="flight-info-time">
            <LabelContainer labelText={isTotalTravelDuration ? TOTAL_TRAVEL_TIME : TRAVEL_TIME}>
              <div className="flight-duration">
                <Icon type="color-stopwatch" title="color-stopwatch" />
                <span data-qa="flight-duration-minutes">{travelTime}</span>
              </div>
            </LabelContainer>
          </div>
          {!_.isUndefined(gate) && (
            <div className="flight-info-col">
              <LabelContainer labelText="GATE">
                <div>{gate || GATE.DEFAULT}</div>
              </LabelContainer>
            </div>
          )}
        </div>
      )}
      {!AIRCRAFT_TYPE_VIEWRES && (
        <div className="flight-info">
          <div className="flight-info-col">
            <LabelContainer labelText="FLIGHT">
              <FlightNumberList flights={flights} />
            </LabelContainer>
          </div>
          <div className="flight-info-col">
            <LabelContainer labelText={isTotalTravelDuration ? TOTAL_TRAVEL_TIME : TRAVEL_TIME}>
              <div className="flight-duration">
                <Icon type="color-stopwatch" title="color-stopwatch" />
                <span data-qa="flight-duration-minutes">{travelTime}</span>
              </div>
            </LabelContainer>
          </div>
          {!_.isUndefined(gate) && (
            <div className="flight-info-col">
              <LabelContainer labelText="GATE">
                <div>{gate || GATE.DEFAULT}</div>
              </LabelContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightInfo;
