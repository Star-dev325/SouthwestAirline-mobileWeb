// @flow
import cx from 'classnames';
import React from 'react';
import Icon from 'src/shared/components/icon';
import ICON_CLASSES from 'src/shared/constants/iconConstants';

type Props = {
  className?: string,
  icon?: string,
  iconClassName?: string,
  message?: string,
  subtitleClassName?: string,
  title?: string
};

const BasicBanner = (props: Props) => {
  const { className, icon, iconClassName, message, subtitleClassName, title } = props;

  return (
    <div className={cx('basic-banner', className)}>
      {icon && (
        <div>
          <Icon className={iconClassName} type={ICON_CLASSES[icon] || ICON_CLASSES.WARNING} />
        </div>
      )}
      <div className="banner-container">
        <b className="banner-container--title">{title}</b>
        <em className={cx('banner-container--subtitle', subtitleClassName)}>{message}</em>
      </div>
    </div>
  );
};

export default BasicBanner;
