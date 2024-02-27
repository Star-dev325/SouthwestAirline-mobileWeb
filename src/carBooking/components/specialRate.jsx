// @flow
import React from 'react';

const cx = require('classnames');

import i18n from '@swa-ui/locale';

type Props = {
  className: string
};

const SpecialRate = (props: Props) => (
  <div className={cx(props.className)}>
    <div className="special-rate pl5 red inline-block bold">{i18n('CAR_BOOKING__RESULTS__SPECIAL_RATE')}</div>
  </div>
);

export default SpecialRate;
