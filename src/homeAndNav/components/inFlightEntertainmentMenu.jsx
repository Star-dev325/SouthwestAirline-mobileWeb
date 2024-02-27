import React, { useEffect } from 'react';
import InFlight from 'src/homeAndNav/constants/inFlight';
import { raiseEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import i18n from '@swa-ui/locale';

const { LINKS } = InFlight;

const InFlightEntertainmentMenu = () => {
  useEffect(() => {
    raiseEvent('inflightButtonsShown');
  }, []);

  return (
    <div className="in-flight-entertainment">
      <div className="in-flight-entertainment--menu">
        <div className="in-flight-entertainment--menu-header">{i18n('HOME_AND_NAV__IN_FLIGHT__WELCOME_ABOARD')}</div>
        <div className="in-flight-entertainment--menu-body">
          <a
            className="in-flight-entertainment--menu-item"
            target="_blank"
            data-a="entertainment"
            href={LINKS.TV_AND_MOVIE}
          >
            {i18n('HOME_AND_NAV__IN_FLIGHT__TV_AND_MOVIE')}
          </a>
          <a className="in-flight-entertainment--menu-item" target="_blank" data-a="drinkMenu" href={LINKS.DRINKS_MENU}>
            {i18n('HOME_AND_NAV__IN_FLIGHT__DRINKS_MENU')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default InFlightEntertainmentMenu;
