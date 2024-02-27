// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

type Props = {
  travelAdvisories: Array<*>,
  onClick: () => void
};

const TravelAdvisoryNavItem = ({ travelAdvisories, onClick }: Props) => {
  const contextSuffix = travelAdvisories.length > 1 ? ` (${travelAdvisories.length})` : '';

  return (
    <div className="travel-advisory-nav-item" data-a="TRVLADV" onClick={onClick}>
      <Icon className="travel-advisory-nav-item--alert-icon" type="travel-alert" />
      <span className="travel-advisory-nav-item--content">
        {i18n('HOME_AND_NAV__TRAVEL_ADVISORY_TITLE') + contextSuffix}
      </span>
      <Icon className="travel-advisory-nav-item--arrow-icon" type="keyboard-arrow-right" />
    </div>
  );
};

export default TravelAdvisoryNavItem;
