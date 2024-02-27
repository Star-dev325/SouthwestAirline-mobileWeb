import React from 'react';
import NavItemLink from 'src/shared/components/navItemLink';
import ExternalNavItemLink from 'src/shared/components/externalNavItemLink';
import { sitePaths } from 'src/shared/constants/siteLinks';
import i18n from '@swa-ui/locale';

const NavGroupItemLinks = () => (
  <div>
    <NavItemLink className="link-bar" link={sitePaths.homePage}>
      {i18n('SHARED__HOME_NAV_ITEM')}
    </NavItemLink>
    <ExternalNavItemLink className="link-bar" href={sitePaths.contactUs}>
      {i18n('SHARED__CONTACTUS_NAV_ITEM')}
    </ExternalNavItemLink>
    <ExternalNavItemLink className="link-bar" href={sitePaths.checkinAndRefund}>
      {i18n('SHARED__CHECK_IN_REFUND_INFO_NAV_ITEM')}
    </ExternalNavItemLink>
    <ExternalNavItemLink className="link-bar" href={sitePaths.carriageContract}>
      {i18n('SHARED__CONTACT_OF_CONTRACT_NAV_ITEM')}
    </ExternalNavItemLink>
  </div>
);

export default NavGroupItemLinks;
