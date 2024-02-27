// @flow
import React from 'react';
import _ from 'lodash';
import NavItemLink from 'src/shared/components/navItemLink';

import type { DriverInfoType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  passengerInfos: Array<DriverInfoType>,
  onClick?: (*, *, *) => void,
  link?: string,
  hasParams?: boolean,
  hideRRNumber?: boolean
};

class PassengerInfoSummary extends React.Component<Props> {
  _onClick = (evt: Event, params: *, query: *) => {
    const { onClick } = this.props;

    onClick && onClick(evt, params, query);
  };

  render() {
    const passengers = [];
    const { hasParams, link, hideRRNumber, passengerInfos } = this.props;

    _.each(passengerInfos, (passengerInfo) => {
      if (!passengerInfo) {
        return;
      }

      let passengerInfoItem = {
        name: [passengerInfo.firstName, passengerInfo.lastName].join(' '),
        rapidRewards: passengerInfo.accountNumber
      };

      passengerInfo.type && (passengerInfoItem = _.merge(passengerInfoItem, { type: passengerInfo.type }));

      return passengers.push(passengerInfoItem);
    });

    return (
      <div className="passenger-info-summary">
        {_.map(passengers, (passenger, key: number) => {
          const params = hasParams ? { paxNumber: key + 1 } : null;
          const query = passenger.type ? { type: passenger.type } : null;

          return (
            <div key={key}>
              <NavItemLink
                link={link}
                onClick={(evt) => this._onClick(evt, params, query)}
                className="clearfix passenger-info-summary--item"
                params={params}
                query={query}
              >
                <div className="nowrap overflow-hidden ellipsis pr6 passenger-info-summary--item--text">
                  <span data-qa="passenger-info-summary--passenger-name">{passenger.name}</span>
                  {!hideRRNumber && !_.isEmpty(passenger.rapidRewards) && (
                    <div className="passenger-info-summary--item-rapid-rewards">{passenger.rapidRewards}</div>
                  )}
                </div>
              </NavItemLink>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PassengerInfoSummary;
