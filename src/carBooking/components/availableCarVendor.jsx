// @flow
import React from 'react';
import Currency from 'src/shared/components/currency';
import i18n from '@swa-ui/locale';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  dailyRateWithCurrencyCode: CurrencyType,
  totalWithTaxesAndCurrencyCode: CurrencyType
};

const AvailableCarVendor = (props: Props) => {
  const { dailyRateWithCurrencyCode, totalWithTaxesAndCurrencyCode } = props;

  return (
    <div className="bgyellow rdr2 flex4 p4 flex flex-column flex-main-between">
      <div />
      <div className="pb4 center">
        <Currency {...dailyRateWithCurrencyCode} className={'available-car-vendor--currency'} />
        <div className="italic">{i18n('CAR_BOOKING__RESULT__PER_DAY')}</div>
      </div>
      <div className="center">
        <Currency {...totalWithTaxesAndCurrencyCode} className="inline" />
        <span className="medium italic inline-block pl2">{i18n('CAR_BOOKING__RESULT__TOTAL')}</span>
      </div>
    </div>
  );
};

export default AvailableCarVendor;
