import React from 'react';
import dayjs from 'dayjs';
import i18n from '@swa-ui/locale';

const MenuFooter = () => (
  <div className="menu-footer">
    <span className="menu-footer--copyright">
      ©{dayjs().year()} {i18n('HOME_AND_NAV__MENU_LIST__SOUTHWEST_AIRLINES')}
    </span>
    <span className="menu-footer--copyright">{i18n('HOME_AND_NAV__MENU_LIST__RIGHTS_RESERVED')}</span>
  </div>
);

export default MenuFooter;
