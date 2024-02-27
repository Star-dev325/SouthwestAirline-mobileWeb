// @flow
import React from 'react';
import _ from 'lodash';

type Props = {
  airportInfo: {
    airportCode: string,
    airportName?: string,
    cityState?: string,
    country?: ?string
  },
  showDetail?: boolean
};

const AirportInfo = ({ airportInfo, showDetail }: Props) => (
  <div className="airport-info">
    <div className="airport-info--code">{airportInfo.airportCode}</div>
    {showDetail && !_.isEmpty(airportInfo) && (
      <div className="airport-info--detail">
        {airportInfo.airportName}, {airportInfo.cityState || airportInfo.country}
      </div>
    )}
  </div>
);

export default AirportInfo;
