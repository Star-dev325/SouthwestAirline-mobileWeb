// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

type Props = {
  message: string,
  onClick?: () => void,
  hideRightArrow: boolean,
  important: boolean,
  hideAlertIcon?: boolean
};

const AlertBanner = ({ message, onClick = _.noop, hideRightArrow, important, hideAlertIcon }: Props) => (
  <div className="alert-banner" onClick={onClick}>
    <div className="alert-banner--content">
      <div>
        {!hideAlertIcon && <Icon type="travel-alert" className="larger alert-banner--vertically-centered-icon" />}
        <span className={cx(hideAlertIcon ? 'mx0' : 'mx7')}>
          {important && <b>{i18n('VIEW_RESERVATION__ALERT_BANNER__IMPORTANT')}</b>}
          {message}
        </span>
      </div>
      {!hideRightArrow && (
        <Icon
          type="keyboard-arrow-right"
          className="xxxlarge alert-banner--vertically-centered-icon alert-banner--arrow-icon"
        />
      )}
    </div>
  </div>
);

export default AlertBanner;
