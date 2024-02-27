// @flow
import React from 'react';

type Props = {
  value: number,
  type: string
};

const MyTripsNumberHeader = ({ value, type }: Props) => (
  <div className="my-trips-number-header">
    <span>
      {value} {type}
    </span>
  </div>
);

export default MyTripsNumberHeader;
