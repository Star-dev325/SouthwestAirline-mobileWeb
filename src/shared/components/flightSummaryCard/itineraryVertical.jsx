import cx from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import FlightTimeAndStatus from 'src/flightStatus/components/flightTimeAndStatus';
import AirportInfo from 'src/shared/components/airportInfo';
import Stop from 'src/shared/components/flightSummaryCard/stop';
import Icon from 'src/shared/components/icon';
import LabelContainer from 'src/shared/components/labelContainer';
import Panel from 'src/shared/components/panel';
import StopDetailsText from 'src/shared/components/stopDetailsText';
import FlightStatusIconPosition from 'src/shared/constants/flightStatusIconPosition';

const { UNDER } = FlightStatusIconPosition;

export default class ItineraryVertical extends React.Component {
  static propTypes = {
    boundDetail: PropTypes.shape({
      actualArrivalTime: PropTypes.string,
      actualDepartureTime: PropTypes.string,
      arrivalAirport: PropTypes.shape({
        name: PropTypes.string,
        state: PropTypes.string,
        code: PropTypes.string,
        country: PropTypes.string
      }),
      arrivalStatus: PropTypes.string,
      arrivalStatusType: PropTypes.string,
      arrivalTime: PropTypes.string,
      boundType: PropTypes.oneOf(['DEPARTING', 'RETURNING']).isRequired,
      departureAirport: PropTypes.shape({
        name: PropTypes.string,
        state: PropTypes.string,
        code: PropTypes.string,
        country: PropTypes.string
      }),
      departureDate: PropTypes.string,
      departureStatus: PropTypes.string,
      departureStatusType: PropTypes.string,
      departureTime: PropTypes.string,
      flights: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.string,
          wifiOnBoard: PropTypes.bool
        })
      ),
      isNextDayArrival: PropTypes.bool,
      stops: PropTypes.array,
      travelTime: PropTypes.string
    }).isRequired
  };

  state = {
    expanded: false
  };

  _handleSelect = (event) => {
    event.preventDefault();
    this.setState({ expanded: true });
  };

  _stopsHasPlaneChange = (stops) =>
    _.reduce(stops, (stopsHasPlaneChange, stop) => stopsHasPlaneChange || !!stop.changePlanes, false);

  _renderHeader = (stops) => {
    const firstConnection = stops && _.find(stops, { changePlanes: true });
    const hasOvernight = stops?.find((stop) => stop.isOvernight);

    return (
      <div className="itinerary-vertical--row">
        <div
          className={cx('itinerary-vertical--col itinerary-vertical--col-icon', {
            'itinerary-vertical--col-icon-none': !stops.length
          })}
        >
          <span className="stop-circle">&nbsp;</span>
        </div>
        <div className="itinerary-vertical--col itinerary-vertical--col-line">&nbsp;</div>
        <div className="itinerary-vertical--col itinerary-vertical--col-info">
          <StopDetailsText
            flightData={{
              connectionAirportCode: _.get(firstConnection, 'airport.code', null),
              isOvernight: !!hasOvernight,
              numberOfStops: stops.length || 0
            }}
            withIcon={stops && this._stopsHasPlaneChange(stops)}
            displayAsTwoLine
          />
        </div>
      </div>
    );
  };

  _renderStops = (stops) =>
    _.map(stops, (stop, index) => {
      const nextStop = stops[index + 1];
      const isNextStopFlightTimeGroupEmpty = nextStop && !nextStop.changePlanes;

      return (
        <Stop
          isNextStopFlightTimeGroupEmpty={isNextStopFlightTimeGroupEmpty}
          key={index}
          stop={stop}
          stopNumber={index + 1}
          stopsTotalNumber={stops.length}
        />
      );
    });

  render() {
    const {
      boundDetail: {
        actualArrivalTime,
        actualDepartureTime,
        arrivalAirport,
        arrivalStatus,
        arrivalStatusType,
        arrivalTime,
        boundType,
        departureAirport,
        departureStatus,
        departureStatusType,
        departureTime,
        isNextDayArrival,
        stops
      }
    } = this.props;
    const isReturn = boundType === 'RETURNING';

    return (
      <div className={cx('itinerary-vertical', { 'itinerary-vertical--return': isReturn })}>
        <div className="itinerary-vertical--row">
          <div className="svg-wrapper itinerary-vertical--col itinerary-vertical--col-icon">
            <Icon className="full-width-svg" type={isReturn ? 'airplane-return' : 'airplane-depart'} />
          </div>
          <div className="itinerary-vertical--col itinerary-vertical--col-line">&nbsp;</div>
          <div className="itinerary-vertical--col itinerary-vertical--col-time">
            <LabelContainer labelText="DEPARTS">
              <FlightTimeAndStatus
                flightStatus={departureStatus}
                timeString={actualDepartureTime ? actualDepartureTime : departureTime}
                statusType={departureStatusType}
                statusIconPosition={UNDER}
                originalTime={departureStatus === 'DELAYED' ? departureTime : null}
              />
            </LabelContainer>
          </div>
          <div className="itinerary-vertical--col itinerary-vertical--col-info">
            {departureAirport && (
              <AirportInfo
                showDetail
                airportInfo={{
                  airportCode: departureAirport.code,
                  airportName: departureAirport.name,
                  cityState: departureAirport.state,
                  country: departureAirport.country
                }}
              />
            )}
          </div>
        </div>
        {stops.length ? (
          <Panel onSelect={this._handleSelect} header={!this.state.expanded && this._renderHeader(stops)} collapsible>
            {this._renderStops(stops)}
          </Panel>
        ) : (
          this._renderHeader(stops)
        )}
        <div className="itinerary-vertical--row itinerary-vertical--arrival">
          <div className="svg-wrapper itinerary-vertical--col itinerary-vertical--col-icon itinerary-vertical--col-icon-none-line">
            <Icon className="full-width-svg" type={isReturn ? 'airplane-return' : 'airplane-depart'} />
          </div>
          <div className="itinerary-vertical--col itinerary-vertical--col-line">&nbsp;</div>
          <div className="itinerary-vertical--col itinerary-vertical--col-time">
            <LabelContainer labelText="ARRIVES">
              <FlightTimeAndStatus
                flightStatus={arrivalStatus}
                isNextDay={isNextDayArrival}
                originalTime={arrivalStatus === 'DELAYED' ? arrivalTime : null}
                statusIconPosition={UNDER}
                statusType={arrivalStatusType}
                timeString={actualArrivalTime ? actualArrivalTime : arrivalTime}
              />
            </LabelContainer>
          </div>
          <div className="itinerary-vertical--col itinerary-vertical--col-info">
            {arrivalAirport && (
              <AirportInfo
                showDetail
                airportInfo={{
                  airportCode: arrivalAirport.code,
                  airportName: arrivalAirport.name,
                  cityState: arrivalAirport.state,
                  country: arrivalAirport.country
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
