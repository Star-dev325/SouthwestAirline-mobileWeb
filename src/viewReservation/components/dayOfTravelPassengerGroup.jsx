// @flow

import React from 'react';
import _ from 'lodash';
import i18n from '@swa-ui/locale';
import PassengerReservationInfo from 'src/viewReservation/components/passengerReservationInfo';

import type { Node } from 'react';
import type { Passenger } from 'src/viewReservation/components/passengerReservationInfo';

type Props = {
  children?: Node,
  passengers: Array<Passenger>,
  isInternational: boolean,
  onPassengerNameClick: (string) => void,
  showPassengerHeader: boolean
};

const DayOfTravelPassengerGroup = (props: Props) => {
  const { passengers, showPassengerHeader, children } = props;

  return (
    <div>
      {passengers.map((passenger, index) => {
        const restProps = _.pick(props, ['isInternational', 'onPassengerNameClick']);
        const { lapInfant: { name: lapChildName } = {} } = passenger;

        return (
          <React.Fragment key={index}>
            <PassengerReservationInfo
              index={index}
              passenger={passenger}
              showPassengerHeader={showPassengerHeader && index === 0}
              {...restProps}
            />
            {lapChildName && (
              <div className="lap-child--details">
                <div className="lap-child--icon" />
                <div className="lap-child--text-wrapper">
                  <h4 className="lap-child--title">{i18n('VIEW_RESERVATION__BOARDING_INFO__LAP_CHILD_TITLE')}</h4>
                  <p>{lapChildName}</p>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
      {children}
    </div>
  );
};

export default DayOfTravelPassengerGroup;
