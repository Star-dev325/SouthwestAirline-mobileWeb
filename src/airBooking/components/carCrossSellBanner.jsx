// @flow
import React from 'react';

import Button from 'src/shared/components/button';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

type Props = {
  onClick: () => void
};

const CarCrossSellBanner = (props: Props) => (
  <div className="car-cross-sell--banner">
    <div className="car-cross-sell--title">
      <h3 className="car-cross-sell--title-heading">
        <span>{i18n('AIR_BOOKING__NEED_A')}</span>
        <br />
        <span>{i18n('AIR_BOOKING__RENTAL_CAR')}</span>
      </h3>
      <Icon type="car" className="car-cross-sell--icon" />
    </div>
    <Button className="car-cross-sell--button" color="yellow" size="huge" fluid onClick={props.onClick}>
      {i18n('AIR_BOOKING__BOOK_IT_NOW')}
    </Button>
  </div>
);

export default CarCrossSellBanner;
