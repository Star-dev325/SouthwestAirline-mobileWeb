// @flow
import React from 'react';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';

type PromoBannerProps = {
  promoCodeNotice: string,
  isPromoCodeApplied: boolean,
  className?: string
};

const FlightProductPromoBanner = (props: PromoBannerProps) => {
  const { promoCodeNotice, isPromoCodeApplied, className } = props;

  return (
    <div className={cx('flight-product-promo-code-banner', className)}>
      <Icon type={isPromoCodeApplied ? 'check-circle' : 'exclamation-circle'} />
      <span className="pl4">{promoCodeNotice}</span>
    </div>
  );
};

export default FlightProductPromoBanner;
