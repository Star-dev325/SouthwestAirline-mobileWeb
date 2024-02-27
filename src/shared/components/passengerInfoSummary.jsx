// @flow

import React from 'react';
import _ from 'lodash';
import NavItemLink from 'src/shared/components/navItemLink';

export type PassengerInfoType = {
  name: string,
  rapidRewardsNumber?: string
};

type Props = {
  passengers: Array<PassengerInfoType>,
  onPassengerItemClick: (number) => void
};

const PassengerInfoSummary = ({ passengers, onPassengerItemClick }: Props) => (
  <div className="passenger-info-summary">
    {_.map(passengers, (passenger, index: number) => (
      <div key={index}>
        <NavItemLink className="clearfix passenger-info-summary--item" onClick={() => onPassengerItemClick(index)}>
          <div className="fullwidth nowrap overflow-hidden ellipsis pr6">
            <span className="passenger-info-summary--passenger-name" data-qa="passenger-info-summary--passenger-name">
              {passenger.name}
            </span>
            {passenger.rapidRewardsNumber && (
              <span className="passenger-info-summary--item-rapid-rewards">{passenger.rapidRewardsNumber}</span>
            )}
          </div>
        </NavItemLink>
      </div>
    ))}
  </div>
);

export default PassengerInfoSummary;
