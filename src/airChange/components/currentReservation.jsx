// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import FlightTimes from 'src/shared/components/flightTimes';
import MultiDayIndicator from 'src/shared/components/multiDayIndicator';
import { formatDate } from 'src/shared/helpers/dateHelper';
import { calculateFlightNumberFontSize } from 'src/shared/helpers/flightInfoHelper';

import type { CurrentReservationType } from 'src/airChange/flow-typed/airChange.types';

type Props = {
  currentReservation: CurrentReservationType
};

const CurrentReservation = (props: Props) => {
  const {
    currentReservation: {
      arrivesTime,
      date,
      departsTime,
      flight,
      flightTime,
      isNextDayArrival,
      isOvernight,
      shortStopDescription,
      stopCity
    }
  } = props;

  return (
    <div className="current-reservation-info">
      <div className="medium p4 pt6 white">
        <div className="bold">Current Reservation</div>
        <div>{formatDate(date, 'ddd, MMM D, YYYY', true)}</div>
      </div>
      <div className="rd2 px3 py4 bgwhite" data-qa="flightProductItem">
        <div className="flight-product--container current-reservation-component" data-qa="flightProducts">
          <div className="main-col">
            <FlightTimes arrivalTime={arrivesTime} departureTime={departsTime} hideIsNextDay isStretched />
            <div className="flight-data">
              <div className="flags">
                {shortStopDescription && (
                  <div
                    className={cx('data-object stops-flag', {
                      nonstop: shortStopDescription === i18n('SHARED__COMMON__NONSTOP')
                    })}
                  >
                    <span className="stops" data-qa="stop-description">
                      {shortStopDescription}
                    </span>
                    {!!stopCity && <span data-qa="stop-city">, {stopCity}</span>}
                  </div>
                )}
                <div className="time-info data-object" data-qa="flight-duration-minutes">
                  {flightTime}
                </div>
                <div className="time-info data-object next-day-overnight" data-qa="is-next-day-or-overnight">
                  <MultiDayIndicator isNextDay={isNextDayArrival} isOvernight={isOvernight} />
                </div>
              </div>
            </div>
          </div>
          <div className="fare-col">
            <div className="fare-container current-flight-info">
              <div className="fare-content current-flight-info">
                <div>{i18n('AIR_CHANGE__FLIGHT')}</div>
                <div className={`bold pt2 ${calculateFlightNumberFontSize(flight)}`}  data-qa="flight-info">
                  {flight}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentReservation;
