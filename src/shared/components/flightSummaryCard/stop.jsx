import i18n from '@swa-ui/locale';
import cx from 'classnames';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import FlightTimeAndStatus from 'src/flightStatus/components/flightTimeAndStatus';
import AirportInfo from 'src/shared/components/airportInfo';
import Icon from 'src/shared/components/icon';
import LabelContainer from 'src/shared/components/labelContainer';
import FlightStatusIconPosition from 'src/shared/constants/flightStatusIconPosition';

const { UNDER } = FlightStatusIconPosition;

class Stop extends React.Component {
  static propTypes = {
    isNextStopFlightTimeGroupEmpty: PropTypes.bool,
    stop: PropTypes.shape({
      actualArrivalTime: PropTypes.string,
      actualDepartureTime: PropTypes.string,
      airport: PropTypes.object,
      arrivalStatus: PropTypes.string,
      arrivalStatusType: PropTypes.string,
      arrivalTime: PropTypes.string,
      changePlanes: PropTypes.bool,
      departureStatus: PropTypes.string,
      departureStatusType: PropTypes.string,
      departureTime: PropTypes.string
    }),
    stopNumber: PropTypes.number.isRequired,
    stopsTotalNumber: PropTypes.number.isRequired
  };

  _getStopDetailInfoPrefix = (stopsTotalNumber, stopNumber) => {
    if (stopsTotalNumber < 1) {
      return;
    }

    return stopsTotalNumber > 1 ? <span>{`${numeral(stopNumber).format('0o')} stop:`}</span> : 'Stop: ';
  };

  _renderDetails = (stopsTotalNumber, stopNumber, airport, changePlanes, isOvernight) => (
    <div
      className={cx('stop-detail', {
        'stop-detail--has-change': changePlanes
      })}
    >
      {changePlanes && <AirportInfo airportInfo={{ airportCode: airport.code }} />}
      <div className="stop-detail__info italic">
        {this._getStopDetailInfoPrefix(stopsTotalNumber, stopNumber)}
        <span>{`${airport.name}, ${airport.state || airport.country}`}</span>
      </div>
      <div className="stop-detail__status italic">
        {changePlanes ? (
          <span>
            {i18n('SHARED__LABEL_STRING__FLIGHT_STOP_DETAIL_CHANGE_PLANES')} &nbsp;
            <Icon className="stop-detail--airplane-return" type="airplane-return" />
            <Icon className="stop-detail--airplane-return highlight" type="airplane-return" />
            {isOvernight && (
              <div className="stop-detail--overnight-indicator" data-qa="stop-detail--overnight-indicator">
                <Icon className="stop-detail--overnight-indicator-icon" type="next-day-indicator" />
                <p className="pl1">{i18n('SHARED__LABEL_STRING__FLIGHT_STOP_DETAIL_OVERNIGHT')}</p>
              </div>
            )}
          </span>
        ) : (
          i18n('SHARED__LABEL_STRING__FLIGHT_STOP_DETAIL_NO_PLANE_CHANGE')
        )}
      </div>
    </div>
  );

  render() {
    const {
      isNextStopFlightTimeGroupEmpty,
      stop: {
        actualArrivalTime,
        actualDepartureTime,
        airport,
        arrivalStatus,
        arrivalStatusType,
        arrivalTime,
        changePlanes,
        departureStatus,
        departureStatusType,
        departureTime,
        isOvernight
      },
      stopNumber,
      stopsTotalNumber
    } = this.props;

    return (
      <div className="itinerary-vertical--row itinerary-vertical--row--stop">
        <div className="itinerary-vertical--col itinerary-vertical--col-icon">
          <span className="stop-circle"> &nbsp; </span>
        </div>
        <div className="itinerary-vertical--col itinerary-vertical--col-line">&nbsp;</div>
        {changePlanes && (
          <div
            className={cx('itinerary-vertical--col itinerary-vertical--col-time', {
              'itinerary-vertical--col-time_less-space': isNextStopFlightTimeGroupEmpty
            })}
          >
            <div className="flight-time-group">
              <LabelContainer labelText="ARRIVES">
                <FlightTimeAndStatus
                  flightStatus={arrivalStatus}
                  originalTime={arrivalTime}
                  statusIconPosition={UNDER}
                  statusType={arrivalStatusType}
                  timeString={actualArrivalTime ? actualArrivalTime : arrivalTime}
                />
              </LabelContainer>
              <LabelContainer labelText="DEPARTS">
                <FlightTimeAndStatus
                  flightStatus={departureStatus}
                  originalTime={departureTime}
                  statusIconPosition={UNDER}
                  statusType={departureStatusType}
                  timeString={actualDepartureTime ? actualDepartureTime : departureTime}
                />
              </LabelContainer>
            </div>
          </div>
        )}
        <div className="itinerary-vertical--col itinerary-vertical--col-info">
          {this._renderDetails(stopsTotalNumber, stopNumber, airport, changePlanes, isOvernight)}
        </div>
      </div>
    );
  }
}

export default Stop;
