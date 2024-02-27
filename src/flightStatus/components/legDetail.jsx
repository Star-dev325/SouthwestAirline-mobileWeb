// @flow

import React from 'react';
import LegStatus from 'src/flightStatus/components/legStatus';
import FormattedTime from 'src/shared/components/formattedTime';
import Container from 'src/shared/components/container';
import Banner from 'src/shared/components/banner';
import i18n from '@swa-ui/locale';
import type { Leg } from 'src/flightStatus/flow-typed/flightStatus.types';

type Props = {
  leg: Leg,
  AIRCRAFT_TYPE_FLIGHTSTATUS?: boolean
};

const LegDetail = (props: Props) => {
  const { leg, AIRCRAFT_TYPE_FLIGHTSTATUS } = props;

  return (
    <div className="leg-details">
      {leg.isNowBoarding && <Banner className="boarding-header" text={i18n('FLIGHT_STATUS__NOW_BOARDING')} />}
      <Container>
        <div className="aircraft-info">
          <div className="flight-info-col">
            <div className="flight-number">
              <span className="flight-number--label">Flight</span>
              <span className="flight-number--info">{leg.flightNumber}</span>
            </div>
          </div>
          {AIRCRAFT_TYPE_FLIGHTSTATUS && leg.aircraftInfo && (
            <div className="flight-info-col">
              <div className="flight-number--label" data-qa="flight-status-aircraft-type">
                {leg.aircraftInfo.aircraftType}
              </div>
              <div className="flight-number--label">(subject to change)*</div>
            </div>
          )}
        </div>
        <div className="flight-info-row flight-info">
          <div className="flight-info-col">
            <div className="flight-info--label">Departs</div>
            <div className="flight-info--flight-code">{leg.departure.airport}</div>
          </div>
          <div className="flight-info-col">
            <div className="flight-info--label">Arrives</div>
            <div className="flight-info--flight-code">{leg.arrival.airport}</div>
          </div>
        </div>
        <LegStatus leg={leg} />

        <div className="original-time-information">
          <div className="flight-info-row flight-info">
            <div className="flight-info-col">
              <div className="flight-info--label">Original</div>
              <FormattedTime time={leg.departure.originalTime} />
            </div>
            <div className="flight-info-col">
              <div className="flight-info--label">Original</div>
              <FormattedTime time={leg.arrival.originalTime} />
            </div>
          </div>
        </div>
        <div className="gate-information">
          <div className="flight-info-row flight-info">
            <div className="flight-info-col">
              <div className="flight-info--label">Gate</div>
              <div className="flight-info--gate">{leg.departure.gate}</div>
            </div>
            <div className="flight-info-col">
              <div className="flight-info--label">Gate</div>
              <div className="flight-info--gate">{leg.arrival.gate}</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LegDetail;
