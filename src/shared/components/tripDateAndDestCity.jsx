// @flow
import React from 'react';
import cx from 'classnames';

type Props = {
  date?: string,
  cityName?: string,
  className?: string
};

const TripDateAndDestCity = (props: Props) => (
  <div className="trip-date-dest-city--city-name">
    <span className="trip-date-dest-city--trip-date">{props.date}</span>
    <span className={cx('trip-date-dest-city--destination-airport', props.className)}>{props.cityName}</span>
  </div>
);

export default TripDateAndDestCity;
