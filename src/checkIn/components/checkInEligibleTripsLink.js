// @flow

import React from 'react';
import pluralize from 'pluralize';

import Container from 'src/shared/components/container';
import Icon from 'src/shared/components/icon';

type Props = {
  numberOfCheckInEligibleTrips: number,
  onClick: () => void
};

const CheckInEligibleTripsLink = (props: Props) => {
  const { onClick, numberOfCheckInEligibleTrips } = props;

  return (
    <div className="eligible-check-in-trips-link" onClick={onClick}>
      <Container noBottomPadding>
        <div className="eligible-check-in-trips-link--container">
          <div className="eligible-check-in-trips-link--message">
            You have
            <span className="eligible-check-in-trips-link--num-of-trips">{numberOfCheckInEligibleTrips}</span>
            {pluralize('trip', numberOfCheckInEligibleTrips)} eligible for check in
            <Icon className="icon_keyboard-arrow-right" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckInEligibleTripsLink;
