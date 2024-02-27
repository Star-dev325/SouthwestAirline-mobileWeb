// @flow
import React from 'react';
import NavItemLink from 'src/shared/components/navItemLink';
import i18n from '@swa-ui/locale';

type Props = {
  onClick: () => void,
  filledPassportForCurrentPassenger: boolean
};

const InternationalTravelInfoNavItem = (props: Props) => {
  const { onClick, filledPassportForCurrentPassenger } = props;

  return (
    <div>
      <NavItemLink onClick={onClick} className="international-travel-info-item">
        <div>{i18n('AIR_BOOKING__PASSENGERS_INTERNATIONAL_TRAVEL__INFORMATION')}</div>
        <div className="international-travel-info-item--option-label">
          {filledPassportForCurrentPassenger
            ? i18n('AIR_BOOKING__PASSENGERS__COMPLETE')
            : i18n('AIR_BOOKING__PASSENGERS__OPTIONAL')}
        </div>
      </NavItemLink>
    </div>
  );
};

export default InternationalTravelInfoNavItem;
