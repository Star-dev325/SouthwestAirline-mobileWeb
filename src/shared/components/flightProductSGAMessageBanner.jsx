// @flow
import React from 'react';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';

type SGAMessageBannerProps = {
  title: string,
  message: string,
  className?: string
};

const FlightProductSGAMessageBanner = (props: SGAMessageBannerProps) => {
  const { title, message, className } = props;

  return (
    <div className={cx('flight-product-sga-message-banner', className)}>
      <div>
        <Icon type={'exclamation-circle sga'} />
      </div>
      <div className={'banner-container'}>
        <b className="banner-container--title">{title}</b>
        <em className="banner-container--subtitle">{message}</em>
      </div>
    </div>
  );
};

export default FlightProductSGAMessageBanner;
