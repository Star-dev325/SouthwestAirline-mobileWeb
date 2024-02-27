// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import i18n from '@swa-ui/locale';
import Currency from 'src/shared/components/currency';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  topMessage: string,
  amount: CurrencyType,
  bottomMessageLeft?: ?string,
  bottomMessageRight?: string,
  needAdditionalPay?: boolean,
  boldTopMessage?: boolean,
  showTaxesAndFees?: boolean,
  forceBackgroundGreen?: boolean,
  expirationDateString?: string
};

const RefundTotalItem = (props: Props) => {
  const {
    topMessage,
    amount,
    bottomMessageLeft,
    bottomMessageRight,
    needAdditionalPay,
    boldTopMessage,
    showTaxesAndFees,
    forceBackgroundGreen,
    expirationDateString
  } = props;
  const amountIsZero = Number.parseFloat(_.get(amount, 'amount')) === 0;
  const refundTotalItemClassName =
    !forceBackgroundGreen && (needAdditionalPay || amountIsZero)
      ? 'refund-total-item_amount-due'
      : 'refund-total-item_credit';

  return (
    <div className={refundTotalItemClassName}>
      <div className="refund-total-item--body">
        <div className="flex flex-cross-center">
          <span
            data-qa="refund-message"
            className={cx('flex7 inline-block xlarge refund-total-item--message', boldTopMessage && 'bold')}
          >
            {topMessage}
          </span>
          <div className="flex5 align-right">
            <Currency className={'refund-total-item-currency'} showPts {...amount} />
          </div>
        </div>

        {(showTaxesAndFees || bottomMessageLeft || bottomMessageRight) && (
          <div className="refund-total-item--bottom">
            <div className="flex5 align-left pt2">
              {bottomMessageLeft && (
                <div data-qa="bottom-message-left">
                  {!expirationDateString && `${i18n('SHARED__REFUND_METHOD__REFUND_SUMMARY_EXPIRES')}: `}
                  <span className="bold">{bottomMessageLeft}</span>
                </div>
              )}
              {showTaxesAndFees && (
                <div data-qa="show-taxes-and-fees">{`${i18n(
                  'SHARED__REFUND_METHOD__REFUND_SUMMARY_TAXES_AND_FEES'
                )} `}</div>
              )}
            </div>
            <span className="flex7 align-right pt2 refund-total-item--bottom-message" data-qa="refund-method">
              {bottomMessageRight}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundTotalItem;
