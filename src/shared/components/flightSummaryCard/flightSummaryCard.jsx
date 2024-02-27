// @flow
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import FlightInfo from 'src/shared/components/flightInfo';
import FlightStatusIcon from 'src/shared/components/flightStatusIcon';
import FlightSummaryCardHeader from 'src/shared/components/flightSummaryCard/flightSummaryCardHeader';
import ItineraryVertical from 'src/shared/components/flightSummaryCard/itineraryVertical';
import Icon from 'src/shared/components/icon';
import Message from 'src/shared/components/message';
import { formatDate } from 'src/shared/helpers/dateHelper';
import { convertBrandColor, convertNamedIcon, iconMap } from 'src/shared/helpers/productDefinitionsHelper';
import StandbyCard from 'src/standby/components/standbyCard';
import type { Node } from 'react';
import type { FlightBasicBound } from 'src/shared/flow-typed/shared.types';

type Props = {
  AIRCRAFT_TYPE_VIEWRES?: boolean,
  boundDetail: FlightBasicBound,
  children?: Node,
  isNonRevPnr?: boolean,
  isReaccomPnr?: boolean,
  onClickStandbyList?: ({ isNonRevPnr: boolean, link: Link }) => void,
  useEnhancedStandbyList?: boolean
};

const CANCELLED = 'Cancelled';

const FlightSummaryCard = (props: Props) => {
  const {
    AIRCRAFT_TYPE_VIEWRES,
    boundDetail,
    children,
    isNonRevPnr,
    onClickStandbyList,
    useEnhancedStandbyList
  } = props;

  const boundDetailCopy = { ...boundDetail };

  boundDetailCopy.stops = boundDetailCopy.stops?.length ? boundDetailCopy.stops : [];

  const {
    arrivalStatus,
    boundType,
    departureDate,
    departureStatus,
    disruptedBoundMessage,
    earlyBirdPurchased,
    flights,
    standbyFlight,
    travelTime
  } = boundDetailCopy;
  const formattedDepartureDate = formatDate(departureDate, 'ddd, ll');
  const isReturning = boundType === 'RETURNING';
  const isCancelled =
    CANCELLED.toUpperCase() === (arrivalStatus ?? '').toUpperCase() ||
    CANCELLED.toUpperCase() === (departureStatus ?? '').toUpperCase();
  const flightsInfo = _.map(flights, (flight) => ({
    aircraftInfo: flight?.aircraftInfo,
    flightNumber: flight.number
  }));

  const renderStandbyFlight = () =>
    !!standbyFlight &&
    onClickStandbyList && (
      <StandbyCard
        standbyFlight={standbyFlight}
        isNonRevPnr={isNonRevPnr}
        onClickStandbyList={onClickStandbyList}
        useEnhancedStandbyList={useEnhancedStandbyList}
      />
    );

  const renderDisruptedBoundMessage = () => {
    const { icon, label } = boundDetailCopy.disruptedBoundMessage;
    const disruptedBoundMessageIcon = convertNamedIcon(icon);
    const disruptedBoundMessageIconClassName =
      disruptedBoundMessageIcon === iconMap.warning
        ? 'red-circle-exclamation'
        : disruptedBoundMessageIcon === iconMap['green-circle-check']
          ? 'green-circle-check'
          : '';

    return (
      <div className="flight-summary-card--disrupted-bound-message">
        <Message className={disruptedBoundMessageIconClassName} status={disruptedBoundMessageIcon}>
          {label}
        </Message>
      </div>
    );
  };

  const renderEarlyBirdPurchased = () => {
    const { icon, iconColor, label, passengerLabel, passengersList } = earlyBirdPurchased;
    const earlyBirdIcon = convertNamedIcon(icon);
    const earlyBirdIconColor = convertBrandColor(iconColor);

    return (
      <div className={`${AIRCRAFT_TYPE_VIEWRES ? 'pb5' : ''}`}>
        <div className="flight-summary-card--early-bird-purchased">
          <Icon className={earlyBirdIconColor} type={earlyBirdIcon} />
          <p className="flight-summary-card--early-bird-purchased-label">{label}</p>
        </div>
        {passengerLabel && passengersList && (
          <div className="flight-summary-card--early-bird-purchased-passengers">
            <p className="flight-summary-card--early-bird-purchased-passenger-label">{passengerLabel}</p>
            {passengersList.map((passenger, index) => (
              <p className="flight-summary-card--early-bird-purchased-passenger-name" key={index}>
                {passenger}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cx('flight-summary-card rd3 overflow-hidden', {
        'flight-summary-card--cancelled': isCancelled
      })}
    >
      {disruptedBoundMessage && renderDisruptedBoundMessage()}
      <FlightSummaryCardHeader departureDate={formattedDepartureDate} isReturning={isReturning} />
      <div className="flight-summary-content">
        {isCancelled && (
          <div className="pricing-summary--group flight-summary-card--status">
            <FlightStatusIcon status={CANCELLED} />
          </div>
        )}
        <div className="pricing-summary--group">
          {earlyBirdPurchased && renderEarlyBirdPurchased()}
          <FlightInfo
            AIRCRAFT_TYPE_VIEWRES={AIRCRAFT_TYPE_VIEWRES}
            flights={flightsInfo}
            travelTime={travelTime}
            isTotalTravelDuration
          />
          <ItineraryVertical boundDetail={boundDetailCopy} />
          {renderStandbyFlight()}
        </div>
        {children && <div className="pricing-summary--group">{children}</div>}
      </div>
    </div>
  );
};

export default FlightSummaryCard;
