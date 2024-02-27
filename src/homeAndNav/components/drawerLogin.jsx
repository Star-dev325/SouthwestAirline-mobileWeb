// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import TierTypes from 'src/shared/constants/tierTypes';
import UserPreferName from 'src/homeAndNav/components/userPreferName';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';
import { formatCurrency } from 'src/shared/helpers/formatCurrencyHelper';

import type { UserInfo } from 'src/homeAndNav/flow-typed/homeAndNav.types';

type Props = {
  userInfo?: UserInfo,
  isLoggedIn: boolean,
  onDrawerLoginClicked: (to: string, params: ?Array<mixed>, query: ?{ to: string }) => void,
  toggleDrawer: (state: boolean) => void
};

const DrawerLogin = (props: Props) => {
  const { userInfo, isLoggedIn } = props;

  const getAccountInfo = () => {
    if (isLoggedIn && userInfo && !!userInfo.accountInfo) {
      const { accountInfo } = userInfo;

      return {
        name: accountInfo.customerInfo.name.userName,
        pts: formatCurrency(accountInfo.rapidRewardsDetails.redeemablePoints, false),
        tier: accountInfo.rapidRewardsDetails.tierInfo.tier,
        isTierStatusPending: accountInfo.isTierStatusPending,
        isEnrolledInRapidRewards: accountInfo.rapidRewardsDetails.isEnrolledInRapidRewards
      };
    }
  };

  const renderAccountInfo = () => {
    const accountInfo = getAccountInfo();
    let content = null;

    if (accountInfo) {
      const showRapidRewardsPoints = _shouldShowRapidRewardsPoints();
      const shouldShowTierLevel = _shouldShowTierLevel();

      content = (
        <div>
          <div className="flex flex-main-between xxlarge bold">
            <div data-qa="drawer-login-customer-name" className="overflow-hidden nowrap ellipsis">
              <UserPreferName isLoggedIn={isLoggedIn} name={accountInfo.name} />
            </div>
            {showRapidRewardsPoints && <div className="align-right bold flex-shrink0">{accountInfo.pts}</div>}
          </div>
          <div className="flex flex-main-between larger">
            {shouldShowTierLevel && <p>{TierTypes[accountInfo.tier]}</p>}
            {showRapidRewardsPoints && (
              <p className={cx('align-right', { 'flex-auto': !shouldShowTierLevel })}>{i18n('HOME_AND_NAV__PTS')}</p>
            )}
          </div>
          <div data-qa="nav-drawer-view-account" className="flex larger flex-main-end flex-cross-center pt3 pblue">
            {i18n('HOME_AND_NAV__NAV_DRAWER__VIEW_ACCOUNT')}
            <Icon type="keyboard-arrow-right" className="xxlarge" />
          </div>
        </div>
      );
    }

    return content;
  };

  const _shouldShowRapidRewardsPoints = () => {
    const accountInfo = getAccountInfo();
    const enrolledInRapidRewards = _.get(accountInfo, 'isEnrolledInRapidRewards', false);

    return enrolledInRapidRewards;
  };

  const _shouldShowTierLevel = () => {
    const accountInfo = getAccountInfo();
    const enrolledInRapidRewards = _.get(accountInfo, 'isEnrolledInRapidRewards', false);
    const tierStatusPending = _.get(accountInfo, 'isTierStatusPending', false);

    return enrolledInRapidRewards && !tierStatusPending;
  };

  const _onClicked = () => {
    const { onDrawerLoginClicked, toggleDrawer } = props;
    const params = isLoggedIn ? ['/my-account?clk=GNAVMYACCT2'] : ['/login?clk=GNAVLOGIN2', null, { to: '/my-account' }]; 

    onDrawerLoginClicked(...params);
    toggleDrawer(true);
  };

  return (
    <div className="drawer-login" onClick={_onClicked}>
      <div className={cx('drawer-login--placeholder', { hide: isLoggedIn })}>
        <Icon type="profile" className="drawer-login--icon_profile" />
        <div className="drawer-login--reminder">
          <div>
            <div className="bold inline">{i18n('HOME_AND_NAV__NAV_DRAWER__LOGIN_OR_ENROLL')}</div>
            <div className="inline">{i18n('HOME_AND_NAV__NAV_DRAWER__TO_MANAGE')}</div>
          </div>
          <div>{i18n('HOME_AND_NAV__NAV_DRAWER__YOUR_TRIPS')}</div>
        </div>
      </div>
      {renderAccountInfo()}
    </div>
  );
};

export default DrawerLogin;
