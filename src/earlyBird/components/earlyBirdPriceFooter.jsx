// @flow
import React from 'react';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import Button from 'src/shared/components/button';
import i18n from '@swa-ui/locale';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  total: CurrencyType,
  buttonText: string
};

const EarlyBirdPriceFooter = (props: Props) => {
  const { total, buttonText } = props;

  return (
    <div className="early-bird-price-footer">
      <div className="early-bird-price-footer--price-total">
        <PriceTotalLine title={i18n('EARLY_BIRD_PRICE_AMOUNT_TITLE')} type="totalPerSection" total={total} />
      </div>
      <div className="early-bird-price-footer--nav">
        <Button className="continue" type="submit" color="yellow" size="larger" fluid>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default EarlyBirdPriceFooter;
