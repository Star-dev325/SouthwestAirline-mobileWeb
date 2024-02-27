// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';

type Props = {
  destinationAirport: string,
  isOutbound: boolean,
  originAirport: string
};

const ShoppingAirStationsOverview = (props: Props) => {
  const { destinationAirport, isOutbound, originAirport } = props;

  return (
    <div className="shopping-air-stations-overview">
      {
        isOutbound &&
        <img
          data-qa="ic-select-depart-img"
          src="/content/mkt/images/landing_pages/ic-select-depart.svg"
        />
      }
      {
        !isOutbound &&
        <img
          data-qa="ic-select-return-img"
          src="/content/mkt/images/landing_pages/ic-select-return.svg"
        />
      }
      <span className="direction">{isOutbound ? 'Depart' : 'Return'}:</span>
      <span data-qa="air-stations">
        {originAirport}
        <Icon type="airplane" className="air-stations--icon" />
        {destinationAirport}
      </span>
    </div>
  );
};

export default ShoppingAirStationsOverview;
