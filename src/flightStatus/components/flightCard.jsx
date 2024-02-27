// @flow
import React from 'react';
import type { FlightCardType } from 'src/flightStatus/flow-typed/flightStatus.types';
import FlightTimes from 'src/shared/components/flightTimes';
import Icon from 'src/shared/components/icon';
import LabelContainer from 'src/shared/components/labelContainer';
import List from 'src/shared/components/list';
import ListItem from 'src/shared/components/listItem';
import NavItem from 'src/shared/components/navItem';
import Segment from 'src/shared/components/segment';

type Props = {
  flight: FlightCardType,
  onFlightCardClicked: (Link) => void
};

class FlightCard extends React.Component<Props> {
  _onFlightCardClicked = () => {
    const {
      flight: {
        _links: { flightStatusDetail }
      },
      onFlightCardClicked
    } = this.props;

    onFlightCardClicked(flightStatusDetail);
  };

  render() {
    const {
      flight: { arrivesNextDay, arrivesTime, departsTime, flightNumbers, isOvernight, stopDescription }
    } = this.props;

    return (
      <div className="flight-card" onClick={this._onFlightCardClicked}>
        <Segment verticalFill>
          <List divided>
            <ListItem>
              <NavItem>
                <div className="row">
                  <div className="row--col">
                    <LabelContainer labelText="Flight">
                      {flightNumbers.map((flightNumber) => (
                        <div className="flight-operating-number" key={flightNumber}>
                          {flightNumber}
                        </div>
                      ))}
                    </LabelContainer>
                  </div>
                  <div className="row--col">
                    <FlightTimes
                      arrivalTime={arrivesTime}
                      departureTime={departsTime}
                      isNextDay={arrivesNextDay}
                      isOvernight={isOvernight}
                    />
                  </div>
                </div>
              </NavItem>
            </ListItem>
            <ListItem>
              <NavItem noIcon>
                <span className="flight-card--stop-icon">
                  {' '}
                  <Icon type="stops" />{' '}
                </span>
                <span className="stops-detail">{stopDescription}</span>
              </NavItem>
            </ListItem>
          </List>
        </Segment>
      </div>
    );
  }
}

export default FlightCard;
