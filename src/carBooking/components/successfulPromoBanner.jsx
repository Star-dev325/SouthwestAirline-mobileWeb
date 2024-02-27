// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';
import pluralize from 'pluralize';
import i18n from '@swa-ui/locale';

type Props = {
  numberOfAppliedPromoCodes: number
};

const SuccessfulPromoBanner = (props: Props) => {
  const { numberOfAppliedPromoCodes } = props;
  const bannerClassNames = 'p4 bgwhite pdkblue large bold flex flex-cross-center';

  return (
    <div className={bannerClassNames}>
      <Icon className="xxlarge" type="check-circle" />
      <div className="pl4">
        {`${numberOfAppliedPromoCodes} ${pluralize(
          i18n('CAR_BOOKING__RESULT__PROMOTION_CODE_PROMO_CODE'),
          numberOfAppliedPromoCodes
        )} ${i18n('CAR_BOOKING__RESULT__PROMOTION_CODE_APPLIED')}`}
      </div>
    </div>
  );
};

export default SuccessfulPromoBanner;
