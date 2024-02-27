// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import pluralize from 'pluralize';
import React from 'react';
import Icon from 'src/shared/components/icon';

type FlightData = {
  connectionAirportCode?: string,
  isOvernight: boolean,
  numberOfStops: number | 0
};

type Props = {
  displayAsTwoLine?: boolean,
  flightData: FlightData,
  short?: boolean,
  withIcon?: boolean
};

const StopDetailsText = (props: Props) => {
  const { displayAsTwoLine, flightData, short, withIcon } = props;

  const _renderFlightWithStops = (info, stops) =>
    (displayAsTwoLine ? (
      <span>
        {info.numberOfStops} {stops}:
        <br />
        {short ? '' : i18n('SHARED__LABEL_STRING__FLIGHT_STOP_DETAIL_NO_PLANE_CHANGE')}
      </span>
    ) : (
      `${info.numberOfStops} ${stops}${
        short ? '' : `, ${i18n('SHARED__LABEL_STRING__FLIGHT_STOP_DETAIL_NO_PLANE_CHANGE')}`
      }`
    ));

  const _renderFlightWithPlaneChange = (info, stops) => (
    <span>
      {info.numberOfStops} {stops}
      {short ? (
        ','
      ) : (
        <span>
          {withIcon ? (
            <span>
              : {_changePlanesIcon()}
              <br />
            </span>
          ) : (
            ', '
          )}
          {i18n('SHARED__LABEL_STRING__FLIGHT_STOP_DETAIL_CHANGE_PLANES')}
        </span>
      )}{' '}
      {info.connectionAirportCode}
      {info.isOvernight && (
        <div className="stops-detail--overnight-indicator" data-qa="stops-detail--overnight-indicator">
          <Icon className="stops-detail--overnight-indicator-icon" type="next-day-indicator" />
          <p className="pl1">{i18n('SHARED__LABEL_STRING__FLIGHT_STOP_DETAIL_OVERNIGHT')}</p>
        </div>
      )}
    </span>
  );

  const _renderNonstopFlight = () => <span>{i18n('SHARED__LABEL_STRING__FLIGHT_STOP_DETAIL_NON_STOP')}</span>;

  const getStopDetails = () => {
    const info = flightData,
      stops = pluralize(i18n('SHARED__LABEL_STRING__FLIGHT_STOP_DETAIL_STOP'), info.numberOfStops);

    if (!info.numberOfStops) {
      return _renderNonstopFlight();
    } else if (!info.connectionAirportCode) {
      return _renderFlightWithStops(info, stops);
    } else {
      return _renderFlightWithPlaneChange(info, stops);
    }
  };

  const _changePlanesIcon = () => (
    <span className="stops-detail--icon">
      <Icon type="airplane-return" />
      <Icon className="stop-highlight" type="airplane-return" />
    </span>
  );

  const stopDetailsClasses = cx('stops-detail', {
    'stops-detail--non-stop': flightData.numberOfStops === 0,
    'stops-detail--with-icon': withIcon
  });

  return <span className={stopDetailsClasses}>{getStopDetails()}</span>;
};

export default StopDetailsText;
