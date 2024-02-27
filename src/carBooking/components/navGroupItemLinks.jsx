import React from 'react';
import NavItemLink from 'src/shared/components/navItemLink';
import { sitePaths } from 'src/shared/constants/siteLinks';

const NavGroupItemLinks = () => (
  <div>
    <NavItemLink className="link-bar" link={sitePaths.myaccount}>
      My Account
    </NavItemLink>
    <NavItemLink className="link-bar" link={sitePaths.homePage}>
      Home
    </NavItemLink>
  </div>
);

export default NavGroupItemLinks;
