// @flow
import Icon from 'src/shared/components/icon';
import RadioButtonMark from 'src/shared/components/radioButtonMark';
import React from 'react';

type Props = {
  pointsAmount: string,
  revenueAmount: string,
  value: boolean
};

export const ApplyRapidRewardPointsRadioInput = ({ pointsAmount, revenueAmount, value }: Props) => (
  <div className="apply-rapid-reward-points-radio-input rr-points-list-item">
    <Icon data-qa="rr-points-list--points-icon" type="points" className="rr-points-list--points-icon" />
    <div className="rr-points-list--item-text">
      <span>{pointsAmount}&nbsp;=</span>
      <span className="rr-points-list--point-to-dollar-amount">{revenueAmount}</span>
    </div>
    <div>
      <RadioButtonMark inputClassName="rr-points-list--radio-item" isChecked={value} />
    </div>
  </div>
);

export default ApplyRapidRewardPointsRadioInput;
