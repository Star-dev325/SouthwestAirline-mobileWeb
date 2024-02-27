// @flow

import React from 'react';
import cx from 'classnames';
import TripDateAndDestCity from 'src/shared/components/tripDateAndDestCity';
import PassengerReservationInfo from 'src/shared/components/passengerReservationInfo';

type Props = {
  className?: string,
  date?: string,
  cityName?: string,
  reservationGroups: Array<*>
};

const TripBriefInfo = (props: Props) => {
  const { date, cityName, reservationGroups, className } = props;

  return (
    <div className={cx('trip-brief-info', className)}>
      <TripDateAndDestCity date={date} cityName={cityName} />
      <PassengerReservationInfo reservationGroups={reservationGroups} shouldDisplayTsaPrecheck={false} />
    </div>
  );
};

export default TripBriefInfo;
