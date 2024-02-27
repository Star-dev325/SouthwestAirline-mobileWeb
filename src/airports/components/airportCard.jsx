// @flow

import _ from 'lodash';
import React from 'react';
import Icon from 'src/shared/components/icon';
import type { AirportType } from 'src/shared/flow-typed/shared.types';

type Props = {
  airport: AirportType,
  disableInternationals?: boolean,
  disableOnClick?: boolean,
  handleMultiSelectRecentSearch?: (airport: AirportType) => void,
  onAirportSelect?: (airport: AirportType) => void,
  onDeleteRecentAirportSearch?: (airport: AirportType) => void
};

const AirportCard = (props: Props) => {
  const {
    airport,
    disableInternationals,
    disableOnClick,
    handleMultiSelectRecentSearch,
    onAirportSelect = _.noop,
    onDeleteRecentAirportSearch
  } = props;
  const extraClassNames = disableInternationals && airport.countryCode !== 'US' ? 'italics' : '';
  const { airportGroupSelected = [] } = airport;

  if (_.isEmpty(airport)) {
    return null;
  }

  return (
    <li className="flex">
      {airportGroupSelected.length > 1 && handleMultiSelectRecentSearch ? (
        <div className="flex-auto" onClick={() => !disableOnClick && handleMultiSelectRecentSearch(airport)}>
          <span className={extraClassNames}>{`${airport.airportGroupName} - ${airportGroupSelected.join(', ')}`}</span>
        </div>
      ) : (
        <div className="flex-auto" onClick={() => !disableOnClick && onAirportSelect(airport)}>
          <span className={extraClassNames}>{`${airport.displayName}, ${airport.cityState} - ${airport.code}`}</span>
        </div>
      )}
      {onDeleteRecentAirportSearch && (
        <Icon
          className="gray4 right recent-search-remove-icon"
          data-qa="recent-search-remove-button"
          onClick={() => onDeleteRecentAirportSearch(airport)}
          type="remove"
        />
      )}
    </li>
  );
};

export default AirportCard;
