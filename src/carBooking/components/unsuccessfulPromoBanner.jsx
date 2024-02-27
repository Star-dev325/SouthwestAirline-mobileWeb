// @flow
import React from 'react';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

type Props = {
  numberOfPromoCode: number,
  message: string,
  className?: string
};

const UnsuccessfulPromoBanner = (props: Props) => {
  const { className, numberOfPromoCode, message } = props;

  return (
    <div className={cx('p5 bgred white large flex flex-cross-center', className)}>
      <Icon type="travel-alert" />
      <div className="overflow-hidden pl4 ">
        <span className="bold">
          {`${i18n('CAR_BOOKING__RESULT__PROMOTION_CODE_PROMO')}${numberOfPromoCode} ${i18n(
            'CAR_BOOKING__RESULT__PROMOTION_CODE_INVALID'
          )}`}
        </span>
        <span>{` - ${message}`}</span>
      </div>
    </div>
  );
};

export default UnsuccessfulPromoBanner;
