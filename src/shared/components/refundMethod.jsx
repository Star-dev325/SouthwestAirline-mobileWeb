// @flow
import React from 'react';
import cx from 'classnames';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import Fields from 'src/shared/components/fields';
import RefundTypes from 'src/shared/constants/refundTypes';
import i18n from '@swa-ui/locale';

const { HOLD_FUTURE_USE, BACK_TO_ORIGINAL_PAYMENT } = RefundTypes;

type Props = {
  notVisible?: boolean,
  className?: string,
  isCancelOneBound?: boolean,
  onRefundOptionChange?: (*) => void
};

const RefundMethod = ({ notVisible = false, className, isCancelOneBound = false, onRefundOptionChange }: Props) => {
  const refundOption = [
    {
      value: BACK_TO_ORIGINAL_PAYMENT,
      label: i18n('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD')
    },
    {
      value: HOLD_FUTURE_USE,
      label: i18n('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE')
    }
  ];

  return (
    <div
      className={cx(
        'refund-method pl5 bgwhite',
        { hide: notVisible, py2: isCancelOneBound, py5: !isCancelOneBound },
        className
      )}
    >
      <Fields type="grouped" divided>
        <FormSelectField
          className="no-shadow"
          name="refundMethod"
          placeholder={i18n('SHARED__REFUND_METHOD__SELECT_AN_OPTION')}
          options={refundOption}
          disablePlaceholder
          unformattedInput
          defaultSelected
          onChange={onRefundOptionChange}
        />
      </Fields>
    </div>
  );
};

export default RefundMethod;
