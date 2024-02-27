// @flow
import React from 'react';

type Props = {
  dateRange: string,
  destinationAirport: string
};

const DestinationInfo = (props: Props) => {
  const { dateRange, destinationAirport } = props;

  return (
    <div className="early-bird-destination-info">
      <p className="early-bird-destination-info--date-range">{dateRange}</p>
      <p className="early-bird-destination-info--airport-name">{destinationAirport}</p>
    </div>
  );
};

export default DestinationInfo;
