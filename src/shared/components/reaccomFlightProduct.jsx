// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import FlightTimes from 'src/shared/components/flightTimes';
import MultiDayIndicator from 'src/shared/components/multiDayIndicator';
import { calculateFlightNumberFontSize } from 'src/shared/helpers/flightInfoHelper';

import type { ReaccomBoundPageCardType } from 'src/airChange/flow-typed/airChange.types';

type Props = {
  flightProductCard: ReaccomBoundPageCardType,
  onProductSelected: (ReaccomBoundPageCardType) => void
};

const ReaccomFlightProduct = (props: Props) => {
  const { flightProductCard, onProductSelected } = props;

  const {
    arrivalTime,
    departureTime,
    duration,
    flights,
    isNextDayArrival,
    isOvernight,
    shortStopDescription,
    stopCity
  } = flightProductCard;

  const flightNumbers = _.map(flights, (flight, index: number) => (index === 0 ? flight.number : `/${flight.number}`));

  return (
    <div className="flight-product-panel rd2 px3 py4 bgwhite" data-qa="flightProductItem">
      <div
        className="flight-product--container"
        data-qa="flightProducts"
        data-testid="reaccom-flight-product"
        onClick={onProductSelected.bind(this, flightProductCard)}
      >
        <div className="main-col">
          <FlightTimes arrivalTime={arrivalTime} departureTime={departureTime} hideIsNextDay isStretched />
          <div className="flight-data">
            <div className="flags">
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
              <div className="time-info data-object" data-qa="flight-duration-minutes">
                {duration}
              </div>
              <div className="time-info data-object next-day-overnight" data-qa="reaccom-is-next-day-or-overnight">
                <MultiDayIndicator isNextDay={isNextDayArrival} isOvernight={isOvernight} />
              </div>
            </div>
          </div>
        </div>
        <div className="fare-col">
          {
            <div className="fare-container">
              <div className="fare-content reaccom">
                <div className="regular">FLIGHT</div>
                <div className={`bold pt2 ${calculateFlightNumberFontSize(flightNumbers)}`} data-qa="flight-info">
                  {flightNumbers}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ReaccomFlightProduct;
