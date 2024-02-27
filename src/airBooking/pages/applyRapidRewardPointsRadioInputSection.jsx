// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React from 'react';
import Icon from 'src/shared/components/icon';
import RadioButtonMark from 'src/shared/components/radioButtonMark';
import withField from 'src/shared/form/enhancers/withField';

import type {
  SplitPayRadioOptionsArray,
  TotalPointsAppliedType
} from 'src/airBooking/flow-typed/applyRapidRewards.types';
import type { FieldProps } from 'src/shared/form/flow-typed/form.types';

type Props = {
  selectedSplitPay: ?number,
  splitPayRadioOptions: ?Array<SplitPayRadioOptionsArray>,
  totalPointsApplied?: ?TotalPointsAppliedType
} & FieldProps;

export const ApplyRapidRewardPointsRadioInputSection = ({
  onChange,
  selectedSplitPay,
  splitPayRadioOptions,
  totalPointsApplied,
  value
}: Props) => {
  const selectedRadioOption =
    selectedSplitPay && splitPayRadioOptions && 
    splitPayRadioOptions.find((splitPayOption) => splitPayOption.splitPayOptionPointsAmount === selectedSplitPay);

  const selectedFundIdentifier = selectedRadioOption && selectedRadioOption.fundIdentifier;

  return (
    <div className="apply-rapid-reward-points-radio-input rr-points-list">
      <p className="rr-points-list--title" data-qa="rr-points-list--title">
        {i18n('SPLIT_PAY_PAGE__ELIGIBLE_POINTS')}
      </p>
      {splitPayRadioOptions &&
        splitPayRadioOptions.map(({ fundIdentifier, pointsAmount, revenueAmount, splitPayOptionPointsAmount }) => {
          const isDisabled = !!totalPointsApplied && splitPayOptionPointsAmount !== selectedSplitPay;
          const onRadioOptionClick = () => !isDisabled && onChange(fundIdentifier);

          return (
            <div
              aria-disabled={isDisabled}
              className={cx('apply-rapid-reward-points-radio-input rr-points-list-item', {
                'item-disabled': isDisabled
              })}
              data-qa="rr-points-list-item"
              key={fundIdentifier}
              onClick={onRadioOptionClick}
              role="button"
              tabIndex={0}
            >
              <Icon className="rr-points-list--points-icon" data-qa="rr-points-list--points-icon" type="points" />
              <div className="rr-points-list--item-text">
                <span>{pointsAmount}&nbsp;=</span>
                <span className="rr-points-list--point-to-dollar-amount">{revenueAmount}</span>
              </div>
              <div>
                <RadioButtonMark
                  inputClassName="rr-points-list--radio-item"
                  isChecked={value === fundIdentifier || fundIdentifier === selectedFundIdentifier}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default withField()(ApplyRapidRewardPointsRadioInputSection);
