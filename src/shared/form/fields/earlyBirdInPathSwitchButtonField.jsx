// @flow
import React from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import RadioButtonMark from 'src/shared/components/radioButtonMark';
import Currency from 'src/shared/components/currency';
import withField from 'src/shared/form/enhancers/withField';
import i18n from '@swa-ui/locale';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';
import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = {
  unitPriceInBound?: CurrencyType,
  unitPriceOutBound?: CurrencyType,
  totalPrice: CurrencyType,
  onClick: (boolean) => void
} & FieldProps;

const EarlyBirdInPathSwitchButtonField = (props: Props) => {
  const { totalPrice, unitPriceInBound, unitPriceOutBound, value } = props;

  const unitPrice = _.chain([unitPriceOutBound, unitPriceInBound])
    .compact()
    .minBy((item) => numeral(item.amount).value())
    .value();

  const showStartingFromMessage =
    !!unitPriceOutBound &&
    !!unitPriceInBound &&
    _.get(unitPriceOutBound, 'amount') !== _.get(unitPriceInBound, 'amount');

  const _handleClick = () => {
    props.onChange(!value);
    props.onClick(!value);
  };

  return (
    <div className="bdb flex flex-main-between">
      <div className="bgwhite flex10 flex py4 pl5 ">
        <span className="bgwhite pdkblue bold larger" data-qa="add-early-bird-check-in--banner--total-price">
          <Currency {...totalPrice} />
        </span>
        <span className="gray4 pl1 medium" data-qa="add-early-bird-check-in--banner--per-passenger-message">
          <span>
            <Currency
              {...unitPrice}
              className="inline-block"
              prefix={showStartingFromMessage ? i18n('SHARED__EARLY_BIRD__PER_PASSENGER_PRICE_MESSAGE_PREFIX') : '('}
              suffix={i18n('SHARED__EARLY_BIRD__CHECK_IN_PER_PASSENGER_PRICE_MESSAGE_SUFFIX')}
            />
          </span>
        </span>
      </div>
      <div
        className="bgwhite bdl relative early-bird-check-in--radio-button flex2"
        onClick={_handleClick}
        data-qa="add-early-bird-check-in--radio-button"
      >
        <RadioButtonMark isChecked={value} />
      </div>
    </div>
  );
};

export default withField({
  format: _.toBoolean
})(EarlyBirdInPathSwitchButtonField);
