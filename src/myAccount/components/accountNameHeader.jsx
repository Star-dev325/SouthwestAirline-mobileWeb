// @flow
import React from 'react';
import util from 'util';
import i18n from '@swa-ui/locale';

type Props = {
  fullName: string,
  rapidRewardsNumber: ?string
};

const AccountNameHeader = ({ fullName, rapidRewardsNumber }: Props) => (
  <div className="flex pdkblue mb4 px2">
    <div className="flex6 overflow-hidden">
      <span data-qa="user-name" className="bold large block nowrap overflow-hidden ellipsis">
        {fullName}
      </span>
    </div>
    <div className="flex6 medium lineheight16 align-right">
      {!!rapidRewardsNumber && (
        <span data-qa="rapid-rewards-number">
          {util.format(i18n('MY_ACCOUNT__HEADER__RR_NUMBER'), rapidRewardsNumber)}
        </span>
      )}
    </div>
  </div>
);

export default AccountNameHeader;
