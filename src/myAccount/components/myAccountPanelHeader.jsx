// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

type Props = {
  showCongratulations?: boolean
};

const MyAccountPanelHeader = ({ showCongratulations }: Props) => (
  <div>
    {showCongratulations && (
      <div className="my-account-panel-header">
        <span>
          <Icon type="check" className="my-account-panel-header--congratulations" />
          {i18n('MY_ACCOUNT__CONGRATULATIONS')}
        </span>
      </div>
    )}
  </div>
);

export default MyAccountPanelHeader;
